interface Find {
  field: string;
  operator: string;
  value: string | number | boolean;
}

interface Populate {
  field: string;
  select?: string;
}

export interface QueryParams {
  limit?: string;
  sort?: string;
  fields?: string;
  page?: number;
  find: Array<Find>;
  populates?: Array<Populate>;
  filter?: {
    value: string | boolean | number;
    fields: Array<string>;
  };
}
export interface PatchBodyQuery {
  query: object;
  data: object;
}
