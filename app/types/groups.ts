import { Nullable } from './common';

export interface Group {
  id_group: number;
  id_year?: Nullable<number>;
  level?: Nullable<number>;
  sublevel?: Nullable<string>;
  representative?: Nullable<string>;
  working_time?: Nullable<string>;
  coursesCount?: Nullable<number>;
}

export interface CreateGroupDTO {
  id_year: number;
  level: number;
  sublevel: string;
  representative: string;
  working_time?: Nullable<string>;
}

export interface UpdateGroupDTO {
  id_group: number;
  id_year?: Nullable<number>;
  level?: Nullable<number>;
  sublevel?: Nullable<string>;
  representative?: Nullable<string>;
  working_time?: Nullable<string>;
}

export interface FilterGroupDTO {
  id_year?: Nullable<number>;
  level?: Nullable<number>;
  sublevel?: Nullable<string>;
  representative?: Nullable<string>;
  working_time?: Nullable<string>;
}
