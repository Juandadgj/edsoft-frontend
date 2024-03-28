import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Absence = {
  __typename?: 'Absence';
  day?: Maybe<Scalars['Int']>;
  hours?: Maybe<Scalars['Int']>;
  id_absence: Scalars['Int'];
  id_course?: Maybe<Scalars['Int']>;
  id_student?: Maybe<Scalars['Int']>;
  justification?: Maybe<Scalars['String']>;
  month?: Maybe<Scalars['Int']>;
  period?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type Achievement = {
  __typename?: 'Achievement';
  description?: Maybe<Scalars['String']>;
  id_achievement: Scalars['Int'];
  id_course?: Maybe<Scalars['Int']>;
  period?: Maybe<Scalars['Int']>;
};

export type Area = {
  __typename?: 'Area';
  id_area: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Auth = {
  __typename?: 'Auth';
  role?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Course = {
  __typename?: 'Course';
  area?: Maybe<Area>;
  asi_dimension?: Maybe<Scalars['String']>;
  average?: Maybe<Scalars['String']>;
  dim_codigo?: Maybe<Scalars['Int']>;
  hour: Scalars['Int'];
  id_area: Scalars['Int'];
  id_course: Scalars['Int'];
  id_group: Scalars['Int'];
  id_teacher: Scalars['Int'];
  name: Scalars['String'];
  percentage?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  teacher?: Maybe<Teacher>;
};

export type CreateAbsenceInput = {
  day?: InputMaybe<Scalars['Int']>;
  hours?: InputMaybe<Scalars['Int']>;
  id_absence: Scalars['Int'];
  id_course: Scalars['Int'];
  id_student: Scalars['Int'];
  justification?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
  reason?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type CreateAchievementInput = {
  description: Scalars['String'];
  id_course: Scalars['Int'];
  period: Scalars['Int'];
};

export type CreateAreaInput = {
  name: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
};

export type CreateCourseInput = {
  asi_dimension?: InputMaybe<Scalars['String']>;
  average?: InputMaybe<Scalars['String']>;
  dim_codigo?: InputMaybe<Scalars['Int']>;
  hour: Scalars['Int'];
  id_area: Scalars['Int'];
  id_group: Scalars['Int'];
  id_teacher: Scalars['Int'];
  name: Scalars['String'];
  percentage?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<Scalars['Int']>;
};

export type CreateEnrollmentInput = {
  date_desertion?: InputMaybe<Scalars['String']>;
  id_group: Scalars['Int'];
  id_student: Scalars['Int'];
  reason_desertion?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type CreateFeaturedInput = {
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
};

export type CreateGroupInput = {
  id_year: Scalars['Int'];
  level: Scalars['Int'];
  representative: Scalars['String'];
  sublevel: Scalars['String'];
  working_time?: InputMaybe<Scalars['String']>;
};

export type CreateScholarYearInput = {
  comment?: InputMaybe<Scalars['String']>;
  id_year: Scalars['Int'];
  rector?: InputMaybe<Scalars['String']>;
  secretary?: InputMaybe<Scalars['String']>;
};

export type CreateStudentInput = {
  birthday?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  father?: InputMaybe<Scalars['String']>;
  guardian: Scalars['String'];
  identification: Scalars['String'];
  last_name: Scalars['String'];
  mother?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  sex: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
  type_id: Scalars['Int'];
};

export type CreateTeacherInput = {
  degree?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  identification: Scalars['String'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  type_id: Scalars['Int'];
};

export type CreateTypeQualificationInput = {
  ceiling_score: Scalars['Float'];
  floor_score: Scalars['Float'];
  name: Scalars['String'];
  year?: InputMaybe<Scalars['Int']>;
};

export type Definitives = {
  __typename?: 'Definitives';
  id_cour_stu: Scalars['Int'];
  id_course?: Maybe<Scalars['Int']>;
  id_student?: Maybe<Scalars['Int']>;
  score1?: Maybe<Scalars['String']>;
  score2?: Maybe<Scalars['String']>;
  score3?: Maybe<Scalars['String']>;
  score4?: Maybe<Scalars['String']>;
  score5?: Maybe<Scalars['String']>;
};

export type Enrollment = {
  __typename?: 'Enrollment';
  date_desertion?: Maybe<Scalars['String']>;
  id_enrollment: Scalars['Int'];
  id_group?: Maybe<Scalars['Int']>;
  id_student?: Maybe<Scalars['Int']>;
  reason_desertion?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type Featured = {
  __typename?: 'Featured';
  id_featured: Scalars['Int'];
  id_group?: Maybe<Scalars['Int']>;
  id_student?: Maybe<Scalars['Int']>;
};

export type FilterAbsenceInput = {
  day?: InputMaybe<Scalars['Int']>;
  hours?: InputMaybe<Scalars['Int']>;
  id_course?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  justification?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
  reason?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type FilterAchievementInput = {
  description?: InputMaybe<Scalars['String']>;
  id_course?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
};

export type FilterAreaInput = {
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type FilterCourseInput = {
  asi_dimension?: InputMaybe<Scalars['String']>;
  average?: InputMaybe<Scalars['String']>;
  dim_codigo?: InputMaybe<Scalars['Int']>;
  hour?: InputMaybe<Scalars['Int']>;
  id_area?: InputMaybe<Scalars['Int']>;
  id_group?: InputMaybe<Scalars['Int']>;
  id_teacher?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  percentage?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<Scalars['Int']>;
};

export type FilterDefinitivesInput = {
  id_course?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score1?: InputMaybe<Scalars['String']>;
  score2?: InputMaybe<Scalars['String']>;
  score3?: InputMaybe<Scalars['String']>;
  score4?: InputMaybe<Scalars['String']>;
  score5?: InputMaybe<Scalars['String']>;
};

export type FilterEnrollmentInput = {
  date_desertion?: InputMaybe<Scalars['String']>;
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  reason_desertion?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type FilterFeaturedInput = {
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
};

export type FilterGroupInput = {
  id_year?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  representative?: InputMaybe<Scalars['String']>;
  sublevel?: InputMaybe<Scalars['String']>;
  working_time?: InputMaybe<Scalars['String']>;
};

export type FilterQualificationInput = {
  id_course: Scalars['Int'];
  period: Scalars['Int'];
};

export type FilterStudentInput = {
  identification?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FilterTeacherInput = {
  degree?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  identification?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['Int']>;
};

export type GenerateReportAreaInput = {
  id_group: Scalars['Int'];
  id_student: Scalars['Int'];
  report_options: ReportDictionary;
};

export type GenerateStudentsListInput = {
  id_group: Scalars['Int'];
};

export type GenerateStudentsListInput2 = {
  id_course: Scalars['Int'];
  id_group: Scalars['Int'];
  period: Scalars['Int'];
};

export type Group = {
  __typename?: 'Group';
  coursesCount?: Maybe<Scalars['Int']>;
  id_group: Scalars['Int'];
  id_year?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  representative?: Maybe<Scalars['String']>;
  sublevel?: Maybe<Scalars['String']>;
  working_time?: Maybe<Scalars['String']>;
};

export type Institution = {
  __typename?: 'Institution';
  day: Scalars['String'];
  direction: Scalars['String'];
  id_institution: Scalars['Int'];
  information: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  month: Scalars['String'];
  monthly_pay: Scalars['Int'];
  name: Scalars['String'];
  pay_inscription: Scalars['Int'];
  phone: Scalars['String'];
  register: Scalars['String'];
  responsable: Scalars['String'];
  status: Scalars['String'];
  title: Scalars['String'];
  user: Scalars['String'];
  version: Scalars['Int'];
  year: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAbsence: Absence;
  createAchievement: Achievement;
  createArea: Area;
  createCourse: Course;
  createEnrollment: Enrollment;
  createFeatured: Featured;
  createGroup: Group;
  createScholarYear: ScholarYear;
  createStudent: Student;
  createTeacher: Teacher;
  createTypeQualification: TypeQualification;
  deleteAbsence: Absence;
  deleteAchievement?: Maybe<Achievement>;
  deleteArea: Area;
  deleteCourse?: Maybe<Course>;
  deleteEnrollment?: Maybe<Enrollment>;
  deleteFeatured?: Maybe<Featured>;
  deleteGroup?: Maybe<Group>;
  deleteScholarYear?: Maybe<ScholarYear>;
  deleteStudent?: Maybe<Student>;
  deleteTeacher?: Maybe<Teacher>;
  deleteTypeQualification?: Maybe<TypeQualification>;
  updateAbsence: Absence;
  updateAchievement: Achievement;
  updateArea: Area;
  updateCourse: Course;
  updateDefitinives: Definitives;
  updateEnrollment: Enrollment;
  updateGroup: Group;
  updateQualifications: Array<Maybe<Qualification>>;
  updateScholarYear: ScholarYear;
  updateStudent: Student;
  updateTeacher: Teacher;
  updateUser: User;
};


export type MutationCreateAbsenceArgs = {
  createAbsenceInput: CreateAbsenceInput;
};


export type MutationCreateAchievementArgs = {
  createAchievementInput: CreateAchievementInput;
};


export type MutationCreateAreaArgs = {
  createAreaInput: CreateAreaInput;
};


export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
};


export type MutationCreateEnrollmentArgs = {
  createEnrollmentInput: CreateEnrollmentInput;
};


export type MutationCreateFeaturedArgs = {
  createFeaturedInput: CreateFeaturedInput;
};


export type MutationCreateGroupArgs = {
  createGroupInput: CreateGroupInput;
};


export type MutationCreateScholarYearArgs = {
  createScholarYearInput: CreateScholarYearInput;
};


export type MutationCreateStudentArgs = {
  createStudentInput: CreateStudentInput;
  id_group: Scalars['Int'];
};


export type MutationCreateTeacherArgs = {
  createTeacherInput: CreateTeacherInput;
};


export type MutationCreateTypeQualificationArgs = {
  createTypeQualificationInput: CreateTypeQualificationInput;
};


export type MutationDeleteAbsenceArgs = {
  id_absence: Scalars['Int'];
};


export type MutationDeleteAchievementArgs = {
  id_achievement: Scalars['Int'];
};


export type MutationDeleteAreaArgs = {
  id_area: Scalars['Int'];
};


export type MutationDeleteCourseArgs = {
  id_course: Scalars['Int'];
};


export type MutationDeleteEnrollmentArgs = {
  id_enrollment: Scalars['Int'];
};


export type MutationDeleteFeaturedArgs = {
  id_featured: Scalars['Int'];
};


export type MutationDeleteGroupArgs = {
  id_group: Scalars['Int'];
};


export type MutationDeleteScholarYearArgs = {
  id_year: Scalars['Int'];
};


export type MutationDeleteStudentArgs = {
  id_student: Scalars['Int'];
};


export type MutationDeleteTeacherArgs = {
  id_teacher: Scalars['Int'];
};


export type MutationDeleteTypeQualificationArgs = {
  id_type_qual: Scalars['Int'];
};


export type MutationUpdateAbsenceArgs = {
  updateAbsenceInput: UpdateAbsenceInput;
};


export type MutationUpdateAchievementArgs = {
  updateAchievementInput: UpdateAchievementInput;
};


export type MutationUpdateAreaArgs = {
  updateAreaInput: UpdateAreaInput;
};


export type MutationUpdateCourseArgs = {
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateDefitinivesArgs = {
  updateDefinitivesInput?: InputMaybe<UpdateDefinitivesInput>;
};


export type MutationUpdateEnrollmentArgs = {
  updateEnrollmentInput: UpdateEnrollmentInput;
};


export type MutationUpdateGroupArgs = {
  updateGroupInput: UpdateGroupInput;
};


export type MutationUpdateQualificationsArgs = {
  updateQualificationsInput: UpdateQualificationsInput;
};


export type MutationUpdateScholarYearArgs = {
  updateScholarYearInput: UpdateScholarYearInput;
};


export type MutationUpdateStudentArgs = {
  updateStudentInput: UpdateStudentInput;
};


export type MutationUpdateTeacherArgs = {
  updateTeacherInput: UpdateTeacherInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Qualification = {
  __typename?: 'Qualification';
  id_achie_stu: Scalars['Int'];
  id_achievement?: Maybe<Scalars['Int']>;
  id_student?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Float']>;
};

export type QualificationInput = {
  id_achie_stu?: InputMaybe<Scalars['Int']>;
  id_achievement?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Float']>;
};

export type QualificationList = {
  __typename?: 'QualificationList';
  qualifications: Array<Maybe<Qualification>>;
  student: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  absences: Array<Maybe<Absence>>;
  achievements: Array<Maybe<Achievement>>;
  areas: Array<Maybe<Area>>;
  courseByID?: Maybe<Course>;
  courses: Array<Maybe<Course>>;
  enrollmentByID?: Maybe<Enrollment>;
  enrollments: Array<Maybe<Enrollment>>;
  featured: Array<Maybe<Featured>>;
  generateReport: Report;
  generateReport2: Report;
  generateReportArea: Report;
  groupByID?: Maybe<Group>;
  groups: Array<Maybe<Group>>;
  institutions: Array<Maybe<Institution>>;
  scholarYears: Array<Maybe<ScholarYear>>;
  signIn: Auth;
  studentByID?: Maybe<Student>;
  studentDefinitives: Array<Maybe<Definitives>>;
  studentQualifications: Array<Maybe<QualificationList>>;
  students?: Maybe<Array<Maybe<Student>>>;
  studentsByGroup: Array<Maybe<Student>>;
  teacherByID?: Maybe<Teacher>;
  teachers: Array<Maybe<Teacher>>;
  typeQualifications: Array<Maybe<TypeQualification>>;
};


export type QueryAbsencesArgs = {
  filterAbsenceInput?: InputMaybe<FilterAbsenceInput>;
};


export type QueryAchievementsArgs = {
  filterAchievementInput?: InputMaybe<FilterAchievementInput>;
};


export type QueryAreasArgs = {
  filterAreaInput?: InputMaybe<FilterAreaInput>;
};


export type QueryCourseByIdArgs = {
  id_course: Scalars['Int'];
};


export type QueryCoursesArgs = {
  filterCourseInput?: InputMaybe<FilterCourseInput>;
};


export type QueryEnrollmentByIdArgs = {
  id_enrollment: Scalars['Int'];
};


export type QueryEnrollmentsArgs = {
  filterEnrollmentInput?: InputMaybe<FilterEnrollmentInput>;
};


export type QueryFeaturedArgs = {
  filterFeaturedInput?: InputMaybe<FilterFeaturedInput>;
};


export type QueryGenerateReportArgs = {
  generateStudentsListInput?: InputMaybe<GenerateStudentsListInput>;
};


export type QueryGenerateReport2Args = {
  generateStudentsListInput2?: InputMaybe<GenerateStudentsListInput2>;
};


export type QueryGenerateReportAreaArgs = {
  generateReportAreaInput?: InputMaybe<GenerateReportAreaInput>;
};


export type QueryGroupByIdArgs = {
  id_group: Scalars['Int'];
};


export type QueryGroupsArgs = {
  filterGroupInput?: InputMaybe<FilterGroupInput>;
};


export type QuerySignInArgs = {
  signInInput?: InputMaybe<SignInInput>;
};


export type QueryStudentByIdArgs = {
  id_student: Scalars['Int'];
};


export type QueryStudentDefinitivesArgs = {
  filterDefinitivesInput?: InputMaybe<FilterDefinitivesInput>;
};


export type QueryStudentQualificationsArgs = {
  filterQualificationInput?: InputMaybe<FilterQualificationInput>;
};


export type QueryStudentsArgs = {
  filterStudentInput?: InputMaybe<FilterStudentInput>;
};


export type QueryStudentsByGroupArgs = {
  id_group: Scalars['Int'];
};


export type QueryTeacherByIdArgs = {
  id_teacher: Scalars['Int'];
};


export type QueryTeachersArgs = {
  filterTeacherInput?: InputMaybe<FilterTeacherInput>;
};

export type Report = {
  __typename?: 'Report';
  report_content: Scalars['String'];
};

export type ReportDictionary = {
  absences?: InputMaybe<Scalars['Boolean']>;
  all_qualifications?: InputMaybe<Scalars['Boolean']>;
  average_area?: InputMaybe<Scalars['Boolean']>;
  average_general?: InputMaybe<Scalars['Boolean']>;
  average_group?: InputMaybe<Scalars['Boolean']>;
  average_per?: InputMaybe<Scalars['Boolean']>;
  hour?: InputMaybe<Scalars['Boolean']>;
  professor_course?: InputMaybe<Scalars['Boolean']>;
  qualification_per1?: InputMaybe<Scalars['Boolean']>;
  qualification_per2?: InputMaybe<Scalars['Boolean']>;
  qualification_per3?: InputMaybe<Scalars['Boolean']>;
  qualification_per4?: InputMaybe<Scalars['Boolean']>;
  signature: SignatureInput;
  username?: InputMaybe<Scalars['Boolean']>;
};

export type ResumeCourse = {
  __typename?: 'ResumeCourse';
  definitives?: Maybe<ResumeDefinitive>;
  id_course?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  teacher?: Maybe<Scalars['String']>;
};

export type ResumeDefinitive = {
  __typename?: 'ResumeDefinitive';
  score1?: Maybe<Scalars['String']>;
  score2?: Maybe<Scalars['String']>;
  score3?: Maybe<Scalars['String']>;
  score4?: Maybe<Scalars['String']>;
};

export type ResumeGroup = {
  __typename?: 'ResumeGroup';
  courses?: Maybe<Array<Maybe<ResumeCourse>>>;
  id_group?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  sublevel?: Maybe<Scalars['String']>;
};

export type ScholarYear = {
  __typename?: 'ScholarYear';
  comment?: Maybe<Scalars['String']>;
  id_year: Scalars['Int'];
  rector?: Maybe<Scalars['String']>;
  secretary?: Maybe<Scalars['String']>;
};

export type SignInInput = {
  id_institution: Scalars['Int'];
  password: Scalars['String'];
  user: Scalars['String'];
};

export type SignatureInput = {
  professor_group?: InputMaybe<Scalars['Boolean']>;
  rector?: InputMaybe<Scalars['Boolean']>;
  secretary?: InputMaybe<Scalars['Boolean']>;
};

export type Student = {
  __typename?: 'Student';
  birthday?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  father?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<ResumeGroup>>>;
  guardian?: Maybe<Scalars['String']>;
  id_student: Scalars['Int'];
  identification?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  mother?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type_id?: Maybe<Scalars['Int']>;
};

export type Teacher = {
  __typename?: 'Teacher';
  degree?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id_teacher: Scalars['Int'];
  identification?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  type_id?: Maybe<Scalars['Int']>;
};

export type TypeQualification = {
  __typename?: 'TypeQualification';
  ceiling_score?: Maybe<Scalars['Float']>;
  floor_score?: Maybe<Scalars['Float']>;
  id_type_qual: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type UpdateAbsenceInput = {
  day?: InputMaybe<Scalars['Int']>;
  hours?: InputMaybe<Scalars['Int']>;
  id_absence: Scalars['Int'];
  id_course: Scalars['Int'];
  id_student: Scalars['Int'];
  justification?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
  reason?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type UpdateAchievementInput = {
  description?: InputMaybe<Scalars['String']>;
  id_achievement: Scalars['Int'];
  id_course?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
};

export type UpdateAreaInput = {
  id_area: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseInput = {
  asi_dimension?: InputMaybe<Scalars['String']>;
  average?: InputMaybe<Scalars['String']>;
  dim_codigo?: InputMaybe<Scalars['Int']>;
  hour?: InputMaybe<Scalars['Int']>;
  id_area?: InputMaybe<Scalars['Int']>;
  id_course: Scalars['Int'];
  id_group?: InputMaybe<Scalars['Int']>;
  id_teacher?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  percentage?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<Scalars['Int']>;
};

export type UpdateDefinitivesInput = {
  id_cour_stu: Scalars['Int'];
  score1?: InputMaybe<Scalars['String']>;
  score2?: InputMaybe<Scalars['String']>;
  score3?: InputMaybe<Scalars['String']>;
  score4?: InputMaybe<Scalars['String']>;
  score5?: InputMaybe<Scalars['String']>;
};

export type UpdateEnrollmentInput = {
  date_desertion?: InputMaybe<Scalars['String']>;
  id_enrollment: Scalars['Int'];
  reason_desertion?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type UpdateGroupInput = {
  id_group: Scalars['Int'];
  representative?: InputMaybe<Scalars['String']>;
  working_time?: InputMaybe<Scalars['String']>;
};

export type UpdateQualificationsInput = {
  qualifications: Array<InputMaybe<QualificationInput>>;
};

export type UpdateScholarYearInput = {
  comment?: InputMaybe<Scalars['String']>;
  id_year: Scalars['Int'];
  rector?: InputMaybe<Scalars['String']>;
  secretary?: InputMaybe<Scalars['String']>;
};

export type UpdateStudentInput = {
  birthday?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  father?: InputMaybe<Scalars['String']>;
  guardian?: InputMaybe<Scalars['String']>;
  id_student: Scalars['Int'];
  identification?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  mother?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['Int']>;
};

export type UpdateTeacherInput = {
  degree?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id_teacher: Scalars['Int'];
  identification?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  belongs: Scalars['String'];
  id_user: Scalars['Int'];
  password: Scalars['String'];
  status: Scalars['String'];
  typeu: Scalars['String'];
  user: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  belongs: Scalars['String'];
  id_user: Scalars['Int'];
  password: Scalars['String'];
  status: Scalars['String'];
  typeu: Scalars['String'];
  user: Scalars['String'];
};

export type RegularAchievementFragment = { __typename?: 'Achievement', id_course?: number | null, period?: number | null, description?: string | null };

export type RegularAreaFragment = { __typename?: 'Area', id_area: number, name?: string | null, status?: string | null };

export type RegularCoursesFragment = { __typename?: 'Group', id_group: number, working_time?: string | null, representative?: string | null };

export type RegularInstitutionFragment = { __typename?: 'Institution', id_institution: number, name: string, direction: string };

export type RegularLogoFragment = { __typename?: 'Institution', logo?: string | null, id_institution: number };

export type RegularQualificationTypeFragment = { __typename?: 'TypeQualification', id_type_qual: number, name?: string | null, floor_score?: number | null, ceiling_score?: number | null, year?: number | null };

export type RegularSetYearFragment = { __typename?: 'ScholarYear', id_year: number, rector?: string | null, secretary?: string | null, comment?: string | null };

export type RegularStudentFragment = { __typename?: 'Student', name?: string | null, last_name?: string | null, sex?: string | null, direction?: string | null, birthday?: string | null };

export type RegularSubjectFragment = { __typename?: 'Course', id_course: number, name: string, id_teacher: number, hour: number };

export type RegularTeacherFragment = { __typename?: 'Teacher', id_teacher: number, name?: string | null, last_name?: string | null, identification?: string | null, direction?: string | null, phone?: string | null, email?: string | null, degree?: string | null };

export type CreateAchievementMutationVariables = Exact<{
  createAchievementInput: CreateAchievementInput;
}>;


export type CreateAchievementMutation = { __typename?: 'Mutation', createAchievement: { __typename?: 'Achievement', description?: string | null, id_achievement: number, id_course?: number | null, period?: number | null } };

export type CreateAreaMutationVariables = Exact<{
  createAreaInput: CreateAreaInput;
}>;


export type CreateAreaMutation = { __typename?: 'Mutation', createArea: { __typename?: 'Area', id_area: number, name?: string | null, status?: string | null } };

export type CreateCourseMutationVariables = Exact<{
  createCourseInput: CreateCourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', id_course: number, id_group: number, id_teacher: number, name: string, position?: number | null, dim_codigo?: number | null, asi_dimension?: string | null, id_area: number, hour: number, average?: string | null, percentage?: number | null } };

export type CreateGroupMutationVariables = Exact<{
  createGroupInput: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id_group: number, id_year?: number | null, level?: number | null, sublevel?: string | null, working_time?: string | null, representative?: string | null, coursesCount?: number | null } };

export type CreateQualificationTypeMutationVariables = Exact<{
  createTypeQualificationInput: CreateTypeQualificationInput;
}>;


export type CreateQualificationTypeMutation = { __typename?: 'Mutation', createTypeQualification: { __typename?: 'TypeQualification', id_type_qual: number } };

export type CreateSetYearMutationVariables = Exact<{
  createScholarYearInput: CreateScholarYearInput;
}>;


export type CreateSetYearMutation = { __typename?: 'Mutation', createScholarYear: { __typename?: 'ScholarYear', id_year: number, rector?: string | null, secretary?: string | null, comment?: string | null } };

export type CreateTeacherMutationVariables = Exact<{
  createTeacherInput: CreateTeacherInput;
}>;


export type CreateTeacherMutation = { __typename?: 'Mutation', createTeacher: { __typename?: 'Teacher', degree?: string | null } };

export type DeleteAchievementMutationVariables = Exact<{
  idAchievement: Scalars['Int'];
}>;


export type DeleteAchievementMutation = { __typename?: 'Mutation', deleteAchievement?: { __typename?: 'Achievement', id_achievement: number } | null };

export type DeleteAreaMutationVariables = Exact<{
  idArea: Scalars['Int'];
}>;


export type DeleteAreaMutation = { __typename?: 'Mutation', deleteArea: { __typename?: 'Area', id_area: number } };

export type DeleteCourseMutationVariables = Exact<{
  idCourse: Scalars['Int'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse?: { __typename?: 'Course', id_course: number, id_group: number, id_teacher: number, name: string, position?: number | null, dim_codigo?: number | null, asi_dimension?: string | null, id_area: number, hour: number, average?: string | null, percentage?: number | null } | null };

export type DeleteGroupMutationVariables = Exact<{
  idGroup: Scalars['Int'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup?: { __typename?: 'Group', id_group: number, id_year?: number | null, level?: number | null, sublevel?: string | null, working_time?: string | null, representative?: string | null, coursesCount?: number | null } | null };

export type DeleteQualificationTypeMutationVariables = Exact<{
  idQualificationType: Scalars['Int'];
}>;


export type DeleteQualificationTypeMutation = { __typename?: 'Mutation', deleteTypeQualification?: { __typename?: 'TypeQualification', id_type_qual: number } | null };

export type DeleteSchoolarYearMutationVariables = Exact<{
  id_year: Scalars['Int'];
}>;


export type DeleteSchoolarYearMutation = { __typename?: 'Mutation', deleteScholarYear?: { __typename?: 'ScholarYear', id_year: number } | null };

export type DeleteTeacherMutationVariables = Exact<{
  idDocente: Scalars['Int'];
}>;


export type DeleteTeacherMutation = { __typename?: 'Mutation', deleteTeacher?: { __typename?: 'Teacher', id_teacher: number } | null };

export type UpdateAchievementMutationVariables = Exact<{
  updateAchievementInput: UpdateAchievementInput;
}>;


export type UpdateAchievementMutation = { __typename?: 'Mutation', updateAchievement: { __typename?: 'Achievement', description?: string | null, id_achievement: number, id_course?: number | null, period?: number | null } };

export type UpdateAreaMutationVariables = Exact<{
  updateAreaInput: UpdateAreaInput;
}>;


export type UpdateAreaMutation = { __typename?: 'Mutation', updateArea: { __typename?: 'Area', id_area: number, name?: string | null, status?: string | null } };

export type UpdateCourseMutationVariables = Exact<{
  updateCourseInput: UpdateCourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'Course', id_course: number, id_group: number, id_teacher: number, name: string, position?: number | null, dim_codigo?: number | null, asi_dimension?: string | null, id_area: number, hour: number, average?: string | null, percentage?: number | null } };

export type UpdateGroupMutationVariables = Exact<{
  updateGroupInput: UpdateGroupInput;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id_group: number, id_year?: number | null, level?: number | null, sublevel?: string | null, working_time?: string | null, representative?: string | null, coursesCount?: number | null } };

export type UpdateQualificationsMutationVariables = Exact<{
  updateQualificationsInput: UpdateQualificationsInput;
}>;


export type UpdateQualificationsMutation = { __typename?: 'Mutation', updateQualifications: Array<{ __typename?: 'Qualification', id_achie_stu: number, id_achievement?: number | null, id_student?: number | null, score?: number | null } | null> };

export type UpdateScholarYearMutationVariables = Exact<{
  updateScholarYearInput: UpdateScholarYearInput;
}>;


export type UpdateScholarYearMutation = { __typename?: 'Mutation', updateScholarYear: { __typename?: 'ScholarYear', id_year: number, rector?: string | null, secretary?: string | null, comment?: string | null } };

export type UpdateTeacherMutationVariables = Exact<{
  updateTeacherInput: UpdateTeacherInput;
}>;


export type UpdateTeacherMutation = { __typename?: 'Mutation', updateTeacher: { __typename?: 'Teacher', id_teacher: number } };

export type GenerateReportAreaQueryVariables = Exact<{
  generateReportAreaInput?: InputMaybe<GenerateReportAreaInput>;
}>;


export type GenerateReportAreaQuery = { __typename?: 'Query', generateReportArea: { __typename?: 'Report', report_content: string } };

export type GenerateReportQueryVariables = Exact<{
  generateStudentsListInput?: InputMaybe<GenerateStudentsListInput>;
}>;


export type GenerateReportQuery = { __typename?: 'Query', generateReport: { __typename?: 'Report', report_content: string } };

export type AchievementsQueryVariables = Exact<{
  filterAchievementInput?: InputMaybe<FilterAchievementInput>;
}>;


export type AchievementsQuery = { __typename?: 'Query', achievements: Array<{ __typename?: 'Achievement', id_achievement: number, id_course?: number | null, period?: number | null, description?: string | null } | null> };

export type GetAreasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAreasQuery = { __typename?: 'Query', areas: Array<{ __typename?: 'Area', id_area: number, name?: string | null, status?: string | null } | null> };

export type CoursesQueryVariables = Exact<{
  filterCourseInput?: InputMaybe<FilterCourseInput>;
}>;


export type CoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id_course: number, id_group: number, id_teacher: number, name: string, position?: number | null, dim_codigo?: number | null, asi_dimension?: string | null, id_area: number, hour: number, average?: string | null, percentage?: number | null, teacher?: { __typename?: 'Teacher', name?: string | null } | null } | null> };

export type GroupsQueryVariables = Exact<{
  filterGroupInput?: InputMaybe<FilterGroupInput>;
}>;


export type GroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id_group: number, level?: number | null, sublevel?: string | null, working_time?: string | null, representative?: string | null, coursesCount?: number | null } | null> };

export type GetInstitutionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInstitutionsQuery = { __typename?: 'Query', institutions: Array<{ __typename?: 'Institution', id_institution: number, name: string, direction: string } | null> };

export type GetLogoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLogoQuery = { __typename?: 'Query', institutions: Array<{ __typename?: 'Institution', logo?: string | null, id_institution: number } | null> };

export type GetQualificationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQualificationQuery = { __typename?: 'Query', typeQualifications: Array<{ __typename?: 'TypeQualification', id_type_qual: number, name?: string | null, floor_score?: number | null, ceiling_score?: number | null, year?: number | null } | null> };

export type GetSchoolarYearsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchoolarYearsQuery = { __typename?: 'Query', scholarYears: Array<{ __typename?: 'ScholarYear', id_year: number, rector?: string | null, secretary?: string | null, comment?: string | null } | null> };

export type StudentByIdQueryVariables = Exact<{
  idStudent: Scalars['Int'];
}>;


export type StudentByIdQuery = { __typename?: 'Query', studentByID?: { __typename?: 'Student', id_student: number, name?: string | null, last_name?: string | null, type_id?: number | null, identification?: string | null, sex?: string | null, direction?: string | null, phone?: string | null, guardian?: string | null, status?: string | null, birthday?: string | null, father?: string | null, mother?: string | null, email?: string | null, groups?: Array<{ __typename?: 'ResumeGroup', sublevel?: string | null, level?: number | null, id_group?: number | null, courses?: Array<{ __typename?: 'ResumeCourse', teacher?: string | null, name?: string | null, id_course?: number | null, definitives?: { __typename?: 'ResumeDefinitive', score1?: string | null, score2?: string | null, score3?: string | null, score4?: string | null } | null } | null> | null } | null> | null } | null };

export type GetStudentQualificationsQueryVariables = Exact<{
  filterQualificationInput?: InputMaybe<FilterQualificationInput>;
}>;


export type GetStudentQualificationsQuery = { __typename?: 'Query', studentQualifications: Array<{ __typename?: 'QualificationList', student: string, qualifications: Array<{ __typename?: 'Qualification', score?: number | null, id_achievement?: number | null, id_student?: number | null, id_achie_stu: number } | null> } | null> };

export type GetStudentsQueryVariables = Exact<{
  filterStudentInput?: InputMaybe<FilterStudentInput>;
}>;


export type GetStudentsQuery = { __typename?: 'Query', students?: Array<{ __typename?: 'Student', name?: string | null, last_name?: string | null, id_student: number } | null> | null };

export type GetStudentsByGroupQueryVariables = Exact<{
  idGroup: Scalars['Int'];
}>;


export type GetStudentsByGroupQuery = { __typename?: 'Query', studentsByGroup: Array<{ __typename?: 'Student', id_student: number, name?: string | null, last_name?: string | null, type_id?: number | null, identification?: string | null, sex?: string | null, direction?: string | null, phone?: string | null, guardian?: string | null, status?: string | null, birthday?: string | null, father?: string | null, mother?: string | null, email?: string | null } | null> };

export type GetSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id_course: number, name: string, id_teacher: number, hour: number } | null> };

export type TeachersQueryVariables = Exact<{ [key: string]: never; }>;


export type TeachersQuery = { __typename?: 'Query', teachers: Array<{ __typename?: 'Teacher', id_teacher: number, name?: string | null, last_name?: string | null, type_id?: number | null, identification?: string | null, direction?: string | null, phone?: string | null, email?: string | null, degree?: string | null } | null> };

export type SignInQueryVariables = Exact<{
  signInInput?: InputMaybe<SignInInput>;
}>;


export type SignInQuery = { __typename?: 'Query', signIn: { __typename?: 'Auth', token?: string | null, role?: string | null } };

export const RegularAchievementFragmentDoc = gql`
    fragment RegularAchievement on Achievement {
  id_course
  period
  description
}
    `;
export const RegularAreaFragmentDoc = gql`
    fragment RegularArea on Area {
  id_area
  name
  status
}
    `;
export const RegularCoursesFragmentDoc = gql`
    fragment RegularCourses on Group {
  id_group
  working_time
  representative
}
    `;
export const RegularInstitutionFragmentDoc = gql`
    fragment RegularInstitution on Institution {
  id_institution
  name
  direction
}
    `;
export const RegularLogoFragmentDoc = gql`
    fragment RegularLogo on Institution {
  logo
  id_institution
}
    `;
export const RegularQualificationTypeFragmentDoc = gql`
    fragment RegularQualificationType on TypeQualification {
  id_type_qual
  name
  floor_score
  ceiling_score
  year
}
    `;
export const RegularSetYearFragmentDoc = gql`
    fragment RegularSetYear on ScholarYear {
  id_year
  rector
  secretary
  comment
}
    `;
export const RegularStudentFragmentDoc = gql`
    fragment RegularStudent on Student {
  name
  last_name
  sex
  direction
  birthday
}
    `;
export const RegularSubjectFragmentDoc = gql`
    fragment RegularSubject on Course {
  id_course
  name
  id_teacher
  hour
}
    `;
export const RegularTeacherFragmentDoc = gql`
    fragment RegularTeacher on Teacher {
  id_teacher
  name
  last_name
  identification
  direction
  phone
  email
  degree
}
    `;
export const CreateAchievementDocument = gql`
    mutation CreateAchievement($createAchievementInput: CreateAchievementInput!) {
  createAchievement(createAchievementInput: $createAchievementInput) {
    description
    id_achievement
    id_course
    period
  }
}
    `;
export type CreateAchievementMutationFn = Apollo.MutationFunction<CreateAchievementMutation, CreateAchievementMutationVariables>;

/**
 * __useCreateAchievementMutation__
 *
 * To run a mutation, you first call `useCreateAchievementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAchievementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAchievementMutation, { data, loading, error }] = useCreateAchievementMutation({
 *   variables: {
 *      createAchievementInput: // value for 'createAchievementInput'
 *   },
 * });
 */
export function useCreateAchievementMutation(baseOptions?: Apollo.MutationHookOptions<CreateAchievementMutation, CreateAchievementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAchievementMutation, CreateAchievementMutationVariables>(CreateAchievementDocument, options);
      }
export type CreateAchievementMutationHookResult = ReturnType<typeof useCreateAchievementMutation>;
export type CreateAchievementMutationResult = Apollo.MutationResult<CreateAchievementMutation>;
export type CreateAchievementMutationOptions = Apollo.BaseMutationOptions<CreateAchievementMutation, CreateAchievementMutationVariables>;
export const CreateAreaDocument = gql`
    mutation createArea($createAreaInput: CreateAreaInput!) {
  createArea(createAreaInput: $createAreaInput) {
    id_area
    name
    status
  }
}
    `;
export type CreateAreaMutationFn = Apollo.MutationFunction<CreateAreaMutation, CreateAreaMutationVariables>;

/**
 * __useCreateAreaMutation__
 *
 * To run a mutation, you first call `useCreateAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAreaMutation, { data, loading, error }] = useCreateAreaMutation({
 *   variables: {
 *      createAreaInput: // value for 'createAreaInput'
 *   },
 * });
 */
export function useCreateAreaMutation(baseOptions?: Apollo.MutationHookOptions<CreateAreaMutation, CreateAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAreaMutation, CreateAreaMutationVariables>(CreateAreaDocument, options);
      }
export type CreateAreaMutationHookResult = ReturnType<typeof useCreateAreaMutation>;
export type CreateAreaMutationResult = Apollo.MutationResult<CreateAreaMutation>;
export type CreateAreaMutationOptions = Apollo.BaseMutationOptions<CreateAreaMutation, CreateAreaMutationVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($createCourseInput: CreateCourseInput!) {
  createCourse(createCourseInput: $createCourseInput) {
    id_course
    id_group
    id_teacher
    name
    position
    dim_codigo
    asi_dimension
    id_area
    hour
    average
    percentage
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      createCourseInput: // value for 'createCourseInput'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($createGroupInput: CreateGroupInput!) {
  createGroup(createGroupInput: $createGroupInput) {
    id_group
    id_year
    level
    sublevel
    working_time
    representative
    coursesCount
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      createGroupInput: // value for 'createGroupInput'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateQualificationTypeDocument = gql`
    mutation createQualificationType($createTypeQualificationInput: CreateTypeQualificationInput!) {
  createTypeQualification(
    createTypeQualificationInput: $createTypeQualificationInput
  ) {
    id_type_qual
  }
}
    `;
export type CreateQualificationTypeMutationFn = Apollo.MutationFunction<CreateQualificationTypeMutation, CreateQualificationTypeMutationVariables>;

/**
 * __useCreateQualificationTypeMutation__
 *
 * To run a mutation, you first call `useCreateQualificationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQualificationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQualificationTypeMutation, { data, loading, error }] = useCreateQualificationTypeMutation({
 *   variables: {
 *      createTypeQualificationInput: // value for 'createTypeQualificationInput'
 *   },
 * });
 */
export function useCreateQualificationTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateQualificationTypeMutation, CreateQualificationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQualificationTypeMutation, CreateQualificationTypeMutationVariables>(CreateQualificationTypeDocument, options);
      }
export type CreateQualificationTypeMutationHookResult = ReturnType<typeof useCreateQualificationTypeMutation>;
export type CreateQualificationTypeMutationResult = Apollo.MutationResult<CreateQualificationTypeMutation>;
export type CreateQualificationTypeMutationOptions = Apollo.BaseMutationOptions<CreateQualificationTypeMutation, CreateQualificationTypeMutationVariables>;
export const CreateSetYearDocument = gql`
    mutation CreateSetYear($createScholarYearInput: CreateScholarYearInput!) {
  createScholarYear(createScholarYearInput: $createScholarYearInput) {
    id_year
    rector
    secretary
    comment
  }
}
    `;
export type CreateSetYearMutationFn = Apollo.MutationFunction<CreateSetYearMutation, CreateSetYearMutationVariables>;

/**
 * __useCreateSetYearMutation__
 *
 * To run a mutation, you first call `useCreateSetYearMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetYearMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetYearMutation, { data, loading, error }] = useCreateSetYearMutation({
 *   variables: {
 *      createScholarYearInput: // value for 'createScholarYearInput'
 *   },
 * });
 */
export function useCreateSetYearMutation(baseOptions?: Apollo.MutationHookOptions<CreateSetYearMutation, CreateSetYearMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSetYearMutation, CreateSetYearMutationVariables>(CreateSetYearDocument, options);
      }
export type CreateSetYearMutationHookResult = ReturnType<typeof useCreateSetYearMutation>;
export type CreateSetYearMutationResult = Apollo.MutationResult<CreateSetYearMutation>;
export type CreateSetYearMutationOptions = Apollo.BaseMutationOptions<CreateSetYearMutation, CreateSetYearMutationVariables>;
export const CreateTeacherDocument = gql`
    mutation CreateTeacher($createTeacherInput: CreateTeacherInput!) {
  createTeacher(createTeacherInput: $createTeacherInput) {
    degree
  }
}
    `;
export type CreateTeacherMutationFn = Apollo.MutationFunction<CreateTeacherMutation, CreateTeacherMutationVariables>;

/**
 * __useCreateTeacherMutation__
 *
 * To run a mutation, you first call `useCreateTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeacherMutation, { data, loading, error }] = useCreateTeacherMutation({
 *   variables: {
 *      createTeacherInput: // value for 'createTeacherInput'
 *   },
 * });
 */
export function useCreateTeacherMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeacherMutation, CreateTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeacherMutation, CreateTeacherMutationVariables>(CreateTeacherDocument, options);
      }
export type CreateTeacherMutationHookResult = ReturnType<typeof useCreateTeacherMutation>;
export type CreateTeacherMutationResult = Apollo.MutationResult<CreateTeacherMutation>;
export type CreateTeacherMutationOptions = Apollo.BaseMutationOptions<CreateTeacherMutation, CreateTeacherMutationVariables>;
export const DeleteAchievementDocument = gql`
    mutation DeleteAchievement($idAchievement: Int!) {
  deleteAchievement(id_achievement: $idAchievement) {
    id_achievement
  }
}
    `;
export type DeleteAchievementMutationFn = Apollo.MutationFunction<DeleteAchievementMutation, DeleteAchievementMutationVariables>;

/**
 * __useDeleteAchievementMutation__
 *
 * To run a mutation, you first call `useDeleteAchievementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAchievementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAchievementMutation, { data, loading, error }] = useDeleteAchievementMutation({
 *   variables: {
 *      idAchievement: // value for 'idAchievement'
 *   },
 * });
 */
export function useDeleteAchievementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAchievementMutation, DeleteAchievementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAchievementMutation, DeleteAchievementMutationVariables>(DeleteAchievementDocument, options);
      }
export type DeleteAchievementMutationHookResult = ReturnType<typeof useDeleteAchievementMutation>;
export type DeleteAchievementMutationResult = Apollo.MutationResult<DeleteAchievementMutation>;
export type DeleteAchievementMutationOptions = Apollo.BaseMutationOptions<DeleteAchievementMutation, DeleteAchievementMutationVariables>;
export const DeleteAreaDocument = gql`
    mutation DeleteArea($idArea: Int!) {
  deleteArea(id_area: $idArea) {
    id_area
  }
}
    `;
export type DeleteAreaMutationFn = Apollo.MutationFunction<DeleteAreaMutation, DeleteAreaMutationVariables>;

/**
 * __useDeleteAreaMutation__
 *
 * To run a mutation, you first call `useDeleteAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAreaMutation, { data, loading, error }] = useDeleteAreaMutation({
 *   variables: {
 *      idArea: // value for 'idArea'
 *   },
 * });
 */
export function useDeleteAreaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAreaMutation, DeleteAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAreaMutation, DeleteAreaMutationVariables>(DeleteAreaDocument, options);
      }
export type DeleteAreaMutationHookResult = ReturnType<typeof useDeleteAreaMutation>;
export type DeleteAreaMutationResult = Apollo.MutationResult<DeleteAreaMutation>;
export type DeleteAreaMutationOptions = Apollo.BaseMutationOptions<DeleteAreaMutation, DeleteAreaMutationVariables>;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($idCourse: Int!) {
  deleteCourse(id_course: $idCourse) {
    id_course
    id_group
    id_teacher
    name
    position
    dim_codigo
    asi_dimension
    id_area
    hour
    average
    percentage
  }
}
    `;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      idCourse: // value for 'idCourse'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($idGroup: Int!) {
  deleteGroup(id_group: $idGroup) {
    id_group
    id_year
    level
    sublevel
    working_time
    representative
    coursesCount
  }
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      idGroup: // value for 'idGroup'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const DeleteQualificationTypeDocument = gql`
    mutation deleteQualificationType($idQualificationType: Int!) {
  deleteTypeQualification(id_type_qual: $idQualificationType) {
    id_type_qual
  }
}
    `;
export type DeleteQualificationTypeMutationFn = Apollo.MutationFunction<DeleteQualificationTypeMutation, DeleteQualificationTypeMutationVariables>;

/**
 * __useDeleteQualificationTypeMutation__
 *
 * To run a mutation, you first call `useDeleteQualificationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQualificationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQualificationTypeMutation, { data, loading, error }] = useDeleteQualificationTypeMutation({
 *   variables: {
 *      idQualificationType: // value for 'idQualificationType'
 *   },
 * });
 */
export function useDeleteQualificationTypeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQualificationTypeMutation, DeleteQualificationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQualificationTypeMutation, DeleteQualificationTypeMutationVariables>(DeleteQualificationTypeDocument, options);
      }
export type DeleteQualificationTypeMutationHookResult = ReturnType<typeof useDeleteQualificationTypeMutation>;
export type DeleteQualificationTypeMutationResult = Apollo.MutationResult<DeleteQualificationTypeMutation>;
export type DeleteQualificationTypeMutationOptions = Apollo.BaseMutationOptions<DeleteQualificationTypeMutation, DeleteQualificationTypeMutationVariables>;
export const DeleteSchoolarYearDocument = gql`
    mutation deleteSchoolarYear($id_year: Int!) {
  deleteScholarYear(id_year: $id_year) {
    id_year
  }
}
    `;
export type DeleteSchoolarYearMutationFn = Apollo.MutationFunction<DeleteSchoolarYearMutation, DeleteSchoolarYearMutationVariables>;

/**
 * __useDeleteSchoolarYearMutation__
 *
 * To run a mutation, you first call `useDeleteSchoolarYearMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSchoolarYearMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSchoolarYearMutation, { data, loading, error }] = useDeleteSchoolarYearMutation({
 *   variables: {
 *      id_year: // value for 'id_year'
 *   },
 * });
 */
export function useDeleteSchoolarYearMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSchoolarYearMutation, DeleteSchoolarYearMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSchoolarYearMutation, DeleteSchoolarYearMutationVariables>(DeleteSchoolarYearDocument, options);
      }
export type DeleteSchoolarYearMutationHookResult = ReturnType<typeof useDeleteSchoolarYearMutation>;
export type DeleteSchoolarYearMutationResult = Apollo.MutationResult<DeleteSchoolarYearMutation>;
export type DeleteSchoolarYearMutationOptions = Apollo.BaseMutationOptions<DeleteSchoolarYearMutation, DeleteSchoolarYearMutationVariables>;
export const DeleteTeacherDocument = gql`
    mutation DeleteTeacher($idDocente: Int!) {
  deleteTeacher(id_teacher: $idDocente) {
    id_teacher
  }
}
    `;
export type DeleteTeacherMutationFn = Apollo.MutationFunction<DeleteTeacherMutation, DeleteTeacherMutationVariables>;

/**
 * __useDeleteTeacherMutation__
 *
 * To run a mutation, you first call `useDeleteTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeacherMutation, { data, loading, error }] = useDeleteTeacherMutation({
 *   variables: {
 *      idDocente: // value for 'idDocente'
 *   },
 * });
 */
export function useDeleteTeacherMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeacherMutation, DeleteTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeacherMutation, DeleteTeacherMutationVariables>(DeleteTeacherDocument, options);
      }
export type DeleteTeacherMutationHookResult = ReturnType<typeof useDeleteTeacherMutation>;
export type DeleteTeacherMutationResult = Apollo.MutationResult<DeleteTeacherMutation>;
export type DeleteTeacherMutationOptions = Apollo.BaseMutationOptions<DeleteTeacherMutation, DeleteTeacherMutationVariables>;
export const UpdateAchievementDocument = gql`
    mutation UpdateAchievement($updateAchievementInput: UpdateAchievementInput!) {
  updateAchievement(updateAchievementInput: $updateAchievementInput) {
    description
    id_achievement
    id_course
    period
  }
}
    `;
export type UpdateAchievementMutationFn = Apollo.MutationFunction<UpdateAchievementMutation, UpdateAchievementMutationVariables>;

/**
 * __useUpdateAchievementMutation__
 *
 * To run a mutation, you first call `useUpdateAchievementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAchievementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAchievementMutation, { data, loading, error }] = useUpdateAchievementMutation({
 *   variables: {
 *      updateAchievementInput: // value for 'updateAchievementInput'
 *   },
 * });
 */
export function useUpdateAchievementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAchievementMutation, UpdateAchievementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAchievementMutation, UpdateAchievementMutationVariables>(UpdateAchievementDocument, options);
      }
export type UpdateAchievementMutationHookResult = ReturnType<typeof useUpdateAchievementMutation>;
export type UpdateAchievementMutationResult = Apollo.MutationResult<UpdateAchievementMutation>;
export type UpdateAchievementMutationOptions = Apollo.BaseMutationOptions<UpdateAchievementMutation, UpdateAchievementMutationVariables>;
export const UpdateAreaDocument = gql`
    mutation UpdateArea($updateAreaInput: UpdateAreaInput!) {
  updateArea(updateAreaInput: $updateAreaInput) {
    id_area
    name
    status
  }
}
    `;
export type UpdateAreaMutationFn = Apollo.MutationFunction<UpdateAreaMutation, UpdateAreaMutationVariables>;

/**
 * __useUpdateAreaMutation__
 *
 * To run a mutation, you first call `useUpdateAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAreaMutation, { data, loading, error }] = useUpdateAreaMutation({
 *   variables: {
 *      updateAreaInput: // value for 'updateAreaInput'
 *   },
 * });
 */
export function useUpdateAreaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAreaMutation, UpdateAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAreaMutation, UpdateAreaMutationVariables>(UpdateAreaDocument, options);
      }
export type UpdateAreaMutationHookResult = ReturnType<typeof useUpdateAreaMutation>;
export type UpdateAreaMutationResult = Apollo.MutationResult<UpdateAreaMutation>;
export type UpdateAreaMutationOptions = Apollo.BaseMutationOptions<UpdateAreaMutation, UpdateAreaMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($updateCourseInput: UpdateCourseInput!) {
  updateCourse(updateCourseInput: $updateCourseInput) {
    id_course
    id_group
    id_teacher
    name
    position
    dim_codigo
    asi_dimension
    id_area
    hour
    average
    percentage
  }
}
    `;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      updateCourseInput: // value for 'updateCourseInput'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation UpdateGroup($updateGroupInput: UpdateGroupInput!) {
  updateGroup(updateGroupInput: $updateGroupInput) {
    id_group
    id_year
    level
    sublevel
    working_time
    representative
    coursesCount
  }
}
    `;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      updateGroupInput: // value for 'updateGroupInput'
 *   },
 * });
 */
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateQualificationsDocument = gql`
    mutation UpdateQualifications($updateQualificationsInput: UpdateQualificationsInput!) {
  updateQualifications(updateQualificationsInput: $updateQualificationsInput) {
    id_achie_stu
    id_achievement
    id_student
    score
  }
}
    `;
