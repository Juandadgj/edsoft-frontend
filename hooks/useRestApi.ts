/**
 * Hooks REST que reemplazan los hooks de Apollo GraphQL
 * 
 * Estos hooks mantienen la misma interfaz que los generados por Apollo
 * para facilitar la migración gradual.
 */

import { useLazyQuery, useMutation, useQuery, useDeleteMutation } from '@/lib/useApi';
import type {
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
  Definitives,
  QualificationList,
  CreateAreaDto,
  CreateStudentDto,
  CreateTeacherDto,
  CreateCourseDto,
  CreateGroupDto,
  CreateAchievementDto,
  CreateEnrollmentDto,
  CreateScholarYearDto,
  CreateTypeQualificationDto,
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
  FilterAreaDto,
  FilterStudentDto,
  FilterTeacherDto,
  FilterCourseDto,
  FilterGroupDto,
  FilterAchievementDto,
  FilterQualificationDto,
  SignInDto,
  Qualification,
} from '@/types/api.types';

// ============== Auth Hooks ==============

export const useSignInLazyQuery = () => {
  const [execute, result] = useLazyQuery<Auth>('/users/login');
  
  // Wrapper para mantener compatibilidad con Apollo
  const signIn = (options: { variables: { signInInput: SignInDto } }) => {
    // Para login, necesitamos hacer POST no GET
    return fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options.variables.signInInput),
    })
      .then(res => res.json())
      .then(data => {
        // Actualizar el estado del hook
        return data as Auth;
      });
  };
  
  return [signIn, result] as const;
};

// ============== Area Hooks ==============

