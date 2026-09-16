/**
 * The firm's thesis. Single source of truth for the stack diagram, the
 * homepage thesis band and /thesis.
 *
 * Rule for editing: the macro view can be broad, the claim about our own
 * contribution stays narrow. We do not claim technical depth in silicon,
 * power or data centre engineering, and no line in this file should imply it.
 */

export type LayerIcon = 'cube' | 'nodes' | 'cloud' | 'chip' | 'bolt';

export interface StackLayer {
  name: string;
  /** Longer gloss. Used on /thesis, not in the diagram. */
  note: string;
  icon: LayerIcon;
}

/** Top to bottom, the way the stack is normally drawn. */
export const stackLayers: StackLayer[] = [
  {
    name: 'Applications & Embodied AI',
    note: 'Products at this layer are not limited to screens. They include software, scientific tools, robots, vehicles and other systems that can sense, decide and act.',
    icon: 'cube',
  },
  {
    name: 'Models',
    note: 'Models range from proprietary frontier systems to open-source and domain-specific alternatives. Their capability, cost, availability and deployment constraints shape what product teams can build.',
    icon: 'nodes',
  },
  {
    name: 'Infrastructure',
    note: 'Data centres, networking, cooling, orchestration, evaluation, security and deployment determine whether models can be used reliably and affordably at scale.',
    icon: 'cloud',
  },
  {
    name: 'Chips & Compute',
    note: 'Processors, memory, interconnects and access to supply shape performance, cost and who can compete.',
    icon: 'chip',
  },
  {
    name: 'Energy',
    note: 'Every workload consumes power and produces heat. Generation, transmission, siting and cooling affect where capacity can be built and how quickly it can grow.',
    icon: 'bolt',
  },
];

/** The overlay that runs alongside all five layers. Our part of the framework. */
export const companyBuildingLayer = {
  label: 'The company-building layer',
  path: ['Capability', 'Product', 'Market', 'Enduring business'],
  disciplines: [
    'Product',
    'Business model',
    'Go to market',
    'Partnerships',
    'Regulation',
    'Governance',
  ],
} as const;

/** The line the whole thesis rests on. */
export const thesisLine =
  'The technology changes by layer. The work of building a company repeats.';

export interface Participation {
  mode: 'Build' | 'Advise' | 'Invest';
  body: string;
  link?: { label: string; href: string; external?: boolean };
}

export const participation: Participation[] = [
  {
    mode: 'Build',
    body: 'We build faibuddy, our AI advisor for founders. Working on a live AI product grounds our view in product decisions, customer behaviour and the limits of current technology.',
    link: { label: 'faibuddy', href: 'https://faibuddy.com', external: true },
  },
  {
    mode: 'Advise',
    body: 'We advise founders on decisions that shape the company: which problem to pursue, what to build, who will buy, how to earn trust and where to focus.',
    link: { label: 'How advisory works', href: '/advisory' },
  },
  {
    mode: 'Invest',
    body: 'We are beginning to back a small number of founders with our own capital when we have conviction and can contribute beyond the investment.',
  },
];

export const participationLine =
  'Building gives us direct operating feedback. Advising exposes us to different markets and company stages. Investing extends that perspective over a longer horizon.';

/**
 * Kept deliberately entity-neutral while the investing structure is being
 * settled. Once it is decided (personally, through the LLC, or a separate
 * vehicle), add one plain sentence here naming it. Do not leave it ambiguous.
 */
export const investingBoundary =
  'Advisory and investing are separate decisions. Working with us does not require or promise an investment.';

export const attribution = {
  text: 'The five-layer stack builds on Jensen Huang’s framing of AI as infrastructure. The company-building layer reflects our own work with founders.',
  sourceLabel: 'NVIDIA on the five layers of AI',
  /** Compact one-line form for the home page, where the full note is too heavy. */
  shortLabel: 'Adapted from Jensen Huang’s five layers of AI',
  sourceHref: 'https://blogs.nvidia.com/blog/ai-5-layer-cake/',
} as const;
