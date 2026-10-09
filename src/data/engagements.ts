/**
 * The advisory work, organised by the problem a founder actually has. Space
 * leads because it is the focus, but the problems are written so a physical
 * AI, deep-tech or B2B founder can still recognise their own situation.
 */

export interface WorkArea {
  title: string;
  body: string;
  items: string[];
}

export const workAreas: WorkArea[] = [
  {
    title: 'Finding the market',
    body: 'The technology works. The open question is who needs it badly enough to pay, and when.',
    items: [
      'Commercial, civil government or defense: which customer first',
      'Mapping the capability to concrete customer problems',
      'Market and competitive research',
      'Business model and pricing on long timelines',
      'Positioning and the company narrative',
    ],
  },
  {
    title: 'Building the product and the company',
    body: 'Turning a core capability into a product, and deciding what the team and cost structure need to look like.',
    items: [
      'Product strategy built around a core technology',
      'The software, data and AI layer around the hardware',
      'Roadmap, cost and runway decisions',
      'Team and operating structure, including distributed teams',
      'New products and business lines',
    ],
  },
  {
    title: 'Selling into complex buyers',
    body: 'Enterprise and government customers buy through committees. Someone has to map who decides, who blocks and who champions.',
    items: [
      'Buying committees, champions and decision-makers',
      'Go-to-market motion and sales strategy',
      'Partnerships, primes and channels',
      'Customer segmentation and verticalization',
      'Pricing and packaging decisions',
    ],
  },
  {
    title: 'Raising and diligence',
    body: 'A raise, partnership or acquisition is coming, and the story has to hold up under scrutiny.',
    items: [
      'A fundraising narrative for investors new to the sector',
      'Series A and B preparation',
      'What investors and acquirers examine in diligence',
      'Regulatory and risk questions that shape the plan',
      'Transaction readiness',
    ],
  },
];

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
  { figure: 'NYSE and FINRA', label: 'regulator experience behind our diligence' },
  { figure: '4 continents', label: 'of technical teams built and led' },
  { figure: 'Our own capital', label: 'invested in the space companies we back' },
];

/**
 * The moments that tend to trigger a call. Written as situations rather than
 * services, because that is how founders describe them.
 */
export const inflectionPoints: string[] = [
  'The technology works, but the first commercial customer has not signed',
  'Government or commercial first, and the answer changes the whole roadmap',
  'Engineers understand the capability. Buyers do not yet',
  'Investors outside the sector do not understand the market',
  'Sales run through buying committees, primes and procurement',
  'A raise, partnership or acquisition is approaching and the story is not ready',
];

/**
 * Anonymised engagement summaries. Every line here describes work actually
 * done. No client is named and no outcome is claimed that was not delivered.
 * Upgrade these to named case studies as clients give permission.
 */
export interface EngagementExample {
  stage: 'Early stage' | 'Growth stage';
  sector: string;
  body: string;
}

export const engagementExamples: EngagementExample[] = [
  {
    stage: 'Early stage',
    sector: 'Space',
    body: 'An early-stage space company is connecting its technical capabilities to customer needs and commercial opportunities. We advise the founders and are investors in the company.',
  },
  {
    stage: 'Early stage',
    sector: 'FinTech',
    body: 'An early-stage FinTech company was refining its problem, target market and business model while regulatory requirements were shaping what the product could become.',
  },
  {
    stage: 'Growth stage',
    sector: 'B2B software',
    body: 'A growth-stage B2B software company needed its enterprise segments, product strategy and AI direction to reinforce the same business model.',
  },
  {
    stage: 'Early stage',
    sector: 'Life Sciences',
    body: 'An early-stage life sciences company needed to align its target market and business model with the compliance requirements affecting the product and operating model.',
  },
];
