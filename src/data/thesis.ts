/**
 * The firm's thesis. Single source of truth for the arc, the stack diagram,
 * the homepage thesis band and /thesis.
 *
 * Rule for editing: the macro view can be broad, the claim about our own
 * contribution stays narrow. We do not claim technical depth in aerospace,
 * silicon, power or data center engineering, and no line in this file should
 * imply it.
 */

export type LayerIcon = 'cube' | 'nodes' | 'cloud' | 'chip' | 'bolt';

export interface StackLayer {
  name: string;
  /** Longer gloss. Used on /thesis, not in the diagram. */
  note: string;
  /** Short space counterpart, shown beside the layer in the diagram. */
  space: string;
  /** Longer space gloss for /thesis. */
  spaceNote: string;
  icon: LayerIcon;
}

/** Top to bottom, the way the stack is normally drawn. */
export const stackLayers: StackLayer[] = [
  {
    name: 'Applications & Embodied AI',
    note: 'Products are no longer limited to screens. They include robots, vehicles, scientific tools and other systems that sense, decide and act.',
    space: 'Earth observation, comms, servicing',
    spaceNote: 'Imagery, connectivity, logistics and servicing in orbit: products whose customers are on the ground and whose hardware is not.',
    icon: 'cube',
  },
  {
    name: 'Models',
    note: 'Frontier, open-source and domain-specific models. Their capability, cost and deployment constraints shape what product teams can build.',
    space: 'Onboard autonomy, far from help',
    spaceNote: 'Spacecraft cannot wait for a round trip to Earth to make every decision. Autonomy and onboard analysis move from nice to have to necessary.',
    icon: 'nodes',
  },
  {
    name: 'Infrastructure',
    note: 'Data centers, networking, cooling, orchestration and security determine whether models run reliably and affordably at scale.',
    space: 'Ground stations, orbital compute',
    spaceNote: 'Downlinks, ground networks and compute in orbit decide how much data actually reaches a customer, and how fast.',
    icon: 'cloud',
  },
  {
    name: 'Chips & Compute',
    note: 'Processors, memory, interconnects and access to supply shape performance, cost and who can compete.',
    space: 'Radiation-tolerant edge inference',
    spaceNote: 'Compute has to survive radiation, heat and a tight power budget, and still run useful models at the edge.',
    icon: 'chip',
  },
  {
    name: 'Energy',
    note: 'Every workload consumes power and produces heat. Generation, siting and cooling affect where capacity can be built and how quickly it can grow.',
    space: 'Solar power, every watt budgeted',
    spaceNote: 'Power is the constraint under everything on Earth. In orbit it is literally finite, and every subsystem competes for it.',
    icon: 'bolt',
  },
];

/** The overlay that runs alongside all five layers. Our part of the framework. */
export const companyBuildingLayer = {
  label: 'The company-building layer',
  path: ['Capability', 'Product', 'Market', 'Enduring business'],
} as const;

/** The line the whole thesis rests on. */
export const thesisLine = 'Space is the whole AI stack, under its hardest constraints.';

/**
 * Where the money has moved, and where it goes next. Adapted from Cammie's
 * State of AI: Investing talk, with space added as the step we focus on.
 */
export interface ArcStep {
  when: string;
  name: string;
  body: string;
  /** What investors reward at this step. */
  rewards: string;
  focus?: boolean;
}

export const arc: ArcStep[] = [
  {
    when: '2010s to 2024',
    name: 'Bits',
    body: 'Software eats the world: SaaS, apps and per-seat pricing.',
    rewards: 'Growth and seats',
  },
  {
    when: '2025 to 2026',
    name: 'Bits buy atoms',
    body: 'AI money pours into chips, data centers and power.',
    rewards: 'Revenue and retention, not demos',
  },
  {
    when: '2027 and beyond',
    name: 'Bits drive atoms',
    body: 'AI goes into the real world: robotaxis, robots, devices, AI-designed drugs.',
    rewards: 'A physical moat: hardware, real-world data, regulation',
  },
  {
    when: 'Our focus',
    name: 'Space',
    body: 'Power, compute, bandwidth and distance, all pushed to their limits.',
    rewards: 'Technology that works, and a team that can sell it',
    focus: true,
  },
];

export const arcLine =
  'Software alone gets copied in months. Software plus the real world is hard to copy. Space is the hardest real world there is.';

export interface Participation {
  mode: 'Build' | 'Advise' | 'Invest';
  /** Who leads this side of the firm, if anyone in particular. */
  lead?: string;
  body: string;
  link?: { label: string; href: string; external?: boolean };
}

export const participation: Participation[] = [
  {
    mode: 'Advise',
    lead: 'Sonia Sarao',
    body: 'Hands-on advisory for space and deep-tech founders turning a working technology into a business: who buys it, what to build next, how to sell it and how to raise.',
    link: { label: 'How advisory works', href: '/advisory' },
  },
  {
    mode: 'Invest',
    lead: 'Cammie Clay',
    body: 'We invest our own capital in early-stage space companies, and in physical AI where it meets space, when we have conviction and can help beyond the check.',
    link: { label: 'How we invest', href: '/investing' },
  },
  {
    mode: 'Build',
    body: 'We build our own products for entrepreneurs, starting with faibuddy, and AI agents that run new products end to end. Building keeps our advice grounded in what actually works.',
    link: { label: 'faibuddy', href: 'https://faibuddy.com', external: true },
  },
];

/** What we look for in an investment. Rendered on /investing. */
export const investCriteria: string[] = [
  'Technology that works, or is close, with a clear path to a paying customer',
  'Technical founders who want a partner on the business side',
  'Markets where software, data and AI compound a hardware advantage',
  'A round where we can be useful beyond the capital',
];

export const investingBoundary =
  'Advisory and investing are separate decisions. Working with us does not require or promise an investment.';

export const attribution = {
  text: 'The five-layer stack builds on Jensen Huang’s framing of AI as infrastructure. The space mapping and the company-building layer are our own.',
  sourceLabel: 'NVIDIA on the five layers of AI',
  /** Compact one-line form for the home page, where the full note is too heavy. */
  shortLabel: 'Adapted from Jensen Huang’s five layers of AI',
  sourceHref: 'https://blogs.nvidia.com/blog/ai-5-layer-cake/',
} as const;

/** Long-form pieces listed on /thesis. */
export interface ThesisPiece {
  href: string;
  title: string;
  author: string;
  date: string;
  summary: string;
}

export const thesisPieces: ThesisPiece[] = [
  {
    href: '/thesis/state-of-ai-investing',
    title: 'State of AI: Investing',
    author: 'Cammie Clay',
    date: 'October 2026',
    summary:
      'Following the money from software to the real world: the five-layer cake, the biggest buildout in history, and what it means for investors, builders and careers.',
  },
];
