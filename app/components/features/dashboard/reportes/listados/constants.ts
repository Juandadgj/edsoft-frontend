// Tipos para reportes de listados
export type ListingReportType =
  | 'qualified-teachers'
  | 'students-by-course'
  | 'students-by-course-signature'
  | 'subjects-by-course'
  | 'achievements-by-course'
  | 'global-notes-sheet-by-course'
  | 'global-notes-sheet-by-course-excel'
  | 'global-notes-sheet-areas-by-course-excel'
  | 'lost-global-notes-sheet-by-course-excel'
  | 'all-global-notes-sheet-by-course-excel'
  | 'minimum-notes-calculation-by-period-excel'
  | 'courses'
  | 'graduates'
  | 'students-configurable-fields-excel'
  | 'ages-by-course'
  | 'students-list-excel';

export type ActionState = {
  success: boolean;
  message: string;
  data?: { report_content: string };
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/reportes/listados';

export interface ListingOption {
  id: number;
  type: ListingReportType;
  title: string;
  description?: string;
}

export const LISTING_OPTIONS: ListingOption[] = [
  {
    id: 1,
    type: 'qualified-teachers',
    title: 'Docentes habilitados',
  },
  {
    id: 2,
    type: 'students-by-course',
    title: 'Estudiantes por curso',
  },
  {
    id: 3,
    type: 'students-by-course-signature',
    title: 'Estudiantes por curso para firma de asistencia',
  },
  {
    id: 4,
    type: 'subjects-by-course',
    title: 'Asignaturas por curso',
  },
  {
    id: 5,
    type: 'achievements-by-course',
    title: 'Logros por curso',
  },
  {
    id: 6,
    type: 'global-notes-sheet-by-course',
    title: 'Sabana de notas globales por curso',
  },
  {
    id: 7,
    type: 'global-notes-sheet-by-course-excel',
    title: 'Sabana de notas globales por curso (En Excel)',
  },
  {
    id: 8,
    type: 'global-notes-sheet-areas-by-course-excel',
    title: 'Sabana de notas globales en areas por curso (En Excel)',
  },
  {
    id: 9,
    type: 'lost-global-notes-sheet-by-course-excel',
    title: 'Sabana de notas perdidas globales por curso (En Excel)',
  },
  {
    id: 10,
    type: 'all-global-notes-sheet-by-course-excel',
    title: 'Sabana de todas las notas globales por curso (En Excel)',
  },
  {
    id: 11,
    type: 'minimum-notes-calculation-by-period-excel',
    title: 'Calculo de notas mínimas por periodo (En Excel)',
  },
  {
    id: 12,
    type: 'courses',
    title: 'Cursos',
  },
  {
    id: 13,
    type: 'graduates',
    title: 'Graduados',
  },
  {
    id: 14,
    type: 'students-configurable-fields-excel',
    title: 'Estudiantes (campos configurable en Excel)',
  },
  {
    id: 15,
    type: 'ages-by-course',
    title: 'Edades por curso',
  },
  {
    id: 16,
    type: 'students-list-excel',
    title: 'Lista de estudiantes (En Excel)',
  },
];
