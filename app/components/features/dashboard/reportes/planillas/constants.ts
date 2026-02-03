// Tipos para reportes de planillas
export type SpreadsheetReportType = 
  | 'students-list-undeterminated'
  | 'students-list-determinated'
  | 'achievements-and-indicators'
  | 'general-absences'
  | 'absences-per-month';

export type ActionState = {
  success: boolean;
  message: string;
  data?: { report_content: string };
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/reportes/planillas';

export interface SpreadsheetOption {
  id: number;
  type: SpreadsheetReportType;
  title: string;
  description?: string;
  icon: 'global' | 'subject' | 'indicator' | 'absence' | 'calendar';
}

export const SPREADSHEET_OPTIONS: SpreadsheetOption[] = [
  {
    id: 1,
    type: 'students-list-undeterminated',
    title: 'Notas globales sin determinar materia',
    icon: 'global',
  },
  {
    id: 2,
    type: 'students-list-determinated',
    title: 'Notas globales, Determinado por la materia',
    icon: 'subject',
  },
  {
    id: 3,
    type: 'achievements-and-indicators',
    title: 'Logros y sus indicadores',
    icon: 'indicator',
  },
  {
    id: 4,
    type: 'general-absences',
    title: 'Inasistencia General',
    icon: 'absence',
  },
  {
    id: 5,
    type: 'absences-per-month',
    title: 'Inasistencia por mes',
    icon: 'calendar',
  },
];
