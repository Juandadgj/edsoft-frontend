import {
  FormField,
  FormOption,
} from "@/app/components/shared/render-field/types";

const indicatorsOptions: FormOption[] = [
  { value: "calificados", label: "Solo los Calificados o Señalados" },
  { value: "todos", label: "Todos Los indicadores" },
  { value: "ninguno", label: "No mostrar Indicadores" },
];

// Schema del formulario de reportes configurables
export const reportConfigurableSchema: FormField[] = [
  // Sección de indicadores (Radio)
  {
    id: "indicatorsDisplay",
    label: "Mostrar indicadores:",
    type: "radio",
    options: indicatorsOptions,
    defaultValue: "calificados",
  },
  // Sección de firmas (Grupo de checkboxes)
  {
    id: "signaturesSection",
    label: "Mostrar Espacio para las firmas de :",
    type: "group", // Se mantiene como checkboxGroup
    subFields: [
      {
        id: "showRectorSignature",
        label: "Rector",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "showSecretarySignature",
        label: "Secretario (a)",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "showGroupProfessorSignature",
        label: "Profesor de Grupo",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },
  // Primera columna de opciones
  {
    id: "averagesSection",
    label: "",
    type: "group",
    subFields: [
      {
        id: "average_general",
        label: "Mostrar Promedio General",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "average_group",
        label: "Mostrar Promedio del Grupo",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "average_area",
        label: "Mostrar Promedio de Area",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "username",
        label: "Mostrar Nombre de Usuario",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "showLogo",
        label: "Mostrar Logo",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "qualification_per1",
        label: "Mostrar Notas de Periodos Uno",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "qualification_per3",
        label: "Mostrar Notas de Periodos Tres",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "average_per",
        label: "Mostrar Promedio de Periodos Anteriores",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "hideSubjectsWithArea",
        label: "No mostrar las asignaturas con area",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "subjectNameSeparateLine",
        label: "Nombre de la asignatura en una linea aparte",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },
  // Segunda columna de opciones
  {
    id: "additionalOptionsSection",
    label: "",
    type: "group",
    subFields: [
      {
        id: "positionInGroup",
        label: "Puesto Ocupado en el Grupo",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "position",
        label: "Puesto Ocupado del Grupo",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "professor_course",
        label: "Mostrar Docente de cada Asignatura",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "showSubtitleHeader",
        label: "Mostrar Subtitulo en el Encabezado",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "showRecommendations",
        label: "Mostrar Recomendaciones",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "qualification_per2",
        label: "Mostrar Notas de Periodos Dos",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "qualification_per4",
        label: "Mostrar Notas de Periodos Cuatro",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "all_qualifications",
        label: "Mostrar Notas de todos los Periodos",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "hour",
        label: "Mostrar la Intensidad Horaria",
        type: "checkbox",
        defaultValue: true,
      },
      {
        id: "absences",
        label: "Mostrar la inasistencia",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },
];
