// ============== TIPOS ==============

export type StudentFieldName =
  // Información del estudiante
  | 'name'
  | 'last_name'
  | 'type_id'
  | 'identification'
  | 'expedition_place'
  | 'sex'
  | 'birthday'
  | 'birth_place'
  | 'direction'
  | 'phone'
  | 'email'
  | 'photo'
  | 'body_type'
  | 'neighborhood'
  | 'zone'
  | 'health_system'
  | 'blood_type'
  | 'eps'
  | 'exceptional_capacity'
  | 'code'
  | 'sisben'
  | 'stratum'
  | 'status'
  // Información del acudiente
  | 'guardian'
  | 'guardian_identification'
  | 'guardian_address'
  | 'guardian_mobile'
  | 'guardian_birthdate'
  // Información de la madre
  | 'mother'
  | 'mother_identification'
  | 'mother_address'
  | 'mother_mobile'
  | 'mother_birthdate'
  | 'mother_study'
  | 'mother_profession'
  // Información del padre
  | 'father'
  | 'father_identification'
  | 'father_address'
  | 'father_mobile'
  | 'father_birthdate'
  | 'father_study'
  | 'father_profession'
  // Otro parentesco
  | 'other_relationship'
  | 'other_fullname'
  | 'other_identification'
  | 'other_address'
  | 'other_mobile'
  | 'other_birthdate'
  // Población víctima del conflicto
  | 'dependent_children_beneficiary'
  | 'student_mother_head_of_family'
  | 'veteran_hero_beneficiary'
  | 'hero_nation_beneficiary'
  // Situación de desplazamiento
  | 'expulsion_department'
  | 'expulsion_municipality'
  // Procedencia académica
  | 'previous_state'
  | 'previous_study_validity'
  | 'previous_educational_institution'
  | 'previous_grade'
  | 'previous_year'
  | 'previous_city'
  // Etnias
  | 'afrodescendant'
  | 'negritudes'
  | 'rom'
  | 'zenu'
  // Discapacidades
  | 'physical_disability'
  | 'hearing_disability'
  | 'visual_disability'
  | 'deafblindness'
  | 'intellectual_disability'
  | 'psychosocial_disability'
  | 'multiple_disability'
  | 'illness'
  // Talentos excepcionales
  | 'technology_talent'
  | 'leadership_talent'
  | 'natural_sciences_talent'
  | 'arts_talent'
  | 'physical_activity_talent'
  | 'social_sciences_talent'
  // SIMPADE
  | 'temporary_abandonment'
  | 'repeating_current_year'
  | 'disciplinary_records'
  | 'average_attendance_last_year';

export type StudentFieldType = 'text' | 'email' | 'tel' | 'date' | 'select' | 'file' | 'textarea' | 'number';

export interface StudentFormSection {
  type: 'section';
  title: string;
  description?: string;
  collapsible?: boolean;
}

export interface StudentFormField {
  type: 'field';
  name: StudentFieldName;
  label: string;
  fieldType: StudentFieldType;
  required?: boolean;
  colSpanClass?: string;
  placeholder?: string;
  defaultValue?: string;
  options?: Array<{ label: string; value: string }>;
}

export type StudentFormSchemaItem = StudentFormSection | StudentFormField;

// ============== OPCIONES ==============

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CD', label: 'Carné Diplomático' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'NI', label: 'Número de Identificación Tributaria' },
  { value: 'PA', label: 'Pasaporte' },
  { value: 'PE', label: 'Permiso Especial de Permanencia' },
  { value: 'RC', label: 'Registro Civil' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
];

export const GENDER_OPTIONS = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Femenino', label: 'Femenino' },
  { value: 'Otro', label: 'Otro' },
];

export const STUDENT_STATUS_OPTIONS = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
  { value: 'pending', label: 'Pendiente' },
];

export const YES_NO_OPTIONS = [
  { value: 'Si', label: 'Sí' },
  { value: 'No', label: 'No' },
];

