import type { Achievement } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: Achievement;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/logros';
