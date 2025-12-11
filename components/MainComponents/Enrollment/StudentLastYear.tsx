import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import {
  useGroupsQuery,
  useScholearYearSelectedQuery,
} from "@/generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { CourseComponent } from "../CourseComponent";

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
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <div>
          <strong className="text-black text-xl ps-8">
            Elija el curso para ingresar estudiantes para el {year}
          </strong>
        </div>
      </div>
      <CourseComponent isCreate={false} showSubjects={true} />
    </ContainerComponents>
  );
};
