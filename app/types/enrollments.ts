import { Nullable } from './common';

export interface Enrollment {
  id_enrollment: number;
  id_group?: Nullable<number>;
  id_student?: Nullable<number>;
  date_desertion?: Nullable<string>;
  reason_desertion?: Nullable<string>;
  status?: Nullable<string>;
  year?: Nullable<number>;
}

export interface CreateEnrollmentDTO {
  id_group: number;
  id_student: number;
  date_desertion?: Nullable<string>;
  reason_desertion?: Nullable<string>;
  status?: Nullable<string>;
  year?: Nullable<number>;
}

export interface UpdateEnrollmentDTO {
  id_enrollment: number;
  date_desertion?: Nullable<string>;
  reason_desertion?: Nullable<string>;
  status?: Nullable<string>;
}

export interface FilterEnrollmentDTO {
  id_group?: Nullable<number>;
  id_student?: Nullable<number>;
  date_desertion?: Nullable<string>;
  reason_desertion?: Nullable<string>;
  status?: Nullable<string>;
  year?: Nullable<number>;
}