export type UpdateQualificationsMutationFn = Apollo.MutationFunction<UpdateQualificationsMutation, UpdateQualificationsMutationVariables>;

/**
 * __useUpdateQualificationsMutation__
 *
 * To run a mutation, you first call `useUpdateQualificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQualificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQualificationsMutation, { data, loading, error }] = useUpdateQualificationsMutation({
 *   variables: {
 *      updateQualificationsInput: // value for 'updateQualificationsInput'
 *   },
 * });
 */
export function useUpdateQualificationsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQualificationsMutation, UpdateQualificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQualificationsMutation, UpdateQualificationsMutationVariables>(UpdateQualificationsDocument, options);
      }
export type UpdateQualificationsMutationHookResult = ReturnType<typeof useUpdateQualificationsMutation>;
export type UpdateQualificationsMutationResult = Apollo.MutationResult<UpdateQualificationsMutation>;
export type UpdateQualificationsMutationOptions = Apollo.BaseMutationOptions<UpdateQualificationsMutation, UpdateQualificationsMutationVariables>;
export const UpdateScholarYearDocument = gql`
    mutation UpdateScholarYear($updateScholarYearInput: UpdateScholarYearInput!) {
  updateScholarYear(updateScholarYearInput: $updateScholarYearInput) {
    id_year
    rector
    secretary
    comment
  }
}
    `;
