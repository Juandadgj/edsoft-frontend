import type { Group } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: Group;
};

export const workingTimeLabels: Record<string, string> = {
  M: 'Mañana',
  T: 'Tarde',
  N: 'Noche',
  S: 'Sabatina',
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/curso';
