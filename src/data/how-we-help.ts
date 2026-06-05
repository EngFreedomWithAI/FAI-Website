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
    tag: 'Advisory, selective',
    title: 'Work with us',
    body: 'Senior advisory for corporate professionals becoming AI entrepreneurs, whether you are planning your exit, finding your footing, or pushing through the early stage of building. A small number of engagements, each shaped around you.',
    ctaLabel: 'Request an engagement',
    ctaHref: '/advisory',
  },
  {
    tag: 'Content, field notes and videos as we learn',
    title: 'Content that keeps you ahead',
    body: '',
    ctaLabel: 'Watch and read',
    ctaHref: '/watch',
  },
];
