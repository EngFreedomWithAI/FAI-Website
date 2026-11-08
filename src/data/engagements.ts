/**
 * The advisory offer, led by executive AI advisory. Rendered on /advisory and
 * on the homepage. Product, growth and leadership experience sits underneath
 * as supporting strength rather than as separate service lines.
 */

export interface FocusArea {
  title: string;
  body: string;
}

export const focusAreas: FocusArea[] = [
  {
    title: 'AI strategy & executive leadership',
    body: 'Identify where AI can create business value, establish priorities and help leaders shape the organization and culture to support them.',
  },
  {
    title: 'AI adoption across functions',
    body: 'Help teams evaluate tools, improve workflows and build skills and systems that can evolve as AI advances.',
  },
  {
    title: 'Product & data strategy',
    body: 'Identify opportunities for AI in products and services, and how proprietary data can strengthen customer value and competitive advantage.',
  },
];

export const supportingExperience = {
  title: 'Experience across the business',
  body: [
    'Sonia’s advisory work draws on experience with product direction, customer discovery, new business lines, enterprise growth, global teams, fundraising and acquisition diligence.',
    'She also coaches founders and CEOs on executive leadership, organizational development and culture.',
  ],
} as const;

/**
 * The homepage proof strip. Each item must be checkable, and none may name a
 * client or portfolio company.
 */
export interface ProofPoint {
  figure: string;
  label: string;
}

export const proofPoints: ProofPoint[] = [
  { figure: '20+ years', label: 'in enterprise software and financial-market infrastructure' },
  { figure: 'Groove to Clari', label: 'product leadership through the acquisition' },
  { figure: 'NYSE and FINRA', label: 'inside the exchange and the regulator, behind our diligence' },
  { figure: '4 continents', label: 'of technical teams built and led' },
  { figure: 'Our own capital', label: 'invested in space and physical AI companies' },
];

/**
 * The moments that tend to trigger a call. Written as situations rather than
 * services, because that is how leaders describe them.
 */
export const inflectionPoints: string[] = [
  'AI is on the leadership agenda, and the priorities are not yet set',
  'Teams are trying AI tools, but the way work gets done has not changed',
  'Proprietary data could strengthen the product, and no one owns that decision',
  'A new product or business line needs direction and an owner',
  'The company is growing faster than its leadership structure',
  'An acquisition, partnership or raise is on the horizon, and the plan has to hold up to scrutiny',
];

/**
 * Anonymised engagement summaries. Every line here describes work actually
 * done. No client is named and no outcome is claimed that was not delivered.
 * Upgrade these to named case studies as clients give permission.
 */
export interface EngagementExample {
  sector: string;
  body: string;
}

export const engagementExamples: EngagementExample[] = [
  {
    sector: 'B2B software',
    body: 'A growth-stage B2B software company needed its enterprise segments, product strategy and AI direction to reinforce the same business model.',
  },
  {
    sector: 'FinTech',
    body: 'A FinTech company was shaping its product, target market and business model around the regulatory requirements that defined what the product could become.',
  },
  {
    sector: 'Life sciences',
    body: 'A life sciences company needed to align its target market, product and operating model with the compliance requirements affecting them.',
  },
];
