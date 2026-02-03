import { Nullable } from './common';

export interface Definitives {
  id_cour_stu: number;
  id_course?: Nullable<number>;
  id_student?: Nullable<number>;
  score1?: Nullable<string>;
  score2?: Nullable<string>;
  score3?: Nullable<string>;
  score4?: Nullable<string>;
  score5?: Nullable<string>;
}

export interface UpdateDefinitivesDTO {
  id_cour_stu: number;
  score1?: Nullable<string>;
  score2?: Nullable<string>;
  score3?: Nullable<string>;
  score4?: Nullable<string>;
  score5?: Nullable<string>;
}

export interface FilterDefinitivesDTO {
  id_course?: Nullable<number>;
  id_student?: Nullable<number>;
  score1?: Nullable<string>;
  score2?: Nullable<string>;
  score3?: Nullable<string>;
  score4?: Nullable<string>;
  score5?: Nullable<string>;
}
