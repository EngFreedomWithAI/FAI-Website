export type AudienceIcon = 'buildings' | 'door-open' | 'mountain';

export interface AudienceCard {
  icon: AudienceIcon;
  title: string;
  body: string;
}

export const isThisYouCards: AudienceCard[] = [
  {
    icon: 'buildings',
    title: 'Still inside, planning your move',
    body: 'You are in a corporate role and you can feel where tech is going. You want to use AI to build something of your own before you leave.',
  },
  {
    icon: 'door-open',
    title: 'Just left, finding your footing',
    body: 'You made the leap. Now you want it to become a business that actually pays you, without guessing your way through it.',
  },
  {
    icon: 'mountain',
    title: 'Building, but stuck',
    body: 'You started, and you have hit the wall every founder hits. You want a sharper path and an honest second brain in your corner.',
  },
];
