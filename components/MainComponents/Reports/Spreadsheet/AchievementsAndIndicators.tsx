import { useMemo } from "react";
import { useEffect, useState } from "react";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useAchievementsLazyQuery,
  useDeleteAchievementMutation,
  useUpdateAchievementMutation,
  useCreateAchievementMutation,
  useGenerateAchievementsAndIndicatorsLazyQuery,
} from "../../../../generated/graphql";
import { useRouter } from "next/router";
import Table from "../../../Table";
import edit from "../../../../public/assets/01editar.png";
import DynamicModal from "../../../DynamicModal";
import Image from "next/image";
import Swal from "sweetalert2";
import { Input } from "@/components/Input";
import useSchoolYear from "@/hooks/useSchoolYear";

const columsCourses = [
  {
    Header: "Asignatura",
    accessor: "name",
  },
  {
    Header: "Profesor",
    accessor: "teacher",
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

const columnsGroup = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Jornada",
    accessor: "working_time",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  { Header: "Asignaturas", accessor: "subjects" },
];

const AchievementsAndIndicators = () => {
  const { year } = useSchoolYear();
  const router = useRouter();
  const { g, a, per } = router.query;
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses },
  ] = useCoursesLazyQuery();
  const [generateAchievements] = useGenerateAchievementsAndIndicatorsLazyQuery({
    fetchPolicy: "network-only",
  });

  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });
  const handlerSelectedCourse = (id: number | undefined) => {
    router.push(`/dashboard/reportes?componente=planillas&opcion=3&g=${id}`);
  };

  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups?.groups.map((group: any) => ({
      name: `${group?.level}-${group?.sublevel}` ?? "",
      group_teacher: group?.representative ?? "",
      jornada: group?.working_time,
      asignaturas: (
        <button onClick={() => handlerSelectedCourse(group.id_group)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#0055A6"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.342A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2"
              />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </g>
          </svg>
        </button>
      ),
    }));
  }, [groups]);

  const processedCourses = (data: any) => {
    if (!data) return [];
    return data.map((courses: any, index: any) => ({
      id_course: courses?.id_course,
      id_group: courses?.id_group,
      name: `${courses?.name}` ?? "",
      teacher: `${courses?.teacher.name}` ?? "-",
      periodo1: "-",
      periodo2: "-",
      periodo3: "-",
      periodo4: "-",
      route: "reportes?componente=planillas&opcion=3",
    }));
  };

  useEffect(() => {
    if (g) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(g) } },
      }).then((res: any) => {
        const { data } = res;
        setSelectedCourses(processedCourses(data?.courses));
      });
    }
  }, [router]);

  const handlerSelectAchievement = (id_course: number, period: number) => {
    console.log(id_course, period);
    generateAchievements({
      variables: {
        generateAchievementsAndIndicators: {
          id_group: Number(g),
          id_course,
          period,
        },
      },
    }).then((res) => {
      const { data } = res;
      handleOpenHTML(data?.generateAchievementsAndIndicators.report_content);
    });
  };
  const handleOpenHTML = (htmlString: any) => {
    window.open()?.document.write(htmlString);
  };
  return (
    <div className="h-full">
      <div className="h-[6%]">
        <div>
          <strong className="text-xl text-black ps-8 pb-4">
            Logros por curso para el año {year}
          </strong>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        {!g && (
          <div className="h-full">
            {loadingGroups ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-main-blue"></span>
              </div>
            ) : groups?.groups ? (
              <div className="d-flex border-white py-4 h-full">
                <Table
                  column={columnsGroup}
                  data={processedGroups}
                  type={"groups"}
                />
              </div>
            ) : (
              <h3>¡Ocurrio un error!</h3>
            )}
          </div>
        )}
        {g && !a && !per && (
          <div className="text-black h-full">
            {loadingCourses ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-main-blue"></span>
              </div>
            ) : courses?.courses ? (
              <div className=" border-white py-4 h-full">
                <div
                  className={`w-full px-3 overflow-x-auto animate-fade-left h-full`}
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#25429e #F3F4F6",
                    scrollbarGutter: "20px",
                  }}
                >
                  <table className="table text-black">
                    <thead className="flex items-center justify-center">
                      <tr className="flex w-full justify-center border-main-blue border-b-4 text-base font-semibold">
                        {columsCourses.map((key: any, index: any) => (
                          <th
                            key={index}
                            className="w-full text-center text-main-blue whitespace-normal flex items-center justify-center"
                          >
                            <p className="w-full">{key.Header}</p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="w-full py-2">
                      {selectedCourses.map((item: any, index: number) => (
                        <div style={{ textDecoration: "none", width: "100%" }} key={index}>
                          <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold">
                            <td className="flex w-full justify-center items-center text-center">
                              {item.name}
                            </td>
                            <td className="flex w-full justify-center items-center text-center">
                              {item.teacher.name}
                            </td>
                            <td className="flex w-full justify-center items-center text-center">
                              <p
                                className="cursor-pointer"
                                onClick={() =>
                                  handlerSelectAchievement(item.id_course, 1)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30px"
                                  height="30px"
                                  viewBox="0 0 2048 2048"
                                >
                                  <path
                                    fill="#0055A6"
                                    d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z"
                                  />
                                </svg>
                              </p>
                            </td>
                            <td className="flex w-full justify-center items-center text-center">
                              <p
                                className="cursor-pointer"
                                onClick={() =>
                                  handlerSelectAchievement(item.id_course, 2)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30px"
                                  height="30px"
                                  viewBox="0 0 2048 2048"
                                >
                                  <path
                                    fill="#0055A6"
                                    d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z"
                                  />
                                </svg>
                              </p>
                            </td>
                            <td className="flex w-full justify-center items-center text-center">
                              <p
                                className="cursor-pointer"
                                onClick={() =>
                                  handlerSelectAchievement(item.id_course, 3)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30px"
                                  height="30px"
                                  viewBox="0 0 2048 2048"
                                >
                                  <path
                                    fill="#0055A6"
                                    d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z"
                                  />
                                </svg>
                              </p>
                            </td>
                            <td className="flex w-full justify-center items-center text-center">
                              <p
                                className="cursor-pointer"
                                onClick={() =>
                                  handlerSelectAchievement(item.id_course, 4)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30px"
                                  height="30px"
                                  viewBox="0 0 2048 2048"
                                >
                                  <path
                                    fill="#0055A6"
                                    d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z"
                                  />
                                </svg>
                              </p>
                            </td>
                          </tr>
                        </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              errorCourses && <h3>Ocurrio un error: {errorCourses?.message}</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsAndIndicators;
