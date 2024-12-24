import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import {
  useGroupsQuery,
  useGetStudentsByGroupLazyQuery,
} from "@/generated/graphql";
import { useRouter } from "next/router";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";

const columns = [
  {
    Header: "Curso",
    accessor: "subjectName",
  },
  {
    Header: " Id del profesor",
    accessor: "teacherId",
  },
  {
    Header: "Alumnos",
    accessor: "students",
  },
  { Header: "Ver", accessor: "see" },
];

const columnsStudent = [
  {
    Header: "Apellido y Nombre",
    accessor: "name",
  },
  {
    Header: "Certi. Matri.",
    accessor: "certi",
  },
  { Header: "Info", accessor: "info" },
  { Header: "Editar", accessor: "edit" },
  { Header: "Sacar", accessor: "leave" },
];

export const StudentsPerCourse = () => {
  const { year } = useSchoolYear();
  const router = useRouter();
  const { g } = router.query;
  const [studentsByGroup, setStudentsByGroup] = useState<any[]>([]);
  const {
    data: dataGroups,
    loading: loadingGroups,
    error: errorGroups,
  } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });

  const [
    getStudentsByGroup,
    {
      data: dataStudentsByGroup,
      loading: loadingStudentsByGroup,
      error: errorStudentsByGroup,
    },
  ] = useGetStudentsByGroupLazyQuery();

  const processedGroups = useMemo(() => {
    if (!dataGroups?.groups) return [];
    return dataGroups.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}`,
      group_teacher: group?.representative,
      students: 30,
      see: (
        <button
          className="btn bg-transparent border-none p-0 hover:bg-transparent"
          onClick={() =>
            router.push(
              `programacion-anual?componente=matriculas&opcion=3&g=${group?.id_group}`
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="#0055a6"
                d="M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13M2 10.5a8.5 8.5 0 1 1 15.176 5.262l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 0 1 2 10.5M9.5 7a1 1 0 0 1 1-1a4.5 4.5 0 0 1 4.5 4.5a1 1 0 1 1-2 0A2.5 2.5 0 0 0 10.5 8a1 1 0 0 1-1-1"
              />
            </g>
          </svg>
        </button>
      ),
    }));
  }, [dataGroups]);

  const processedStudentsByGroup = (data: any) => {
    if (!data) return [];
    return data.map((student: any, index: any) => ({
      id_student: student?.id_course,
      name: `${student.name} ${student.last_name}`,
      certified: "",
      info: (
        <button
          className="btn bg-transparent border-none p-0 hover:bg-transparent"
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
          className="btn bg-transparent border-none p-0 hover:bg-transparent"
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
          className="btn bg-transparent border-none p-0 hover:bg-transparent"
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
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="5" cy="3.75" r="2.25" />
              <path d="M6.5 13.5h-6V12a4.5 4.5 0 0 1 7.39-3.45m.61 2.95h5" />
            </g>
          </svg>
        </button>
      ),
    }));
  };

  useEffect(() => {
    if (g) {
      getStudentsByGroup({ variables: { idGroup: Number(g) } });
    }
  }, [router]);

  useEffect(() => {
    if (dataStudentsByGroup) {
      setStudentsByGroup(
        processedStudentsByGroup(dataStudentsByGroup.studentsByGroup)
      );
    }
  }, [dataStudentsByGroup]);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Estudiantes por curso en el año {year}
          </strong>
        </h3>
      </div>
      {!g && (
        <div className="text-black h-full">
          {loadingGroups && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {dataGroups?.groups && (
            <div className="h-full border-white py-4">
              <TableComponent column={columns} data={processedGroups} />
            </div>
          )}
          {errorGroups && <h3>¡Ocurrio un error!</h3>}
        </div>
      )}
      {g && (
        <div className="h-full">
          {loadingStudentsByGroup && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {dataStudentsByGroup?.studentsByGroup && (
            <div className="h-full">
              <Table
                column={columnsStudent}
                data={studentsByGroup}
                type={"studentsByGroup"}
              />
            </div>
          )}
          {errorStudentsByGroup && <h3>¡Ocurrio un error!</h3>}
        </div>
      )}
    </ContainerComponents>
  );
};