export type UpdateScholarYearMutationFn = Apollo.MutationFunction<UpdateScholarYearMutation, UpdateScholarYearMutationVariables>;

/**
 * __useUpdateScholarYearMutation__
 *
 * To run a mutation, you first call `useUpdateScholarYearMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScholarYearMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScholarYearMutation, { data, loading, error }] = useUpdateScholarYearMutation({
 *   variables: {
 *      updateScholarYearInput: // value for 'updateScholarYearInput'
 *   },
 * });
 */
export function useUpdateScholarYearMutation(baseOptions?: Apollo.MutationHookOptions<UpdateScholarYearMutation, UpdateScholarYearMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateScholarYearMutation, UpdateScholarYearMutationVariables>(UpdateScholarYearDocument, options);
      }
export type UpdateScholarYearMutationHookResult = ReturnType<typeof useUpdateScholarYearMutation>;
export type UpdateScholarYearMutationResult = Apollo.MutationResult<UpdateScholarYearMutation>;
export type UpdateScholarYearMutationOptions = Apollo.BaseMutationOptions<UpdateScholarYearMutation, UpdateScholarYearMutationVariables>;
export const UpdateTeacherDocument = gql`
    mutation UpdateTeacher($updateTeacherInput: UpdateTeacherInput!) {
  updateTeacher(updateTeacherInput: $updateTeacherInput) {
    id_teacher
  }
}
    `;
