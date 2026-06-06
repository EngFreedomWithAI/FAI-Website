import type { Env } from '../_lib/types';
import { json, isValidEmail, readBody, escapeHtml } from '../_lib/util';
import { sendEmail } from '../_lib/ses';

const TOPICS = new Set(['general', 'speaking', 'events', 'partnership']);
const TOPIC_LABELS: Record<string, string> = {
  general: 'General question',
  speaking: 'Speaking or podcast invitation',
  events: 'Events',
  partnership: 'Partnership or collaboration',
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    return await handleContactPost(context);
  } catch (err) {
    console.error('contact: unhandled', err);
    return json({ ok: false, error: 'Unexpected server error. Please try again later.' }, 500);
  }
};

const handleContactPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await readBody(request);

  // Honeypot.
  if (data.company) return json({ ok: true });

  const name = data.name ?? '';
  const email = (data.email ?? '').toLowerCase();
  const topic = data.topic || 'general';
  const message = data.message ?? '';

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!TOPICS.has(topic)) errors.topic = 'Please choose a topic.';
  if (!message) errors.message = 'Please enter a message.';

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }

  if (!env.DB) {
    console.error('contact: DB binding missing');
    return json({ ok: false, error: 'Server misconfigured (database). Please try again later.' }, 500);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO contact_messages (name, email, topic, message)
       VALUES (?, ?, ?, ?)`
    )
      .bind(name, email, topic, message)
      .run();
  } catch (err) {
    console.error('contact: D1 insert failed', err);
    return json({ ok: false, error: 'Could not send your message. Please try again later.' }, 500);
  }

  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_REGION || !env.SES_FROM || !env.CONTACT_TO) {
    console.error('contact: email env missing');
    return json(
      { ok: false, error: 'We saved your message but email is not configured yet. We will still see it.' },
      502
    );
  }

  const topicLabel = TOPIC_LABELS[topic] ?? topic;

  // Alert Sonia (reply-to the sender so she can respond directly).
  try {
    await sendEmail(env, {
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `New ${topicLabel} message from ${name}`,
      text: `Name: ${name}
Email: ${email}
Topic: ${topicLabel}

Message:
${message}`,
      html: `<h2>New contact message</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}<br />
<strong>Email:</strong> ${escapeHtml(email)}<br />
<strong>Topic:</strong> ${escapeHtml(topicLabel)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
    });
  } catch (err) {
    console.error('contact: SES alert failed', err);
    return json(
      { ok: false, error: 'We saved your message but the notification failed. We will still see it.' },
      502
    );
  }

  // Auto-acknowledge the sender (best effort).
  try {
    await sendEmail(env, {
      to: email,
      subject: 'Thanks for reaching out to Freedom with AI',
      text: `Hi ${name},

Thanks for your message. We read everything and will get back to you soon.

— Freedom with AI`,
      html: `<p>Hi ${escapeHtml(name)},</p>
<p>Thanks for your message. We read everything and will get back to you soon.</p>
<p>&mdash; Freedom with AI</p>`,
    });
  } catch {
    // Ignore: acknowledgement is non-critical.
  }

  return json({ ok: true, message: 'Thanks for your message. We will get back to you soon.' });
};
