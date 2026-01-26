import { RenderField } from "@/components/MainComponents/forms/dinamyc-form/render-field";
import {
  FieldValue,
  FormField,
  FormOption,
} from "@/components/MainComponents/forms/dinamyc-form/types/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Select } from "@/components/ui/select";
import { GradeDisplayMode, useGenerateCertifiedStudentReportLazyQuery } from "@/generated/graphql";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

const gradeDisplayOptions: FormOption[] = [
  { value: "nota_numerica", label: "Nota Numerica" },
  { value: "nota_desempeno", label: "Nota en desempeño" },
  { value: "nota_numerica_desempeno", label: "Nota numerica y desempeño" },
  { value: "certificado_matricula", label: "Certificado de matricula" },
];

const certificateResultOptions: FormOption[] = [
  { value: "esta_cursando", label: "Esta cursando" },
  { value: "curso_aprobo", label: "Curso y aprobó" },
  { value: "curso_desaprobo", label: "Curso y desaprobo" },
  { value: "curso_deserto", label: "Curso y desertó" },
  { value: "curso", label: "Curso" },
];

export const certificateFormSchema: FormField[] = [
  {
    id: "gradeDisplayConfig", // Un ID para este grupo
    label: "Si la calificacion es Numerica, Mostrar:",
    type: "radio", // Ahora es un grupo
    options: gradeDisplayOptions,
    defaultValue: "nota_numerica",
  },
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
  {
    id: "headerTitleSize",
    label: "Tamaño del Titulo en el Encabezado",
    type: "select",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ],
    defaultValue: "4",
  },
  {
    id: "showIntensidadHoraria",
    label: "Mostrar Intensidad Horaria (H.S.)",
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
    id: "showSubtitleHeader",
    label: "Mostrar Subtitulo en el Encabezado",
    type: "checkbox",
    defaultValue: true,
  },
  {
    id: "showIdentificationCode",
    label: "Mostrar identificacion / codigo",
    type: "checkbox",
    defaultValue: false,
  },
  {
    id: "showNotesPeriodOne",
    label: "Mostrar Notas del Periodo Uno",
    type: "checkbox",
    defaultValue: false,
  },
  {
    id: "showNotesPeriodTwo",
    label: "Mostrar Notas del Periodo Dos",
    type: "checkbox",
    defaultValue: false,
  },
  {
    id: "showNotesPeriodThree",
    label: "Mostrar Notas del Periodo Tres",
    type: "checkbox",
    defaultValue: false,
  },
  {
    id: "showNotesPeriodFour",
    label: "Mostrar Notas del Periodo Cuatro",
    type: "checkbox",
    defaultValue: false,
  },
  {
    id: "showAverageFourPeriods",
    label: "Mostrar Promedio de los 4 Periodos",
    type: "checkbox",
    defaultValue: false,
  },
  {
    id: "showNotesPeriodFive",
    label: "Mostrar Notas del Periodo Cinco",
    type: "checkbox",
    defaultValue: true,
  },
  {
    id: "showAreas",
    label: "Mostrar Areas",
    type: "checkbox",
    defaultValue: false,
  },
  {
    id: "showAchievements",
    label: "Mostrar Logros",
    type: "checkbox",
    defaultValue: false,
  },
];

export const Configuration = ({ initialData = {} }: { initialData?: any }) => {
  const [generateReport, { data }] = useGenerateCertifiedStudentReportLazyQuery(
    {
      fetchPolicy: "network-only",
    },
  );
  const router = useRouter();
  const { s } = router.query;
  const [formData, setFormData] = useState<Record<string, FieldValue>>(() => {
    const defaultState: Record<string, FieldValue> = {};
    certificateFormSchema.forEach((field) => {
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
  const handleGenerateCertificate = () => {
    console.log(s,"query")
    generateReport({
      variables: {
        generateCertifiedStudentReportInput: {
          id_student: Number(s),
          report_options: {
            hour: formData.showIntensidadHoraria as boolean,
            qualification_per1: formData.showNotesPeriodOne as boolean,
            qualification_per2: formData.showNotesPeriodTwo as boolean,
            qualification_per3: formData.showNotesPeriodThree as boolean,
            qualification_per4: formData.showNotesPeriodFour as boolean,
            qualification_per5: formData.showNotesPeriodFive as boolean,
            average_per: formData.averagePer as boolean,
            signature: {
              professor_group: formData.showGroupProfessorSignature as boolean,
              rector: formData.showRectorSignature as boolean,
              secretary: formData.showSecretarySignature as boolean,
            },
            gradeDisplayConfig: formData.gradeDisplayConfig as GradeDisplayMode,
          },
        },
      },
    }).then((res) => {
      const { data } = res;
      console.log(data, "data");
      handleOpenHTML(data?.generateCertifiedStudentReport.report_content);
    }).catch((err) => {
      console.log(err);
    });
  };
  const handleOpenHTML = (htmlString: string | undefined) => {
    window.open()?.document.write(htmlString ? htmlString : "");
  };
  console.log(data, "certi")
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2">
        {certificateFormSchema.map((field) => (
          <RenderField
            key={field.id}
            field={field}
            formData={formData}
            handleChange={handleChange}
            label={field.label}
          />
        ))}
      </div>
      <Button
        className="bg-main-blue hover:bg-[#0b5ed7] text-white border-none mt-2"
        variant="default"
        onClick={() => {
          handleGenerateCertificate();
        }}
      >
        Generar certificado
      </Button>
      <pre className="text-sm text-black bg-white p-3 rounded overflow-x-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
};
