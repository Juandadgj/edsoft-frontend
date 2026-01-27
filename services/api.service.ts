/**
 * Servicios REST para todas las entidades
 * Cada servicio encapsula las operaciones CRUD de su módulo
 */

import api from '@/lib/apiClient';
import type {
  // Entidades
  Area,
  Student,
  Teacher,
  Course,
  Group,
  Achievement,
  Enrollment,
  ScholarYear,
  TypeQualification,
  Institution,
  Auth,
  Report,
  Definitives,
  QualificationList,
  Featured,
  Absence,
  // Create DTOs
  CreateAreaDto,
  CreateStudentDto,
  CreateTeacherDto,
  CreateCourseDto,
  CreateGroupDto,
  CreateAchievementDto,
  CreateEnrollmentDto,
  CreateScholarYearDto,
  CreateTypeQualificationDto,
  CreateFeaturedDto,
  CreateAbsenceDto,
  // Update DTOs
  UpdateAreaDto,
  UpdateStudentDto,
  UpdateTeacherDto,
  UpdateCourseDto,
  UpdateGroupDto,
  UpdateAchievementDto,
  UpdateEnrollmentDto,
  UpdateScholarYearDto,
  UpdateDefinitivesDto,
  UpdateQualificationsDto,
  UpdateAbsenceDto,
  // Filter DTOs
  FilterAreaDto,
  FilterStudentDto,
  FilterTeacherDto,
  FilterCourseDto,
  FilterGroupDto,
  FilterAchievementDto,
  FilterEnrollmentDto,
  FilterDefinitivesDto,
  FilterQualificationDto,
  FilterFeaturedDto,
  FilterAbsenceDto,
  // Auth
  SignInDto,
  // Reports
  GenerateStudentsListUndeterminatedDto,
  GenerateStudentsListDeterminatedDto,
  GenerateAchievementsAndIndicatorsDto,
  GenerateReportAreaDto,
  GenerateStudentEnrollmentReportDto,
  CertifiedStudentReportDto,
  Qualification,
  CertifiedStudentDictionary,
  ReportDictionary,
} from '@/types/api.types';

