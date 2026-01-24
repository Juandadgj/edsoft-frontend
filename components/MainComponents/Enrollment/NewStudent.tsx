import { ContainerComponents } from "@/components/ContainerComponents";
import CustomModal from "@/components/CustomModal";
import TableComponent from "@/components/Table";
import {
  CreateStudentInput,
  Group,
  GroupsQuery,
  useCreateEnrollmentMutation,
  useCreateStudentMutation,
  useGroupsLazyQuery,
  useScholearYearSelectedQuery,
} from "@/generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { notification, Table } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { RenderField } from "../forms/dinamyc-form/render-field";
export type NotificationType = "success" | "info" | "warning" | "error";

// config/student-registration-schema.ts
export type FieldValue =
  | string
  | boolean
  | number
  | string[]
  | undefined
  | null;

export interface FormOption {
  value: string;
  id?: string;
  label: string;
}

export type FormFieldType =
  | "radio"
  | "checkbox"
  | "select"
  | "text" // Para inputs de texto simples
  | "number" // Para inputs numéricos simples
  | "heading"
  | "group" // <-- Nuevo tipo para agrupar otros campos
  | "checkboxGroup"
  | "date"
  | "file";

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  options?: FormOption[];
  defaultValue?: FieldValue;

  subFields?: FormField[]; // Para tipos 'group' o 'checkboxGroup'
 
  conditionalRender?: (formData: Record<string, FieldValue>) => boolean;
  className?: string;
}
// --- Opciones Estáticas Comunes ---

// Opciones para Sí/No
const yesNoOptions: FormOption[] = [
  { id: "yes", label: "Sí", value: "Si" },
  { id: "no", label: "No", value: "No" },
];

// Opciones para Género
const genderOptions: FormOption[] = [
  { id: "masculino", label: "Masculino", value: "Masculino" },
  { id: "femenino", label: "Femenino", value: "Femenino" },
  { id: "otro", label: "Otro", value: "Otro" },
];

// Opciones para País (asumiendo que viene de `countries` utilidad)
// Para el esquema, solo pondremos un placeholder. En el Select real se mapearía.
const countryOptions: FormOption[] = [
  { id: "colombia", label: "Colombia", value: "Colombia" },
  // ... más opciones de país si se necesitan aquí en el esquema o se cargan dinámicamente
];

// Opciones para Departamento (asumiendo que viene de `listaDepartamentos` utilidad)
const departmentOptions: FormOption[] = [
  { id: "", label: "Seleccione un departamento", value: "" },
  // ... estos se llenarían dinámicamente en el componente
];

// Opciones de tipos de documento (basado en tu docTypes array)
const documentTypeOptions: FormOption[] = [
  { id: "cc", label: "Cédula de Ciudadanía", value: "CC" },
  { id: "cd", label: "Carné Diplomático", value: "CD" },
  { id: "ce", label: "Cédula de Extranjería", value: "CE" },
  { id: "ni", label: "Número de Identificación Tributaria", value: "NI" },
  { id: "pa", label: "Pasaporte", value: "PA" },
  { id: "pe", label: "Permiso Especial de Permanencia", value: "PE" },
  { id: "rc", label: "Registro Civil", value: "RC" },
  { id: "ti", label: "Tarjeta de Identidad", value: "TI" },
];

// Opciones para Estado Académico Anterior
const previousAcademicStateOptions: FormOption[] = [
  { id: "nuevo", label: "Nuevo", value: "Nuevo" },
  { id: "promovido", label: "Promovido", value: "Promovido" },
  { id: "repitente", label: "Repitente", value: "Repitente" },
  // ... otras opciones
];

// Opciones para Grado Procedencia
const gradeOptions: FormOption[] = Array.from({ length: 11 }, (_, i) => ({
  id: `grade_${i + 1}`,
  label: `${i + 1}`,
  value: `${i + 1}`,
  type: "select",
}));

// Opciones para Año Procedencia
const currentYear = new Date().getFullYear();
const yearOptions: FormOption[] = Array.from({ length: 10 }, (_, i) => ({
  id: `year_${currentYear - i}`,
  label: `${currentYear - i}`,
  value: `${currentYear - i}`,
  type: "select",
}));

