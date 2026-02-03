import type { Group } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: Group;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/curso';
