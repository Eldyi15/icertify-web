type FieldType =
  | 'text'
  | 'select'
  | 'select_with_checkbox'
  | 'radio'
  | 'checkbox'
  | 'number'
  | 'percentage'
  | 'textarea'
  | 'pinmap'
  | 'autocomplete'
  | 'date'
  | 'chip-list'
  | 'form_array';

export interface Field {
  type: FieldType;
  colspan: { xs: number; sm: number; md: number; lg: number; xl: number };
  fcName: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  choices?: Array<any>;
  choiceLabel?: string;
  choiceValue?: string;
  checkBoxValue?: Array<any>;
  buttonIcon?: string;
  suffix?: string;
  prefix?: string;
  isPercentage?: boolean;
  hint?: string;
  isDisabled?: boolean;
  isVisible: boolean;
  visibleIf?: string;
  isOptional?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  range?: { startDate: Date; endDate: Date };
  geoLocation?: { long: string; lat: string };
  rowSpan?: number;
  dbPath?: string;
  dbCollection?: string;
  arrayFields?: Array<Field>;
  isEmail?: boolean
}

export interface Section {
  label?: string;
  name: string;
  isVisible: boolean;
  visibleIf?: string;
  dbCollection?: string;
  fields: Array<Field>;
  replacers?: string;
}
