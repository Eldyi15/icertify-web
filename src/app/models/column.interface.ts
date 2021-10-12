export interface Column {
  title: string;
  breakpoint: Breakpoint;
  path: string;
  type: ColumnType;
  selected: Boolean;
  referencePath?: string;
  alternativePath?: string;
}

type Breakpoint = 'xs' | 'sm' | 'lg' | 'xl' | 'md';
type ColumnType =
  | 'date'
  | 'text'
  | 'number'
  | 'percentage'
  | 'array'
  | 'special';
