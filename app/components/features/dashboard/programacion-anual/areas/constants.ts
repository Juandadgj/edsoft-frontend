import type { Area } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: Area;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/areas';
