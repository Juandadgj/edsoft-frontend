import React, { useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useAchievementsLazyQuery,
  useGetStudentsByGroupLazyQuery,
  useGenerateReportAreaLazyQuery,
} from "../../../../../generated/graphql";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import Card from "@/components/Card";
import ReportConfigurable from "../ReportConfigurable";

const columnsDeliverable = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
];

const columsStudentPer = [
  {
    Header: "Apellido y Nombre",
    accessor: "student",
  },
  {
    Header: "1 Per.",
    accessor: "perido",
  },
  {
    Header: "2 Per.",
    accessor: "perido",
  },
  {
    Header: "3 Per.",
    accessor: "perido",
  },
  {
    Header: "4 Per.",
    accessor: "perido",
  },
];

const NavigationComponent = () => {
  const router = useRouter();
  const { g, per, opcion, s } = router.query;

  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2017 } },
  });

  const [
    getStudents,
    { data: students, loading: loadingStudents, error: errorStudents },
  ] = useGetStudentsByGroupLazyQuery();

  const [reportArea, { data: areaReport }] = useGenerateReportAreaLazyQuery({
    fetchPolicy: "no-cache",
  });

  const handlerSelectedGroup = (id: number | undefined) => {
    router.push(
      `/dashboard/reportes?componente=entregables&opcion=${opcion}&g=${id}`
    );
  };

  const handlerSelectStudent = (id: number, s: number | undefined) => {
    router.push(
      `/dashboard/reportes?componente=entregables&opcion=${opcion}&g=${id}&s=${s}`
    );
  };

  const handlerSpreadsheet = (id: any, student: any) => {
    reportArea({
      variables: {
        generateReportAreaInput: {
          id_group: id,
          id_student: student,
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
  };

  const handleOpenHTML = (htmlString: any) => {
    window.open()?.document.write(htmlString);
  };

  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups.groups.map((group, index) => ({
      id: group?.id_group,
      name: `${group?.level}-${group?.sublevel}` ?? "",
      group_teacher: group?.representative ?? "",
      click: () => handlerSelectedGroup(group?.id_group),
    }));
  }, [groups]);

  const processedStudents = useMemo(() => {
    if (!students?.studentsByGroup) return [];
    return students.studentsByGroup.map((student: any, index: any) => ({
      id_student: student?.id_student,
      name: `${student?.name} ${student?.last_name}`,
      click: () => handlerSpreadsheet(Number(g), student?.id_student),
    }));
  }, [students]);

  useEffect(() => {
    if (g) {
      getStudents({
        variables: { idGroup: Number(g) },
      });
    }
  }, [router]);

  return (
    <div className="h-full">
      <div className="h-[6%] flex justify-between">
        <Grid item xs={6}>
          <strong className="text-xl text-black ps-8">
            Elegir curso para ver sus estudiantes
          </strong>
        </Grid>
      </div>
      <Grid
        container
        className="bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]"
      >
        {!g && (
          <Grid item xs={12} className="h-full">
            {loadingGroups ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : groups?.groups ? (
              <div className="border-white py-4 h-full">
                <Table
                  column={columnsDeliverable}
                  data={processedGroups}
                  type={"deliverables"}
                />
              </div>
            ) : (
              <h3>¡Ocurrio un error!</h3>
            )}
          </Grid>
        )}
        {g && opcion && (
          <Grid item xs={12} className="h-full">
            {loadingStudents ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : students?.studentsByGroup ? (
              <div className="border-white py-4 h-full overflow-x-auto">
                <table className="table text-black">
                  <thead className="flex items-center justify-center">
                    <tr className="flex w-full justify-center border-blue3 border-b-4 text-base font-semibold">
                      {columsStudentPer.map((key: any, index: any) => (
                        <>
                          {index == 0 ? (
                            <th
                              key={index}
                              className="w-full text-center text-blue3 whitespace-normal flex items-center justify-center"
                            >
                              <p className="w-full">{key.Header}</p>
                            </th>
                          ) : (
                            <th
                              key={index}
                              className="w-1/4 text-center text-blue3 whitespace-normal flex items-center justify-center"
                            >
                              <p className="w-full">{key.Header}</p>
                            </th>
                          )}
                        </>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="w-full py-4 ">
                    {processedStudents.map((item: any, key: any) => (
                      <div
                        style={{ textDecoration: "none", width: "100%" }}
                        key={item.id}
                      >
                        <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold">
                          <td className="flex w-full justify-center items-center text-center">
                            {item.name}
                          </td>
                          <td className="flex w-1/4 justify-center items-center text-center py-0">
                            <button
                              className="btn bg-transparent border-none p-0 hover:bg-transparent btn-sm h-5 w-5"
                              // onClick={() => click()}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0055A6"
                                  d="M3 6v16h18v2H3a2 2 0 0 1-2-2V6zm13 3h5.5L16 3.5zM7 2h10l6 6v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v14h14v-7h-7V4z"
                                />
                              </svg>
                            </button>
                          </td>
                          <td className="flex w-1/4 justify-center items-center text-center py-0">
                            <button
                              className="btn bg-transparent border-none p-0 hover:bg-transparent btn-sm h-5 w-5"
                              // onClick={() => click()}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0055A6"
                                  d="M3 6v16h18v2H3a2 2 0 0 1-2-2V6zm13 3h5.5L16 3.5zM7 2h10l6 6v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v14h14v-7h-7V4z"
                                />
                              </svg>
                            </button>
                          </td>
                          <td className="flex w-1/4 justify-center items-center text-center py-0">
                            <button
                              className="btn bg-transparent border-none p-0 hover:bg-transparent btn-sm h-5 w-5"
                              // onClick={() => handlerSelectedAchievement(id_course, 3)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0055A6"
                                  d="M3 6v16h18v2H3a2 2 0 0 1-2-2V6zm13 3h5.5L16 3.5zM7 2h10l6 6v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v14h14v-7h-7V4z"
                                />
                              </svg>
                            </button>
                          </td>
                          <td className="flex w-1/4 justify-center items-center text-center py-0">
                            <button
                              className="btn bg-transparent border-none p-0 hover:bg-transparent btn-sm h-5 w-5"
                              // onClick={() => handlerSelectedAchievement(id_course, 4)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0055A6"
                                  d="M3 6v16h18v2H3a2 2 0 0 1-2-2V6zm13 3h5.5L16 3.5zM7 2h10l6 6v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v14h14v-7h-7V4z"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      </div>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h3>¡Ocurrio un error!</h3>
            )}
          </Grid>
        )}
        {g && opcion && Number(opcion) == 6 && s && <ReportConfigurable />}
      </Grid>
    </div>
  );
};

export default NavigationComponent;
