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
  id_absence?: Maybe<Scalars['Int']>;
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

export type AchievementStudent = {
  __typename?: 'AchievementStudent';
  id_achie_stu: Scalars['Int'];
  id_achievement?: Maybe<Scalars['Int']>;
  id_student?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Float']>;
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
  asi_dimension?: Maybe<Scalars['String']>;
  average?: Maybe<Scalars['String']>;
  dim_codigo?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  id_area?: Maybe<Scalars['Int']>;
  id_course: Scalars['Int'];
  id_group?: Maybe<Scalars['Int']>;
  id_teacher?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  percentage?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type CourseStudent = {
  __typename?: 'CourseStudent';
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

export type Group = {
  __typename?: 'Group';
  id_group: Scalars['Int'];
  id_year?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  representative?: Maybe<Scalars['String']>;
  sublevel?: Maybe<Scalars['String']>;
  working_time?: Maybe<Scalars['String']>;
};

export type IndicatorStudent = {
  __typename?: 'IndicatorStudent';
  id_ind_stu: Scalars['Int'];
  id_indicator?: Maybe<Scalars['Int']>;
  id_student?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['String']>;
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
  createAchievementStudent: AchievementStudent;
  createArea: Area;
  createCourse: Course;
  createCourseStudent: CourseStudent;
  createEnrollment: Enrollment;
  createFeatured: Featured;
  createGroup: Group;
  createIndicatorStudent: IndicatorStudent;
  createObservation: Observation;
  createRecommendation: Recommendation;
  createRecommendationStudent: RecommendationStudent;
  createScholarYear: ScholarYear;
  createStudent: Student;
  createTeacher: Teacher;
  createTypeQualification: TypeQualification;
  createUser: User;
  deleteAbsence: Absence;
  deleteAchievement: Achievement;
  deleteAchievementStudent: AchievementStudent;
  deleteArea: Area;
  deleteCourse: Course;
  deleteCourseStudent: CourseStudent;
  deleteEnrollment: Enrollment;
  deleteFeatured: Featured;
  deleteGroup: Group;
  deleteIndicatorStudent: IndicatorStudent;
  deleteObservation: Observation;
  deleteRecommendation: Recommendation;
  deleteRecommendationStudent: RecommendationStudent;
  deleteScholarYear: ScholarYear;
  deleteStudent: Student;
  deleteTeacher: Teacher;
  deleteTypeQualification: TypeQualification;
  deleteUser: User;
  updateAbsence: Absence;
  updateAchievement: Achievement;
  updateAchievementStudent: AchievementStudent;
  updateArea: Area;
  updateCourse: Course;
  updateCourseStudent: CourseStudent;
  updateEnrollment: Enrollment;
  updateFeatured: Featured;
  updateGroup: Group;
  updateIndicatorStudent: IndicatorStudent;
  updateObservation: Observation;
  updateRecommendation: Recommendation;
  updateRecommendationStudent: RecommendationStudent;
  updateScholarYear: ScholarYear;
  updateStudent: Student;
  updateTeacher: Teacher;
  updateTypeQualification: TypeQualification;
  updateUser: User;
};


export type MutationCreateAbsenceArgs = {
  day?: InputMaybe<Scalars['Int']>;
  hours?: InputMaybe<Scalars['Int']>;
  id_absence?: InputMaybe<Scalars['Int']>;
  id_course?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  justification?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
  reason?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateAchievementArgs = {
  description: Scalars['String'];
  id_course: Scalars['Int'];
  period: Scalars['Int'];
};


export type MutationCreateAchievementStudentArgs = {
  id_achievement?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Float']>;
};


export type MutationCreateAreaArgs = {
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type MutationCreateCourseArgs = {
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


export type MutationCreateCourseStudentArgs = {
  id_course?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score1?: InputMaybe<Scalars['String']>;
  score2?: InputMaybe<Scalars['String']>;
  score3?: InputMaybe<Scalars['String']>;
  score4?: InputMaybe<Scalars['String']>;
  score5?: InputMaybe<Scalars['String']>;
};


export type MutationCreateEnrollmentArgs = {
  date_desertion?: InputMaybe<Scalars['String']>;
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  reason_desertion?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateFeaturedArgs = {
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateGroupArgs = {
  id_year?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  representative?: InputMaybe<Scalars['String']>;
  sublevel?: InputMaybe<Scalars['String']>;
  working_time?: InputMaybe<Scalars['String']>;
};


export type MutationCreateIndicatorStudentArgs = {
  id_indicator?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
};


export type MutationCreateObservationArgs = {
  description?: InputMaybe<Scalars['String']>;
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
  period?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationCreateRecommendationArgs = {
  description: Scalars['String'];
  id_course: Scalars['Int'];
  period: Scalars['Int'];
};


export type MutationCreateRecommendationStudentArgs = {
  id_recommendation?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateScholarYearArgs = {
  comment?: InputMaybe<Scalars['String']>;
  id_year: Scalars['Int'];
  rector?: InputMaybe<Scalars['String']>;
  secretary?: InputMaybe<Scalars['String']>;
};


export type MutationCreateStudentArgs = {
  birthday?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  father?: InputMaybe<Scalars['String']>;
  guardian?: InputMaybe<Scalars['String']>;
  identification?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  mother?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateTeacherArgs = {
  degree?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  identification?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateTypeQualificationArgs = {
  ceiling_score?: InputMaybe<Scalars['Float']>;
  floor_score?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateUserArgs = {
  belongs?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  typeu?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteAbsenceArgs = {
  id_absence: Scalars['Int'];
};


export type MutationDeleteAchievementArgs = {
  id_achievement: Scalars['Int'];
};


export type MutationDeleteAchievementStudentArgs = {
  id_achie_stu: Scalars['Int'];
};


export type MutationDeleteAreaArgs = {
  id_area: Scalars['Int'];
};


export type MutationDeleteCourseArgs = {
  id_course: Scalars['Int'];
};


export type MutationDeleteCourseStudentArgs = {
  id_cour_stu: Scalars['Int'];
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


export type MutationDeleteIndicatorStudentArgs = {
  id_ind_stu: Scalars['Int'];
};


export type MutationDeleteObservationArgs = {
  id_observation: Scalars['Int'];
};


export type MutationDeleteRecommendationArgs = {
  id_recommendation: Scalars['Int'];
};


export type MutationDeleteRecommendationStudentArgs = {
  id_rec_stu: Scalars['Int'];
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


export type MutationDeleteUserArgs = {
  id_user: Scalars['Int'];
};


export type MutationUpdateAbsenceArgs = {
  day?: InputMaybe<Scalars['Int']>;
  hours?: InputMaybe<Scalars['Int']>;
  id_absence: Scalars['Int'];
  id_course?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  justification?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
  reason?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateAchievementArgs = {
  description?: InputMaybe<Scalars['String']>;
  id_achievement: Scalars['Int'];
  id_course?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateAchievementStudentArgs = {
  id_achie_stu: Scalars['Int'];
  id_achievement?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Float']>;
};


export type MutationUpdateAreaArgs = {
  id_area: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCourseArgs = {
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


export type MutationUpdateCourseStudentArgs = {
  id_cour_stu: Scalars['Int'];
  id_course?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score1?: InputMaybe<Scalars['String']>;
  score2?: InputMaybe<Scalars['String']>;
  score3?: InputMaybe<Scalars['String']>;
  score4?: InputMaybe<Scalars['String']>;
  score5?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateEnrollmentArgs = {
  date_desertion?: InputMaybe<Scalars['String']>;
  id_enrollment: Scalars['Int'];
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  reason_desertion?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateFeaturedArgs = {
  id_featured: Scalars['Int'];
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateGroupArgs = {
  id_group: Scalars['Int'];
  id_year?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  representative?: InputMaybe<Scalars['String']>;
  sublevel?: InputMaybe<Scalars['String']>;
  working_time?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateIndicatorStudentArgs = {
  id_ind_stu: Scalars['Int'];
  id_indicator?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateObservationArgs = {
  description?: InputMaybe<Scalars['String']>;
  id_group?: InputMaybe<Scalars['Int']>;
  id_observation: Scalars['Int'];
  id_student?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
  period?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateRecommendationArgs = {
  description?: InputMaybe<Scalars['String']>;
  id_course?: InputMaybe<Scalars['Int']>;
  id_recommendation: Scalars['Int'];
  period?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateRecommendationStudentArgs = {
  id_rec_stu: Scalars['Int'];
  id_recommendation?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateScholarYearArgs = {
  comment?: InputMaybe<Scalars['String']>;
  id_year: Scalars['Int'];
  rector?: InputMaybe<Scalars['String']>;
  secretary?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateStudentArgs = {
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


export type MutationUpdateTeacherArgs = {
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


export type MutationUpdateTypeQualificationArgs = {
  ceiling_score?: InputMaybe<Scalars['Float']>;
  floor_score?: InputMaybe<Scalars['Float']>;
  id_type_qual: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateUserArgs = {
  belongs?: InputMaybe<Scalars['String']>;
  id_user: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  typeu?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

export type Observation = {
  __typename?: 'Observation';
  description?: Maybe<Scalars['String']>;
  id_group?: Maybe<Scalars['Int']>;
  id_observation: Scalars['Int'];
  id_student?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  absenceByID: Absence;
  absences: Array<Maybe<Absence>>;
  achievementByID: Achievement;
  achievementStudents: Array<Maybe<AchievementStudent>>;
  achievementStudentsByID: AchievementStudent;
  achievements: Array<Maybe<Achievement>>;
  areaByID: Area;
  areas: Array<Maybe<Area>>;
  courseByID: Course;
  courseStudents: Array<Maybe<CourseStudent>>;
  courseStudentsByID: CourseStudent;
  courses: Array<Maybe<Course>>;
  enrollmentByID: Enrollment;
  enrollments: Array<Maybe<Enrollment>>;
  featured: Array<Maybe<Featured>>;
  featuredByID: Featured;
  groupByID: Group;
  groups: Array<Maybe<Group>>;
  indicatorStudentByID: IndicatorStudent;
  indicatorStudents: Array<Maybe<IndicatorStudent>>;
  institutions: Array<Maybe<Institution>>;
  observationByID: Observation;
  observations: Array<Maybe<Observation>>;
  pdfGenerate: Respuesta;
  recommendationByID: Recommendation;
  recommendationStudentByID: RecommendationStudent;
  recommendationStudents: Array<Maybe<RecommendationStudent>>;
  recommendations: Array<Maybe<Recommendation>>;
  scholarYearByID: ScholarYear;
  scholarYears: Array<Maybe<ScholarYear>>;
  signin: Auth;
  studentByID: Student;
  students: Array<Maybe<Student>>;
  teacherByID: Teacher;
  teachers: Array<Maybe<Teacher>>;
  typeQualificationByID: TypeQualification;
  typeQualifications: Array<Maybe<TypeQualification>>;
  userByID: User;
  users: Array<Maybe<User>>;
};


export type QueryAbsenceByIdArgs = {
  id_absence?: InputMaybe<Scalars['Int']>;
};


export type QueryAbsencesArgs = {
  day?: InputMaybe<Scalars['Int']>;
  hours?: InputMaybe<Scalars['Int']>;
  id_absence?: InputMaybe<Scalars['Int']>;
  id_course?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  justification?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
  reason?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryAchievementByIdArgs = {
  id_achievement: Scalars['Int'];
};


export type QueryAchievementStudentsArgs = {
  id_achievement?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Float']>;
};


export type QueryAchievementStudentsByIdArgs = {
  id_achie_stu: Scalars['Int'];
};


export type QueryAchievementsArgs = {
  description?: InputMaybe<Scalars['String']>;
  id_course?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
};


export type QueryAreaByIdArgs = {
  id_area: Scalars['Int'];
};


export type QueryAreasArgs = {
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type QueryCourseByIdArgs = {
  id_course: Scalars['Int'];
};


export type QueryCourseStudentsArgs = {
  id_course?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score1?: InputMaybe<Scalars['String']>;
  score2?: InputMaybe<Scalars['String']>;
  score3?: InputMaybe<Scalars['String']>;
  score4?: InputMaybe<Scalars['String']>;
  score5?: InputMaybe<Scalars['String']>;
};


export type QueryCourseStudentsByIdArgs = {
  id_cour_stu: Scalars['Int'];
};


export type QueryCoursesArgs = {
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


export type QueryEnrollmentByIdArgs = {
  id_enrollment: Scalars['Int'];
};


export type QueryEnrollmentsArgs = {
  date_desertion?: InputMaybe<Scalars['String']>;
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  reason_desertion?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryFeaturedArgs = {
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
};


export type QueryFeaturedByIdArgs = {
  id_featured: Scalars['Int'];
};


export type QueryGroupByIdArgs = {
  id_group: Scalars['Int'];
};


export type QueryGroupsArgs = {
  id_year?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  representative?: InputMaybe<Scalars['String']>;
  sublevel?: InputMaybe<Scalars['String']>;
  working_time?: InputMaybe<Scalars['String']>;
};


export type QueryIndicatorStudentByIdArgs = {
  id_ind_stu: Scalars['Int'];
};


export type QueryIndicatorStudentsArgs = {
  id_indicator?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['String']>;
};


export type QueryObservationByIdArgs = {
  id_observation: Scalars['Int'];
};


export type QueryObservationsArgs = {
  description?: InputMaybe<Scalars['String']>;
  id_group?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
  period?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};


export type QueryRecommendationByIdArgs = {
  id_recommendation: Scalars['Int'];
};


export type QueryRecommendationStudentByIdArgs = {
  id_rec_stu: Scalars['Int'];
};


export type QueryRecommendationStudentsArgs = {
  id_recommendation?: InputMaybe<Scalars['Int']>;
  id_student?: InputMaybe<Scalars['Int']>;
};


export type QueryRecommendationsArgs = {
  description?: InputMaybe<Scalars['String']>;
  id_course?: InputMaybe<Scalars['Int']>;
  period?: InputMaybe<Scalars['Int']>;
};


export type QueryScholarYearByIdArgs = {
  id_year: Scalars['Int'];
};


export type QueryScholarYearsArgs = {
  comment?: InputMaybe<Scalars['String']>;
  rector?: InputMaybe<Scalars['String']>;
  secretary?: InputMaybe<Scalars['String']>;
};


export type QuerySigninArgs = {
  id_institution: Scalars['Int'];
  password: Scalars['String'];
  user: Scalars['String'];
};


export type QueryStudentByIdArgs = {
  id_student: Scalars['Int'];
};


export type QueryStudentsArgs = {
  birthday?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  father?: InputMaybe<Scalars['String']>;
  guardian?: InputMaybe<Scalars['String']>;
  identification?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  mother?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['Int']>;
};


export type QueryTeacherByIdArgs = {
  id_teacher: Scalars['Int'];
};


export type QueryTeachersArgs = {
  degree?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  identification?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type_id?: InputMaybe<Scalars['Int']>;
};


export type QueryTypeQualificationByIdArgs = {
  id_type_qual: Scalars['Int'];
};


export type QueryTypeQualificationsArgs = {
  ceiling_score?: InputMaybe<Scalars['Float']>;
  floor_score?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryUserByIdArgs = {
  id_user: Scalars['Int'];
};


export type QueryUsersArgs = {
  belongs?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  typeu?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

export type Recommendation = {
  __typename?: 'Recommendation';
  description?: Maybe<Scalars['String']>;
  id_course?: Maybe<Scalars['Int']>;
  id_recommendation: Scalars['Int'];
  period?: Maybe<Scalars['Int']>;
};

export type RecommendationStudent = {
  __typename?: 'RecommendationStudent';
  id_rec_stu: Scalars['Int'];
  id_recommendation?: Maybe<Scalars['Int']>;
  id_student?: Maybe<Scalars['Int']>;
};

export type Respuesta = {
  __typename?: 'Respuesta';
  msg?: Maybe<Scalars['String']>;
};

export type ScholarYear = {
  __typename?: 'ScholarYear';
  comment?: Maybe<Scalars['String']>;
  id_year: Scalars['Int'];
  rector?: Maybe<Scalars['String']>;
  secretary?: Maybe<Scalars['String']>;
};

export type Student = {
  __typename?: 'Student';
  birthday?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  father?: Maybe<Scalars['String']>;
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

export type RegularSubjectFragment = { __typename?: 'Course', id_course: number, name?: string | null, id_teacher?: number | null, hour?: number | null };

export type RegularTeacherFragment = { __typename?: 'Teacher', id_teacher: number, name?: string | null, last_name?: string | null, identification?: string | null, direction?: string | null, phone?: string | null, email?: string | null, degree?: string | null };

export type CreateAreaMutationVariables = Exact<{
  name: Scalars['String'];
  status: Scalars['String'];
}>;


export type CreateAreaMutation = { __typename?: 'Mutation', createArea: { __typename?: 'Area', id_area: number } };

export type CreateQualificationTypeMutationVariables = Exact<{
  name: Scalars['String'];
  floor_score: Scalars['Float'];
  ceiling_score: Scalars['Float'];
  year: Scalars['Int'];
}>;


export type CreateQualificationTypeMutation = { __typename?: 'Mutation', createTypeQualification: { __typename?: 'TypeQualification', id_type_qual: number } };

export type CreateSetYearMutationVariables = Exact<{
  id_year: Scalars['Int'];
  rector: Scalars['String'];
  secretary: Scalars['String'];
  comment?: InputMaybe<Scalars['String']>;
}>;


export type CreateSetYearMutation = { __typename?: 'Mutation', createScholarYear: { __typename?: 'ScholarYear', id_year: number } };

export type CreateTeacherMutationVariables = Exact<{
  degree: Scalars['String'];
  direction: Scalars['String'];
  email: Scalars['String'];
  identification: Scalars['String'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  type_id: Scalars['Int'];
}>;


export type CreateTeacherMutation = { __typename?: 'Mutation', createTeacher: { __typename?: 'Teacher', id_teacher: number } };

export type DeleteAreaMutationVariables = Exact<{
  idArea: Scalars['Int'];
}>;


export type DeleteAreaMutation = { __typename?: 'Mutation', deleteArea: { __typename?: 'Area', id_area: number } };

export type DeleteQualificationTypeMutationVariables = Exact<{
  idQualificationType: Scalars['Int'];
}>;


export type DeleteQualificationTypeMutation = { __typename?: 'Mutation', deleteTypeQualification: { __typename?: 'TypeQualification', id_type_qual: number } };

export type DeleteSchoolarYearMutationVariables = Exact<{
  id_year: Scalars['Int'];
}>;


export type DeleteSchoolarYearMutation = { __typename?: 'Mutation', deleteScholarYear: { __typename?: 'ScholarYear', id_year: number } };

export type DeleteTeacherMutationVariables = Exact<{
  idDocente: Scalars['Int'];
}>;


export type DeleteTeacherMutation = { __typename?: 'Mutation', deleteTeacher: { __typename?: 'Teacher', id_teacher: number } };

export type UpdateAreaMutationVariables = Exact<{
  name: Scalars['String'];
  status: Scalars['String'];
  id_area: Scalars['Int'];
}>;


export type UpdateAreaMutation = { __typename?: 'Mutation', updateArea: { __typename?: 'Area', id_area: number } };

export type UpdateQualificationTypeMutationVariables = Exact<{
  id_type_qual: Scalars['Int'];
  name: Scalars['String'];
  floor_score: Scalars['Float'];
  ceiling_score: Scalars['Float'];
  year: Scalars['Int'];
}>;


export type UpdateQualificationTypeMutation = { __typename?: 'Mutation', updateTypeQualification: { __typename?: 'TypeQualification', id_type_qual: number } };

export type UpdateSchoolarYearMutationVariables = Exact<{
  id_year: Scalars['Int'];
  rector: Scalars['String'];
  secretary: Scalars['String'];
  comment?: InputMaybe<Scalars['String']>;
}>;


export type UpdateSchoolarYearMutation = { __typename?: 'Mutation', updateScholarYear: { __typename?: 'ScholarYear', id_year: number } };

export type UpdateTeacherMutationVariables = Exact<{
  degree: Scalars['String'];
  direction: Scalars['String'];
  email: Scalars['String'];
  identification: Scalars['String'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  type_id: Scalars['Int'];
  id_teacher: Scalars['Int'];
}>;


export type UpdateTeacherMutation = { __typename?: 'Mutation', updateTeacher: { __typename?: 'Teacher', id_teacher: number } };

export type GetAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAchievementsQuery = { __typename?: 'Query', achievements: Array<{ __typename?: 'Achievement', id_course?: number | null, period?: number | null, description?: string | null } | null> };

export type GetAreasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAreasQuery = { __typename?: 'Query', areas: Array<{ __typename?: 'Area', id_area: number, name?: string | null, status?: string | null } | null> };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id_group: number, working_time?: string | null, representative?: string | null } | null> };

export type GetInstitutionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInstitutionsQuery = { __typename?: 'Query', institutions: Array<{ __typename?: 'Institution', id_institution: number, name: string, direction: string } | null> };

export type GetLogoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLogoQuery = { __typename?: 'Query', institutions: Array<{ __typename?: 'Institution', logo?: string | null, id_institution: number } | null> };

export type GetQualificationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQualificationQuery = { __typename?: 'Query', typeQualifications: Array<{ __typename?: 'TypeQualification', id_type_qual: number, name?: string | null, floor_score?: number | null, ceiling_score?: number | null, year?: number | null } | null> };

export type GetSchoolarYearsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchoolarYearsQuery = { __typename?: 'Query', scholarYears: Array<{ __typename?: 'ScholarYear', id_year: number, rector?: string | null, secretary?: string | null, comment?: string | null } | null> };

export type GetStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentsQuery = { __typename?: 'Query', students: Array<{ __typename?: 'Student', name?: string | null, last_name?: string | null, sex?: string | null, direction?: string | null, birthday?: string | null } | null> };

export type GetSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id_course: number, name?: string | null, id_teacher?: number | null, hour?: number | null } | null> };

export type GetTeachersQueryVariables = Exact<{
  type_id: Scalars['Int'];
}>;


export type GetTeachersQuery = { __typename?: 'Query', teachers: Array<{ __typename?: 'Teacher', id_teacher: number, name?: string | null, last_name?: string | null, identification?: string | null, direction?: string | null, phone?: string | null, email?: string | null, degree?: string | null } | null> };

export type LoginQueryVariables = Exact<{
  password: Scalars['String'];
  user: Scalars['String'];
  id_institution: Scalars['Int'];
}>;


export type LoginQuery = { __typename?: 'Query', signin: { __typename?: 'Auth', token?: string | null, role?: string | null } };

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
export const CreateAreaDocument = gql`
    mutation CreateArea($name: String!, $status: String!) {
  createArea(name: $name, status: $status) {
    id_area
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
 *      name: // value for 'name'
 *      status: // value for 'status'
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
export const CreateQualificationTypeDocument = gql`
    mutation createQualificationType($name: String!, $floor_score: Float!, $ceiling_score: Float!, $year: Int!) {
  createTypeQualification(
    name: $name
    floor_score: $floor_score
    ceiling_score: $ceiling_score
    year: $year
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
 *      name: // value for 'name'
 *      floor_score: // value for 'floor_score'
 *      ceiling_score: // value for 'ceiling_score'
 *      year: // value for 'year'
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
    mutation CreateSetYear($id_year: Int!, $rector: String!, $secretary: String!, $comment: String) {
  createScholarYear(
    id_year: $id_year
    rector: $rector
    secretary: $secretary
    comment: $comment
  ) {
    id_year
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
 *      id_year: // value for 'id_year'
 *      rector: // value for 'rector'
 *      secretary: // value for 'secretary'
 *      comment: // value for 'comment'
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
    mutation CreateTeacher($degree: String!, $direction: String!, $email: String!, $identification: String!, $last_name: String!, $name: String!, $phone: String!, $type_id: Int!) {
  createTeacher(
    degree: $degree
    direction: $direction
    email: $email
    identification: $identification
    last_name: $last_name
    name: $name
    phone: $phone
    type_id: $type_id
  ) {
    id_teacher
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
 *      degree: // value for 'degree'
 *      direction: // value for 'direction'
 *      email: // value for 'email'
 *      identification: // value for 'identification'
 *      last_name: // value for 'last_name'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      type_id: // value for 'type_id'
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
export const UpdateAreaDocument = gql`
    mutation UpdateArea($name: String!, $status: String!, $id_area: Int!) {
  updateArea(name: $name, status: $status, id_area: $id_area) {
    id_area
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
 *      name: // value for 'name'
 *      status: // value for 'status'
 *      id_area: // value for 'id_area'
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
export const UpdateQualificationTypeDocument = gql`
    mutation updateQualificationType($id_type_qual: Int!, $name: String!, $floor_score: Float!, $ceiling_score: Float!, $year: Int!) {
  updateTypeQualification(
    id_type_qual: $id_type_qual
    name: $name
    floor_score: $floor_score
    ceiling_score: $ceiling_score
    year: $year
  ) {
    id_type_qual
  }
}
    `;
export type UpdateQualificationTypeMutationFn = Apollo.MutationFunction<UpdateQualificationTypeMutation, UpdateQualificationTypeMutationVariables>;

/**
 * __useUpdateQualificationTypeMutation__
 *
 * To run a mutation, you first call `useUpdateQualificationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQualificationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQualificationTypeMutation, { data, loading, error }] = useUpdateQualificationTypeMutation({
 *   variables: {
 *      id_type_qual: // value for 'id_type_qual'
 *      name: // value for 'name'
 *      floor_score: // value for 'floor_score'
 *      ceiling_score: // value for 'ceiling_score'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useUpdateQualificationTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQualificationTypeMutation, UpdateQualificationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQualificationTypeMutation, UpdateQualificationTypeMutationVariables>(UpdateQualificationTypeDocument, options);
      }
export type UpdateQualificationTypeMutationHookResult = ReturnType<typeof useUpdateQualificationTypeMutation>;
export type UpdateQualificationTypeMutationResult = Apollo.MutationResult<UpdateQualificationTypeMutation>;
export type UpdateQualificationTypeMutationOptions = Apollo.BaseMutationOptions<UpdateQualificationTypeMutation, UpdateQualificationTypeMutationVariables>;
export const UpdateSchoolarYearDocument = gql`
    mutation updateSchoolarYear($id_year: Int!, $rector: String!, $secretary: String!, $comment: String) {
  updateScholarYear(
    id_year: $id_year
    rector: $rector
    secretary: $secretary
    comment: $comment
  ) {
    id_year
  }
}
    `;
export type UpdateSchoolarYearMutationFn = Apollo.MutationFunction<UpdateSchoolarYearMutation, UpdateSchoolarYearMutationVariables>;

/**
 * __useUpdateSchoolarYearMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolarYearMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolarYearMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolarYearMutation, { data, loading, error }] = useUpdateSchoolarYearMutation({
 *   variables: {
 *      id_year: // value for 'id_year'
 *      rector: // value for 'rector'
 *      secretary: // value for 'secretary'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useUpdateSchoolarYearMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSchoolarYearMutation, UpdateSchoolarYearMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSchoolarYearMutation, UpdateSchoolarYearMutationVariables>(UpdateSchoolarYearDocument, options);
      }
export type UpdateSchoolarYearMutationHookResult = ReturnType<typeof useUpdateSchoolarYearMutation>;
export type UpdateSchoolarYearMutationResult = Apollo.MutationResult<UpdateSchoolarYearMutation>;
export type UpdateSchoolarYearMutationOptions = Apollo.BaseMutationOptions<UpdateSchoolarYearMutation, UpdateSchoolarYearMutationVariables>;
export const UpdateTeacherDocument = gql`
    mutation UpdateTeacher($degree: String!, $direction: String!, $email: String!, $identification: String!, $last_name: String!, $name: String!, $phone: String!, $type_id: Int!, $id_teacher: Int!) {
  updateTeacher(
    degree: $degree
    direction: $direction
    email: $email
    identification: $identification
    last_name: $last_name
    name: $name
    phone: $phone
    type_id: $type_id
    id_teacher: $id_teacher
  ) {
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
 *      degree: // value for 'degree'
 *      direction: // value for 'direction'
 *      email: // value for 'email'
 *      identification: // value for 'identification'
 *      last_name: // value for 'last_name'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      type_id: // value for 'type_id'
 *      id_teacher: // value for 'id_teacher'
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
export const GetAchievementsDocument = gql`
    query GetAchievements {
  achievements {
    ...RegularAchievement
  }
}
    ${RegularAchievementFragmentDoc}`;

/**
 * __useGetAchievementsQuery__
 *
 * To run a query within a React component, call `useGetAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAchievementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAchievementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAchievementsQuery, GetAchievementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAchievementsQuery, GetAchievementsQueryVariables>(GetAchievementsDocument, options);
      }
export function useGetAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAchievementsQuery, GetAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAchievementsQuery, GetAchievementsQueryVariables>(GetAchievementsDocument, options);
        }
export type GetAchievementsQueryHookResult = ReturnType<typeof useGetAchievementsQuery>;
export type GetAchievementsLazyQueryHookResult = ReturnType<typeof useGetAchievementsLazyQuery>;
export type GetAchievementsQueryResult = Apollo.QueryResult<GetAchievementsQuery, GetAchievementsQueryVariables>;
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
export const GetCoursesDocument = gql`
    query GetCourses {
  groups {
    ...RegularCourses
  }
}
    ${RegularCoursesFragmentDoc}`;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
      }
export function useGetCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<typeof useGetCoursesLazyQuery>;
export type GetCoursesQueryResult = Apollo.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
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
export const GetStudentsDocument = gql`
    query GetStudents {
  students {
    ...RegularStudent
  }
}
    ${RegularStudentFragmentDoc}`;

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
export const GetTeachersDocument = gql`
    query GetTeachers($type_id: Int!) {
  teachers(type_id: $type_id) {
    ...RegularTeacher
  }
}
    ${RegularTeacherFragmentDoc}`;

/**
 * __useGetTeachersQuery__
 *
 * To run a query within a React component, call `useGetTeachersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeachersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeachersQuery({
 *   variables: {
 *      type_id: // value for 'type_id'
 *   },
 * });
 */
export function useGetTeachersQuery(baseOptions: Apollo.QueryHookOptions<GetTeachersQuery, GetTeachersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeachersQuery, GetTeachersQueryVariables>(GetTeachersDocument, options);
      }
export function useGetTeachersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeachersQuery, GetTeachersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeachersQuery, GetTeachersQueryVariables>(GetTeachersDocument, options);
        }
export type GetTeachersQueryHookResult = ReturnType<typeof useGetTeachersQuery>;
export type GetTeachersLazyQueryHookResult = ReturnType<typeof useGetTeachersLazyQuery>;
export type GetTeachersQueryResult = Apollo.QueryResult<GetTeachersQuery, GetTeachersQueryVariables>;
export const LoginDocument = gql`
    query Login($password: String!, $user: String!, $id_institution: Int!) {
  signin(password: $password, user: $user, id_institution: $id_institution) {
    token
    role
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      user: // value for 'user'
 *      id_institution: // value for 'id_institution'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;