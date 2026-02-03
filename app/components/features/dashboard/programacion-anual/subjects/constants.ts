import type { Course } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: Course;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/asignaturas';
