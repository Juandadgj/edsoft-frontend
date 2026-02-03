// Tipos para reportes de indicadores
export type IndicatorReportType = 
  | 'students-per-course'
  | 'grades-per-course'
  | 'average-students-per-period'
  | 'average-courses-per-period';

export type ActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/reportes/indicadores';

export interface IndicatorOption {
  id: number;
  type: IndicatorReportType;
  title: string;
  description?: string;
}

export const INDICATOR_OPTIONS: IndicatorOption[] = [
  {
    id: 1,
    type: 'students-per-course',
    title: 'Porcentaje de estudiantes por curso',
    description: 'Muestra la distribución de estudiantes en cada curso',
  },
  {
    id: 2,
    type: 'grades-per-course',
    title: 'Porcentaje de notas por curso',
    description: 'Muestra la distribución de notas en cada curso',
  },
  {
    id: 3,
    type: 'average-students-per-period',
    title: 'Promedio de estudiantes por periodo',
    description: 'Calcula el promedio de rendimiento de estudiantes por periodo',
  },
  {
    id: 4,
    type: 'average-courses-per-period',
    title: 'Promedio de cursos por periodo',
    description: 'Calcula el promedio de rendimiento de cursos por periodo',
  },
];
