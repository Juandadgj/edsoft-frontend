import { Nullable } from './common';

export interface ScholarYear {
  id_year: number;
  rector?: Nullable<string>;
  secretary?: Nullable<string>;
  comment?: Nullable<string>;
}

export interface CreateScholarYearDTO {
  id_year: number;
  rector: string;
  secretary: string;
  comment?: Nullable<string>;
}

export interface UpdateScholarYearDTO {
  id_year: number;
  rector?: Nullable<string>;
  secretary?: Nullable<string>;
  comment?: Nullable<string>;
}
