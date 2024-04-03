import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import { useGroupsQuery } from "@/generated/graphql";

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
    Header: "Asignaturas",
    accessor: "subjects",
  },
];

export const StudentsLastYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();
  const { g } = router.query;
  const [studentsByGroup, setStudentsByGroup] = useState<any[]>([]);
  const {
    data: dataGroups,
    loading: loadingGroups,
    error: errorGroups,
  } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2013 } },
  });

  const processedGroups = useMemo(() => {
    if (!dataGroups?.groups) return [];
    return dataGroups.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}` ?? "",
      group_teacher: group?.representative ?? "",
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
            width="35"
            height="35"
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
  return (
    <div className="h-full">
      <div className="pb-4">
        <div>
          <strong className="text-2xl text-black ps-8">
            Elija el curso para ingresar estudiantes para el {year}
          </strong>
        </div>
      </div>
      <div className="h-full bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5">
        <div className="h-full">
          {loadingGroups && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {dataGroups?.groups && (
            <div className="h-full border-white py-4">
              <Table column={columns} data={processedGroups} type={"groups"} />
            </div>
          )}
          {errorGroups && <h3>¡Ocurrio un error!</h3>}
        </div>
      </div>
    </div>
  );
};
