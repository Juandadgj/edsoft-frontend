// Tipos para reportes de entregables
export type DeliverableReportType = 
  | 'general-grade'
  | 'grade-with-achievements'
  | 'grade-with-indicators'
  | 'numeric-alphabetic-marked'
  | 'numeric-alphabetic-all'
  | 'configurable-reports'
  | 'student-certificate'
  | 'student-id-card';

export type ActionState = {
  success: boolean;
  message: string;
  data?: {
    report_content: string;
  };
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/reportes/entregables';

export interface DeliverableOption {
  id: number;
  type: DeliverableReportType;
  title: string;
  description?: string;
  icon: 'global' | 'subject' | 'indicator' | 'error' | 'certificate' | 'card';
  available: boolean;
}

export const DELIVERABLE_OPTIONS: DeliverableOption[] = [
  {
    id: 1,
    type: 'general-grade',
    title: 'Calificación (Nota General)',
    icon: 'global',
    available: true,
  },
  {
    id: 2,
    type: 'grade-with-achievements',
    title: 'Calificación con logros',
    icon: 'subject',
    available: true,
  },
  {
    id: 3,
    type: 'grade-with-indicators',
    title: 'Calificación con logros e indicadores de logros',
    icon: 'indicator',
    available: true,
  },
  {
    id: 4,
    type: 'numeric-alphabetic-marked',
    title: 'Calificación de logros, Mostrar calificación Numérica y alfabética (Solo logros calificados o señalados)',
    icon: 'error',
    available: true,
  },
  {
    id: 5,
    type: 'numeric-alphabetic-all',
    title: 'Calificación de logros, Mostrar calificación Numérica y alfabética (Todos los logros)',
    icon: 'error',
    available: true,
  },
  {
    id: 6,
    type: 'configurable-reports',
    title: 'Boletines e Informes Configurables',
    icon: 'indicator',
    available: true,
  },
  {
    id: 7,
    type: 'student-certificate',
    title: 'Certificado de estudiante',
    icon: 'certificate',
    available: true,
  },
  {
    id: 8,
    type: 'student-id-card',
    title: 'Carnet Estudiantil',
    icon: 'card',
    available: true,
  },
];