export const PREVIOUS_ACADEMIC_STATE_OPTIONS = [
  { value: 'Nuevo', label: 'Nuevo' },
  { value: 'Promovido', label: 'Promovido' },
  { value: 'Repitente', label: 'Repitente' },
];

const currentYear = new Date().getFullYear();

export const GRADE_OPTIONS = Array.from({ length: 11 }, (_, i) => ({
  value: `${i + 1}`,
  label: `${i + 1}`,
}));

export const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  value: `${currentYear - i}`,
  label: `${currentYear - i}`,
}));

export const ATTENDANCE_OPTIONS = [
  { value: 'Alta (80% o más)', label: 'Alta (80% o más)' },
  { value: 'Media (50-79%)', label: 'Media (50-79%)' },
  { value: 'Baja (menos del 50%)', label: 'Baja (menos del 50%)' },
];

export const DISCIPLINARY_RECORD_OPTIONS = [
  { value: 'No aplica', label: 'No aplica' },
  { value: 'Leve', label: 'Leve' },
  { value: 'Grave', label: 'Grave' },
];

// ============== SCHEMA PRINCIPAL ==============

export const studentFormSchema: StudentFormSchemaItem[] = [
  // --- Sección: Información del estudiante ---
  {
    type: 'section',
    title: 'Información del estudiante',
  },
  {
    type: 'field',
    name: 'last_name',
    label: 'Apellidos *',
    fieldType: 'text',
    required: true,
    placeholder: 'Apellidos del estudiante',
  },
  {
    type: 'field',
    name: 'name',
    label: 'Nombres *',
    fieldType: 'text',
    required: true,
    placeholder: 'Nombres del estudiante',
  },
  {
    type: 'field',
    name: 'type_id',
    label: 'Tipo de Documento',
    fieldType: 'select',
    defaultValue: 'RC',
    options: DOCUMENT_TYPE_OPTIONS,
  },
  {
    type: 'field',
    name: 'identification',
    label: 'Identificación / Código *',
    fieldType: 'text',
    required: true,
    placeholder: 'Número de identificación',
  },
  {
    type: 'field',
    name: 'expedition_place',
    label: 'Expedida en',
    fieldType: 'text',
    placeholder: 'Lugar de expedición',
  },
  {
    type: 'field',
    name: 'sex',
    label: 'Sexo',
    fieldType: 'select',
    defaultValue: 'Masculino',
    options: GENDER_OPTIONS,
  },
  {
    type: 'field',
    name: 'birthday',
    label: 'Fecha de nacimiento',
    fieldType: 'date',
  },
  {
    type: 'field',
    name: 'birth_place',
    label: 'Lugar de nacimiento',
    fieldType: 'text',
    placeholder: 'Ciudad de nacimiento',
  },
  {
    type: 'field',
    name: 'direction',
    label: 'Dirección',
    fieldType: 'text',
    placeholder: 'Dirección de residencia',
  },
  {
    type: 'field',
    name: 'phone',
    label: 'Teléfono *',
    fieldType: 'tel',
    required: true,
    placeholder: 'Número de contacto',
  },
  {
    type: 'field',
    name: 'email',
    label: 'Correo electrónico',
    fieldType: 'email',
    placeholder: 'correo@ejemplo.com',
  },
  {
    type: 'field',
    name: 'neighborhood',
    label: 'Barrio',
    fieldType: 'text',
    placeholder: 'Nombre del barrio',
  },
  {
    type: 'field',
    name: 'zone',
    label: 'Zona',
    fieldType: 'text',
    placeholder: 'Urbana / Rural',
  },
  {
    type: 'field',
    name: 'stratum',
    label: 'Estrato',
    fieldType: 'text',
    placeholder: '1-6',
  },
  {
    type: 'field',
    name: 'sisben',
    label: 'Sisben',
    fieldType: 'text',
    placeholder: 'Nivel de Sisben',
  },
  {
    type: 'field',
    name: 'code',
    label: 'Código',
    fieldType: 'text',
    placeholder: 'Código del estudiante',
  },
  {
    type: 'field',
    name: 'status',
    label: 'Estado académico',
    fieldType: 'select',
    defaultValue: 'active',
    options: STUDENT_STATUS_OPTIONS,
  },

  // --- Sección: Información de Salud ---
  {
    type: 'section',
    title: 'Información de Salud',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'health_system',
    label: 'Sistema de salud',
    fieldType: 'text',
    placeholder: 'Tipo de sistema de salud',
  },
  {
    type: 'field',
    name: 'eps',
    label: 'EPS',
    fieldType: 'text',
    placeholder: 'Nombre de la EPS',
  },
  {
    type: 'field',
    name: 'blood_type',
    label: 'Tipo de sangre',
    fieldType: 'text',
    placeholder: 'A+, O-, etc.',
  },
  {
    type: 'field',
    name: 'exceptional_capacity',
    label: 'Capacidad excepcional',
    fieldType: 'text',
    placeholder: 'Especifique si aplica',
  },
  {
    type: 'field',
    name: 'body_type',
    label: 'Complexión corporal',
    fieldType: 'text',
    placeholder: 'Delgado, normal, robusto',
  },

  // --- Sección: Información del Acudiente ---
  {
    type: 'section',
    title: 'Información del Acudiente',
    description: 'Datos del responsable del estudiante',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'guardian',
    label: 'Nombre del Acudiente *',
    fieldType: 'text',
    required: true,
    placeholder: 'Nombre completo del acudiente',
  },
  {
    type: 'field',
    name: 'guardian_identification',
    label: 'Identificación del acudiente',
    fieldType: 'text',
    placeholder: 'Número de identificación',
  },
  {
    type: 'field',
    name: 'guardian_address',
    label: 'Dirección del acudiente',
    fieldType: 'text',
    placeholder: 'Dirección de residencia',
  },
  {
    type: 'field',
    name: 'guardian_mobile',
    label: 'Celular del acudiente',
    fieldType: 'tel',
    placeholder: 'Número de celular',
  },
  {
    type: 'field',
    name: 'guardian_birthdate',
    label: 'Fecha de nacimiento del acudiente',
    fieldType: 'date',
  },

  // --- Sección: Información de la Madre ---
  {
    type: 'section',
    title: 'Información de la Madre',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'mother',
    label: 'Nombre de la madre',
    fieldType: 'text',
    placeholder: 'Nombre completo',
  },
  {
    type: 'field',
    name: 'mother_identification',
    label: 'Identificación de la madre',
    fieldType: 'text',
    placeholder: 'Número de identificación',
  },
  {
    type: 'field',
    name: 'mother_address',
    label: 'Dirección de la madre',
    fieldType: 'text',
    placeholder: 'Dirección de residencia',
  },
  {
    type: 'field',
    name: 'mother_mobile',
    label: 'Celular de la madre',
    fieldType: 'tel',
    placeholder: 'Número de celular',
  },
  {
    type: 'field',
    name: 'mother_birthdate',
    label: 'Fecha de nacimiento de la madre',
    fieldType: 'date',
  },
  {
    type: 'field',
    name: 'mother_study',
    label: 'Estudio realizado de la madre',
    fieldType: 'text',
    placeholder: 'Nivel de estudios',
  },
  {
    type: 'field',
    name: 'mother_profession',
    label: 'Profesión de la madre',
    fieldType: 'text',
    placeholder: 'Ocupación actual',
  },

  // --- Sección: Información del Padre ---
  {
    type: 'section',
    title: 'Información del Padre',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'father',
    label: 'Nombre del padre',
    fieldType: 'text',
    placeholder: 'Nombre completo',
  },
  {
    type: 'field',
    name: 'father_identification',
    label: 'Identificación del padre',
    fieldType: 'text',
    placeholder: 'Número de identificación',
  },
  {
    type: 'field',
    name: 'father_address',
    label: 'Dirección del padre',
    fieldType: 'text',
    placeholder: 'Dirección de residencia',
  },
  {
    type: 'field',
    name: 'father_mobile',
    label: 'Celular del padre',
    fieldType: 'tel',
    placeholder: 'Número de celular',
  },
  {
    type: 'field',
    name: 'father_birthdate',
    label: 'Fecha de nacimiento del padre',
    fieldType: 'date',
  },
  {
    type: 'field',
    name: 'father_study',
    label: 'Estudio realizado del padre',
    fieldType: 'text',
    placeholder: 'Nivel de estudios',
  },
  {
    type: 'field',
    name: 'father_profession',
    label: 'Profesión del padre',
    fieldType: 'text',
    placeholder: 'Ocupación actual',
  },

  // --- Sección: Otro Parentesco ---
  {
    type: 'section',
    title: 'Otro (Parentesco)',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'other_relationship',
    label: 'Parentesco',
    fieldType: 'text',
    placeholder: 'Tío, abuelo, etc.',
  },
  {
    type: 'field',
    name: 'other_fullname',
    label: 'Nombre completo',
    fieldType: 'text',
    placeholder: 'Nombre del familiar',
  },
  {
    type: 'field',
    name: 'other_identification',
    label: 'Identificación',
    fieldType: 'text',
    placeholder: 'Número de identificación',
  },
  {
    type: 'field',
    name: 'other_address',
    label: 'Dirección',
    fieldType: 'text',
    placeholder: 'Dirección de residencia',
  },
  {
    type: 'field',
    name: 'other_mobile',
    label: 'Celular',
    fieldType: 'tel',
    placeholder: 'Número de celular',
  },
  {
    type: 'field',
    name: 'other_birthdate',
    label: 'Fecha de nacimiento',
    fieldType: 'date',
  },

  // --- Sección: Población Víctima del Conflicto ---
  {
    type: 'section',
    title: 'Población Víctima del Conflicto',
    description: 'Debe presentar la certificación correspondiente',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'dependent_children_beneficiary',
    label: 'Beneficiario Hijos dependientes de Madre Cabeza de Familia',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'student_mother_head_of_family',
    label: 'Alumno Madre Cabeza de Familia',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'veteran_hero_beneficiary',
    label: 'Beneficiario Veterano Fuerza Pública',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'hero_nation_beneficiary',
    label: 'Beneficiario Héroe Nación',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },

  // --- Sección: Situación de Desplazamiento ---
  {
    type: 'section',
    title: 'Situación de Desplazamiento',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'expulsion_department',
    label: 'Departamento expulsor',
    fieldType: 'text',
    placeholder: 'Nombre del departamento',
  },
  {
    type: 'field',
    name: 'expulsion_municipality',
    label: 'Municipio expulsor',
    fieldType: 'text',
    placeholder: 'Nombre del municipio',
  },

  // --- Sección: Procedencia Académica ---
  {
    type: 'section',
    title: 'Procedencia Académica',
    description: 'Instituciones educativas anteriores',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'previous_state',
    label: 'Estado',
    fieldType: 'select',
    defaultValue: 'Nuevo',
    options: PREVIOUS_ACADEMIC_STATE_OPTIONS,
  },
  {
    type: 'field',
    name: 'previous_study_validity',
    label: 'Estudio vigencia anterior',
    fieldType: 'text',
    placeholder: 'Vigencia del último estudio',
  },
  {
    type: 'field',
    name: 'previous_educational_institution',
    label: 'Institución Educativa de Procedencia',
    fieldType: 'text',
    placeholder: 'Nombre de la institución anterior',
  },
  {
    type: 'field',
    name: 'previous_grade',
    label: 'Grado de procedencia',
    fieldType: 'select',
    defaultValue: '1',
    options: GRADE_OPTIONS,
  },
  {
    type: 'field',
    name: 'previous_year',
    label: 'Año de procedencia',
    fieldType: 'select',
    defaultValue: `${currentYear}`,
    options: YEAR_OPTIONS,
  },
  {
    type: 'field',
    name: 'previous_city',
    label: 'Ciudad de procedencia',
    fieldType: 'text',
    placeholder: 'Ciudad de la institución anterior',
  },

  // --- Sección: Etnias ---
  {
    type: 'section',
    title: 'Etnias',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'afrodescendant',
    label: 'Afrodescendiente',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'negritudes',
    label: 'Negritudes',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'rom',
    label: 'ROM',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'zenu',
    label: 'ZENÚ',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },

  // --- Sección: Discapacidades ---
  {
    type: 'section',
    title: 'Listado de Categorías de Discapacidad',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'physical_disability',
    label: 'Discapacidad Física',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'hearing_disability',
    label: 'Discapacidad Auditiva',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'visual_disability',
    label: 'Discapacidad Visual',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'deafblindness',
    label: 'Sordo ceguera',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'intellectual_disability',
    label: 'Discapacidad Intelectual',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'psychosocial_disability',
    label: 'Discapacidad Psicosocial',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'multiple_disability',
    label: 'Discapacidad Múltiple',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'illness',
    label: 'Enfermedad que padece el estudiante',
    fieldType: 'text',
    placeholder: 'Especifique si aplica',
  },

  // --- Sección: Talentos Excepcionales ---
  {
    type: 'section',
    title: 'Capacidades y/o Talentos Excepcionales',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'technology_talent',
    label: 'En tecnología',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'leadership_talent',
    label: 'En liderazgo y emprendimiento',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'natural_sciences_talent',
    label: 'En ciencias naturales o básicas',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'arts_talent',
    label: 'En artes o letras',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'physical_activity_talent',
    label: 'En actividad física, ejercicio y deporte',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'social_sciences_talent',
    label: 'En ciencias sociales o humanas',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },

  // --- Sección: SIMPADE ---
  {
    type: 'section',
    title: 'SIMPADE',
    description: 'Sistema de Información para el Monitoreo, Prevención y Análisis de la Deserción Escolar',
    collapsible: true,
  },
  {
    type: 'field',
    name: 'temporary_abandonment',
    label: 'Abandonos temporales (año lectivo actual)',
    fieldType: 'number',
    defaultValue: '0',
    placeholder: '0',
  },
  {
    type: 'field',
    name: 'repeating_current_year',
    label: '¿Está repitiendo año actual?',
    fieldType: 'select',
    defaultValue: 'No',
    options: YES_NO_OPTIONS,
  },
  {
    type: 'field',
    name: 'disciplinary_records',
    label: 'Antecedentes disciplinarios de la vida académica',
    fieldType: 'select',
    defaultValue: 'No aplica',
    options: DISCIPLINARY_RECORD_OPTIONS,
  },
  {
    type: 'field',
    name: 'average_attendance_last_year',
    label: 'Asistencia promedio del año anterior',
    fieldType: 'select',
    defaultValue: 'Alta (80% o más)',
    options: ATTENDANCE_OPTIONS,
  },
];

// ============== UTILIDADES ==============

export const studentFormDefaults = studentFormSchema.reduce<Record<string, string>>(
  (acc, item) => {
    if (item.type === 'field') {
      acc[item.name] = item.defaultValue ?? '';
    }
    return acc;
  },
  {},
);

export const isSectionItem = (
  item: StudentFormSchemaItem,
): item is StudentFormSection => item.type === 'section';

export const isFieldItem = (
  item: StudentFormSchemaItem,
): item is StudentFormField => item.type === 'field';

// Schema simplificado para formularios rápidos (campos básicos obligatorios)
export const studentFormSchemaBasic = studentFormSchema.filter((item) => {
  if (isSectionItem(item)) {
    return item.title === 'Información del estudiante' || item.title === 'Información del Acudiente';
  }
  if (isFieldItem(item)) {
    return item.required || ['name', 'last_name', 'identification', 'type_id', 'sex', 'birthday', 'direction', 'phone', 'email', 'guardian', 'status'].includes(item.name);
  }
  return false;
});
