import type { TypeQualification } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: TypeQualification;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/calificacion';
