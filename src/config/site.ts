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
  mission: 'Helping corporate professionals succeed as AI entrepreneurs.',
  nav: [
    { label: 'Advisory', href: '/advisory' },
    { label: 'Watch', href: '/watch' },
    { label: 'Events', href: '/events' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] satisfies NavItem[],
  faibuddyUrl: 'https://faibuddy.com',
  socials: {
    youtube: 'https://youtube.com/@FreedomWith-AI',
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
    { label: 'Watch', href: '/watch' },
    { label: 'Events', href: '/events' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] satisfies NavItem[],
  footerProduct: [
    { label: 'faibuddy', href: 'https://faibuddy.com', external: true },
  ] satisfies FooterLink[],
  footerConnect: [
    {
      label: 'YouTube @FreedomWith-AI',
      href: 'https://youtube.com/@FreedomWith-AI',
      external: true,
    },
    { label: 'X @FreedomWithAI', href: 'https://x.com/FreedomWithAI', external: true },
    { label: 'Contact', href: '/contact' },
  ] satisfies FooterLink[],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ] satisfies NavItem[],
} as const;

export type SiteConfig = typeof site;
