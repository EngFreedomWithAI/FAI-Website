/**
 * The firm's thesis. Single source of truth for the stack diagram, the
 * homepage thesis band and /thesis.
 *
 * Rule for editing: the macro view can be broad, the claim about our own
 * contribution stays narrow. We do not claim technical depth in silicon,
 * power or data centre engineering, and no line in this file should imply it.
 */

export type LayerIcon = 'bot' | 'nodes' | 'server' | 'cpu' | 'zap';

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
    note: 'Software, yes. Also robotics, autonomy, biology, manufacturing and machines that act in the world. This layer is far bigger than SaaS.',
    icon: 'bot',
  },
  {
    name: 'Models',
    note: 'The frontier labs, and everyone fine tuning, distilling and serving on top of them.',
    icon: 'nodes',
  },
  {
    name: 'Infrastructure',
    note: 'Data centres, networking, orchestration, evaluation, security. The plumbing that turns a model into something you can actually run a business on.',
    icon: 'server',
  },
  {
    name: 'Chips & Compute',
    note: 'The silicon, and the competition over who can get hold of it.',
    icon: 'cpu',
  },
  {
    name: 'Energy',
    note: 'The constraint underneath everything. Compute is a power problem before it is a chip problem.',
    icon: 'zap',
  },
];

/** The overlay that runs alongside all five layers. Our part of the framework. */
export const companyBuildingLayer = {
  label: 'The company building layer',
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
    body: 'We build faibuddy, our AI advisor for founders. Shipping with AI every week is what keeps us honest about what it can actually do.',
    link: { label: 'faibuddy', href: 'https://faibuddy.com', external: true },
  },
  {
    mode: 'Advise',
    body: 'We work with founders on the calls that do not have an obvious answer. Which problem to build around, who will actually buy, what not to build, and what has to be true before anyone trusts you with it.',
    link: { label: 'How advisory works', href: '/advisory' },
  },
  {
    mode: 'Invest',
    body: 'We are starting to back a small number of founders with our own capital, where we have conviction and can be useful beyond the money.',
  },
];

export const participationLine =
  'Building keeps us honest. Advising shows us the patterns. Investing puts us on the hook for the outcome.';

/**
 * Kept deliberately entity-neutral while the investing structure is being
 * settled. Once it is decided (personally, through the LLC, or a separate
 * vehicle), add one plain sentence here naming it. Do not leave it ambiguous.
 */
export const investingBoundary =
  'Advisory and investing are separate decisions. Working with us does not require or promise an investment.';

export const attribution = {
  text: 'The five layer framing is drawn from Jensen Huang’s description of AI infrastructure. The company building layer is ours.',
  sourceLabel: 'NVIDIA on the five layers of AI',
  sourceHref: 'https://blogs.nvidia.com/blog/ai-5-layer-cake/',
} as const;
