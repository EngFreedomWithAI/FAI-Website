export type EventRole = 'Hosted' | 'Co-hosted' | 'Spoke' | 'Attended';

export interface FaiEvent {
  /** Event name as it should display. */
  name: string;
  /** ISO date, YYYY-MM-DD. Used for sorting and the displayed date. */
  date: string;
  /** Optional time, e.g. "6:00 PM PT". Leave out if not relevant. */
  time?: string;
  /** Optional location, e.g. "San Diego, CA" or "Online". */
  location?: string;
  /** How we took part. */
  role: EventRole;
  /** A short recap or summary. A few sentences is plenty. */
  summary: string;
  /** Optional outbound link (event page, recap, photos, video). */
  link?: string;
  /** Optional label for the link. Defaults to "Read the recap". */
  linkLabel?: string;
}

/**
 * To add an event: copy the template below, fill it in, and it renders on /events
 * automatically (newest first). No layout changes needed.
 *
 * {
 *   name: 'Event name',
 *   date: '2026-06-03',
 *   time: '6:00 PM PT',          // optional
 *   location: 'San Diego, CA',   // optional
 *   role: 'Attended',            // Hosted | Co-hosted | Spoke | Attended
 *   summary: 'A few sentences on what it was and what we took from it.',
 *   link: 'https://...',         // optional
 *   linkLabel: 'Read the recap', // optional
 * },
 */
export const events: FaiEvent[] = [
  {
    name: 'San Diego AI Showcase #5 (North County)',
    date: '2026-06-03',
    time: '6:00 to 8:30 PM PT',
    location: 'LVLUP USA, Vista, CA',
    role: 'Co-hosted',
    summary:
      'The fifth San Diego AI Showcase, a Homebrew-style night for founders building with AI to demo their work before it is perfect. This edition centered on the distribution of AI products, the exact lessons we are living as we build and launch faibuddy.',
    link: 'https://eventship.com/event/san-diego-ai-showcase-5-north-county-june-2026',
    linkLabel: 'Event details',
  },
];
