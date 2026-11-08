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
  { value: 'early-stage', label: 'Early stage' },
  { value: 'growth-stage', label: 'Growth stage' },
  { value: 'established', label: 'Established company' },
  { value: 'enterprise', label: 'Enterprise or public company' },
];

/** Advisory intake: what the company is working through. Mirrors the focus areas. */
export const advisoryFocusOptions: SelectOption[] = [
  { value: 'ai-strategy', label: 'AI strategy and executive leadership' },
  { value: 'ai-adoption', label: 'AI adoption across functions' },
  { value: 'product-data', label: 'Product and data strategy' },
  { value: 'growth', label: 'Growth, fundraising or diligence' },
  { value: 'other', label: 'Something else' },
];