export type UpdateTeacherMutationFn = Apollo.MutationFunction<UpdateTeacherMutation, UpdateTeacherMutationVariables>;

/**
 * __useUpdateTeacherMutation__
 *
 * To run a mutation, you first call `useUpdateTeacherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeacherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeacherMutation, { data, loading, error }] = useUpdateTeacherMutation({
 *   variables: {
 *      updateTeacherInput: // value for 'updateTeacherInput'
 *   },
 * });
 */
export function useUpdateTeacherMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeacherMutation, UpdateTeacherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeacherMutation, UpdateTeacherMutationVariables>(UpdateTeacherDocument, options);
      }
export type UpdateTeacherMutationHookResult = ReturnType<typeof useUpdateTeacherMutation>;
export type UpdateTeacherMutationResult = Apollo.MutationResult<UpdateTeacherMutation>;
export type UpdateTeacherMutationOptions = Apollo.BaseMutationOptions<UpdateTeacherMutation, UpdateTeacherMutationVariables>;
export const GenerateReportAreaDocument = gql`
    query GenerateReportArea($generateReportAreaInput: GenerateReportAreaInput) {
  generateReportArea(generateReportAreaInput: $generateReportAreaInput) {
    report_content
  }
}
    `;

/**
 * __useGenerateReportAreaQuery__
 *
 * To run a query within a React component, call `useGenerateReportAreaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateReportAreaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateReportAreaQuery({
 *   variables: {
 *      generateReportAreaInput: // value for 'generateReportAreaInput'
 *   },
 * });
 */
