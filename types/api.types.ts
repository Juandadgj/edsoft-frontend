/**
 * Tipos para la API RESTful
 * Basados en graphql.ts pero adaptados para REST
 */

// ============== Tipos Utilitarios ==============
export type Nullable<T> = T | null;

// ============== Enums ==============
export enum GradeDisplayMode {
  numerica_desempeno = 'numerica_desempeno',
  numerica = 'numerica',
  desempeno = 'desempeno',
}

// ============== Entidades ==============

export interface Absence {
  id_absence: number;
  id_student?: Nullable<number>;
  id_course?: Nullable<number>;
  day?: Nullable<number>;
  month?: Nullable<number>;
  year?: Nullable<number>;
  hours?: Nullable<number>;
  justification?: Nullable<string>;
  reason?: Nullable<string>;
  period?: Nullable<number>;
}

export interface Achievement {
  id_achievement: number;
  id_course?: Nullable<number>;
  period?: Nullable<number>;
  description?: Nullable<string>;
}

export interface Qualification {
  id_achie_stu: number;
  id_achievement?: Nullable<number>;
  id_student?: Nullable<number>;
  score?: Nullable<number>;
}

export interface QualificationList {
  student: string;
  qualifications: Nullable<Qualification>[];
}

export interface Area {
  id_area: number;
  name?: Nullable<string>;
  status?: Nullable<string>;
}

export interface Teacher {
  id_teacher: number;
  name?: Nullable<string>;
  last_name?: Nullable<string>;
  type_id?: Nullable<number>;
  identification?: Nullable<string>;
  direction?: Nullable<string>;
  phone?: Nullable<string>;
  email?: Nullable<string>;
  degree?: Nullable<string>;
}

export interface Course {
  id_course: number;
  id_group: number;
  id_area: number;
  area?: Nullable<Area>;
  id_teacher: number;
  teacher?: Nullable<Teacher>;
  name: string;
  position?: Nullable<number>;
  dimension_code?: Nullable<number>;
  dimension_type?: Nullable<string>;
  hour: number;
  average?: Nullable<string>;
  percentage?: Nullable<number>;
}

export interface Definitives {
  id_cour_stu: number;
  id_student?: Nullable<number>;
  id_course?: Nullable<number>;
  score1?: Nullable<string>;
  score2?: Nullable<string>;
  score3?: Nullable<string>;
  score4?: Nullable<string>;
  score5?: Nullable<string>;
}

export interface Enrollment {
  id_enrollment: number;
  id_student?: Nullable<number>;
  id_group?: Nullable<number>;
  year?: Nullable<number>;
  status?: Nullable<string>;
  reason_desertion?: Nullable<string>;
  date_desertion?: Nullable<string>;
}

export interface Featured {
  id_featured: number;
  id_group?: Nullable<number>;
  id_student?: Nullable<number>;
}

export interface Group {
  id_group: number;
  id_year?: Nullable<number>;
  level?: Nullable<number>;
  sublevel?: Nullable<string>;
  working_time?: Nullable<string>;
  representative?: Nullable<string>;
  coursesCount?: Nullable<number>;
}

export interface Institution {
  id_institution: number;
  name: string;
  register: string;
  direction: string;
  phone: string;
  responsible: string;
  logo?: Nullable<string>;
  user: string;
  pay_inscription: number;
  monthly_pay: number;
  day: string;
  month: string;
  year: string;
  version: number;
  status: string;
  title: string;
  message: string;
  information: string;
}

export interface Report {
  report_content: string;
}

export interface ScholarYear {
  id_year: number;
  rector?: Nullable<string>;
  secretary?: Nullable<string>;
  comment?: Nullable<string>;
}

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
  courses?: Nullable<Nullable<ResumeCourse>[]>;
}

export interface Student {
  id_student: number;
  name?: Nullable<string>;
  last_name?: Nullable<string>;
  type_id?: Nullable<number>;
  identification?: Nullable<string>;
  sex?: Nullable<string>;
  direction?: Nullable<string>;
  phone?: Nullable<string>;
  guardian?: Nullable<string>;
  status?: Nullable<string>;
  birthday?: Nullable<string>;
  father?: Nullable<string>;
  mother?: Nullable<string>;
  email?: Nullable<string>;
  groups?: Nullable<Nullable<ResumeGroup>[]>;
}

export interface TypeQualification {
  id_type_qual: number;
  name?: Nullable<string>;
  floor_score?: Nullable<number>;
  ceiling_score?: Nullable<number>;
  year?: Nullable<number>;
}

export interface User {
  id_user: number;
  user: string;
  password: string;
  typeu: string;
  status: string;
  belongs: string;
}

export interface Auth {
  token?: Nullable<string>;
  role?: Nullable<string>;
}

// ============== DTOs para Create ==============

