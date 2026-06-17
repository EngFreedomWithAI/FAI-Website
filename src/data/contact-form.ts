export interface SelectOption {
  value: string;
  label: string;
}

/** Advisory request qualifier: where the person is in their journey. */
export const advisoryStageOptions: SelectOption[] = [
  { value: 'inside', label: 'Planning my exit' },
  { value: 'just_left', label: 'Just left, finding my footing' },
  { value: 'building', label: 'Building, but stuck' },
  { value: 'traction', label: 'Have traction, need leverage' },
];

/** General contact reason: routes the inquiry. */
export const contactTopicOptions: SelectOption[] = [
  { value: 'general', label: 'General question' },
  { value: 'speaking', label: 'Speaking or podcast invitation' },
  { value: 'events', label: 'Events (questions or hosting)' },
  { value: 'partnership', label: 'Partnership or collaboration' },
];
