import React, { useState } from "react";
import {
  useGenerateReportAreaLazyQuery,
  ReportDictionary,
  SignatureInput,
} from "@/generated/graphql";
import { useRouter } from "next/router";

const ReportConfigurable = () => {
  const router = useRouter();
  const { g, s } = router.query;
  const [generateReport, { data }] = useGenerateReportAreaLazyQuery({
    fetchPolicy: "network-only",
  });

  const handlerGenerateReport = () => {
    generateReport({
      variables: {
        generateReportAreaInput: {
          id_group: Number(g),
          id_student: Number(s),
          report_options: {
            professor_course: variables.professor_course,
            average_general: variables.average_general,
            average_group: variables.average_group,
            average_area: variables.average_area,
            position: variables.position,
            hour: variables.hour,
            absences: variables.absences,
            all_qualifications: variables.all_qualifications,
            qualification_per1: variables.qualification_per1,
            qualification_per2: variables.qualification_per2,
            qualification_per3: variables.qualification_per3,
            qualification_per4: variables.qualification_per4,
            average_per: variables.average_per,
            signature: signatures,
          },
        },
      },
    }).then((res) => {
      const { data } = res;
      handleOpenHTML(data?.generateReportArea.report_content);
    });
  };

  const [signatures, setSignatures] = useState<SignatureInput>({
    professor_group: true,
  });
  const [variables, setVariables] = useState<ReportDictionary>({
    professor_course: false,
    average_general: false,
    average_group: false,
    average_area: true,
    position: false,
    hour: true,
    absences: true,
    all_qualifications: false,
    qualification_per1: false,
    qualification_per2: true,
    qualification_per3: true,
    qualification_per4: true,
    average_per: true,
    signature: signatures,
  });
  const handleOpenHTML = (htmlString: string | undefined) => {
    window.open()?.document.write(htmlString ? htmlString : "");
  };

  const handlerSetSignatures = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSignatures({ ...signatures, [target.name]: target.checked });
  };

  const handlerSetVariables = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setVariables({ ...variables, [target.name]: target.checked });
  };

  return (
    <div
      className="w-full h-full overflow-auto"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#25429e #F3F4F6",
        scrollbarGutter: "20px",
      }}
    >
      <div className="grid grid-cols-2 p-5">
        <div className="text-black">
          <div className="text-black text-sm">
            <h1>Mostrar indicadores:</h1>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="radio"
              name="radio-10"
              className="radio radio-sm checked:bg-main-blue border-main-blue"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Solo los Calificados o Señalados
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="radio"
              name="radio-10"
              className="radio radio-sm checked:bg-main-blue border-main-blue"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm ">
                Todos Los indicadores
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="radio"
              name="radio-10"
              className="radio radio-sm checked:bg-main-blue border-main-blue"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm ">
                No mostrar Indicadores
              </span>
            </label>
          </div>
        </div>
        <div>
          <div className="text-black text-sm">
            <h1>Mostrar Espacio para las firmas de :</h1>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="rector"
              checked={signatures.rector ? signatures.rector : false}
              onChange={handlerSetSignatures}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">Rector</span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="secretary"
              checked={signatures.secretary ? signatures.secretary : false}
              onChange={handlerSetSignatures}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm ">
                Secretario (a)
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="professor_group"
              checked={
                signatures.professor_group ? signatures.professor_group : false
              }
              onChange={handlerSetSignatures}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm ">
                Profesor de Grupo
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 p-5">
        <div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="average_general"
              checked={
                variables.average_general ? variables.average_general : false
              }
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Promedio General
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="average_group"
              checked={
                variables.average_group ? variables.average_group : false
              }
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Promedio del Grupo
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="average_area"
              checked={variables.average_area ? variables.average_area : false}
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Promedio de Area
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="username"
              checked={variables.username ? variables.username : false}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Nombre de Usuario
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Logo
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="qualification_per1"
              onChange={handlerSetVariables}
              checked={
                variables.qualification_per1
                  ? variables.qualification_per1
                  : false
              }
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Notas de Periodos Uno
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="qualification_per3"
              onChange={handlerSetVariables}
              checked={
                variables.qualification_per3
                  ? variables.qualification_per3
                  : false
              }
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Notas de Periodos Tres
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Promedio de Periodos Anteriores
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                No mostrar las asignaturas con area
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Nombre de la asignatura en una linea aparte
              </span>
            </label>
          </div>
        </div>
        <div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Puesto Ocupado en el Grupo
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="position"
              onChange={handlerSetVariables}
              checked={variables.position ? variables.position : false}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Puesto Ocupado del Grupo
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="professor_course"
              checked={
                variables.professor_course ? variables.professor_course : false
              }
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Docente de cada Asignatura
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Subtitulo en el Encabezado
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Recomendaciones
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="qualification_per2"
              checked={
                variables.qualification_per2
                  ? variables.qualification_per2
                  : false
              }
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Notas de Periodos Dos
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="qualification_per4"
              checked={
                variables.qualification_per4
                  ? variables.qualification_per4
                  : false
              }
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Notas de Periodos Cuatro
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="all_qualifications"
              checked={
                variables.all_qualifications
                  ? variables.all_qualifications
                  : false
              }
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar Notas de todos los Periodos
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="hour"
              checked={variables.hour ? variables.hour : false}
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar la Intensidad Horaria
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              name="absences"
              checked={variables.absences ? variables.absences : false}
              onChange={handlerSetVariables}
              className="checkbox checkbox-sm border-main-blue [--chkfg:white] [--chkbg:#0055a6]"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-black text-sm">
                Mostrar la inasistencia
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={handlerGenerateReport}
          className="btn btn-sm border-none text-white bg-main-blue hover:bg-[#0b5ed7] hover:scale-105 transition duration-500 text-xs"
        >
          Generar boletin o informe
        </button>
      </div>
    </div>
  );
};

export default ReportConfigurable;
