export interface SelectOption {
  value: string;
  label: string;
}

/** Company stage, used to route the advisory inquiry. */
export const advisoryStageOptions: SelectOption[] = [
  { value: 'pre_product', label: 'Pre-product, building toward a first release' },
  { value: 'early_revenue', label: 'Early revenue, still finding the fit' },
  { value: 'scaling', label: 'Growing, working on go-to-market' },
  { value: 'new_stage', label: 'Established, entering a new market or stage' },
];

/** General contact reason: routes the inquiry. */
export const contactTopicOptions: SelectOption[] = [
  { value: 'investing', label: 'Investing, SPV or deal flow' },
  { value: 'speaking', label: 'Speaking or podcast invitation' },
  { value: 'partnership', label: 'Partnership or collaboration' },
  { value: 'general', label: 'General question' },
];
