/**
 * The work, organised by the problem a founder actually has rather than by
 * industry. This is what keeps the firm industry-open without going vague:
 * an agtech, robotics, fintech or software founder can recognise their own
 * situation without needing to see their sector named.
 */

export interface WorkArea {
  title: string;
  body: string;
  items: string[];
}

export const workAreas: WorkArea[] = [
  {
    title: 'Finding the market',
    body: 'The problem is not sharp yet, or the market you named turns out not to be the one buying.',
    items: [
      'Refining the problem and who actually has it',
      'Competitive and market research',
      'Business model decisions',
      'The path to product-market fit',
      'Positioning and the company narrative',
    ],
  },
  {
    title: 'Building the product and the company',
    body: 'Deciding what to build, what to skip, and what the team and cost structure need to look like to get there.',
    items: [
      'Product and technology strategy',
      'AI strategy, and where it genuinely helps',
      'Roadmap, cost and runway decisions',
      'Team and operating structure',
      'New products and business lines',
    ],
  },
  {
    title: 'Reaching and expanding the market',
    body: 'You have something that works and now the growth has to come from somewhere specific.',
    items: [
      'Customer segmentation and verticalization',
      'Enterprise personas and buying committees',
      'Sales strategy and go-to-market motion',
      'Partnerships and expansion',
      'Pricing and packaging decisions',
    ],
  },
  {
    title: 'Navigating risk and regulation',
    body: 'Somebody is going to examine this company. Better to find out what they will look at before they look.',
    items: [
      'Working out which rules actually bind you',
      'Turning requirements into product and operating decisions',
      'Building the compliance function early',
      'Risk, governance and regulated-market entry',
      'Diligence and transaction readiness',
    ],
  },
];

/**
 * The moments that tend to trigger a call. Written as situations rather than
 * services, because that is how founders describe them.
 */
export const inflectionPoints: string[] = [
  'The product or business direction is no longer obvious',
  'Early traction has exposed a positioning or go-to-market problem',
  'Entering a regulated market is changing product and operating decisions',
  'AI could change the product or cost structure, but the advantage is not yet clear',
  'A raise, acquisition or diligence process is approaching',
  'The company has outgrown the instincts that got it here',
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
    sector: 'FinTech',
    body: 'An early-stage FinTech company was refining its problem, target market and business model while regulatory requirements were shaping what the product could become.',
  },
  {
    stage: 'Early stage',
    sector: 'Life Sciences',
    body: 'An early-stage life sciences company needed to align its target market and business model with the compliance requirements affecting the product and operating model.',
  },
  {
    stage: 'Growth stage',
    sector: 'Services',
    body: 'A growth-stage services business needed a more focused path to growth. The work covered customer segmentation, verticalization, a new product line and the sales strategy around it.',
  },
  {
    stage: 'Growth stage',
    sector: 'B2B software',
    body: 'A growth-stage B2B software company needed its enterprise segments, product strategy and AI direction to reinforce the same business model.',
  },
];
