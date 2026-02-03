import { Nullable } from './common';

export interface Qualification {
  id_achie_stu: number;
  id_achievement?: Nullable<number>;
  id_student?: Nullable<number>;
  score?: Nullable<number>;
}

export interface QualificationList {
  student: string;
  qualifications: Array<Nullable<Qualification>>;
}

export interface QualificationInputDTO {
  id_achie_stu?: Nullable<number>;
  id_achievement?: Nullable<number>;
  id_student?: Nullable<number>;
  score?: Nullable<number>;
}

export interface UpdateQualificationsDTO {
  qualifications: Array<Nullable<QualificationInputDTO>>;
}

export interface FilterQualificationDTO {
  id_course: number;
  period: number;
}