export function useGenerateReportAreaQuery(baseOptions?: Apollo.QueryHookOptions<GenerateReportAreaQuery, GenerateReportAreaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateReportAreaQuery, GenerateReportAreaQueryVariables>(GenerateReportAreaDocument, options);
      }
export function useGenerateReportAreaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateReportAreaQuery, GenerateReportAreaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateReportAreaQuery, GenerateReportAreaQueryVariables>(GenerateReportAreaDocument, options);
        }
export type GenerateReportAreaQueryHookResult = ReturnType<typeof useGenerateReportAreaQuery>;
export type GenerateReportAreaLazyQueryHookResult = ReturnType<typeof useGenerateReportAreaLazyQuery>;
export type GenerateReportAreaQueryResult = Apollo.QueryResult<GenerateReportAreaQuery, GenerateReportAreaQueryVariables>;
export const GenerateReportDocument = gql`
    query GenerateReport($generateStudentsListInput: GenerateStudentsListInput) {
  generateReport(generateStudentsListInput: $generateStudentsListInput) {
    report_content
  }
}
    `;

/**
 * __useGenerateReportQuery__
 *
 * To run a query within a React component, call `useGenerateReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateReportQuery({
 *   variables: {
 *      generateStudentsListInput: // value for 'generateStudentsListInput'
 *   },
 * });
 */
