export interface ContactStageOption {
  value: string;
  label: string;
}

export const contactStageOptions: ContactStageOption[] = [
  { value: 'inside', label: 'Still inside, planning my move' },
  { value: 'just_left', label: 'Just left, finding my footing' },
  { value: 'building', label: 'Building, but stuck' },
  { value: 'exploring', label: 'Just exploring' },
];
