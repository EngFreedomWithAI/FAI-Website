export interface HelpDoor {
  tag: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export const howWeHelpDoors: HelpDoor[] = [
  {
    tag: 'Product, start today',
    title: 'Use faibuddy',
    body: 'An AI advisor that keeps you on the shortest path to paying customers. Honest feedback, in your corner, without the flattery.',
    ctaLabel: 'Try it free',
    ctaHref: 'https://faibuddy.com',
  },
  {
    tag: 'High-touch 1:1 advisory',
    title: 'Work with us',
    body: 'Get strategic guidance, practical tools, and accountability as you build. We work closely with a small number of clients, so you never have to figure out what comes next alone.',
    ctaLabel: 'Request an engagement',
    ctaHref: '/advisory',
  },
];