export function useGenerateReportQuery(baseOptions?: Apollo.QueryHookOptions<GenerateReportQuery, GenerateReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateReportQuery, GenerateReportQueryVariables>(GenerateReportDocument, options);
      }
export function useGenerateReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateReportQuery, GenerateReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateReportQuery, GenerateReportQueryVariables>(GenerateReportDocument, options);
        }
export type GenerateReportQueryHookResult = ReturnType<typeof useGenerateReportQuery>;
export type GenerateReportLazyQueryHookResult = ReturnType<typeof useGenerateReportLazyQuery>;
export type GenerateReportQueryResult = Apollo.QueryResult<GenerateReportQuery, GenerateReportQueryVariables>;
export const AchievementsDocument = gql`
    query Achievements($filterAchievementInput: FilterAchievementInput) {
  achievements(filterAchievementInput: $filterAchievementInput) {
    id_achievement
    id_course
    period
    description
  }
}
    `;

/**
 * __useAchievementsQuery__
 *
 * To run a query within a React component, call `useAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAchievementsQuery({
 *   variables: {
 *      filterAchievementInput: // value for 'filterAchievementInput'
 *   },
 * });
 */
export function useAchievementsQuery(baseOptions?: Apollo.QueryHookOptions<AchievementsQuery, AchievementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AchievementsQuery, AchievementsQueryVariables>(AchievementsDocument, options);
      }
