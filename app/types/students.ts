import { Nullable } from './common';

export interface ResumeDefinitive {
  score1?: Nullable<string>;
  score2?: Nullable<string>;
  score3?: Nullable<string>;
  score4?: Nullable<string>;
}

export interface ResumeCourse {
  id_course?: Nullable<number>;
  name?: Nullable<string>;
  teacher?: Nullable<string>;
  definitives?: Nullable<ResumeDefinitive>;
}

export interface ResumeGroup {
  id_group?: Nullable<number>;
  level?: Nullable<number>;
  sublevel?: Nullable<string>;
  courses?: Nullable<Array<Nullable<ResumeCourse>>>;
}

export interface Student {
  id_student: number;
  // Información básica
  name?: Nullable<string>;
  last_name?: Nullable<string>;
  identification?: Nullable<string>;
  type_id?: Nullable<string>;
  expedition_place?: Nullable<string>;
  birthday?: Nullable<string>;
  birth_place?: Nullable<string>;
  direction?: Nullable<string>;
  email?: Nullable<string>;
  phone?: Nullable<string>;
  sex?: Nullable<string>;
  status?: Nullable<string>;
  photo?: Nullable<string>;
  code?: Nullable<string>;
  neighborhood?: Nullable<string>;
  zone?: Nullable<string>;
  stratum?: Nullable<string>;
  sisben?: Nullable<string>;
  // Información de salud
  health_system?: Nullable<string>;
  blood_type?: Nullable<string>;
  eps?: Nullable<string>;
  exceptional_capacity?: Nullable<string>;
  body_type?: Nullable<string>;
  illness?: Nullable<string>;
  // Información familiar
  father?: Nullable<string>;
  father_identification?: Nullable<string>;
  father_address?: Nullable<string>;
  father_mobile?: Nullable<string>;
  father_birthdate?: Nullable<string>;
  father_study?: Nullable<string>;
  father_profession?: Nullable<string>;
  mother?: Nullable<string>;
  mother_identification?: Nullable<string>;
  mother_address?: Nullable<string>;
  mother_mobile?: Nullable<string>;
  mother_birthdate?: Nullable<string>;
  mother_study?: Nullable<string>;
  mother_profession?: Nullable<string>;
  guardian?: Nullable<string>;
  guardian_identification?: Nullable<string>;
  guardian_address?: Nullable<string>;
  guardian_mobile?: Nullable<string>;
  guardian_birthdate?: Nullable<string>;
  // Otro parentesco
  other_relationship?: Nullable<string>;
  other_fullname?: Nullable<string>;
  other_identification?: Nullable<string>;
  other_address?: Nullable<string>;
  other_mobile?: Nullable<string>;
  other_birthdate?: Nullable<string>;
  // Población víctima del conflicto
  dependent_children_beneficiary?: Nullable<string>;
  student_mother_head_of_family?: Nullable<string>;
  veteran_hero_beneficiary?: Nullable<string>;
  hero_nation_beneficiary?: Nullable<string>;
  // Situación de desplazamiento
  expulsion_department?: Nullable<string>;
  expulsion_municipality?: Nullable<string>;
  // Procedencia académica
  previous_state?: Nullable<string>;
  previous_study_validity?: Nullable<string>;
  previous_educational_institution?: Nullable<string>;
  previous_grade?: Nullable<string>;
  previous_year?: Nullable<string>;
  previous_city?: Nullable<string>;
  // Etnias
  afrodescendant?: Nullable<string>;
  negritudes?: Nullable<string>;
  rom?: Nullable<string>;
  zenu?: Nullable<string>;
  // Discapacidades
  physical_disability?: Nullable<string>;
  hearing_disability?: Nullable<string>;
  visual_disability?: Nullable<string>;
  deafblindness?: Nullable<string>;
  intellectual_disability?: Nullable<string>;
  psychosocial_disability?: Nullable<string>;
  multiple_disability?: Nullable<string>;
  // Talentos excepcionales
  technology_talent?: Nullable<string>;
  leadership_talent?: Nullable<string>;
  natural_sciences_talent?: Nullable<string>;
  arts_talent?: Nullable<string>;
  physical_activity_talent?: Nullable<string>;
  social_sciences_talent?: Nullable<string>;
  // SIMPADE
  temporary_abandonment?: Nullable<string>;
  repeating_current_year?: Nullable<string>;
  disciplinary_records?: Nullable<string>;
  average_attendance_last_year?: Nullable<string>;
  // Grupos
  groups?: Nullable<Array<Nullable<ResumeGroup>>>;
}

