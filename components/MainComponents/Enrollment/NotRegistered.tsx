import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "@/graphql/queries/GetStudents";
import useSchoolYear from "@/hooks/useSchoolYear";
import { title } from "process";
import { data } from "autoprefixer";
import TableComponent from "@/components/Table";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profesor",
    dataIndex: "teacher",
    key: "teacher",
  },
  {
    title: "Asignaturas",
    dataIndex: "subjects",
    key: "subjects",
  },
];

export const NotRegistered = () => {
  const { year } = useSchoolYear();
  const { data, loading, error } = useQuery(GET_STUDENTS);
  const processedCourses = useMemo(() => {
    if (!data?.groups) return [];
    return data.groups.map((group: any, index: any) => ({
      name: `${group?.level}-${group?.sublevel}`,
      jornada: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
    }));
  }, [data]);
  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-5">
      <div className="pb-4">
        <div>
          <strong className="text-2xl text-black ps-8">
            Estudiantes no matriculados en el {year}
          </strong>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        )}
        {data?.courses && (
          <div className="d-flex border-white py-4" style={{ height: "32rem" }}>
            <TableComponent column={columns} data={processedCourses} />
          </div>
        )}
      </div>
    </div>
  );
};
