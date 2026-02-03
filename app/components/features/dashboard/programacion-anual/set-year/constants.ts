import type { ScholarYear } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: ScholarYear;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/establecer-ano';
export const EXTRA_REVALIDATIONS = ['/dashboard/programacion-anual/crear-curso'];
