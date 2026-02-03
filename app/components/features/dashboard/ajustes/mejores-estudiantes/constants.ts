// Tipos para mejores estudiantes
export type ActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/ajustes/mejores-estudiantes';

export interface BestStudent {
  id: number;
  name: string;
  grade: string;
  average: number;
  position: number;
}

export interface BestStudentsSettings {
  showInPortal: boolean;
  maxStudents: number;
  minimumAverage: number;
}

export const DEFAULT_BEST_STUDENTS_SETTINGS: BestStudentsSettings = {
  showInPortal: true,
  maxStudents: 10,
  minimumAverage: 4.0,
};