export interface CreateAbsenceDto {
  id_absence: number;
  id_student: number;
  id_course: number;
  day?: Nullable<number>;
  month?: Nullable<number>;
  year?: Nullable<number>;
  hours?: Nullable<number>;
  justification?: Nullable<string>;
  reason?: Nullable<string>;
  period?: Nullable<number>;
}

export interface CreateAchievementDto {
  id_course: number;
  period: number;
  description: string;
}

export interface CreateAreaDto {
  name: string;
  status?: Nullable<string>;
}

export interface CreateCourseDto {
  id_group: number;
  id_teacher: number;
  name: string;
  position?: Nullable<number>;
  dimension_code?: Nullable<number>;
  dimension_type?: Nullable<string>;
  id_area: number;
  hour: number;
  average?: Nullable<string>;
  percentage?: Nullable<number>;
}

export interface CreateEnrollmentDto {
  id_student: number;
  id_group: number;
  year?: Nullable<number>;
  status?: Nullable<string>;
  reason_desertion?: Nullable<string>;
  date_desertion?: Nullable<string>;
}

export interface CreateFeaturedDto {
  id_group?: Nullable<number>;
  id_student?: Nullable<number>;
}

export interface CreateGroupDto {
  id_year: number;
  level: number;
  sublevel: string;
  working_time?: Nullable<string>;
  representative: string;
}

export interface CreateScholarYearDto {
  id_year: number;
  rector?: Nullable<string>;
  secretary?: Nullable<string>;
  comment?: Nullable<string>;
}

export interface CreateStudentDto {
  name: string;
  last_name: string;
  type_id: number;
  identification: string;
  sex: string;
  direction?: Nullable<string>;
  phone: string;
  guardian: string;
  status?: Nullable<string>;
  birthday?: Nullable<string>;
  father?: Nullable<string>;
  mother?: Nullable<string>;
  email?: Nullable<string>;
  id_group: number;
}

export interface CreateTeacherDto {
  name: string;
  last_name: string;
  type_id: number;
  identification: string;
  direction?: Nullable<string>;
  phone: string;
  email?: Nullable<string>;
  degree?: Nullable<string>;
}

export interface CreateTypeQualificationDto {
  name: string;
  floor_score: number;
  ceiling_score: number;
  year?: Nullable<number>;
}

// ============== DTOs para Update ==============

export interface UpdateAbsenceDto {
  id_absence: number;
  id_student: number;
  id_course: number;
  day?: Nullable<number>;
  month?: Nullable<number>;
  year?: Nullable<number>;
  hours?: Nullable<number>;
  justification?: Nullable<string>;
  reason?: Nullable<string>;
  period?: Nullable<number>;
}

export interface UpdateAchievementDto {
  id_achievement: number;
  id_course?: Nullable<number>;
  period?: Nullable<number>;
  description?: Nullable<string>;
}

export interface UpdateAreaDto {
  id_area: number;
  name?: Nullable<string>;
  status?: Nullable<string>;
}

export interface UpdateCourseDto {
  id_course: number;
  id_group?: Nullable<number>;
  id_teacher?: Nullable<number>;
  name?: Nullable<string>;
  position?: Nullable<number>;
  dimension_code?: Nullable<number>;
  dimension_type?: Nullable<string>;
  id_area?: Nullable<number>;
  hour?: Nullable<number>;
  average?: Nullable<string>;
  percentage?: Nullable<number>;
}

export interface UpdateDefinitivesDto {
  id_cour_stu: number;
  score1?: Nullable<string>;
  score2?: Nullable<string>;
  score3?: Nullable<string>;
  score4?: Nullable<string>;
  score5?: Nullable<string>;
}

export interface UpdateEnrollmentDto {
  id_enrollment: number;
  status?: Nullable<string>;
  reason_desertion?: Nullable<string>;
  date_desertion?: Nullable<string>;
}

export interface UpdateGroupDto {
  id_group: number;
  working_time?: Nullable<string>;
  representative?: Nullable<string>;
}

export interface UpdateScholarYearDto {
  id_year: number;
  rector?: Nullable<string>;
  secretary?: Nullable<string>;
  comment?: Nullable<string>;
}

export interface UpdateStudentDto {
  id_student: number;
  name?: Nullable<string>;
  last_name?: Nullable<string>;
  type_id?: Nullable<number>;
  identification?: Nullable<string>;
  sex?: Nullable<string>;
  direction?: Nullable<string>;
  phone?: Nullable<string>;
  guardian?: Nullable<string>;
  status?: Nullable<string>;
  birthday?: Nullable<string>;
  father?: Nullable<string>;
  mother?: Nullable<string>;
  email?: Nullable<string>;
}

export interface UpdateTeacherDto {
  id_teacher: number;
  name?: Nullable<string>;
  last_name?: Nullable<string>;
  type_id?: Nullable<number>;
  identification?: Nullable<string>;
  direction?: Nullable<string>;
  phone?: Nullable<string>;
  email?: Nullable<string>;
  degree?: Nullable<string>;
}

