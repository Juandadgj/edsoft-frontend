import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import { useGroupsQuery, useScholearYearSelectedQuery } from "@/generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import { Container } from "postcss";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import { title } from "process";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: " Id del profesor",
    dataIndex: "group_teacher",
    key: "group_teacher",
  },
  {
    title: "Estudiantes",
    dataIndex: "students",
    key: "students",
  },
  {
    title: "Acciones",
    dataIndex: "select",
    key: "select",
  },
];

export const StudentsLastYear = () => {
  const { year } = useSchoolYear();
  const { query, replace, push, back, pathname, asPath } = useRouter();
  const {
    data: dataGroups,
    loading: loadingGroups,
    error: errorGroups,
  } = useGroupsQuery({
    variables: {filterGroupInput: {id_year: year}},
  });

  const handlerSelectedGroup = (id: any) => {
    const params = new URLSearchParams();
    params.append("g", id);
    replace(`${asPath}&${params.toString()}`);
  };

  const processedGroups = useMemo(() => {
    if (!dataGroups?.groups) return [];
    return dataGroups.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}`,
      group_teacher: group?.representative ?? "",
      students: 30,
      select: (
        <button
          className="btn bg-transparent border-none p-0 hover:bg-transparent"
          onClick={() => handlerSelectedGroup(group?.id_group)}
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
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <div>
          <strong className="text-black text-xl ps-8">
            Elija el curso para ingresar estudiantes para el {year}
          </strong>
        </div>
      </div>
      <div className="h-full">
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
    </ContainerComponents>
  );
};
