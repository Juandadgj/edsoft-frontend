import React, { useState } from "react";
import TableComponent from "../Table";
import { useDeleteGroupMutation, useGroupsQuery } from "@/generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { useRouter } from "next/router";
import { Space } from "antd";
import Swal from "sweetalert2";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Jornada",
    dataIndex: "hour",
    key: "hour",
  },
  {
    title: "Asignaturas",
    dataIndex: "courses_count",
    key: "courses_count",
  },
  {
    title: "Profesor del Grupo",
    dataIndex: "group_teacher",
    key: "group_teacher",
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
  },
];

export const CourseComponent = ({
  isCreate,
  showSubjects,
  setCourse,
}: {
  isCreate: boolean;
  showSubjects: boolean;
  course?: any;
  setCourse?: any;
}) => {
  const { asPath, replace, pathname, push } = useRouter();
  const { year } = useSchoolYear();
  const [deleteGroup] = useDeleteGroupMutation();
  const { data: groups, loading: loadingGroups, refetch } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });

  const handlerSelectedCourse = (id: number | undefined) => {
    push(`${asPath}&g=${id}`);
  };
  const processedGroups = groups?.groups.map((group, index) => ({
    id: group?.id_group,
    name: `${getCourseLevel(group?.level)} ${group?.sublevel}`,
    hour: group?.working_time ?? "",
    group_teacher: group?.representative ?? "",
    courses_count: group?.coursesCount ?? 0,
    actions: (
      <>
        {isCreate ? (
          <Space size="middle">
            <button className="border-0" onClick={() => setCourse(group)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 36 36"
              >
                <path
                  fill="#0055A6"
                  d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z"
                  className="clr-i-outline clr-i-outline-path-1"
                />
                <path
                  fill="#0055A6"
                  d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.69 1.69 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z"
                  className="clr-i-outline clr-i-outline-path-2"
                />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
            </button>
            <button
              className="border-0"
              onClick={() => handlerDeleteCourse(group?.id_group)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 256 256"
              >
                <path
                  fill="#e11d48"
                  d="M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12ZM94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Zm48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Z"
                />
              </svg>
            </button>
          </Space>
        ) : (
          <button onClick={() => handlerSelectedCourse(group?.id_group)}>
            Seleccionar curso
          </button>
        )}
      </>
    ),
  }));
  const handlerDeleteCourse = async (id_group: number | undefined) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0055a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      // If there is an id selected we delete that teacher
      if (result.isConfirmed && id_group) {
        deleteGroup({
          variables: { idGroup: id_group },
        }).then((res) => {
          if (res.data?.deleteGroup) {
            Swal.fire({
              title: "Eliminado",
              text: "Curso Eliminado!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          } else {
            Swal.fire({
              icon: "error",
              title: "Ha habido un error...",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  const columnsMap = columns.map((column) => {
    if (!isCreate && column.key === "hour") {
      return {};
    }
    if (!showSubjects && column.key === "courses_count") {
      return {};
    }
    return column;
  });
  return (
    <div className="h-full">
      {loadingGroups && (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loading loading-dots loading-lg bg-main-blue"></span>
        </div>
      )}
      {groups?.groups && (
        <TableComponent column={columnsMap} data={processedGroups} />
      )}
    </div>
  );
};