export interface CreateStudentDTO {
  name: string;
  last_name: string;
  identification: string;
  type_id: string;
  phone: string;
  sex: string;
  guardian: string;
  email?: Nullable<string>;
  birthday?: Nullable<string>;
  direction?: Nullable<string>;
  father?: Nullable<string>;
  mother?: Nullable<string>;
  status?: Nullable<string>;
  // Campos adicionales opcionales
  expedition_place?: Nullable<string>;
  birth_place?: Nullable<string>;
  photo?: Nullable<string>;
  code?: Nullable<string>;
  neighborhood?: Nullable<string>;
  zone?: Nullable<string>;
  stratum?: Nullable<string>;
  sisben?: Nullable<string>;
  health_system?: Nullable<string>;
  blood_type?: Nullable<string>;
  eps?: Nullable<string>;
  exceptional_capacity?: Nullable<string>;
  body_type?: Nullable<string>;
  illness?: Nullable<string>;
  guardian_identification?: Nullable<string>;
  guardian_address?: Nullable<string>;
  guardian_mobile?: Nullable<string>;
  guardian_birthdate?: Nullable<string>;
  father_identification?: Nullable<string>;
  father_address?: Nullable<string>;
  father_mobile?: Nullable<string>;
  father_birthdate?: Nullable<string>;
  father_study?: Nullable<string>;
  father_profession?: Nullable<string>;
  mother_identification?: Nullable<string>;
  mother_address?: Nullable<string>;
  mother_mobile?: Nullable<string>;
  mother_birthdate?: Nullable<string>;
  mother_study?: Nullable<string>;
  mother_profession?: Nullable<string>;
  other_relationship?: Nullable<string>;
  other_fullname?: Nullable<string>;
  other_identification?: Nullable<string>;
  other_address?: Nullable<string>;
  other_mobile?: Nullable<string>;
  other_birthdate?: Nullable<string>;
  dependent_children_beneficiary?: Nullable<string>;
  student_mother_head_of_family?: Nullable<string>;
  veteran_hero_beneficiary?: Nullable<string>;
  hero_nation_beneficiary?: Nullable<string>;
  expulsion_department?: Nullable<string>;
  expulsion_municipality?: Nullable<string>;
  previous_state?: Nullable<string>;
  previous_study_validity?: Nullable<string>;
  previous_educational_institution?: Nullable<string>;
  previous_grade?: Nullable<string>;
  previous_year?: Nullable<string>;
  previous_city?: Nullable<string>;
  afrodescendant?: Nullable<string>;
  negritudes?: Nullable<string>;
  rom?: Nullable<string>;
  zenu?: Nullable<string>;
  physical_disability?: Nullable<string>;
  hearing_disability?: Nullable<string>;
  visual_disability?: Nullable<string>;
  deafblindness?: Nullable<string>;
  intellectual_disability?: Nullable<string>;
  psychosocial_disability?: Nullable<string>;
  multiple_disability?: Nullable<string>;
  technology_talent?: Nullable<string>;
  leadership_talent?: Nullable<string>;
  natural_sciences_talent?: Nullable<string>;
  arts_talent?: Nullable<string>;
  physical_activity_talent?: Nullable<string>;
  social_sciences_talent?: Nullable<string>;
  temporary_abandonment?: Nullable<string>;
  repeating_current_year?: Nullable<string>;
  disciplinary_records?: Nullable<string>;
  average_attendance_last_year?: Nullable<string>;
}

export interface UpdateStudentDTO extends Partial<CreateStudentDTO> {
  id_student: number;
}

export interface FilterStudentDTO {
  identification?: Nullable<string>;
  name?: Nullable<string>;
}
