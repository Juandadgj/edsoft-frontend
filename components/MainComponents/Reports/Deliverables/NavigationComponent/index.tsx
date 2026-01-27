import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import ReportConfigurable from "../ReportConfigurable";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import useSchoolYear from "@/hooks/useSchoolYear";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { CourseComponent } from "@/components/MainComponents/CourseComponent";
import { FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reportService } from "@/services/api.service";
import {
  useGetStudentsByGroupLazyQuery,
  useGroupsQuery,
} from "@/hooks/useRestApi";
import { Student } from "@/types";

const columnsDeliverable = [
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
    title: "Acciones",
    dataIndex: "select",
    key: "select",
  },
];

const columsStudentPer = [
  {
    title: "Apellido y Nombre",
    dataIndex: "student",
    key: "student",
  },
  {
    title: "1 Per.",
    dataIndex: "periodo1",
    key: "periodo1",
  },
  {
    title: "2 Per.",
    dataIndex: "periodo2",
    key: "periodo2",
  },
  {
    title: "3 Per.",
    dataIndex: "periodo3",
    key: "periodo3",
  },
  {
    title: "4 Per.",
    dataIndex: "periodo4",
    key: "periodo4",
  },
];

const NavigationComponent = () => {
  const { year } = useSchoolYear();
  const { query, replace, push, back, pathname, asPath } = useRouter();
  const { g, per, opcion, s } = query;

  const [getStudents] = useGetStudentsByGroupLazyQuery();
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const handlerSelectedGroup = (id: any) => {
    const params = new URLSearchParams();
    params.append("g", id);
    replace(`${asPath}&${params.toString()}`);
  };

  const handlerSpreadsheet = (id: any, id_student: any) => {
    if (opcion !== "6") {
      setIsLoadingReport(true);
      reportService
        .area(
          {
            id_group: id,
            id_student: id_student,
          },
          {
            professor_course: false,
            average_general: false,
            average_group: false,
            average_area: true,
            hour: true,
            absences: true,
            all_qualifications: true,
            qualification_per1: true,
            qualification_per2: true,
            qualification_per3: true,
            qualification_per4: true,
            average_per: true,
            signature: {
              professor_group: true,
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
    } else {
      push(`${asPath}&s=${id_student}`);
    }
  };

  const handleOpenHTML = (htmlString: any) => {
    window.open()?.document.write(htmlString);
  };

  const processedStudents = useMemo(() => {
    if (!students) return [];
    return students.map((student: any) => ({
      id_student: student?.id_student,
      student: `${student?.name} ${student?.last_name}`,
      periodo1: (
        <Button
          variant="outline"
          onClick={() => handlerSpreadsheet(Number(g), student?.id_student)}
        >
          <FilePenLine color="#0055a6" />
        </Button>
      ),
      periodo2: (
        <Button
          variant="outline"
          onClick={() => handlerSpreadsheet(Number(g), student?.id_student)}
        >
          <FilePenLine color="#0055a6" />
        </Button>
      ),
      periodo3: (
        <Button
          variant="outline"
          onClick={() => handlerSpreadsheet(Number(g), student?.id_student)}
        >
          <FilePenLine color="#0055a6" />
        </Button>
      ),
      periodo4: (
        <Button
          variant="outline"
          onClick={() => handlerSpreadsheet(Number(g), student?.id_student)}
        >
          <FilePenLine color="#0055a6" />
        </Button>
      ),
      select: () => handlerSpreadsheet(Number(g), student?.id_student),
    }));
  }, [students]);

  useEffect(() => {
    if (g) {
      setIsLoadingStudents(true);
      getStudents({
        variables: { id_group: Number(g) },
      }).then((res) => {
        setStudents(res);
        setIsLoadingStudents(false);
      });
    }
  }, [g]);
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Elegir curso para ver sus estudiantes
          </strong>
        </h3>
      </div>
      {!g && <CourseComponent isCreate={false} showSubjects={true} />}
      {g && opcion && !s && (
        <div className="h-full">
          {isLoadingStudents && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {students && (
            <TableComponent
              column={columsStudentPer}
              data={processedStudents}
            />
          )}
        </div>
      )}
      {g && opcion && Number(opcion) == 6 && s && <ReportConfigurable />}
    </ContainerComponents>
  );
};

export default NavigationComponent;
