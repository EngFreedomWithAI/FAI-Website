export type SessionFormat = 'office-hours' | 'workshop';

/**
 * draft  — not rendered in production. Visible on `npm run dev` so you can preview
 *          before the details are locked.
 * open   — live on the page, accepting signups.
 * full   — live on the page, signups closed, shown as full.
 * ended  — a series we no longer run. Moves to the list at the bottom.
 */
export type SessionStatus = 'draft' | 'open' | 'full' | 'ended';

export interface OfficeHoursSeries {
  /** URL-safe id. Stored on every signup, and how we segment by event. */
  slug: string;
  /**
   * The name of the recurring series, e.g. "Weekend Function()". NOT the name of a
   * single month's edition.
   *
   * DEVx sometimes themes an individual one ("Weekend Function(): Cloudflare Deploys").
   * Do not mirror that here. People are signing up for our office hours, not for the
   * talk, and a field that has to be re-edited every month is a field that goes stale
   * without anyone noticing.
   */
  event: string;
  /** Who runs it, if different from the event name. */
  host: string;
  /**
   * How often we are there, e.g. "Every month" or "One time".
   * Rendered as-is on the card, so write it the way you would say it.
   */
  cadence: string;
  /**
   * Confirmed dates, ISO YYYY-MM-DD. Order does not matter, they get sorted.
   *
   * Dates that have already passed are filtered out in the browser, so a stale
   * build never shows a date that has gone. Paste in a few months at a time and
   * top it up when you have the next batch.
   *
   * If this empties out the page keeps working: it says we are there every month,
   * signups stay open, and we confirm the date by email. Not the best experience,
   * but never a broken page.
   */
  dates: string[];
  /** When during the event, e.g. "Before and after the presenters". */
  when: string;
  /** Where, e.g. "San Diego, CA". */
  location: string;
  /** Room detail if we have it. Optional. */
  room?: string;
  /** 1:1 office hours or a group workshop. Drives the label on the card. */
  format: SessionFormat;
  /** Length of one session, e.g. "15 to 20 minutes". */
  duration: string;
  /**
   * Optional. A sentence on what this particular one is good for.
   * Leave it off a recurring series: the page already explains what office hours are,
   * and a blurb on every card just makes the list heavier to read.
   */
  blurb?: string;
  /** Optional link to the host's event page or calendar. */
  eventLink?: string;
  /** Label for that link. Defaults to "About the event". */
  eventLinkLabel?: string;
  status: SessionStatus;
}

/**
 * To add another event: copy the template below and it renders on /office-hours
 * automatically. No layout changes needed.
 *
 * A one-off is just a series with a single date and cadence: 'One time'.
 *
 * {
 *   slug: 'short-url-safe-id',
 *   event: 'Event or series name',
 *   host: 'Who runs it',
 *   cadence: 'Every month',
 *   dates: ['2026-09-12', '2026-10-10'],
 *   when: 'Before and after the presenters',
 *   location: 'San Diego, CA',
 *   room: 'The back conference room',   // optional
 *   format: 'office-hours',             // office-hours | workshop
 *   duration: '15 to 20 minutes',
 *   blurb: 'A sentence on what this one is good for.',
 *   eventLink: 'https://...',           // optional
 *   status: 'draft',                    // draft | open | full | ended
 * },
 */
export const officeHours: OfficeHoursSeries[] = [
  {
    slug: 'devx',
    event: 'Weekend Function()',
    host: 'San Diego DEVx',
    cadence: 'Third Saturday, every month',
    /**
     * Pulled from the DEVx Luma calendar (lu.ma/DEVxNetwork) on 2026-08-06.
     * The pattern is reliably the third Saturday, 12:00 to 4:00 PM PT, but these are
     * the four they have actually published rather than dates computed from the rule.
     * Top up from Luma when the list runs low. Past ones drop off on their own.
     */
    dates: ['2026-08-15', '2026-09-19', '2026-10-17', '2026-11-21'],
    when: 'Before and after the presenters',
    location: '1495 Pacific Hwy #300, San Diego',
    room: 'The conference room',
    format: 'office-hours',
    duration: '15 to 20 minutes',
    eventLink: 'https://lu.ma/DEVxNetwork',
    eventLinkLabel: 'DEVx calendar',
    status: 'open',
  },
];

export const formatSessionDate = (iso: string): string =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));

/** "Sat, October 10". Used where the day of the week is worth knowing. */
export const formatShortDate = (iso: string): string =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));

/** "October 10". Used in lists, where repeating the weekday turns into comma soup. */
export const formatCompactDate = (iso: string): string =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));

export const formatLabel: Record<SessionFormat, string> = {
  'office-hours': 'Office hours, one to one',
  workshop: 'Workshop, group',
};

export const sortedDates = (series: OfficeHoursSeries): string[] =>
  [...series.dates].sort((a, b) => a.localeCompare(b));
