// Tipos para calificación de logros
export type ActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/proceso-anual/calificacion';

export interface Course {
  id_course: number;
  id_group: number;
  name: string;
  teacher: string;
}

export interface Achievement {
  id_achievement: number;
  description: string;
  id_course: number;
  period: number;
}

export interface Qualification {
  id_achie_stu: number;
  id_achievement: number;
  id_student: number;
  score: number | null;
}

export interface StudentQualification {
  student: string;
  qualifications: Qualification[];
}

export interface QualificationUpdate {
  id_achie_stu: number;
  id_achievement: number;
  id_student: number;
  score: number;
}
