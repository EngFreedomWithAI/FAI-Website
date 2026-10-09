/**
 * Single source of truth for both partners.
 *
 * Every public surface renders partner information from here.
 *
 * Rule for editing: nothing goes in this file that cannot be said out loud in
 * a first meeting. No invented metrics, no client or portfolio names without
 * permission, and no implied expertise in a rulebook we have not actually
 * worked in. Neither partner claims aerospace engineering expertise.
 */

export interface Advisor {
  slug: 'sonia' | 'cammie';
  name: string;
  /** Which side of the firm this partner leads. */
  leads: 'advise' | 'invest';
  role: string;
  /** Short uppercase strengths line. */
  strengths: string;
  /** One line, used in cards and as the page lede. */
  lede: string;
  /** The credential that earns the room, in one sentence. */
  credential: string;
  /** What a founder actually works with this person on. */
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
    leads: 'advise',
    role: 'Co-founder, Advisory',
    strengths: 'Commercialization, product, go-to-market and fundraising',
    lede: 'Advises space and deep-tech founders on turning a working technology into a business: who buys it, what to build, how to sell it and how to raise.',
    credential:
      '20+ years in enterprise software and financial-market infrastructure. She helped win multimillion-dollar enterprise deals at Fluxx and Groove, and led product at Groove through its acquisition by Clari.',
    works_on: [
      'Connecting a technical capability to a customer who will pay for it',
      'Choosing between commercial, civil government and defense customers',
      'Product strategy built around a core technology',
      'Selling to buying committees, primes and enterprise procurement',
      'Fundraising narratives for investors who are new to the sector',
      'Preparing for diligence, and knowing what buyers and investors examine',
    ],
    bio: [
      'Sonia has spent more than 20 years in enterprise software and financial-market infrastructure. She was the first product hire at Fluxx and rose to VP of Product and Engineering as recurring revenue grew roughly tenfold, then led product at Groove through its acquisition by Clari. Along the way she helped win multimillion-dollar enterprise deals, developed new product lines and vertical strategies, and supported Series A and B fundraising and acquisition diligence.',
      'She has built and led technical teams across India, Kenya, Canada and Europe, and holds degrees in computer science and software engineering. Today she leads the firm\'s advisory work, with a focus on space, and builds the firm\'s own products.',
      'Her strength is translation: between engineers, customers, executives and investors. She works from first principles to find the underlying problem and how the parts of a business fit together.',
    ],
    proof: [
      '20+ years in enterprise software and financial-market infrastructure',
      'VP of Product at Groove, through its acquisition by Clari',
      'First product hire at Fluxx, later VP of Product and Engineering',
      'Supported Series A and B fundraising and three M&A diligence processes',
      'Built and led technical teams across India, Kenya, Canada and Europe',
      'Degrees in computer science and software engineering',
    ],
    depth:
      'She brings software, product and commercial experience to space companies, not aerospace engineering. You know the physics. She helps with who buys it and how.',
    linkedIn: 'https://www.linkedin.com/in/sonia-sarao/',
  },
  {
    slug: 'cammie',
    name: 'Cammie Clay',
    leads: 'invest',
    role: 'Co-founder, Investing',
    strengths: 'Investing, diligence, risk and governance',
    lede: 'Leads the firm\'s investing, with a trader\'s read on where capital is moving and a regulator\'s eye for diligence.',
    credential:
      'A seasoned trader and public markets investor, she spent years in enforcement and investigations at the New York Stock Exchange and FINRA before becoming a compliance executive at RS Investments and First Republic Bank.',
    works_on: [
      'Where capital is moving across AI, physical AI and space',
      'Diligence: what will be examined, and what could break',
      'Risk and governance that hold up as a company scales',
      'Reading stakeholders and getting to what is actually true',
    ],
    bio: [
      'Cammie leads investing at Freedom with AI. She is a seasoned trader and public markets investor who follows where capital is moving across AI and the physical economy. Her talk, State of AI: Investing, traces that money from software into chips, data centers, power and now the real world.',
      'Before investing, she worked on both sides of financial regulation: enforcement and investigations at the New York Stock Exchange and FINRA, then compliance leadership at RS Investments and First Republic Bank, where she was VP of Compliance in private wealth management. She holds a Series 7.',
      'That background shapes how she looks at a company: what an examiner, acquirer or investor will scrutinize, where the risk sits, and whether the governance will hold as the company grows.',
    ],
    proof: [
      'Seasoned trader and public markets investor',
      'Regulator at the New York Stock Exchange and FINRA',
      'Compliance executive at RS Investments',
      'VP of Compliance, private wealth management, at First Republic Bank',
      'Series 7',
    ],
    depth:
      'Her regulatory background is in financial markets. In space she brings a diligence, risk and governance lens rather than sector-specific licensing expertise.',
    linkedIn: 'https://www.linkedin.com/in/cammieclay/',
  },
];

export const advisorBySlug = (slug: Advisor['slug']): Advisor => {
  const found = advisors.find((a) => a.slug === slug);
  if (!found) throw new Error(`Unknown advisor: ${slug}`);
  return found;
};