export const useGetAreasQuery = (options?: { variables?: { filterAreaInput?: FilterAreaDto } }) => {
  return useQuery<Area[]>('/areas', {
    variables: options?.variables?.filterAreaInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useGetAreasLazyQuery = () => {
  return useLazyQuery<Area[]>('/areas');
};

export const useCreateAreaMutation = () => {
  return useMutation<Area, CreateAreaDto>('/areas', 'POST');
};

export const useUpdateAreaMutation = () => {
  return useMutation<Area, UpdateAreaDto>('/areas', 'PUT');
};

export const useDeleteAreaMutation = () => {
  const [deleteFn, state] = useDeleteMutation<Area>('/areas');
  
  // Wrapper para mantener compatibilidad con Apollo
  const wrappedDelete = (options: { variables: { idArea: number } }) => {
    return deleteFn(options.variables.idArea);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Student Hooks ==============

export const useGetStudentsQuery = (options?: { variables?: { filterStudentInput?: FilterStudentDto } }) => {
  return useQuery<Student[]>('/students', {
    variables: options?.variables?.filterStudentInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useGetStudentsLazyQuery = () => {
  return useLazyQuery<Student[]>('/students');
};

export const useGetStudentsByGroupQuery = (options: { variables: { id_group: number } }) => {
  return useQuery<Student[]>(`/students/group/${options.variables.id_group}`);
};

export const useGetStudentsByGroupLazyQuery = () => {
  const [execute, result] = useLazyQuery<Student[]>('/students/group');
  
  const wrappedExecute = (options: { variables: { id_group: number } }) => {
    console.log("excetue query", options, "variables")
    return fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/students/group/${options.variables.id_group}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('userToken') || '',
      },
    }).then(res => {
      return res.json();
    });
  };
  console.log(result)
  return [wrappedExecute, result] as const;
};

export const useStudentByIdQuery = (options: { variables: { id_student: number } }) => {
  return useQuery<Student>(`/students/${options.variables.id_student}`);
};

export const useStudentByIdLazyQuery = () => {
  const [execute, result] = useLazyQuery<Student>('/students');
  
  const wrappedExecute = (options: { variables: { id_student: number } }) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/students/${options.variables.id_student}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('userToken') || '',
      },
    }).then(res => res.json());
  };
  
  return [wrappedExecute, result] as const;
};

export const useCreateStudentMutation = () => {
  return useMutation<Student, CreateStudentDto>('/students', 'POST');
};

export const useUpdateStudentMutation = () => {
  return useMutation<Student, UpdateStudentDto>('/students', 'PUT');
};

export const useDeleteStudentMutation = () => {
  const [deleteFn, state] = useDeleteMutation<Student>('/students');
  
  const wrappedDelete = (options: { variables: { idStudent: number } }) => {
    return deleteFn(options.variables.idStudent);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Teacher Hooks ==============

export const useTeachersQuery = (options?: { variables?: { filterTeacherInput?: FilterTeacherDto } }) => {
  return useQuery<Teacher[]>('/teachers', {
    variables: options?.variables?.filterTeacherInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useTeachersLazyQuery = () => {
  return useLazyQuery<Teacher[]>('/teachers');
};

export const useCreateTeacherMutation = () => {
  return useMutation<Teacher, CreateTeacherDto>('/teachers', 'POST');
};

export const useUpdateTeacherMutation = () => {
  return useMutation<Teacher, UpdateTeacherDto>('/teachers', 'PUT');
};

export const useDeleteTeacherMutation = () => {
  const [deleteFn, state] = useDeleteMutation<Teacher>('/teachers');
  
  const wrappedDelete = (options: { variables: { idTeacher: number } }) => {
    return deleteFn(options.variables.idTeacher);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Course Hooks ==============

export const useCoursesQuery = (options?: { variables?: { filterCourseInput?: FilterCourseDto } }) => {
  return useQuery<Course[]>('/courses', {
    variables: options?.variables?.filterCourseInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useCoursesLazyQuery = () => {
  return useLazyQuery<Course[]>('/courses');
};

export const useGetDefinitivesQuery = (options: { variables: { filterDefinitivesInput: { id_course: number; id_student?: number } } }) => {
  return useQuery<Definitives[]>('/courses/definitives', {
    variables: options.variables.filterDefinitivesInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useCreateCourseMutation = () => {
  return useMutation<Course, CreateCourseDto>('/courses', 'POST');
};

export const useUpdateCourseMutation = () => {
  return useMutation<Course, UpdateCourseDto>('/courses', 'PUT');
};

export const useUpdateDefinitivesMutation = () => {
  return useMutation<Definitives, UpdateDefinitivesDto>('/courses/definitives', 'PUT');
};

export const useDeleteCourseMutation = () => {
  const [deleteFn, state] = useDeleteMutation<Course>('/courses');
  
  const wrappedDelete = (options: { variables: { idCourse: number } }) => {
    return deleteFn(options.variables.idCourse);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Group Hooks ==============

export const useGroupsQuery = (options?: { variables?: { filterGroupInput?: FilterGroupDto } }) => {
  return useQuery<Group[]>('/groups', {
    variables: options?.variables?.filterGroupInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useGroupsLazyQuery = () => {
  return useLazyQuery<Group[]>('/groups');
};

export const useCreateGroupMutation = () => {
  return useMutation<Group, CreateGroupDto>('/groups', 'POST');
};

export const useUpdateGroupMutation = () => {
  return useMutation<Group, UpdateGroupDto>('/groups', 'PUT');
};

export const useDeleteGroupMutation = () => {
  const [deleteFn, state] = useDeleteMutation<Group>('/groups');
  
  const wrappedDelete = (options: { variables: { idGroup: number } }) => {
    return deleteFn(options.variables.idGroup);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Achievement Hooks ==============

export const useAchievementsQuery = (options?: { variables?: { filterAchievementInput?: FilterAchievementDto } }) => {
  return useQuery<Achievement[]>('/achievements', {
    variables: options?.variables?.filterAchievementInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useAchievementsLazyQuery = () => {
  return useLazyQuery<Achievement[]>('/achievements');
};

export const useGetStudentQualificationsQuery = (options: { variables: { filterQualificationInput: FilterQualificationDto } }) => {
  return useQuery<QualificationList[]>('/achievements/qualifications', {
    variables: options.variables.filterQualificationInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useGetStudentQualificationsLazyQuery = () => {
  return useLazyQuery<QualificationList[]>('/achievements/qualifications');
};

export const useCreateAchievementMutation = () => {
  return useMutation<Achievement, CreateAchievementDto>('/achievements', 'POST');
};

export const useUpdateAchievementMutation = () => {
  return useMutation<Achievement, UpdateAchievementDto>('/achievements', 'PUT');
};

export const useUpdateQualificationsMutation = () => {
  return useMutation<Qualification[], UpdateQualificationsDto>('/achievements/qualifications', 'PUT');
};

export const useDeleteAchievementMutation = () => {
  const [deleteFn, state] = useDeleteMutation<Achievement>('/achievements');
  
  const wrappedDelete = (options: { variables: { idAchievement: number } }) => {
    return deleteFn(options.variables.idAchievement);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Enrollment Hooks ==============

export const useEnrollmentsQuery = (options?: { variables?: { filterEnrollmentInput?: { id_group?: number; id_student?: number } } }) => {
  return useQuery<Enrollment[]>('/enrollments', {
    variables: options?.variables?.filterEnrollmentInput as unknown as Record<string, string | number | boolean | undefined>,
  });
};

export const useEnrollmentsLazyQuery = () => {
  return useLazyQuery<Enrollment[]>('/enrollments');
};

export const useCreateEnrollmentMutation = () => {
  return useMutation<Enrollment, CreateEnrollmentDto>('/enrollments', 'POST');
};

export const useUpdateEnrollmentMutation = () => {
  return useMutation<Enrollment, { updateEnrollmentInput: UpdateEnrollmentDto }>('/enrollments', 'PUT');
};

export const useDeleteEnrollmentMutation = () => {
  const [deleteFn, state] = useDeleteMutation<Enrollment>('/enrollments');
  
  const wrappedDelete = (options: { variables: { idEnrollment: number } }) => {
    return deleteFn(options.variables.idEnrollment);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Scholar Year Hooks ==============

export const useGetSchoolarYearsQuery = () => {
  return useQuery<ScholarYear[]>('/scholar-years');
};

export const useGetSchoolarYearsLazyQuery = () => {
  return useLazyQuery<ScholarYear[]>('/scholar-years');
};

export const useScholearYearSelectedQuery = (options?: { fetchPolicy?: 'network-only' | 'cache-first' }) => {
  return useQuery<ScholarYear>('/scholar-years/selected', {
    fetchPolicy: options?.fetchPolicy,
  });
};

export const useScholearYearSelectedLazyQuery = () => {
  return useLazyQuery<ScholarYear>('/scholar-years/selected');
};

export const useCreateScholarYearMutation = () => {
  return useMutation<ScholarYear, CreateScholarYearDto>('/scholar-years', 'POST');
};

export const useUpdateScholarYearMutation = () => {
  return useMutation<ScholarYear, UpdateScholarYearDto>('/scholar-years', 'PUT');
};

export const useSelectScholarYearMutation = (options?: { fetchPolicy?: 'network-only' }) => {
  const [, state] = useMutation<ScholarYear, { id_year: number }>('/scholar-years', 'PUT');
  
  const selectYear = async (mutationOptions: { variables: { idYear: number } }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/scholar-years/${mutationOptions.variables.idYear}/select`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('userToken') || '',
        },
        body: JSON.stringify({}),
      }
    );
    return response.json();
  };
  
  return [selectYear, state] as const;
};

export const useDeleteScholarYearMutation = () => {
  const [deleteFn, state] = useDeleteMutation<ScholarYear>('/scholar-years');
  
  const wrappedDelete = (options: { variables: { idYear: number } }) => {
    return deleteFn(options.variables.idYear);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Type Qualification Hooks ==============

export const useGetQualificationQuery = () => {
  return useQuery<TypeQualification[]>('/type-qualifications');
};

export const useGetQualificationLazyQuery = () => {
  return useLazyQuery<TypeQualification[]>('/type-qualifications');
};

export const useCreateTypeQualificationMutation = () => {
  return useMutation<TypeQualification, CreateTypeQualificationDto>('/type-qualifications', 'POST');
};

export const useDeleteTypeQualificationMutation = () => {
  const [deleteFn, state] = useDeleteMutation<TypeQualification>('/type-qualifications');
  
  const wrappedDelete = (options: { variables: { idTypeQual: number } }) => {
    return deleteFn(options.variables.idTypeQual);
  };
  
  return [wrappedDelete, state] as const;
};

// ============== Institution Hooks ==============

export const useGetInstitutionsQuery = () => {
  return useQuery<Institution[]>('/institutions');
};

export const useGetInstitutionsLazyQuery = () => {
  return useLazyQuery<Institution[]>('/institutions');
};