// Opciones para Asistencia Promedio
const attendanceOptions: FormOption[] = [
  { id: "alta", label: "Alta (80% o más)", value: "Alta (80% o más)" },
  { id: "media", label: "Media (50-79%)", value: "Media (50-79%)" },
  { id: "baja", label: "Baja (menos del 50%)", value: "Baja (menos del 50%)" },
];

// --- ESQUEMA PRINCIPAL DEL FORMULARIO ---
export const studentRegistrationSchema: FormField[] = [
  {
    id: "studentInfoSection",
    label: "Estudiante nuevo en el sistema",
    type: "heading",
  },
  { id: "surname", label: "Apellidos", type: "text", defaultValue: "" },
  { id: "name", label: "Nombres", type: "text", defaultValue: "" },
  {
    id: "identificationType",
    label: "Tipo de Identificación",
    type: "select",
    options: documentTypeOptions,
    defaultValue: "RC",
  },
  {
    id: "identificationCode",
    label: "Identificación / Código",
    type: "text",
    defaultValue: "", // Este input es especial, tiene un botón "Crear Autom."
  },
  {
    id: "expeditionPlace",
    label: "Expedida en",
    type: "text",
    defaultValue: "",
  },
  {
    id: "gender",
    label: "Sexo",
    type: "select",
    options: genderOptions,
    defaultValue: "Masculino",
  }, // O 'radio' si prefieres
  {
    id: "birthDate",
    label: "Fecha de nacimiento",
    type: "date",
    defaultValue: "",
  }, // Usaremos type='date' para Input
  {
    id: "birthPlace",
    label: "Lugar de nacimiento",
    type: "text",
    defaultValue: "",
  },
  { id: "address", label: "Direccion", type: "text", defaultValue: "" },
  { id: "phone", label: "Telefono", type: "text", defaultValue: "" },
  {
    id: "photo",
    label: "Foto",
    type: "file", // Nuevo tipo para manejar la carga de archivos
    defaultValue: null,
    // Este campo requerirá un componente RenderField personalizado.
  },
  { id: "email", label: "Correo Electrónico", type: "text", defaultValue: "" },
  { id: "bodyType", label: "Cuerpo", type: "text", defaultValue: "" }, // "Corpo" en la imagen, asumo es "Cuerpo"
  { id: "neighborhood", label: "Barrio", type: "text", defaultValue: "" },
  { id: "zone", label: "Zona", type: "text", defaultValue: "" },
  {
    id: "healthSystem",
    label: "Sistema salud",
    type: "text",
    defaultValue: "",
  },
  { id: "bloodType", label: "Tipo sangre", type: "text", defaultValue: "" },
  { id: "eps", label: "EPS", type: "text", defaultValue: "" },
  {
    id: "exceptionalCapacity",
    label: "Capacidad excepcional",
    type: "text",
    defaultValue: "",
  },
  { id: "code", label: "Codigo", type: "text", defaultValue: "" },
  { id: "sisben", label: "Sisben", type: "text", defaultValue: "" },
  { id: "stratum", label: "Estrato", type: "text", defaultValue: "" },

  // --- Información del Acudiente ---
  {
    id: "guardianInfoSection",
    label: "Información del Acudiente",
    type: "heading",
  },
  {
    id: "guardianIdentification",
    label: "Identificacion del acudiente",
    type: "text",
    defaultValue: "",
  },
  {
    id: "guardianAddress",
    label: "Direccion del acudiente",
    type: "text",
    defaultValue: "",
  },
  {
    id: "guardianMobile",
    label: "Celular del acudiente",
    type: "text",
    defaultValue: "",
  },
  {
    id: "guardianBirthDate",
    label: "Fecha nacimiento del acudiente",
    type: "date",
    defaultValue: "",
  },

  // --- Información de la Madre ---
  {
    id: "motherInfoSection",
    label: "Información de la Madre",
    type: "heading",
  },
  {
    id: "motherFullName",
    label: "Nombre y apellido de la madre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "motherIdentification",
    label: "Identificacion de la madre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "motherAddress",
    label: "Direccion de la madre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "motherMobile",
    label: "Celular de la madre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "motherBirthDate",
    label: "Fecha de nacimiento de la madre",
    type: "date",
    defaultValue: "",
  },
  {
    id: "motherStudy",
    label: "Estudio realizado madre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "motherProfession",
    label: "Profesion madre",
    type: "text",
    defaultValue: "",
  },

  // --- Información del Padre ---
  { id: "fatherInfoSection", label: "Información del Padre", type: "heading" },
  {
    id: "fatherFullName",
    label: "Nombre y apellido del padre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "fatherIdentification",
    label: "Identificacion del padre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "fatherAddress",
    label: "Direccion del padre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "fatherMobile",
    label: "Celular del padre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "fatherBirthDate",
    label: "Fecha de nacimiento del padre",
    type: "date",
    defaultValue: "",
  },
  {
    id: "fatherStudy",
    label: "Estudio realizado padre",
    type: "text",
    defaultValue: "",
  },
  {
    id: "fatherProfession",
    label: "Profesion padre",
    type: "text",
    defaultValue: "",
  },

  // --- Información de Otro (Parientes) ---
  {
    id: "otherRelativeInfoSection",
    label: "Otro (Parentesco):",
    type: "heading",
  },
  {
    id: "otherRelationship",
    label: "Parentesco",
    type: "text",
    defaultValue: "",
  },
  {
    id: "otherFullName",
    label: "Nombre y apellido de otro",
    type: "text",
    defaultValue: "",
  },
  {
    id: "otherIdentification",
    label: "Identificacion de otro",
    type: "text",
    defaultValue: "",
  },
  {
    id: "otherAddress",
    label: "Direccion de otro",
    type: "text",
    defaultValue: "",
  },
  {
    id: "otherMobile",
    label: "Celular de otro",
    type: "text",
    defaultValue: "",
  },
  {
    id: "otherBirthDate",
    label: "Fecha de nacimiento de otro",
    type: "date",
    defaultValue: "",
  },

  // --- Población Víctima del Conflicto ---
  {
    id: "conflictVictimSection",
    label:
      "Población Víctima del Conflicto (Debe presentar la certificación correspondiente)",
    type: "heading",
  },
  {
    id: "dependentChildrenBeneficiary",
    label: "Beneficiario Hijos dependientes de Madre Cabeza de Familia",
    type: "text",
    defaultValue: "",
  },
  {
    id: "studentMotherHeadOfFamily",
    label: "Alumno Madre Cabeza de Familia",
    type: "text",
    defaultValue: "",
  },
  {
    id: "veteranHeroBeneficiary",
    label: "Beneficiario Veterano Fuerza Pública",
    type: "text",
    defaultValue: "",
  },
  {
    id: "heroNationBeneficiary",
    label: "Beneficiario Héroe Nación",
    type: "text",
    defaultValue: "",
  },

  // --- En situación de desplazamiento ---
  {
    id: "displacementSection",
    label: "En situación de desplazamiento",
    type: "heading",
  },
  {
    id: "expulsionDepartment",
    label: "Departamento expulsor",
    type: "text",
    defaultValue: "",
  },
  {
    id: "expulsionMunicipality",
    label: "Municipio expulsor",
    type: "text",
    defaultValue: "",
  },

  // --- Procedencia Académica (Instituciones anteriores) ---
  {
    id: "academicOriginSection",
    label: "Procedencia Académica (Instituciones anteriores)",
    type: "heading",
  },
  {
    id: "previousState",
    label: "Estado",
    type: "select",
    options: previousAcademicStateOptions,
    defaultValue: "Nuevo",
  },
  {
    id: "previousStudyValidity",
    label: "Estudio vigencia anterior",
    type: "text",
    defaultValue: "",
  },
  {
    id: "previousEducationalInstitution",
    label: "Institucion Educativa Procedencia",
    type: "text",
    defaultValue: "",
  },
  {
    id: "previousGrade",
    label: "Grado procedencia",
    type: "select",
    options: gradeOptions,
    defaultValue: "1",
  },
  {
    id: "previousYear",
    label: "Año procedencia",
    type: "select",
    options: yearOptions,
    defaultValue: currentYear.toString(),
  },
  {
    id: "previousCity",
    label: "Ciudad procedencia",
    type: "text",
    defaultValue: "",
  },

  // --- ETNIAS ---
  { id: "ethnicitiesSection", label: "ETNIAS", type: "heading" },
  {
    id: "afrodescendant",
    label: "Afrodescendientes",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "negritudes",
    label: "Negritudes",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "rom",
    label: "ROM",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "zenu",
    label: "ZENÚ",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },

  // --- Listado de categorías de discapacidad ---
  {
    id: "disabilityCategoriesSection",
    label: "Listado de categorías de discapacidad",
    type: "heading",
  },
  {
    id: "physicalDisability",
    label: "Discapacidad Física",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "hearingDisability",
    label: "Discapacidad Auditiva",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "visualDisability",
    label: "Discapacidad Visual",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "deafblindness",
    label: "Sordo ceguera",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "intellectualDisability",
    label: "Discapacidad Intelectual",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "psychosocialDisability",
    label: "Discapacidad psicosocial",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "multipleDisability",
    label: "Discapacidad múltiple",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "illness",
    label: "Enfermedad que padece el estudiante",
    type: "text",
    defaultValue: "",
  },

  // --- Listado de capacidades y/o talentos excepcionales ---
  {
    id: "exceptionalTalentsSection",
    label: "Listado de capacidades y/o talentos excepcionales",
    type: "heading",
  },
  {
    id: "technologyTalent",
    label: "En tecnología",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "leadershipTalent",
    label: "En liderazgo y emprendimiento",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "naturalSciencesTalent",
    label: "En ciencias naturales o básicas",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "artsTalent",
    label: "En artes o letras",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "physicalActivityTalent",
    label: "En actividad física, ejercicio y deporte",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "socialSciencesTalent",
    label: "En ciencias sociales o humanas",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },

  // --- Otros ---
  { id: "simpade", label: "SIMPADE", type: "heading" },
  {
    id: "temporaryAbandonment",
    label: "Abandono temporales (año lectivo actual)",
    type: "text",
    defaultValue: "0",
  },
  {
    id: "repeatingCurrentYear",
    label: "¿Esta repitiendo año actual?",
    type: "select",
    options: yesNoOptions,
    defaultValue: "No",
  },
  {
    id: "disciplinaryRecords",
    label: "Antecedentes disciplinarios de la vida académica",
    type: "select",
    options: [{ id: "no_aplica", label: "No aplica", value: "No aplica" }],
    defaultValue: "No aplica",
  },
  {
    id: "averageAttendanceLastYear",
    label: "Asistencia promedio del año anterior",
    type: "select",
    options: attendanceOptions,
    defaultValue: "Alta (80% o más)",
  },
];

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profesor del Grupo",
    dataIndex: "representative",
    key: "representative",
  },
  {
    title: "Horario",
    dataIndex: "working_time",
    key: "working_time",
  },
  {
    title: "Matricular",
    dataIndex: "enrollment",
    key: "enrollment",
  },
];
interface TStudent extends CreateStudentInput {
  name: string;
  last_name: string;
  email: string;
  identification: string;
  sex: string;
  birthday: null | undefined;
  direction: string;
  phone: string;
  father: string;
  mother: string;
  guardian: string;
  status: string;
  type_id: number;
}

