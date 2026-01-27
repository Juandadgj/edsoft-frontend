import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { reportService } from "@/services/api.service";
import { RenderField } from "@/components/MainComponents/forms/dinamyc-form/render-field";
import {
  FieldValue,
  FormField,
  FormOption,
} from "@/components/MainComponents/forms/dinamyc-form/types/types";

// Opciones para el campo de indicadores
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
    label: "Mostrar Espacio para las firmas de:",
    type: "group",
    subFields: [
      {
        id: "rector",
        label: "Rector",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "secretary",
        label: "Secretario (a)",
        type: "checkbox",
        defaultValue: false,
      },
      {
        id: "professor_group",
        label: "Profesor de Grupo",
        type: "checkbox",
        defaultValue: true,
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

const ReportConfigurable = ({ initialData = {} }: { initialData?: any }) => {
  const router = useRouter();
  const { g, s } = router.query;
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  // Inicializar el estado del formulario basándose en el schema
  const [formData, setFormData] = useState<Record<string, FieldValue>>(() => {
    const defaultState: Record<string, FieldValue> = {};
    reportConfigurableSchema.forEach((field) => {
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

  const handleChange = useCallback((id: string, value: FieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  const handlerGenerateReport = () => {
    setIsLoadingReport(true);
    console.log("Generating report with options:", g, s);
    reportService
      .area(
        {
          id_group: Number(g),
          id_student: Number(s),
        },
        {
          professor_course: formData.professor_course as boolean,
          average_general: formData.average_general as boolean,
          average_group: formData.average_group as boolean,
          average_area: formData.average_area as boolean,
          position: formData.position as boolean,
          hour: formData.hour as boolean,
          absences: formData.absences as boolean,
          all_qualifications: formData.all_qualifications as boolean,
          qualification_per1: formData.qualification_per1 as boolean,
          qualification_per2: formData.qualification_per2 as boolean,
          qualification_per3: formData.qualification_per3 as boolean,
          qualification_per4: formData.qualification_per4 as boolean,
          average_per: formData.average_per as boolean,
          signature: {
            rector: formData.rector as boolean,
            secretary: formData.secretary as boolean,
            professor_group: formData.professor_group as boolean,
          },
        },
      )
      .then((res) => {
        handleOpenHTML(res.report_content);
        setIsLoadingReport(false);
      })
      .catch((err) => {
        console.error("Error generating report:", err);
        setIsLoadingReport(false);
      });
  };

  const handleOpenHTML = (htmlString: string | undefined) => {
    window.open()?.document.write(htmlString ? htmlString : "");
  };

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-4 p-5">
        {/* Renderizar los primeros dos campos del schema (indicadores y firmas) */}
        {reportConfigurableSchema.slice(0, 2).map((field) => (
          <RenderField
            key={field.id}
            field={field}
            formData={formData}
            handleChange={handleChange}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 p-5">
        {/* Renderizar las dos columnas de opciones (campos 2 y 3 del schema) */}
        {reportConfigurableSchema.slice(2, 4).map((field) => (
          <RenderField
            key={field.id}
            field={field}
            formData={formData}
            handleChange={handleChange}
          />
        ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={handlerGenerateReport}
          disabled={isLoadingReport}
          className="btn btn-sm border-none text-white bg-main-blue hover:bg-[#0b5ed7] hover:scale-105 transition duration-500 text-xs disabled:opacity-50"
        >
          {isLoadingReport ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Generar boletin o informe"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReportConfigurable;
