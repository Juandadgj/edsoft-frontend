// Tipos para ajustes de datos predeterminados
export type ActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/ajustes/predeterminar-datos';

export interface SettingItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface SettingsSection {
  id: string;
  title: string;
  items: SettingItem[];
}

// Configuración de plataforma
export const PLATFORM_SETTINGS: SettingsSection = {
  id: 'platform',
  title: 'Predeterminar datos',
  items: [
    { id: 'logos', label: 'Activar los logos', checked: true },
    { id: 'muro-mensajes', label: 'Activar el Muro de mensajes', checked: true },
    { id: 'lista-asignaturas', label: 'Activar la vista de lista de asignaturas con sus docentes', checked: true },
    { id: 'vista-eventos', label: 'Activar la vista de la lista de eventos', checked: true },
    { id: 'notas-estudiantes', label: 'Activar la vista de las notas de los estudiantes en su usuario', checked: true },
    { id: 'encuesta-portal', label: '¿Activar la encuesta "¿Que parece el portal del colegio?"', checked: true },
    { id: 'personal-colegio', label: 'Activar la vista del personal del colegio (Rector, secretario y docentes)', checked: true },
    { id: 'publicaciones-docentes', label: 'Activar la vista de las publicaciones de los docentes', checked: true },
    { id: 'nota-minima', label: 'Nota Mínima', checked: true },
    { id: 'indicadores-logros', label: 'Activar los indicadores de logros', checked: true },
    { id: 'mensajes-acudientes', label: 'Activar mensajes de estudiantes a acudidor', checked: false },
    { id: 'estatus-general', label: 'Activar la vista de estatus general', checked: true },
    { id: 'mejores-curso', label: 'Activar la vista de los mejores por curso', checked: true },
    { id: 'pagos-estudiantes', label: 'Activar la vista de los pagos de los estudiantes en su usuario', checked: true },
    { id: 'auditar-publicaciones', label: 'Auditar las publicaciones de los docentes', checked: false },
    { id: 'menu-dinamico', label: 'Menu Dinámico', checked: false },
  ],
};

// Permisos para docentes
export const TEACHER_PERMISSIONS: SettingsSection = {
  id: 'teacher-permissions',
  title: 'Permisos para docentes',
  items: [
    { id: 'ingresar-logos', label: 'Ingresar logos', checked: true },
    { id: 'calificar-p1', label: 'Calificar período uno', checked: true },
    { id: 'calificar-p2', label: 'Calificar período dos', checked: true },
    { id: 'calificar-p3', label: 'Calificar período tres', checked: true },
    { id: 'calificar-pf', label: 'Calificar período final', checked: true },
    { id: 'imprimir-boletin', label: 'Imprimir boletín Profesor de grupo', checked: true },
    { id: 'editar-logos', label: 'Editar logos', checked: true },
    { id: 'calificar-p4', label: 'Calificar período cuatro', checked: true },
    { id: 'editar-notas', label: 'Editar notas', checked: true },
  ],
};

export const ALL_SETTINGS_SECTIONS: SettingsSection[] = [
  PLATFORM_SETTINGS,
  TEACHER_PERMISSIONS,
];
