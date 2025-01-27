import { useMemo } from "react";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useAchievementsLazyQuery,
  useGetStudentQualificationsLazyQuery,
  useUpdateQualificationsMutation,
  useScholearYearSelectedQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSchoolYear from "@/hooks/useSchoolYear";
import TableComponent from "../Table";
import { ContainerComponents } from "../ContainerComponents";

const columnsGroup = [
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
    title: "Profesor del Grupo",
    dataIndex: "group_teacher",
    key: "group_teacher",
  },
  {
    title: "Asignaturas",
    dataIndex: "subjects",
    key: "subjects",
  },
];

const Qualification = () => {
  const { year } = useSchoolYear();
  const { query, replace, push, back, pathname, asPath } = useRouter();
  const { g, a, per, qualify } = query;
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<any>([]);
  const [studentQualifications, setStudentQualifications] = useState<any[]>([]);
  const [newQualifications, setNewQualifications] = useState<any[]>([]);
  const [
    getAchievements,
    {
      data: achievements,
      loading: loadingAchievements,
      error: errorAchievements,
    },
  ] = useAchievementsLazyQuery();
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses, refetch },
  ] = useCoursesLazyQuery();
  const {
    data: groups,
    loading: loadingGroups,
    error: errorGroups,
  } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year} },
  });
  const [
    getStudentQualifications,
    {
      data: dataStudentQualifications,
      loading: loadingStudentQualifications,
      error: errorStudentQualifications,
      refetch: refetchStudentQualifications,
    },
  ] = useGetStudentQualificationsLazyQuery({ fetchPolicy: "network-only" });

  const [
    updateQualifications,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useUpdateQualificationsMutation();

  const handlerSelectedGroup = (id: number | undefined) => {
    push(`/dashboard/proceso-anual?componente=calificacion&g=${id}`);
  };
  const handlerSelectedCourse = (id_course: any, per: string) => {
    const params = new URLSearchParams();
    params.append("a", id_course);
    params.append("per", per);
    replace(`${asPath}&${params.toString()}`);
  };
  const handlerToogleUpdate = () => {
    push(
      `/dashboard/proceso-anual?componente=calificacion&g=${g}&a=${a}&per=${per}&qualify=true`
    );
  };

  const handlerUpdateQualifications = () => {
    updateQualifications({
      variables: {
        updateQualificationsInput: { qualifications: newQualifications },
      },
    }).then(() => refetchStudentQualifications());
  };

  const columsCourses = [
    {
      title: "Asignatura",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Profesor",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "1 Per.",
      dataIndex: "periodo1",
      key: "periodo1",
      render: (_: any, record: any) => (
        <button onClick={() => handlerSelectedCourse(record.id_course, "1")}>
          -
        </button>
      ),
    },
    {
      title: "2 Per.",
      dataIndex: "periodo2",
      key: "periodo2",
      render: (_: any, record: any) => (
        <button onClick={() => handlerSelectedCourse(record.id_course, "2")}>
          -
        </button>
      ),
    },
    {
      title: "3 Per.",
      dataIndex: "periodo3",
      key: "periodo3",
      render: (_: any, record: any) => (
        <button onClick={() => handlerSelectedCourse(record.id_course, "3")}>
          -
        </button>
      ),
    },
    {
      title: "4 Per.",
      dataIndex: "periodo4",
      key: "periodo4",
      render: (_: any, record: any) => (
        <button onClick={() => handlerSelectedCourse(record.id_course, "4")}>
          -
        </button>
      ),
    },
  ];

  const columnsQualification = [
    {
      title: "Estudiante",
      dataIndex: "student",
      key: "student",
    },
  ].concat(
    achievements &&
      selectedAchievements.map((logro: any, i: number) => {
        return {
          title: (i + 1).toString(),
          dataIndex: `qualification_${logro.id_achievement}`,
          key: `qualification_${logro.id_achievement}`,
          render: (_: any, record: any) => (
            <div>
              {qualify && (
                <>
                  {record[`qualification_${logro.id_achievement}`] ? (
                    <input
                      className="input border-gray5 w-full max-w-[50px] h-8 bg-transparent text-sm p-1 "
                      placeholder={
                        record[`qualification_${logro.id_achievement}`].score
                      }
                      onChange={({ target }) =>
                        updateScore(
                          record[`qualification_${logro.id_achievement}`],
                          target.value
                        )
                      }
                    />
                  ) : (
                    <div className="text-red-500">
                      <p>?</p>
                    </div>
                  )}
                </>
              )}
              <>
                {!qualify && (
                  <>
                    {record[`qualification_${logro.id_achievement}`] ? (
                      record[`qualification_${logro.id_achievement}`].score
                    ) : (
                      <input
                        type="text"
                        className="input border-gray5 w-full max-w-[50px] h-8 bg-transparent text-sm p-1 "
                        onChange={({ target }) =>
                          updateScore(
                            {
                              id_achie_stu:
                                record[`qualification_${logro.id_achievement}`]
                                  .id_achie_stu,
                              id_achiement:
                                record[`qualification_${logro.id_achievement}`]
                                  .id_achievement,
                              id_student:
                                record[`qualification_${logro.id_achievement}`]
                                  .id_student,
                            },
                            target.value
                          )
                        }
                      />
                    )}
                  </>
                )}
              </>
            </div>
          ),
        };
      })
  );
  const processedCourses = (data: any) => {
    if (!data) return [];
    return data.map((courses: any, index: any) => ({
      id_course: courses?.id_course,
      id_group: courses?.id_group,
      name: `${courses.name}`,
      teacher: courses.teacher.name ?? "-",
      route: "proceso-anual?componente=calificacion",
    }));
  };
  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}`,
      jornada: group?.working_time,
      group_teacher: group?.representative ?? "",
      subjects: (
        <button
          className="btn bg-transparent border-none p-0 hover:bg-transparent"
          onClick={() => handlerSelectedGroup(group?.id_group)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 32 32"
          >
            <path
              fill="#0055a6"
              d="M24.875 1.375H8a1.995 1.995 0 0 0-1.98 1.792h1.605c1.102 0 2 .898 2 2c0 1.102-.898 2-2 2H6v1h1.625c1.104 0 2.002.897 2.002 2a2.004 2.004 0 0 1-2.002 2.002H6v.996h1.625c1.102 0 2 .898 2 2a2.005 2.005 0 0 1-2 2.004H6v.994h1.625c1.102 0 2 .898 2 2.002s-.898 2.002-2 2.002H6v.997h1.624c1.104 0 2.002.897 2.002 2a2.004 2.004 0 0 1-2.002 2.003h-1.62A1.998 1.998 0 0 0 8 29.124h16.875a2 2 0 0 0 2-2V3.375a2 2 0 0 0-2-2zm.375 7a1 1 0 0 1-1 1H14a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10.25a1 1 0 0 1 1 1v4.375zM8.625 25.165c0-.553-.45-1-1-1h-3.25a1 1 0 1 0 0 2h3.25c.55 0 1-.447 1-1zm-4.25-19h3.25a1 1 0 1 0 0-1.998h-3.25a1.001 1.001 0 0 0 0 2zm0 5.002h3.25a1 1 0 1 0 0-2h-3.25a1 1 0 1 0 0 2zm0 5h3.25a1 1 0 0 0 0-2h-3.25c-.553 0-1 .446-1 1s.447 1 1 1zm-1 3.998a1 1 0 0 0 1 1.002h3.25a1 1 0 0 0 0-2.002h-3.25a1 1 0 0 0-1 1z"
            />
          </svg>
        </button>
      ),
    }));
  }, [groups]);
  const proceedQualifications = (data: any) => {
    // Iterar sobre cada estudiante en el array de calificaciones
    if (dataStudentQualifications) {
      const updatedStudentQualifications = data.studentQualifications.map(
        (student: any) => {
          // Obtener la lista de id_achievement asociados al estudiante
          const studentAchievementIds = student.qualifications.map(
            (qualification: any) => qualification.id_achievement
          );

          // Obtener la lista de id_achievement que faltan para el estudiante
          if (achievements) {
            const missingAchievementIds = achievements.achievements
              .filter(
                (achievement) =>
                  !studentAchievementIds.includes(achievement?.id_achievement)
              )
              .map((achievement) => achievement?.id_achievement);

            const missingAchievements = achievements.achievements
              .filter((achievement) =>
                missingAchievementIds.includes(achievement?.id_achievement)
              )
              .map((achievement) => ({
                score: null, // O algún valor por defecto para la calificación
                id_achievement: achievement?.id_achievement,
                id_student: student.qualifications[0].id_student, // Utilizar el id_student del estudiante actual
              }));
            // Obtener las tareas faltantes para el estudiante
            // Agregar las tareas faltantes al estudiante junto con las tareas existentes
            const updatedQualifications = [
              ...student.qualifications,
              ...missingAchievements,
            ];
            console.log(updatedQualifications);
            const qualificationsObject = updatedQualifications.reduce(
              (acc: any, qualification: any) => {
                acc[`qualification_${qualification.id_achievement}`] = {
                  id_achie_stu: qualification.id_achie_stu,
                  id_achiement: qualification.id_achievement,
                  id_student: qualification.id_student,
                  score: qualification.score ?? null,
                };
                return acc;
              },
              {}
            );
            return {
              student: student.student,
              ...qualificationsObject,
            };
          }
        }
      );
      return updatedStudentQualifications;
    }
  };

  useEffect(() => {
    if (g) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(g) } },
      }).then((res) => {
        const { data } = res;
        setSelectedCourses(processedCourses(data?.courses));
      });
    }
    if (a && per) {
      getAchievements({
        variables: {
          filterAchievementInput: { id_course: Number(a), period: Number(per) },
        },
      }).then((res) => {
        const { data } = res;
        setSelectedAchievements(data?.achievements);
      });
      getStudentQualifications({
        variables: {
          filterQualificationInput: {
            id_course: Number(a),
            period: Number(per),
          },
        },
      })
        .then((res) => {
          const { data } = res;
          const qualifications = proceedQualifications(data);
          setStudentQualifications(qualifications);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  }, [g, a, per]);
  useEffect(() => {
    if (dataUpdate) {
      getStudentQualifications({
        variables: {
          filterQualificationInput: {
            id_course: Number(a),
            period: Number(per),
          },
        },
      })
        .then((res) => {
          const { data } = res;
          const qualifications = proceedQualifications(data);
          setStudentQualifications(qualifications);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  }, [dataUpdate]);
  
  const updateScore = (qualification: any, score: any) => {
    const find = newQualifications.find(
      (q) => q.id_achie_stu == qualification.id_achie_stu
    );
    if (find) {
      setNewQualifications(
        newQualifications.map((q) => {
          if (q.id_achie_stu === qualification.id_achie_stu) {
            return {
              ...q,
              score: Number(score),
            };
          } else {
            return q;
          }
        })
      );
    } else {
      setNewQualifications([
        ...newQualifications,
        {
          id_achie_stu: qualification.id_achie_stu,
          id_achievement: qualification.id_achie_stu,
          id_student: qualification.id_achie_stu,
          score: Number(score),
        },
      ]);
    }
  };
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <div>
          <strong className="text-black text-xl ps-8">
            Cursos creados para el a�o {year} Para la calificacion de logros e
            indicadores de logros por asignatura
          </strong>
        </div>
      </div>
      {!g && (
        <div className="h-full">
          {loadingGroups && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {groups?.groups && (
            <div className="d-flex border-white py-4 h-full">
              <TableComponent column={columnsGroup} data={processedGroups} />
            </div>
          )}
          {errorGroups && <h3>¡Ocurrio un error!</h3>}
        </div>
      )}
      {g && !a && !per && (
        <div className="text-black h-full">
          {loadingCourses && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {courses?.courses && (
            <div className=" border-white py-4 h-full">
              <TableComponent column={columsCourses} data={selectedCourses} />
            </div>
          )}
          {errorCourses && <h3>Ocurrio un error: {errorCourses?.message}</h3>}
        </div>
      )}
      {a && per && (
        <div className="h-full w-full">
          {loadingAchievements && loadingStudentQualifications && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          <div className="border-white h-full w-full ">
            <div className={`w-full h-full animate-fade-left pb-28`}>
              {achievements && (
                <div className="w-full text-black flex flex-col gap-2 my-2 text-sm">
                  {selectedAchievements.map(
                    (achievement: any, index: number) => (
                      <div key={achievement.id_achievement}>
                        {index + 1}.{achievement.description}
                      </div>
                    )
                  )}
                </div>
              )}
              {errorAchievements && (
                <h3 className="text-[red]">
                  {errorStudentQualifications?.message}
                </h3>
              )}
              {dataStudentQualifications && (
                <>
                  {!qualify ? (
                    <div className="w-full text-black flex items-center justify-end">
                      <button
                        onClick={() => handlerToogleUpdate()}
                        className="btn btn-sm h-[35px] bg-transparent border-none text-main-gray hover:text-white hover:bg-[#0055A6] group text-xs"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                        >
                          <path
                            className="fill-[#0055A6] group-hover:fill-white"
                            d="m5.433 13.916l1.262-3.154a4 4 0 0 1 .885-1.343L14.5 2.5a2.121 2.121 0 1 1 3 3l-6.92 6.919c-.383.383-.84.684-1.343.885l-3.154 1.262a.5.5 0 0 1-.65-.65ZM2.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H3.75A2.75 2.75 0 0 0 1 5.75v10.5A2.75 2.75 0 0 0 3.75 19h10.5A2.75 2.75 0 0 0 17 16.25V10a.75.75 0 0 0-1.5 0v6.25c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25V5.75Z"
                          />
                        </svg>
                        <p>Cambiar notas ya calificadas</p>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full text-black flex items-center justify-end">
                      <button
                        onClick={() => back()}
                        className="btn btn-sm h-[35px] bg-transparent border-none text-main-gray hover:text-white hover:bg-[#0055A6] group text-xs"
                      >
                        <p>Volver</p>
                      </button>
                    </div>
                  )}
                  <TableComponent
                    column={columnsQualification}
                    data={studentQualifications}
                  />
                  <div className="w-full flex justify-center items-center">
                    <button
                      disabled={loadingUpdate}
                      onClick={handlerUpdateQualifications}
                      className="btn btn-sm border-none text-white bg-[#0b5ed7] hover:bg-[#0b5ed7] text-xs"
                    >
                      Guardar notas
                    </button>
                  </div>
                </>
              )}
              {errorStudentQualifications && (
                <h3 className="text-[red]">
                  {errorStudentQualifications?.message}
                </h3>
              )}
            </div>
          </div>
        </div>
      )}
    </ContainerComponents>
  );
};

export default Qualification;
