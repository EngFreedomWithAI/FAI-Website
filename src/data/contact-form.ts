export interface SelectOption {
  value: string;
  label: string;
}

/** General contact reason: routes the inquiry. */
export const contactTopicOptions: SelectOption[] = [
  { value: 'investing', label: 'Investing, co-investing or an introduction' },
  { value: 'speaking', label: 'Speaking or podcast invitation' },
  { value: 'partnership', label: 'Partnership or collaboration' },
  { value: 'general', label: 'General question' },
];

/** Advisory intake: company stage. */
export const advisoryStageOptions: SelectOption[] = [
  { value: 'pre-seed', label: 'Idea or pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b-plus', label: 'Series B or later' },
  { value: 'established', label: 'Established company' },
];

/** Advisory intake: what the founder is working through. Mirrors the work areas. */
export const advisoryFocusOptions: SelectOption[] = [
  { value: 'market', label: 'First customers and the market' },
  { value: 'product', label: 'Product and company building' },
  { value: 'gtm', label: 'Go-to-market and sales' },
  { value: 'raise', label: 'Fundraising narrative or diligence' },
  { value: 'other', label: 'Something else' },
];
