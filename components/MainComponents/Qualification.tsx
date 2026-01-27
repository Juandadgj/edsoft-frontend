import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { achievementService, courseService } from "@/services/api.service";
import useSchoolYear from "@/hooks/useSchoolYear";
import TableComponent from "../Table";
import { ContainerComponents } from "../ContainerComponents";
import { CourseComponent } from "./CourseComponent";

const Qualification = () => {
  const { year } = useSchoolYear();
  const { query, replace, push, back, asPath } = useRouter();
  const { g, a, per } = query;
  const [qualify, setQualify] = useState<boolean>(false);
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<any>([]);
  const [studentQualifications, setStudentQualifications] = useState<any[]>([]);
  const [newQualifications, setNewQualifications] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [errorCourses, setErrorCourses] = useState<any>(null);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [errorAchievements, setErrorAchievements] = useState<any>(null);
  const [loadingStudentQualifications, setLoadingStudentQualifications] = useState(false);
  const [errorStudentQualifications, setErrorStudentQualifications] = useState<any>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);
  const handlerSelectedCourse = (id_course: any, per: string) => {
    const params = new URLSearchParams();
    params.append("a", id_course);
    params.append("per", per);
    replace(`${asPath}&${params.toString()}`);
  };
  const handlerToogleUpdate = () => {
    setQualify(!qualify);
  };

  const refetch = async () => {
    if (a && per) {
      setLoadingStudentQualifications(true);
      try {
        const qualifications = await achievementService.getQualifications({
          id_course: Number(a),
          period: Number(per),
        });
        if (qualifications) {
          const processed = proceedQualifications(
            { studentQualifications: qualifications },
            selectedAchievements
          );
          setStudentQualifications(processed);
        }
      } catch (error) {
        console.error(error);
        setErrorStudentQualifications(error);
      } finally {
        setLoadingStudentQualifications(false);
      }
    }
  };

  const handlerUpdateQualifications = async () => {
    setLoadingUpdate(true);
    try {
      await achievementService.updateQualifications({
        qualifications: newQualifications,
      });
      setDataUpdate({ success: true });
      setNewQualifications([]);
      await refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUpdate(false);
    }
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
    selectedAchievements &&
      selectedAchievements.map((logro: any, i: number) => {
        return {
          title: (i + 1).toString(),
          dataIndex: `qualification_${logro.id_achievement}`,
          key: `qualification_${logro.id_achievement}`,
          render: (_: any, record: any) => (
            <div key={logro.id_achievement}>
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
                      record[`qualification_${logro.id_achievement}`].score ? (
                        record[`qualification_${logro.id_achievement}`].score
                      ) : (
                        "0"
                      )
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
  const proceedQualifications = (q: any, a: any) => {
    // Iterar sobre cada estudiante en el array de calificaciones
    if (q) {
      const updatedStudentQualifications = q.studentQualifications.map(
        (student: any) => {
          // Obtener la lista de id_achievement asociados al estudiante
          const studentAchievementIds = student.qualifications.map(
            (qualification: any) => qualification.id_achievement
          );

          // Obtener la lista de id_achievement que faltan para el estudiante
          console.log("a to proceed", a);
          if (a) {
            const missingAchievementIds = a
              .filter(
                (achievement: any) =>
                  !studentAchievementIds.includes(achievement?.id_achievement)
              )
              .map((achievement: any) => achievement?.id_achievement);

            const missingAchievements = a
              .filter((achievement: any) =>
                missingAchievementIds.includes(achievement?.id_achievement)
              )
              .map((achievement: any) => ({
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
    const loadData = async () => {
      if (g) {
        setLoadingCourses(true);
        try {
          const courses = await courseService.getAll({
            id_group: Number(g),
          });
          setSelectedCourses(processedCourses(courses));
        } catch (error) {
          setErrorCourses(error);
        } finally {
          setLoadingCourses(false);
        }
      }

      if (a && per) {
        setLoadingAchievements(true);
        try {
          const achievements = await achievementService.getAll({
            id_course: Number(a),
            period: Number(per),
          });
          setSelectedAchievements(achievements);
        } catch (error) {
          setErrorAchievements(error);
        } finally {
          setLoadingAchievements(false);
        }

        setLoadingStudentQualifications(true);
        try {
          const qualifications = await achievementService.getQualifications({
            id_course: Number(a),
            period: Number(per),
          });
          if (qualifications) {
            const processed = proceedQualifications(
              { studentQualifications: qualifications },
              selectedAchievements
            );
            setStudentQualifications(processed);
          }
        } catch (error) {
          console.error(error);
          setErrorStudentQualifications(error);
        } finally {
          setLoadingStudentQualifications(false);
        }
      }
    };

    loadData();
  }, [g, a, per]);

  useEffect(() => {
    if (dataUpdate) {
      refetch();
      setDataUpdate(null);
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
      {!g && <CourseComponent isCreate={false} showSubjects={false} />}
      {g && !a && !per && (
        <div className="text-black">
          {loadingCourses && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {selectedCourses && selectedCourses.length > 0 && (
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
              {selectedAchievements && (
                <div className="w-full text-black flex flex-col gap-2 my-2 text-sm">
                  {selectedAchievements.map(
                    (achievement: any, index: number) => (
                      <div key={index}>
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
              {studentQualifications && studentQualifications.length > 0 && (
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
                        onClick={handlerToogleUpdate}
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
                  {qualify && (
                    <div className="w-full flex justify-center items-center">
                      <button
                        disabled={loadingUpdate}
                        onClick={handlerUpdateQualifications}
                        className="btn btn-sm border-none text-white bg-[#0b5ed7] hover:bg-[#0b5ed7] text-xs"
                      >
                        Guardar notas
                      </button>
                    </div>
                  )}
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
