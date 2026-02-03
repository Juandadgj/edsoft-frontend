import { Nullable } from './common';

export interface Report {
  report_content: string;
}

export interface SignatureInput {
  professor_group?: Nullable<boolean>;
  rector?: Nullable<boolean>;
  secretary?: Nullable<boolean>;
}

export interface ReportDictionary {
  absences?: Nullable<boolean>;
  all_qualifications?: Nullable<boolean>;
  average_area?: Nullable<boolean>;
  average_general?: Nullable<boolean>;
  average_group?: Nullable<boolean>;
  average_per?: Nullable<boolean>;
  hour?: Nullable<boolean>;
  position?: Nullable<boolean>;
  professor_course?: Nullable<boolean>;
  qualification_per1?: Nullable<boolean>;
  qualification_per2?: Nullable<boolean>;
  qualification_per3?: Nullable<boolean>;
  qualification_per4?: Nullable<boolean>;
  signature: SignatureInput;
  username?: Nullable<boolean>;
}

export interface GenerateAchievementsAndIndicatorsDTO {
  id_course: number;
  id_group: number;
  period: number;
}

export interface GenerateReportAreaDTO {
  id_group: number;
  id_student?: Nullable<number>;
  report_options: ReportDictionary;
}

export interface GenerateStudentsListDeterminatedDTO {
  id_course: number;
  id_group: number;
}

export interface GenerateStudentsListUndeterminatedDTO {
  id_group: number;
}