const NewStudent = ({ initialData = {} }: { initialData?: any }) => {
  const [open, setOpen] = useState(false);
  const { data: year } = useScholearYearSelectedQuery();
  const router = useRouter();
  const { g } = router.query;
  const [
    getGroups,
    { data: groupsData, loading: groupsLoading, error: groupsError },
  ] = useGroupsLazyQuery({
    variables: {
      filterGroupInput: { id_year: year?.scholearYearSelected.id_year },
    },
  });
  const [createStudent, { data, loading, error }] = useCreateStudentMutation();
  const [
    createEnrollment,
    {
      data: enrollmentData,
      loading: enrollmentLoading,
      error: enrollmentError,
    },
  ] = useCreateEnrollmentMutation();
  const [groupsList, setGroupsList] = useState<Group[]>();
  const [group, setGroup] = useState<{
    id_group: number;
    level: number | undefined | null;
    sublevel: string | undefined | null;
  }>();
  const [enrollment, setEnrollment] = useState(false);
  const [student, setStudent] = useState<TStudent>({
    name: "",
    last_name: "",
    email: "",
    identification: "",
    sex: "",
    birthday: null,
    direction: "",
    phone: "",
    father: "",
    mother: "",
    guardian: "",
    status: "",
    type_id: 4,
  });

  const [formData, setFormData] = useState<Record<string, FieldValue>>(() => {
    const defaultState: Record<string, FieldValue> = {};
    studentRegistrationSchema.forEach((field) => {
      const initializeField = (f: FormField) => {
        if (f.type === "group" && f.subFields) {
          f.subFields.forEach(initializeField);
        } else if (f.type === "checkboxGroup" && f.subFields) {
          f.subFields.forEach(initializeField);
        } else if (f.id) {
          defaultState[f.id] = initialData[f.id] ?? f.defaultValue ?? "";
        }
      };
      initializeField(field);
    });
    return defaultState;
  });

  const [errors, setErrors] = useState<any>({
    name: "",
    last_name: "",
    email: "",
    identification: "",
    sex: "",
    direction: "",
    phone: "",
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, type: NotificationType) => {
    api[type]({
      message: `${message}`,
      description: "",
    });
  };

  const validationEvent = () => {
    if (
      student.name &&
      student.last_name &&
      student.email &&
      student.identification &&
      student.direction &&
      student.phone
    ) {
      return true;
    } else {
      for (const item in student) {
        if (!student[item as keyof TStudent]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };
  const handlerCreateStudent = async () => {
    createStudent({
      variables: { createStudentInput: student, idGroup: group?.id_group ?? 0 },
    }).then((res) => {
      if (res.data) {
        createEnrollment({
          variables: {
            createEnrollmentInput: {
              id_student: res.data.createStudent.id_student,
              id_group: group?.id_group ?? 0,
              year: year?.scholearYearSelected.id_year,
            },
          },
        });
      }
    });
  };

  const handlerSetStudent = ({ target }: any) => {
    setStudent({ ...student, [target.name]: target.value });
  };
  const handlerSelectGroup = () => {
    if (validationEvent()) {
      setEnrollment(true);
    }
  };
  const handlerOpenModal = (group: any) => {
    setGroup(group);
    setOpen(true);
  };
  const processedGroups = (groups: Group[] | null | undefined) => {
    if (!groups) return [];
    return groups.map((group) => ({
      id_group: group?.id_group,
      name: `${getCourseLevel(group?.level)} - ${group?.sublevel}`,
      representative: group?.representative ?? "",
      working_time: group.working_time,
      enrollment: (
        <button onClick={() => handlerOpenModal(group)}>
          Selecionar grupo
        </button>
      ),
    }));
  };

  useEffect(() => {
    if (enrollment) {
      getGroups();
    }
  }, [enrollment]);

  useEffect(() => {
    if (groupsData?.groups) {
      setGroupsList(processedGroups(groupsData.groups as Group[]));
    }
  }, [groupsData]);
  useEffect(() => {
    if (enrollmentData) {
      openNotification("Estudiante matriculado con éxito", "success");
      setOpen(false);
      setEnrollment(false);
    }
    if (enrollmentError) {
      openNotification("Error al matricular estudiante", "error");
    }
  }, [enrollmentData]);
  return (
    <ContainerComponents>
      {contextHolder}
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Estudiante nuevo en el sistema
          </strong>
        </h3>
      </div>
      {enrollment && (
        <div className={`w-full px-3 overflow-x-auto animate-fade-left h-full`}>
          {groupsLoading && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {groupsData && <TableComponent column={columns} data={groupsList} />}
          {groupsError && (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-md text-red-500">{groupsError.message}</h1>
            </div>
          )}
        </div>
      )}
      {!enrollment && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 bg-gray-50">
          {studentRegistrationSchema.map((field) => (
            <RenderField
              key={field.id}
              field={field}
              formData={formData}
              handleChange={(id, value) => setFormData((prevData) => ({ ...prevData, [id]: value }))}
              label={field.label}
            />
          ))}
        </div>
      )}
      <CustomModal open={open}>
        <div>
          <h1 className="text-center text-2xl font-medium text-main-blue">
            Advertencia
          </h1>
          <div className="my-3">
            <h3>
              ¿Estas seguro de que quieres matricular al estudiante{" "}
              {student.name} {student.last_name} en el curso {group?.level}{" "}
              {group?.sublevel}?
            </h3>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <button
              disabled={enrollmentLoading}
              onClick={handlerCreateStudent}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Matricular
            </button>
            <button
              onClick={() => setOpen(false)}
              className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
            >
              Cancelar
            </button>
          </div>
          {loading && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {error && (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <h1>Parece que hubo un error</h1>
              <h3 className="text-md text-red-500">{error.message}</h3>
              <div className="w-full flex justify-center items-center gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </CustomModal>
    </ContainerComponents>
  );
};

export default NewStudent;