export function useAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AchievementsQuery, AchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AchievementsQuery, AchievementsQueryVariables>(AchievementsDocument, options);
        }
export type AchievementsQueryHookResult = ReturnType<typeof useAchievementsQuery>;
export type AchievementsLazyQueryHookResult = ReturnType<typeof useAchievementsLazyQuery>;
export type AchievementsQueryResult = Apollo.QueryResult<AchievementsQuery, AchievementsQueryVariables>;
export const GetAreasDocument = gql`
    query GetAreas {
  areas {
    ...RegularArea
  }
}
    ${RegularAreaFragmentDoc}`;

/**
 * __useGetAreasQuery__
 *
 * To run a query within a React component, call `useGetAreasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAreasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAreasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAreasQuery(baseOptions?: Apollo.QueryHookOptions<GetAreasQuery, GetAreasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAreasQuery, GetAreasQueryVariables>(GetAreasDocument, options);
      }
export function useGetAreasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAreasQuery, GetAreasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAreasQuery, GetAreasQueryVariables>(GetAreasDocument, options);
        }
export type GetAreasQueryHookResult = ReturnType<typeof useGetAreasQuery>;
export type GetAreasLazyQueryHookResult = ReturnType<typeof useGetAreasLazyQuery>;
export type GetAreasQueryResult = Apollo.QueryResult<GetAreasQuery, GetAreasQueryVariables>;
export const CoursesDocument = gql`
    query Courses($filterCourseInput: FilterCourseInput) {
  courses(filterCourseInput: $filterCourseInput) {
    id_course
    id_group
    id_teacher
    name
    position
    dim_codigo
    asi_dimension
    id_area
    hour
    average
    percentage
    teacher {
      name
    }
  }
}
    `;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *      filterCourseInput: // value for 'filterCourseInput'
 *   },
 * });
 */
export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const GroupsDocument = gql`
    query Groups($filterGroupInput: FilterGroupInput) {
  groups(filterGroupInput: $filterGroupInput) {
    id_group
    level
    sublevel
    working_time
    representative
    coursesCount
  }
}
    `;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *      filterGroupInput: // value for 'filterGroupInput'
 *   },
 * });
 */
export function useGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
      }
export function useGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<GroupsQuery, GroupsQueryVariables>;
export const GetInstitutionsDocument = gql`
    query GetInstitutions {
  institutions {
    ...RegularInstitution
  }
}
    ${RegularInstitutionFragmentDoc}`;

/**
 * __useGetInstitutionsQuery__
 *
 * To run a query within a React component, call `useGetInstitutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInstitutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInstitutionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInstitutionsQuery(baseOptions?: Apollo.QueryHookOptions<GetInstitutionsQuery, GetInstitutionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInstitutionsQuery, GetInstitutionsQueryVariables>(GetInstitutionsDocument, options);
      }
export function useGetInstitutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInstitutionsQuery, GetInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInstitutionsQuery, GetInstitutionsQueryVariables>(GetInstitutionsDocument, options);
        }
export type GetInstitutionsQueryHookResult = ReturnType<typeof useGetInstitutionsQuery>;
export type GetInstitutionsLazyQueryHookResult = ReturnType<typeof useGetInstitutionsLazyQuery>;
export type GetInstitutionsQueryResult = Apollo.QueryResult<GetInstitutionsQuery, GetInstitutionsQueryVariables>;
export const GetLogoDocument = gql`
    query GetLogo {
  institutions {
    ...RegularLogo
  }
}
    ${RegularLogoFragmentDoc}`;

/**
 * __useGetLogoQuery__
 *
 * To run a query within a React component, call `useGetLogoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLogoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLogoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLogoQuery(baseOptions?: Apollo.QueryHookOptions<GetLogoQuery, GetLogoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLogoQuery, GetLogoQueryVariables>(GetLogoDocument, options);
      }
export function useGetLogoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLogoQuery, GetLogoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLogoQuery, GetLogoQueryVariables>(GetLogoDocument, options);
        }
export type GetLogoQueryHookResult = ReturnType<typeof useGetLogoQuery>;
export type GetLogoLazyQueryHookResult = ReturnType<typeof useGetLogoLazyQuery>;
export type GetLogoQueryResult = Apollo.QueryResult<GetLogoQuery, GetLogoQueryVariables>;
export const GetQualificationDocument = gql`
    query GetQualification {
  typeQualifications {
    ...RegularQualificationType
  }
}
    ${RegularQualificationTypeFragmentDoc}`;

/**
 * __useGetQualificationQuery__
 *
 * To run a query within a React component, call `useGetQualificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQualificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQualificationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetQualificationQuery(baseOptions?: Apollo.QueryHookOptions<GetQualificationQuery, GetQualificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQualificationQuery, GetQualificationQueryVariables>(GetQualificationDocument, options);
      }
export function useGetQualificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQualificationQuery, GetQualificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQualificationQuery, GetQualificationQueryVariables>(GetQualificationDocument, options);
        }
export type GetQualificationQueryHookResult = ReturnType<typeof useGetQualificationQuery>;
export type GetQualificationLazyQueryHookResult = ReturnType<typeof useGetQualificationLazyQuery>;
export type GetQualificationQueryResult = Apollo.QueryResult<GetQualificationQuery, GetQualificationQueryVariables>;
export const GetSchoolarYearsDocument = gql`
    query GetSchoolarYears {
  scholarYears {
    ...RegularSetYear
  }
}
    ${RegularSetYearFragmentDoc}`;

/**
 * __useGetSchoolarYearsQuery__
 *
 * To run a query within a React component, call `useGetSchoolarYearsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolarYearsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolarYearsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSchoolarYearsQuery(baseOptions?: Apollo.QueryHookOptions<GetSchoolarYearsQuery, GetSchoolarYearsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchoolarYearsQuery, GetSchoolarYearsQueryVariables>(GetSchoolarYearsDocument, options);
      }
export function useGetSchoolarYearsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolarYearsQuery, GetSchoolarYearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchoolarYearsQuery, GetSchoolarYearsQueryVariables>(GetSchoolarYearsDocument, options);
        }
export type GetSchoolarYearsQueryHookResult = ReturnType<typeof useGetSchoolarYearsQuery>;
export type GetSchoolarYearsLazyQueryHookResult = ReturnType<typeof useGetSchoolarYearsLazyQuery>;
export type GetSchoolarYearsQueryResult = Apollo.QueryResult<GetSchoolarYearsQuery, GetSchoolarYearsQueryVariables>;
export const StudentByIdDocument = gql`
    query StudentByID($idStudent: Int!) {
  studentByID(id_student: $idStudent) {
    id_student
    name
    last_name
    type_id
    identification
    sex
    direction
    phone
    guardian
    status
    birthday
    father
    mother
    email
    groups {
      sublevel
      level
      id_group
      courses {
        teacher
        name
        id_course
        definitives {
          score1
          score2
          score3
          score4
        }
      }
    }
  }
}
    `;

/**
 * __useStudentByIdQuery__
 *
 * To run a query within a React component, call `useStudentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentByIdQuery({
 *   variables: {
 *      idStudent: // value for 'idStudent'
 *   },
 * });
 */
