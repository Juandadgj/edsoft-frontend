import type { Enrollment, Student } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: Enrollment;
};

export type StudentActionState = {
  success: boolean;
  message: string;
  data?: Student;
  students?: Student[];
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/matriculas';
