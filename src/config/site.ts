export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export const site = {
  brand: 'Freedom with AI',

  /** One line, used in the footer, the default title and the Organization schema. */
  mission: 'Build. Advise. Invest.',

  /** Longer positioning line for meta descriptions and og:description. */
  summary:
    'Freedom with AI helps founders, CEOs and leadership teams in space, defense and complex technology businesses build AI capability from within. Sonia Sarao leads executive advisory on AI strategy, adoption and company growth. Cammie Clay leads our investing in space and physical AI companies.',

  nav: [
    { label: 'Advisory', href: '/advisory' },
    { label: 'Investing', href: '/investing' },
    { label: 'Thesis', href: '/thesis' },
  ] satisfies NavItem[],

  /** Primary action in the header and hero. */
  cta: { label: 'Start a conversation', href: '/advisory#start' },

  faibuddyUrl: 'https://faibuddy.com',

  socials: {
    x: 'https://x.com/FreedomWithAI',
  },

  profiles: {
    soniaLinkedIn: 'https://www.linkedin.com/in/sonia-sarao/',
    cammieLinkedIn: 'https://www.linkedin.com/in/cammieclay/',
  },

  teamPhotos: {
    sonia: '/images/team/sonia.jpg',
    cammie: '/images/team/cammie.jpg',
  },

  footerExplore: [
    { label: 'Advisory', href: '/advisory' },
    { label: 'Investing', href: '/investing' },
    { label: 'Thesis', href: '/thesis' },
    { label: 'State of AI: Investing', href: '/thesis/state-of-ai-investing' },
  ] satisfies NavItem[],

  footerProduct: [
    { label: 'faibuddy', href: 'https://faibuddy.com', external: true },
  ] satisfies FooterLink[],

  footerConnect: [
    {
      label: 'Sonia on LinkedIn',
      href: 'https://www.linkedin.com/in/sonia-sarao/',
      external: true,
    },
    {
      label: 'Cammie on LinkedIn',
      href: 'https://www.linkedin.com/in/cammieclay/',
      external: true,
    },
    {
      label: 'X @FreedomWithAI',
      href: 'https://x.com/FreedomWithAI',
      external: true,
    },
    { label: 'Contact', href: '/contact' },
  ] satisfies FooterLink[],

  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ] satisfies NavItem[],
} as const;

export type SiteConfig = typeof site;