export function useStudentByIdQuery(baseOptions: Apollo.QueryHookOptions<StudentByIdQuery, StudentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentByIdQuery, StudentByIdQueryVariables>(StudentByIdDocument, options);
      }
export function useStudentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentByIdQuery, StudentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentByIdQuery, StudentByIdQueryVariables>(StudentByIdDocument, options);
        }
export type StudentByIdQueryHookResult = ReturnType<typeof useStudentByIdQuery>;
export type StudentByIdLazyQueryHookResult = ReturnType<typeof useStudentByIdLazyQuery>;
export type StudentByIdQueryResult = Apollo.QueryResult<StudentByIdQuery, StudentByIdQueryVariables>;
export const GetStudentQualificationsDocument = gql`
    query GetStudentQualifications($filterQualificationInput: FilterQualificationInput) {
  studentQualifications(filterQualificationInput: $filterQualificationInput) {
    student
    qualifications {
      score
      id_achievement
      id_student
      id_achie_stu
    }
  }
}
    `;

/**
 * __useGetStudentQualificationsQuery__
 *
 * To run a query within a React component, call `useGetStudentQualificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentQualificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentQualificationsQuery({
 *   variables: {
 *      filterQualificationInput: // value for 'filterQualificationInput'
 *   },
 * });
 */
export function useGetStudentQualificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetStudentQualificationsQuery, GetStudentQualificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentQualificationsQuery, GetStudentQualificationsQueryVariables>(GetStudentQualificationsDocument, options);
      }
export function useGetStudentQualificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentQualificationsQuery, GetStudentQualificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentQualificationsQuery, GetStudentQualificationsQueryVariables>(GetStudentQualificationsDocument, options);
        }
export type GetStudentQualificationsQueryHookResult = ReturnType<typeof useGetStudentQualificationsQuery>;
export type GetStudentQualificationsLazyQueryHookResult = ReturnType<typeof useGetStudentQualificationsLazyQuery>;
export type GetStudentQualificationsQueryResult = Apollo.QueryResult<GetStudentQualificationsQuery, GetStudentQualificationsQueryVariables>;
export const GetStudentsDocument = gql`
    query GetStudents($filterStudentInput: FilterStudentInput) {
  students(filterStudentInput: $filterStudentInput) {
    name
    last_name
    id_student
  }
}
    `;

/**
 * __useGetStudentsQuery__
 *
 * To run a query within a React component, call `useGetStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentsQuery({
 *   variables: {
 *      filterStudentInput: // value for 'filterStudentInput'
 *   },
 * });
 */
export function useGetStudentsQuery(baseOptions?: Apollo.QueryHookOptions<GetStudentsQuery, GetStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentsQuery, GetStudentsQueryVariables>(GetStudentsDocument, options);
      }
export function useGetStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentsQuery, GetStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentsQuery, GetStudentsQueryVariables>(GetStudentsDocument, options);
        }
export type GetStudentsQueryHookResult = ReturnType<typeof useGetStudentsQuery>;
export type GetStudentsLazyQueryHookResult = ReturnType<typeof useGetStudentsLazyQuery>;
export type GetStudentsQueryResult = Apollo.QueryResult<GetStudentsQuery, GetStudentsQueryVariables>;
export const GetStudentsByGroupDocument = gql`
    query GetStudentsByGroup($idGroup: Int!) {
  studentsByGroup(id_group: $idGroup) {
    id_student
    name
    last_name
    type_id
    identification
    sex
    direction
    phone
    guardian
    status
    birthday
    father
    mother
    email
  }
}
    `;

/**
 * __useGetStudentsByGroupQuery__
 *
 * To run a query within a React component, call `useGetStudentsByGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentsByGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentsByGroupQuery({
 *   variables: {
 *      idGroup: // value for 'idGroup'
 *   },
 * });
 */
export function useGetStudentsByGroupQuery(baseOptions: Apollo.QueryHookOptions<GetStudentsByGroupQuery, GetStudentsByGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentsByGroupQuery, GetStudentsByGroupQueryVariables>(GetStudentsByGroupDocument, options);
      }
export function useGetStudentsByGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentsByGroupQuery, GetStudentsByGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentsByGroupQuery, GetStudentsByGroupQueryVariables>(GetStudentsByGroupDocument, options);
        }
export type GetStudentsByGroupQueryHookResult = ReturnType<typeof useGetStudentsByGroupQuery>;
export type GetStudentsByGroupLazyQueryHookResult = ReturnType<typeof useGetStudentsByGroupLazyQuery>;
export type GetStudentsByGroupQueryResult = Apollo.QueryResult<GetStudentsByGroupQuery, GetStudentsByGroupQueryVariables>;
export const GetSubjectsDocument = gql`
    query GetSubjects {
  courses {
    ...RegularSubject
  }
}
    ${RegularSubjectFragmentDoc}`;

/**
 * __useGetSubjectsQuery__
 *
 * To run a query within a React component, call `useGetSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
      }
export function useGetSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
        }
export type GetSubjectsQueryHookResult = ReturnType<typeof useGetSubjectsQuery>;
export type GetSubjectsLazyQueryHookResult = ReturnType<typeof useGetSubjectsLazyQuery>;
export type GetSubjectsQueryResult = Apollo.QueryResult<GetSubjectsQuery, GetSubjectsQueryVariables>;
export const TeachersDocument = gql`
    query Teachers {
  teachers {
    id_teacher
    name
    last_name
    type_id
    identification
    direction
    phone
    email
    degree
  }
}
    `;

/**
 * __useTeachersQuery__
 *
 * To run a query within a React component, call `useTeachersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeachersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeachersQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeachersQuery(baseOptions?: Apollo.QueryHookOptions<TeachersQuery, TeachersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeachersQuery, TeachersQueryVariables>(TeachersDocument, options);
      }
export function useTeachersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeachersQuery, TeachersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeachersQuery, TeachersQueryVariables>(TeachersDocument, options);
        }
export type TeachersQueryHookResult = ReturnType<typeof useTeachersQuery>;
export type TeachersLazyQueryHookResult = ReturnType<typeof useTeachersLazyQuery>;
export type TeachersQueryResult = Apollo.QueryResult<TeachersQuery, TeachersQueryVariables>;
export const SignInDocument = gql`
    query SignIn($signInInput: SignInInput) {
  signIn(signInInput: $signInInput) {
    token
    role
  }
}
    `;

/**
 * __useSignInQuery__
 *
 * To run a query within a React component, call `useSignInQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignInQuery({
 *   variables: {
 *      signInInput: // value for 'signInInput'
 *   },
 * });
 */
export function useSignInQuery(baseOptions?: Apollo.QueryHookOptions<SignInQuery, SignInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
      }
export function useSignInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignInQuery, SignInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
        }
export type SignInQueryHookResult = ReturnType<typeof useSignInQuery>;
export type SignInLazyQueryHookResult = ReturnType<typeof useSignInLazyQuery>;
export type SignInQueryResult = Apollo.QueryResult<SignInQuery, SignInQueryVariables>;