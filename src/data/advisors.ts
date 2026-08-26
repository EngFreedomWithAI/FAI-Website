/**
 * Single source of truth for both advisors.
 *
 * Every public surface renders advisor information from here.
 *
 * Rule for editing: nothing goes in this file that cannot be said out loud in
 * a first meeting. No invented metrics, no client names without permission,
 * and no implied expertise in a rulebook we have not actually worked in.
 */

export interface Advisor {
  slug: 'sonia' | 'cammie';
  name: string;
  /** Shared role. Both advisors work across company strategy. */
  role: string;
  /** Additional perspective this advisor brings to the shared work. */
  strengths: string;
  /** One line, used in cards and as the page lede. */
  lede: string;
  /** The credential that earns the room, in one sentence. */
  credential: string;
  /** What a founder actually hires this person to work on. */
  works_on: string[];
  /** Longer bio, one paragraph per entry. */
  bio: string[];
  /** Short, checkable facts. Rendered as a list, not as marketing. */
  proof: string[];
  /**
   * Where the domain depth genuinely is, versus where the method travels.
   * Kept explicit so the copy never over-claims sector expertise.
   */
  depth: string;
  linkedIn: string;
}

export const advisors: Advisor[] = [
  {
    slug: 'sonia',
    name: 'Sonia Sarao',
    role: 'Strategic Advisor',
    strengths: 'Product, technology, growth and AI',
    lede: 'Advises founders on building and growing companies, with an operator\'s perspective on product, market, technology and AI.',
    credential:
      'A product and engineering operator for over a decade, Sonia led products and teams through growth and acquisition. She now builds faibuddy, a live AI-native product for founders.',
    works_on: [
      'Refining the problem, the target market and the business model',
      'Getting from an idea to product-market fit without burning the runway',
      'Customer segmentation, verticalization and new product lines',
      'Enterprise go-to-market: users, decision-makers, champions, buying committees',
      'AI and technology strategy, including what not to build',
      'Roadmap, cost and operating decisions under real constraints',
      'Preparing a company for diligence, and knowing what buyers actually examine',
    ],
    bio: [
      'Sonia spent more than a decade as a product and engineering executive. She was the first product hire at Fluxx, built its product and engineering organisation and rose to VP of Product and Engineering as recurring revenue grew roughly tenfold. She later led product at Groove, a sales engagement platform, through its acquisition by Clari.',
      'Her last two B2B SaaS companies sold into enterprises and were acquired. She has worked through long sales cycles, complex buying committees and three M&A diligence processes. Today she builds faibuddy and advises founders when product, market and technology decisions need to move together.',
    ],
    proof: [
      'VP of Product at Groove, through to its acquisition by Clari',
      'First product hire at Fluxx, later VP of Product and Engineering',
      'Built a product and engineering organisation of roughly 50 people',
      'Core participant in three M&A diligence processes',
      'Builds faibuddy, the firm\'s AI advisory product',
    ],
    depth:
      'Her current work combines hands-on AI product building with experience in enterprise products, complex buying decisions and growth.',
    linkedIn: 'https://www.linkedin.com/in/sonia-sarao/',
  },
  {
    slug: 'cammie',
    name: 'Cammie Clay',
    role: 'Strategic Advisor',
    strengths: 'Regulation, risk, governance and stakeholder strategy',
    lede: 'Advises founders on building and growing companies, with added perspective on regulation, risk, governance and stakeholder decisions.',
    credential:
      'She has been on both sides of financial regulation: a regulator at the New York Stock Exchange and FINRA, then a compliance executive at RS Investments and First Republic Bank.',
    works_on: [
      'Working out which rules actually bind this company, and which do not',
      'Translating regulatory requirements into product and operating decisions',
      'Building the compliance function before it becomes a crisis',
      'Risk and governance for companies entering a regulated market',
      'What acquirers, regulators and examiners will look at, and how to be ready',
      'Reading stakeholders and getting to what is actually true',
    ],
    bio: [
      'Cammie has worked on both sides of financial regulation. She spent years in enforcement and investigations at the New York Stock Exchange and FINRA, then became a compliance executive at RS Investments and First Republic Bank, where she was VP of Compliance in private wealth management. She holds a Series 7.',
      'Today she helps founders identify the requirements that apply to their companies, translate them into product and operating decisions and build the right controls early. She is also a seasoned trader and public markets investor who is helping lead the firm\'s exploration of private investing.',
    ],
    proof: [
      'Regulator at the New York Stock Exchange and FINRA',
      'Compliance executive at RS Investments',
      'VP of Compliance, private wealth management, at First Republic Bank',
      'Series 7',
      'Seasoned trader and public markets investor',
    ],
    depth:
      'Her current work brings regulatory, risk and governance thinking into company strategy, especially where trust and scrutiny shape the market.',
    linkedIn: 'https://www.linkedin.com/in/cammieclay/',
  },
];

export const advisorBySlug = (slug: Advisor['slug']): Advisor => {
  const found = advisors.find((a) => a.slug === slug);
  if (!found) throw new Error(`Unknown advisor: ${slug}`);
  return found;
};
