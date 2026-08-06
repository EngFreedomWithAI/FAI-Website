import type { Env } from '../_lib/types';
import { json, isValidEmail, isValidUrl, readBody, escapeHtml } from '../_lib/util';
import { sendEmail } from '../_lib/ses';

// Slugs live in src/data/office-hours.ts. Rather than couple the worker to the site
// data, we validate the shape and store whatever the form sent. Bad slugs show up as
// an odd event_slug in D1, never as a broken signup on the day of an event.
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;

// Which occurrence of a recurring series, ISO YYYY-MM-DD. Empty is allowed: when we
// have not published the next date yet, we still take the signup and confirm by email.
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const MAX_GOAL = 2000;

const prettyDate = (iso: string): string => {
  if (!iso) return 'date to be confirmed';
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    return await handleOfficeHoursPost(context);
  } catch (err) {
    console.error('office-hours: unhandled', err);
    return json({ ok: false, error: 'Unexpected server error. Please try again later.' }, 500);
  }
};

const handleOfficeHoursPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await readBody(request);

  // Honeypot.
  if (data.company) return json({ ok: true });

  const eventSlug = (data.event ?? '').toLowerCase();
  const sessionDate = data.sessionDate ?? '';
  const name = data.name ?? '';
  const email = (data.email ?? '').toLowerCase();
  const goal = (data.goal ?? '').slice(0, MAX_GOAL);
  const link = data.link ?? '';
  const source = (data.source ?? 'direct').slice(0, 64);

  const errors: Record<string, string> = {};
  if (!eventSlug || !SLUG_PATTERN.test(eventSlug)) errors.event = 'Please choose which session.';
  if (sessionDate && !DATE_PATTERN.test(sessionDate)) errors.sessionDate = 'Please choose a date.';
  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!goal) errors.goal = 'Tell us what you want to walk out with.';
  if (link && !isValidUrl(link)) errors.link = 'Enter a valid link starting with http:// or https://.';

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }

  if (!env.DB) {
    console.error('office-hours: DB binding missing');
    return json({ ok: false, error: 'Server misconfigured (database). Please try again later.' }, 500);
  }

  // Upsert per occurrence: signing up twice for the same date updates the answers,
  // signing up for next month's date creates a new row.
  try {
    await env.DB.prepare(
      `INSERT INTO office_hours_signups (name, email, event_slug, session_date, goal, link, source)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(event_slug, session_date, email) DO UPDATE SET
         name = excluded.name,
         goal = excluded.goal,
         link = excluded.link,
         source = excluded.source`
    )
      .bind(name, email, eventSlug, sessionDate, goal, link || null, source)
      .run();
  } catch (err) {
    console.error('office-hours: D1 insert failed', err);
    return json({ ok: false, error: 'Could not save your signup. Please try again later.' }, 500);
  }

  if (
    !env.AWS_ACCESS_KEY_ID ||
    !env.AWS_SECRET_ACCESS_KEY ||
    !env.AWS_REGION ||
    !env.SES_FROM ||
    !env.CONTACT_TO
  ) {
    console.error('office-hours: email env missing');
    return json(
      { ok: false, error: 'We saved your signup but email is not configured yet. We will still see it.' },
      502
    );
  }

  const when = prettyDate(sessionDate);

  // Alert the team. The goal line is the whole point: it is what we prep from.
  // Date is in the subject so a month's signups group together in the inbox.
  try {
    await sendEmail(env, {
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `Office hours (${eventSlug}, ${sessionDate || 'TBC'}): ${name}`,
      text: `Event: ${eventSlug}
Date: ${sessionDate || '(not published yet)'}
Name: ${name}
Email: ${email}
Source: ${source}
Link: ${link || '(none)'}

Wants to walk out with:
${goal}`,
      html: `<h2>Office hours signup</h2>
<p><strong>Event:</strong> ${escapeHtml(eventSlug)}<br />
<strong>Date:</strong> ${escapeHtml(sessionDate || '(not published yet)')}<br />
<strong>Name:</strong> ${escapeHtml(name)}<br />
<strong>Email:</strong> ${escapeHtml(email)}<br />
<strong>Source:</strong> ${escapeHtml(source)}<br />
<strong>Link:</strong> ${link ? `<a href="${escapeHtml(link)}">${escapeHtml(link)}</a>` : '(none)'}</p>
<p><strong>Wants to walk out with:</strong></p>
<p>${escapeHtml(goal).replace(/\n/g, '<br />')}</p>`,
    });
  } catch (err) {
    console.error('office-hours: SES alert failed', err);
    // Safely stored in D1; surface a soft failure.
    return json(
      { ok: false, error: 'We saved your signup but the notification failed. We will still see it.' },
      502
    );
  }

  // Confirm to the person. Asking for the one question up front is what makes 15 minutes work.
  const dateLine = sessionDate
    ? `You are signed up for ${when}.`
    : 'You are on the list. We will email you as soon as the next date is set.';

  try {
    await sendEmail(env, {
      to: email,
      subject: 'You are on the list for office hours',
      text: `Hi ${name},

${dateLine} Free, 15 to 20 minutes, one to one.

Two things that make the time worth a lot more:

1. Reply to this email with the one question you actually want answered.
2. Bring a link to what you are building, even if it is rough.

We run these during the mingle, so come find us and we will get to you.
Room and timing are on https://freedomwith.ai/office-hours if you need them on the day.

Sonia & Cammie, Freedom with AI`,
      html: `<p>Hi ${escapeHtml(name)},</p>
<p>${escapeHtml(dateLine)} Free, 15 to 20 minutes, one to one.</p>
<p>Two things that make the time worth a lot more:</p>
<ol>
<li>Reply to this email with the one question you actually want answered.</li>
<li>Bring a link to what you are building, even if it is rough.</li>
</ol>
<p>We run these during the mingle, so come find us and we will get to you. Room and timing are on
<a href="https://freedomwith.ai/office-hours">freedomwith.ai/office-hours</a> if you need them on the day.</p>
<p>Sonia &amp; Cammie, Freedom with AI</p>`,
    });
  } catch {
    // Ignore: confirmation is non-critical, the signup is stored.
  }

  return json({ ok: true, message: 'You are in. Check your email for the confirmation.' });
};