export interface UpdateQualificationsDto {
  qualifications: QualificationInput[];
}

export interface QualificationInput {
  id_achie_stu?: Nullable<number>;
  id_achievement?: Nullable<number>;
  id_student?: Nullable<number>;
  score?: Nullable<number>;
}

export interface UpdateUserDto {
  id_user: number;
  user: string;
  password: string;
  typeu: string;
  status: string;
  belongs: string;
}

// ============== DTOs para Filter ==============

export interface FilterAbsenceDto {
  id_student?: Nullable<number>;
  id_course?: Nullable<number>;
  day?: Nullable<number>;
  month?: Nullable<number>;
  year?: Nullable<number>;
  hours?: Nullable<number>;
  justification?: Nullable<string>;
  reason?: Nullable<string>;
  period?: Nullable<number>;
}

export interface FilterAchievementDto {
  id_course?: Nullable<number>;
  period?: Nullable<number>;
  description?: Nullable<string>;
}

export interface FilterAreaDto {
  name?: Nullable<string>;
  status?: Nullable<string>;
}

export interface FilterCourseDto {
  id_group?: Nullable<number>;
  id_teacher?: Nullable<number>;
  name?: Nullable<string>;
  position?: Nullable<number>;
  dimension_code?: Nullable<number>;
  dimension_type?: Nullable<string>;
  id_area?: Nullable<number>;
  hour?: Nullable<number>;
  average?: Nullable<string>;
  percentage?: Nullable<number>;
}

export interface FilterDefinitivesDto {
  id_student?: Nullable<number>;
  id_course?: Nullable<number>;
  score1?: Nullable<string>;
  score2?: Nullable<string>;
  score3?: Nullable<string>;
  score4?: Nullable<string>;
  score5?: Nullable<string>;
}

export interface FilterEnrollmentDto {
  id_student?: Nullable<number>;
  id_group?: Nullable<number>;
  year?: Nullable<number>;
  status?: Nullable<string>;
  reason_desertion?: Nullable<string>;
  date_desertion?: Nullable<string>;
}

export interface FilterFeaturedDto {
  id_group?: Nullable<number>;
  id_student?: Nullable<number>;
}

export interface FilterGroupDto {
  id_year?: Nullable<number>;
  level?: Nullable<number>;
  sublevel?: Nullable<string>;
  working_time?: Nullable<string>;
  representative?: Nullable<string>;
}

export interface FilterStudentDto {
  name?: Nullable<string>;
  identification?: Nullable<string>;
}

export interface FilterTeacherDto {
  name?: Nullable<string>;
  last_name?: Nullable<string>;
  type_id?: Nullable<number>;
  identification?: Nullable<string>;
  direction?: Nullable<string>;
  phone?: Nullable<string>;
  email?: Nullable<string>;
  degree?: Nullable<string>;
}

export interface FilterQualificationDto {
  id_course: number;
  period: number;
}

// ============== DTOs para Reportes ==============

export interface SignatureInput {
  professor_group?: Nullable<boolean>;
  secretary?: Nullable<boolean>;
  rector?: Nullable<boolean>;
}

export interface ReportDictionary {
  signature: SignatureInput;
  average_general?: Nullable<boolean>;
  average_group?: Nullable<boolean>;
  average_area?: Nullable<boolean>;
  position?: Nullable<boolean>;
  username?: Nullable<boolean>;
  qualification_per1?: Nullable<boolean>;
  qualification_per2?: Nullable<boolean>;
  qualification_per3?: Nullable<boolean>;
  qualification_per4?: Nullable<boolean>;
  average_per?: Nullable<boolean>;
  all_qualifications?: Nullable<boolean>;
  professor_course?: Nullable<boolean>;
  hour?: Nullable<boolean>;
  absences?: Nullable<boolean>;
  showLogo?: Nullable<boolean>;  
  headerTitleSize?: Nullable<number>;
  showHeaderSubtitle?: Nullable<boolean>;
  showIdentificationCode?: Nullable<boolean>;
}

export interface CertifiedStudentDictionary extends ReportDictionary {
  gradeDisplayConfig: GradeDisplayMode;
}

export interface GenerateStudentsListUndeterminatedDto {
  id_group: number;
}

export interface GenerateStudentsListDeterminatedDto {
  id_course: number;
  id_group: number;
}

export interface GenerateAchievementsAndIndicatorsDto {
  id_group: number;
  id_course: number;
  period: number;
}

export interface GenerateReportAreaDto {
  id_group: number;
  id_student?: Nullable<number>;
}

export interface GenerateStudentEnrollmentReportDto {
  id_student: number;
  id_year: number;
}

export interface CertifiedStudentReportDto {
  id_student: number;
  id_group: number;
}

// ============== DTOs para Login ==============

export interface SignInDto {
  id_institution: number;
  user: string;
  password: string;
}
