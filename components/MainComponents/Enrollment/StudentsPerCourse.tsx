import React, { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { CourseComponent } from "../CourseComponent";
import { FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studentService, reportService } from "@/services/api.service";

const columnsGroup = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profesor del Grupo",
    dataIndex: "group_teacher",
    key: "group_teacher",
  },
  {
    title: "Alumnos",
    dataIndex: "students",
    key: "students",
  },
  { title: "Ver", dataIndex: "see", key: "see" },
];

const columnsStudent = [
  {
    title: "Apellido y Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Certi. Matri. I",
    dataIndex: "certi-1",
    key: "certi-1",
  },
  {
    title: "Certi. Matri. II",
    dataIndex: "certi-2",
    key: "certi-2",
  },
  {
    title: "Info",
    dataIndex: "info",
    key: "info",
  },
  {
    title: "Editar",
    dataIndex: "edit",
    key: "edit",
  },
  {
    title: "Sacar",
    dataIndex: "leave",
    key: "leave",
  },
];

export const StudentsPerCourse = () => {
  const { year } = useSchoolYear();
  const router = useRouter();
  const { g } = router.query;
  const [studentsByGroup, setStudentsByGroup] = useState<any[]>([]);
  const [loadingStudentsByGroup, setLoadingStudentsByGroup] = useState(false);
  const [errorStudentsByGroup, setErrorStudentsByGroup] = useState<any>(null);
  const [dataStudentsByGroup, setDataStudentsByGroup] = useState<any>(null);

  const handlerSpreadsheet = useCallback(async (id_student: number) => {
    try {
      const res = await reportService.studentEnrollmentI({ id_student, id_year: year || new Date().getFullYear() });
      handleOpenHTML(res.report_content);
    } catch (error) {
      console.error("Error generating report I:", error);
    }
  }, [year]);

  const handlerSpreadsheetII = useCallback(async (id_student: number) => {
    try {
      const res = await reportService.studentEnrollmentII({ id_student, id_year: year || new Date().getFullYear() });
      handleOpenHTML(res.report_content);
    } catch (error) {
      console.error("Error generating report II:", error);
    }
  }, [year]);

  const handleOpenHTML = (htmlString: any) => {
    window.open()?.document.write(htmlString);
  };

  const processedStudentsByGroup = (data: any) => {
    if (!data) return [];
    return data.map((student: any) => ({
      id_student: student?.id_course,
      name: `${student.name} ${student.last_name}`,
      "certi-1": (
        <button onClick={() => handlerSpreadsheet(student?.id_student)}>
          <FileUser size={25} color="#0055a6" />
        </button>
      ),
      "certi-2": (
        <button onClick={() => handlerSpreadsheetII(student?.id_student)}>
          <FileUser size={25} color="#0055a6" />
        </button>
      ),
      info: (
        <button
          onClick={() =>
            router.push(`/dashboard/estudiante/${student.id_student}`)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0055a6"
              d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20zm-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17zM9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7zm0 2v1h6V9zm0 2v1h4v-1z"
            />
          </svg>
        </button>
      ),
      edit: (
        <button
          onClick={() =>
            router.push(`/dashboard/estudiante/${student.id_student}`)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0055a6"
              d="M14 22v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v3h-2V9h-5V4H6v16h6v2zm13.025-5.025l-.475-.45l.925.925z"
            />
          </svg>
        </button>
      ),
      leave: (
        <button
          onClick={() =>
            router.push(`/dashboard/estudiante/${student.id_student}`)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 14 14"
          >
            <g
              fill="none"
              stroke="#e11d48"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="5" cy="3.75" r="2.25" />
              <path d="M6.5 13.5h-6V12a4.5 4.5 0 0 1 7.39-3.45m.61 2.95h5" />
            </g>
          </svg>
        </button>
      ),
    }));
  };

  const fetchStudentsByGroup = useCallback(async (groupId: number) => {
    setLoadingStudentsByGroup(true);
    setErrorStudentsByGroup(null);
    try {
      const data = await studentService.getByGroup(groupId);
      setDataStudentsByGroup(data);
      setStudentsByGroup(processedStudentsByGroup(data));
    } catch (error) {
      setErrorStudentsByGroup(error);
      console.error("Error fetching students by group:", error);
    } finally {
      setLoadingStudentsByGroup(false);
    }
  }, []);

  useEffect(() => {
    if (g) {
      fetchStudentsByGroup(Number(g));
    }
  }, [g, fetchStudentsByGroup]);
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Estudiantes por curso en el año {year}
          </strong>
        </h3>
      </div>
      {!g && <CourseComponent isCreate={false} showSubjects={true} />}
      {g && (
        <div className="h-full">
          {loadingStudentsByGroup && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {dataStudentsByGroup && (
            <TableComponent column={columnsStudent} data={studentsByGroup} />
          )}
          {errorStudentsByGroup && <h3>¡Ocurrio un error!</h3>}
        </div>
      )}
    </ContainerComponents>
  );
};
