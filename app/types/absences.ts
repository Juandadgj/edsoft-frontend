import { Nullable } from './common';

export interface Absence {
  id_absence: number;
  id_course?: Nullable<number>;
  id_student?: Nullable<number>;
  day?: Nullable<number>;
  month?: Nullable<number>;
  year?: Nullable<number>;
  period?: Nullable<number>;
  hours?: Nullable<number>;
  reason?: Nullable<string>;
  justification?: Nullable<string>;
}

export interface CreateAbsenceDTO {
  id_absence: number;
  id_course: number;
  id_student: number;
  day?: Nullable<number>;
  month?: Nullable<number>;
  year?: Nullable<number>;
  period?: Nullable<number>;
  hours?: Nullable<number>;
  reason?: Nullable<string>;
  justification?: Nullable<string>;
}

export interface UpdateAbsenceDTO {
  id_absence: number;
  id_course: number;
  id_student: number;
  day?: Nullable<number>;
  month?: Nullable<number>;
  year?: Nullable<number>;
  period?: Nullable<number>;
  hours?: Nullable<number>;
  reason?: Nullable<string>;
  justification?: Nullable<string>;
}

export interface FilterAbsenceDTO {
  id_course?: Nullable<number>;
  id_student?: Nullable<number>;
  day?: Nullable<number>;
  month?: Nullable<number>;
  year?: Nullable<number>;
  period?: Nullable<number>;
  hours?: Nullable<number>;
  reason?: Nullable<string>;
  justification?: Nullable<string>;
}
