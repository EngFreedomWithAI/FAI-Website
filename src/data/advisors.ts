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
  /** Short profile under the lede on the homepage, one paragraph per entry. */
  summary: string[];
  /** The credential that earns the room, in one sentence. */
  credential: string;
  /** What a client actually works with this person on. */
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
    role: 'Co-Founder & Executive Advisor',
    strengths: 'AI strategy, product, executive leadership and growth',
    lede: 'Advises founders, CEOs and leadership teams on AI, product and technology strategy, executive leadership and growth.',
    summary: [
      'Former VP of Product at Groove and VP of Product & Engineering at Fluxx, with earlier leadership experience at NYSE. Sonia brings experience building global teams, winning enterprise customers alongside Sales, developing new products, fundraising and acquisition diligence.',
      'She built and launched faibuddy.com, an AI-native advisory product for entrepreneurs.',
    ],
    credential:
      '20+ years in enterprise software and financial-market infrastructure. Former VP of Product at Groove, through its acquisition by Clari, and VP of Product and Engineering at Fluxx.',
    works_on: [
      'Where AI can create business value, and which priorities come first',
      'Shaping the organization and culture to support those priorities',
      'Evaluating AI tools and improving workflows across functions',
      'AI opportunities in products and services',
      'Using proprietary data to strengthen customer value and competitive advantage',
      'Executive leadership, organizational development and culture',
    ],
    bio: [
      'Sonia has spent more than 20 years in enterprise software and financial-market infrastructure, including a decade at NYSE. She was the first product hire at Fluxx and rose to VP of Product and Engineering as recurring revenue grew roughly tenfold, then became VP of Product at Groove. Along the way she helped win multimillion-dollar enterprise deals alongside Sales, developed new products and business lines, and supported Series A and B fundraising. She worked through diligence on three potential transactions at Fluxx, and led product at Groove through its completed acquisition by Clari.',
      'She has built and led technical teams across the US, India, Kenya, Canada and Europe, and holds degrees in computer science and software engineering. Today she leads the firm\'s executive advisory work and builds its AI products. She built and launched faibuddy.com, an AI-native advisory product for entrepreneurs.',
      'Her strength is translation: between engineers, customers, executives and investors. She works from first principles to find the underlying problem and how the parts of a business fit together.',
    ],
    proof: [
      '20+ years in enterprise software and financial-market infrastructure',
      'A decade at NYSE',
      'VP of Product at Groove, through its acquisition by Clari',
      'First product hire at Fluxx, later VP of Product and Engineering',
      'Diligence on three potential transactions at Fluxx',
      'Supported Series A and B fundraising',
      'Built and launched faibuddy.com, an AI-native advisory product',
      'Built and led technical teams across the US, India, Kenya, Canada and Europe',
      'Degrees in computer science and software engineering',
    ],
    depth:
      'Her depth is in software, product, AI and executive leadership, not aerospace engineering.',
    linkedIn: 'https://www.linkedin.com/in/sonia-sarao/',
  },
  {
    slug: 'cammie',
    name: 'Cammie Clay',
    leads: 'invest',
    role: 'Co-Founder, Investing',
    strengths: 'Investing, diligence, risk and governance',
    lede: 'Leads the firm\'s investing, with a trader\'s read on where capital is moving and a regulator\'s eye for diligence.',
    summary: [
      'A seasoned trader and public markets investor, she spent years in enforcement and investigations at the New York Stock Exchange and FINRA before becoming a compliance executive at RS Investments and First Republic Bank, Private Wealth Management.',
    ],
    credential:
      'A seasoned trader and public markets investor, she spent years in enforcement and investigations at the New York Stock Exchange and FINRA before becoming a compliance executive at RS Investments and First Republic Bank, Private Wealth Management.',
    works_on: [
      'Where capital is moving across AI, physical AI and space',
      'Diligence: what will be examined, and what could break',
      'Risk and governance that hold up as a company scales',
      'Reading stakeholders and getting to what is actually true',
    ],
    bio: [
      'Cammie leads investing at Freedom with AI. She is a seasoned trader and public markets investor who follows where capital is moving across AI and the physical economy. Her talk, State of AI: Investing, traces that money from software into chips, data centers, power and now the real world.',
      'Before investing, she worked on both sides of financial regulation: enforcement and investigations at the New York Stock Exchange and FINRA, then compliance leadership at RS Investments and First Republic Bank, Private Wealth Management, where she was VP of Compliance. She holds a Series 7.',
      'That background shapes how she looks at a company: what an examiner, acquirer or investor will scrutinize, where the risk sits, and whether the governance will hold as the company grows.',
    ],
    proof: [
      'Seasoned trader and public markets investor',
      'Regulator at the New York Stock Exchange and FINRA',
      'Compliance executive at RS Investments',
      'VP of Compliance at First Republic Bank, Private Wealth Management',
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
