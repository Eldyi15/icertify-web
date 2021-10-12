export interface TableOutput {
  pageSize: number;
  length?: number;
  pageIndex: number;
  previousPageIndex?: number;
  sort?: {
    active: string;
    direction: 'asc' | 'desc';
  };
  filter?: {
    value: string | number | boolean;
    fields: Array<string>;
  };
}
