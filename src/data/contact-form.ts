export interface SelectOption {
  value: string;
  label: string;
}

/** General contact reason: routes the inquiry. */
export const contactTopicOptions: SelectOption[] = [
  { value: 'investing', label: 'Investing, SPV or deal flow' },
  { value: 'speaking', label: 'Speaking or podcast invitation' },
  { value: 'partnership', label: 'Partnership or collaboration' },
  { value: 'general', label: 'General question' },
];
