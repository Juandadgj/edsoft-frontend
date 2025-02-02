import React, { useEffect, useMemo } from "react";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useAchievementsLazyQuery,
  useGetStudentsByGroupLazyQuery,
  useGenerateReportAreaLazyQuery,
  useScholearYearSelectedQuery,
} from "../../../../../generated/graphql";
import { useRouter } from "next/router";
import ReportConfigurable from "../ReportConfigurable";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import useSchoolYear from "@/hooks/useSchoolYear";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";

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
  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });

  const [
    getStudents,
    { data: students, loading: loadingStudents, error: errorStudents },
  ] = useGetStudentsByGroupLazyQuery();

  const [reportArea, { data: areaReport }] = useGenerateReportAreaLazyQuery({
    fetchPolicy: "no-cache",
  });

  const handlerSelectedGroup = (id: any) => {
    const params = new URLSearchParams();
    params.append("g", id);
    replace(`${asPath}&${params.toString()}`);
  };

  const handlerSpreadsheet = (id: any, id_student: any) => {
    if (opcion !== "6") {
      reportArea({
        variables: {
          generateReportAreaInput: {
            id_group: id,
            id_student: id_student,
            report_options: {
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
          },
        },
      }).then((res) => {
        const { data } = res;
        handleOpenHTML(data?.generateReportArea.report_content);
      });
    } else {
      push(`${asPath}&s=${id_student}`);
    }
  };

  const handleOpenHTML = (htmlString: any) => {
    window.open()?.document.write(htmlString);
  };

  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups.groups.map((group, index) => ({
      id: group?.id_group,
      name: `${getCourseLevel(group?.level)} - ${group?.sublevel}`,
      group_teacher: group?.representative,
      select: (
        <button onClick={() => handlerSelectedGroup(group?.id_group)}>
          Seleccionar grupo
        </button>
      ),
    }));
  }, [groups]);

  const processedStudents = useMemo(() => {
    if (!students?.studentsByGroup) return [];
    return students.studentsByGroup.map((student: any) => ({
      id_student: student?.id_student,
      student: `${student?.name} ${student?.last_name}`,
      periodo1: (
        <button
          onClick={() => handlerSpreadsheet(Number(g), student?.id_student)}
        >
          -
        </button>
      ),
      periodo2: (
        <button
          onClick={() => handlerSpreadsheet(Number(g), student?.id_student)}
        >
          -
        </button>
      ),
      periodo3: (
        <button
          onClick={() => handlerSpreadsheet(Number(g), student?.id_student)}
        >
          -
        </button>
      ),
      periodo4: (
        <button
          onClick={() => handlerSpreadsheet(Number(g), student?.id_student)}
        >
          -
        </button>
      ),
      select: () => handlerSpreadsheet(Number(g), student?.id_student),
    }));
  }, [students]);

  useEffect(() => {
    if (g) {
      getStudents({
        variables: { idGroup: Number(g) },
      });
    }
  }, [query]);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Elegir curso para ver sus estudiantes
          </strong>
        </h3>
      </div>
      {!g && (
        <div className="h-full">
          {loadingGroups && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {groups?.groups && (
            <TableComponent
              column={columnsDeliverable}
              data={processedGroups}
            />
          )}
        </div>
      )}
      {g && opcion && !s && (
        <div className="h-full">
          {loadingStudents && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {students?.studentsByGroup && (
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
