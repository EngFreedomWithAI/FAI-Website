/**
 * State of AI: Investing, by Cammie Clay (October 2026).
 *
 * Every figure and source here is reproduced from Cammie's talk. Do not edit
 * a number without updating its source line, and do not add figures that
 * were not in the talk without a citation.
 */

export const meta = {
  title: 'State of AI: Investing',
  subtitle: 'Following the money from software to the real world, and what it means for you.',
  author: 'Cammie Clay',
  authorRole: 'Co-founder, Investing, Freedom with AI',
  date: 'October 2026',
  disclaimer: 'For discussion only. Not investment or career advice.',
};

export interface Audience {
  who: string;
  stake: string;
}

export const audiences: Audience[] = [
  { who: 'invests', stake: 'Your returns' },
  { who: 'builds a product or service', stake: 'Your funding and customers' },
  { who: 'is building a career', stake: 'Your next role' },
];

export interface CakeLayer {
  name: string;
  when: string;
  kind: 'Bits' | 'Atoms' | 'Bits drive atoms';
  note: string;
}

/** Top to bottom. */
export const cake: CakeLayer[] = [
  { name: 'Apps', when: 'Next', kind: 'Bits drive atoms', note: 'Robotaxis, robots, AI-designed drugs' },
  { name: 'Models', when: 'Now', kind: 'Bits', note: 'Frontier labs and software' },
  { name: 'Infrastructure', when: 'Now', kind: 'Atoms', note: 'Data centers: the AI factories' },
  { name: 'Chips', when: 'First', kind: 'Atoms', note: 'GPUs: whoever had them won' },
  { name: 'Energy', when: 'Always', kind: 'Atoms', note: 'Power: the constraint under it all' },
];

export const cakeSource = {
  label: 'Framework: Jensen Huang, NVIDIA blog, “AI is a five-layer cake” (Mar 2026)',
  href: 'https://blogs.nvidia.com/blog/ai-5-layer-cake/',
};

export interface Bar {
  label: string;
  value: number;
  display: string;
  /** Planned or estimated rather than reported. */
  estimate?: boolean;
}

export interface Chart {
  title: string;
  unit: string;
  bars: Bar[];
}

export const moneyCharts: Chart[] = [
  {
    title: 'Chips',
    unit: 'NVIDIA data center revenue, $B',
    bars: [
      { label: 'FY23', value: 15, display: '15' },
      { label: 'FY24', value: 48, display: '48' },
      { label: 'FY25', value: 115, display: '115' },
      { label: 'FY26', value: 194, display: '194' },
    ],
  },
  {
    title: 'Data centers',
    unit: 'Big Tech capex, $B',
    bars: [
      { label: '2022', value: 162, display: '162' },
      { label: '2025', value: 448, display: '448' },
      { label: '2026 plan', value: 835, display: '~835', estimate: true },
    ],
  },
  {
    title: 'Startups',
    unit: 'AI share of all venture dollars',
    bars: [
      { label: '2023', value: 18, display: '18%' },
      { label: '2024', value: 34, display: '34%' },
      { label: '2025', value: 50, display: '~50%', estimate: true },
      { label: "Q2 '26", value: 70, display: '70%+' },
    ],
  },
];

export const moneySources =
  'Sources: NVIDIA annual results (fiscal year ends late January); Epoch AI via Visual Capitalist; TMT Finance (2026 plan, incl. Oracle); Crunchbase.';

export interface Stat {
  figure: string;
  body: string;
}

export const softwareStats: Stat[] = [
  { figure: '$285B', body: 'wiped off software stocks in 48 hours after AI agents launched (Feb 2026)' },
  { figure: '30%', body: 'faster churn: AI apps lose paying subscribers quicker than other apps' },
  { figure: '2 months', body: 'for ChatGPT to reach 100M users. Uber took 70 months.' },
];

export const softwareSources =
  'Sources: SaaS Sentinel / Forbes (Feb 2026 selloff); RevenueCat State of Subscription Apps 2026; company data via Business Today.';

export const physicalChart: Chart = {
  title: 'Physical AI funding',
  unit: '$B',
  bars: [
    { label: '2022 to 2024, avg per year', value: 14, display: '$14B' },
    { label: '2025', value: 38, display: '$38B' },
    { label: 'H1 2026 only', value: 47, display: '$47B' },
  ],
};

export interface Bet {
  name: string;
  detail: string;
}

export const biggestBets: Bet[] = [
  { name: 'SpaceX + xAI', detail: 'IPO at $1.77T, raised $75B' },
  { name: 'Waymo', detail: '$16B raise at a $126B valuation' },
  { name: 'Anduril', detail: '$5B raise at a $61B valuation' },
  { name: 'Tesla', detail: 'Cybercab in production; Optimus line next' },
];

export const physicalSources =
  'Source: Crunchbase; physical AI = robotics, autonomous vehicles, aerospace, drones, industrial automation, sensors. Tesla Q2 2026 call.';

export interface Era {
  tag: 'Was' | 'Is' | 'Will be';
  when: string;
  name: string;
  body: string;
  vcs: string;
}

export const eras: Era[] = [
  {
    tag: 'Was',
    when: '2010s to 2024',
    name: 'Bits',
    body: 'Software eats the world: SaaS, apps, per-seat pricing.',
    vcs: 'Growth and seats',
  },
  {
    tag: 'Is',
    when: '2025 to 2026',
    name: 'Bits buy atoms',
    body: 'AI money pours into chips, data centers and power.',
    vcs: 'Revenue and retention, not demos',
  },
  {
    tag: 'Will be',
    when: '2027 and beyond',
    name: 'Bits drive atoms',
    body: 'AI goes IRL: robotaxis, robots, devices, AI-designed drugs.',
    vcs: 'A physical moat: hardware, real-world data, regulation',
  },
];

export const erasLine =
  'Software alone gets copied in months. Software plus the real world is hard to copy.';

export interface Curve {
  who: string;
  rising: string;
  fading: string;
  ask: string;
}

export const curves: Curve[] = [
  {
    who: 'Investors',
    rising: 'Power, infrastructure, physical AI',
    fading: 'Per-seat software',
    ask: 'Which layer is this on? Is money still arriving?',
  },
  {
    who: 'Builders',
    rising: 'Agents that do the work; AI in the real world',
    fading: 'Features the next model gives away',
    ask: 'Is money flowing here, from funders and customers?',
  },
  {
    who: 'Careers',
    rising: 'AI infrastructure, energy, robotics, AI in every industry',
    fading: 'Tasks AI now does for free',
    ask: 'Will this market be bigger in 3 years?',
  },
];

export const curvesLine = 'One question for all three: is the money flowing in, or out?';