// ============== Area Service ==============
export const areaService = {
  getAll: (filter?: FilterAreaDto) => 
    api.get<Area[]>('/areas', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  create: (data: CreateAreaDto) => 
    api.post<Area>('/areas', data),
  
  update: (data: UpdateAreaDto) => 
    api.put<Area>('/areas', data),
  
  delete: (id_area: number) => 
    api.delete<Area>(`/areas/${id_area}`),
};

// ============== Student Service ==============
export const studentService = {
  getAll: (filter?: FilterStudentDto) => 
    api.get<Student[]>('/students', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  getById: (id_student: number) => 
    api.get<Student>(`/students/${id_student}`),
  
  getByGroup: (id_group: number) => 
    api.get<Student[]>(`/students/group/${id_group}`),
  
  create: (data: CreateStudentDto) => 
    api.post<Student>('/students', data),
  
  update: (data: UpdateStudentDto) => 
    api.put<Student>('/students', data),
  
  delete: (id_student: number) => 
    api.delete<Student>(`/students/${id_student}`),
};

// ============== Teacher Service ==============
export const teacherService = {
  getAll: (filter?: FilterTeacherDto) => 
    api.get<Teacher[]>('/teachers', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  getById: (id_teacher: number) => 
    api.get<Teacher>(`/teachers/${id_teacher}`),
  
  create: (data: CreateTeacherDto) => 
    api.post<Teacher>('/teachers', data),
  
  update: (data: UpdateTeacherDto) => 
    api.put<Teacher>('/teachers', data),
  
  delete: (id_teacher: number) => 
    api.delete<Teacher>(`/teachers/${id_teacher}`),
};

// ============== Course Service ==============
export const courseService = {
  getAll: (filter?: FilterCourseDto) => 
    api.get<Course[]>('/courses', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  getById: (id_course: number) => 
    api.get<Course>(`/courses/${id_course}`),
  
  getDefinitives: (filter: FilterDefinitivesDto) => 
    api.get<Definitives[]>('/courses/definitives', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  create: (data: CreateCourseDto) => 
    api.post<Course>('/courses', data),
  
  update: (data: UpdateCourseDto) => 
    api.put<Course>('/courses', data),
  
  updateDefinitives: (data: UpdateDefinitivesDto) => 
    api.put<Definitives>('/courses/definitives', data),
  
  delete: (id_course: number) => 
    api.delete<Course>(`/courses/${id_course}`),
};

// ============== Group Service ==============
export const groupService = {
  getAll: (filter?: FilterGroupDto) => 
    api.get<Group[]>('/groups', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  getById: (id_group: number) => 
    api.get<Group>(`/groups/${id_group}`),
  
  create: (data: CreateGroupDto) => 
    api.post<Group>('/groups', data),
  
  update: (data: UpdateGroupDto) => 
    api.put<Group>('/groups', data),
  
  delete: (id_group: number) => 
    api.delete<Group>(`/groups/${id_group}`),
};

// ============== Achievement Service ==============
export const achievementService = {
  getAll: (filter?: FilterAchievementDto) => 
    api.get<Achievement[]>('/achievements', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  getQualifications: (filter: FilterQualificationDto) => 
    api.get<QualificationList[]>('/achievements/qualifications', filter as unknown as unknown as Record<string, string | number | boolean | undefined>),
  
  create: (data: CreateAchievementDto) => 
    api.post<Achievement>('/achievements', data),
  
  update: (data: UpdateAchievementDto) => 
    api.put<Achievement>('/achievements', data),
  
  updateQualifications: (data: UpdateQualificationsDto) => 
    api.put<Qualification[]>('/achievements/qualifications', data),
  
  delete: (id_achievement: number) => 
    api.delete<Achievement>(`/achievements/${id_achievement}`),
};

// ============== Enrollment Service ==============
export const enrollmentService = {
  getAll: (filter?: FilterEnrollmentDto) => 
    api.get<Enrollment[]>('/enrollments', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  getById: (id_enrollment: number) => 
    api.get<Enrollment>(`/enrollments/${id_enrollment}`),
  
  create: (data: CreateEnrollmentDto) => 
    api.post<Enrollment>('/enrollments', data),
  
  update: (data: UpdateEnrollmentDto) => 
    api.put<Enrollment>('/enrollments', data),
  
  delete: (id_enrollment: number) => 
    api.delete<Enrollment>(`/enrollments/${id_enrollment}`),
};

// ============== Scholar Year Service ==============
export const scholarYearService = {
  getAll: () => 
    api.get<ScholarYear[]>('/scholar-years'),
  
  getSelected: () => 
    api.get<ScholarYear>('/scholar-years/selected'),
  
  create: (data: CreateScholarYearDto) => 
    api.post<ScholarYear>('/scholar-years', data),
  
  update: (data: UpdateScholarYearDto) => 
    api.put<ScholarYear>('/scholar-years', data),
  
  select: (id_year: number) => 
    api.put<ScholarYear>(`/scholar-years/${id_year}/select`, {}),
  
  delete: (id_year: number) => 
    api.delete<ScholarYear>(`/scholar-years/${id_year}`),
};

// ============== Type Qualification Service ==============
export const typeQualificationService = {
  getAll: () => 
    api.get<TypeQualification[]>('/type-qualifications'),
  
  create: (data: CreateTypeQualificationDto) => 
    api.post<TypeQualification>('/type-qualifications', data),
  
  delete: (id_type_qual: number) => 
    api.delete<TypeQualification>(`/type-qualifications/${id_type_qual}`),
};

// ============== Institution Service ==============
export const institutionService = {
  getAll: () => 
    api.get<Institution[]>('/institutions'),
};

// ============== Featured Service ==============
export const featuredService = {
  getAll: (filter?: FilterFeaturedDto) => 
    api.get<Featured[]>('/featured', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  create: (data: CreateFeaturedDto) => 
    api.post<Featured>('/featured', data),
  
  delete: (id_featured: number) => 
    api.delete<Featured>(`/featured/${id_featured}`),
};

// ============== Absence Service ==============
export const absenceService = {
  getAll: (filter?: FilterAbsenceDto) => 
    api.get<Absence[]>('/absences', filter as unknown as Record<string, string | number | boolean | undefined>),
  
  create: (data: CreateAbsenceDto) => 
    api.post<Absence>('/absences', data),
  
  update: (data: UpdateAbsenceDto) => 
    api.put<Absence>('/absences', data),
  
  delete: (id_absence: number) => 
    api.delete<Absence>(`/absences/${id_absence}`),
};

// ============== Auth Service ==============
export const authService = {
  signIn: (data: SignInDto) => 
    api.post<Auth>('/users/login', data),
};

// ============== Report Service ==============
export const reportService = {
  studentsListUndeterminated: (params: GenerateStudentsListUndeterminatedDto) => 
    api.get<Report>('/reports/students-list-undeterminated', params as unknown as Record<string, string | number | boolean | undefined>),
  
  studentsListDeterminated: (params: GenerateStudentsListDeterminatedDto) => 
    api.get<Report>('/reports/students-list-determinated', params as unknown as Record<string, string | number | boolean | undefined>),
  
  achievementsAndIndicators: (params: GenerateAchievementsAndIndicatorsDto) => 
    api.get<Report>('/reports/achievements-and-indicators', params as unknown as Record<string, string | number | boolean | undefined>),
  
  area: (params: GenerateReportAreaDto, body: ReportDictionary) => 
    api.post<Report>('/reports/area', body, params as unknown as unknown as Record<string, string | number | boolean | undefined>,),
  
  studentEnrollmentI: (params: GenerateStudentEnrollmentReportDto) => 
    api.get<Report>('/reports/student-enrollment-i', params as unknown as Record<string, string | number | boolean | undefined>),
  
  studentEnrollmentII: (params: GenerateStudentEnrollmentReportDto) => 
    api.get<Report>('/reports/student-enrollment-ii', params as unknown as Record<string, string | number | boolean | undefined>),
  
  certifiedStudent: (params: CertifiedStudentReportDto, body?:  CertifiedStudentDictionary ) =>
    api.post<Report>('/reports/certified-student', body, params as unknown as unknown as Record<string, string | number | boolean | undefined>),
};

// Export all services
export default {
  area: areaService,
  student: studentService,
  teacher: teacherService,
  course: courseService,
  group: groupService,
  achievement: achievementService,
  enrollment: enrollmentService,
  scholarYear: scholarYearService,
  typeQualification: typeQualificationService,
  institution: institutionService,
  featured: featuredService,
  absence: absenceService,
  auth: authService,
  report: reportService,
};
