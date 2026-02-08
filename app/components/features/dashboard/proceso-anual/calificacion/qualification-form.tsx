"use client";

import {
  useState,
  useEffect,
  useActionState,
  useCallback,
  useMemo,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ContainerComponents } from "@/app/components/shared/container";
import { Button } from "@/app/components/ui/button";
import { Edit3, ArrowLeft, Save, Users, View, File } from "lucide-react";
import { DEFAULT_REVALIDATE_PATH, type QualificationUpdate } from "./constants";
import {
  getCoursesAction,
  getAchievementsAction,
  getQualificationsAction,
  updateQualificationsAction,
} from "./actions";
import { Achievement, Course, Group, Student } from "@/app/types";
import Table from "@/app/components/ui/table";
import { formatGroupName, formatWorkingTime } from "@/app/shared/formats";
import build from "next/dist/build";
import { Input } from "@/app/components/ui/input";

// Componente interno para selector de grupos
interface GroupSelectorProps {
  groups: Array<{ id: number; name: string }>;
  onSelectGroup: (groupId: number) => void;
}

interface QualificationFormProps {
  yearName?: number;
  groups?: Group[];
  courses?: Course[];
  achievements?: Achievement[];
  students?: Student[];
  revalidatePath?: string;
}

const initialState = { success: false, message: "" };

export function QualificationForm({
  yearName,
  groups = [],
  courses = [],
  achievements = [],
  students = [],
  revalidatePath = "/dashboard/proceso-anual/calificacion",
}: QualificationFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const groupId = searchParams.get("group")
    ? Number(searchParams.get("group"))
    : null;
  const courseId = searchParams.get("subject")
    ? Number(searchParams.get("subject"))
    : null;
  const period = searchParams.get("per")
    ? Number(searchParams.get("per"))
    : null;

  // States
  const [studentQualifications, setStudentQualifications] = useState<any[]>([]);
  const [newQualifications, setNewQualifications] = useState<
    QualificationUpdate[]
  >([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [updateState, updateAction, isUpdating] = useActionState(
    updateQualificationsAction,
    initialState,
  );

  // Procesa las calificaciones para mostrarlas en tabla
  const processQualifications = useCallback(
    (qualificationsData: any[], achievementsData: Achievement[]) => {
      if (!qualificationsData || !achievementsData) return [];

      return qualificationsData.map((student: any) => {
        const studentAchievementIds =
          student.qualifications?.map((q: any) => q.id_achievement) || [];

        const missingAchievements = achievementsData
          .filter((a) => !studentAchievementIds.includes(a.id_achievement))
          .map((a) => ({
            score: null,
            id_achievement: a.id_achievement,
            id_student: student.qualifications?.[0]?.id_student,
          }));

        const allQualifications = [
          ...(student.qualifications || []),
          ...missingAchievements,
        ];

        const qualificationsObject = allQualifications.reduce(
          (acc: any, q: any) => {
            acc[`qualification_${q.id_achievement}`] = {
              id_achie_stu: q.id_achie_stu,
              id_achievement: q.id_achievement,
              id_student: q.id_student,
              score: q.score ?? null,
            };
            return acc;
          },
          {},
        );

        return {
          student: student.student,
          ...qualificationsObject,
        };
      });
    },
    [],
  );

  // Cargar cursos cuando se selecciona un grupo
  useEffect(() => {
    const loadCourses = async () => {
      if (!groupId) return;

      setIsLoading(true);
      setError(null);

      const result = await getCoursesAction(groupId);

      if (result.success && result.data) {
        const processedCourses = (result.data as any[]).map((c: any) => ({
          id_course: c.id_course,
          id_group: c.id_group,
          name: c.name,
          teacher: c.teacher?.name || "-",
        }));
        // setCourses(processedCourses);
      } else {
        setError(result.message);
      }

      setIsLoading(false);
    };

    loadCourses();
  }, [groupId]);

  // Cargar logros y calificaciones cuando se selecciona un curso y periodo
  useEffect(() => {
    const loadAchievementsAndQualifications = async () => {
      if (!courseId || !period) return;

      setIsLoading(true);
      setError(null);

      // Cargar logros
      const achievementsResult = await getAchievementsAction(courseId, period);
      if (achievementsResult.success && achievementsResult.data) {
        // setAchievements(achievementsResult.data as Achievement[]);
      }

      // Cargar calificaciones
      const qualificationsResult = await getQualificationsAction(
        courseId,
        period,
      );
      if (qualificationsResult.success && qualificationsResult.data) {
        const processed = processQualifications(
          qualificationsResult.data as any[],
          achievementsResult.data as Achievement[],
        );
        setStudentQualifications(processed);
      } else {
        setError(qualificationsResult.message);
      }

      setIsLoading(false);
    };

    loadAchievementsAndQualifications();
  }, [courseId, period, processQualifications]);

  // Handlers
  const handleSelectCourse = (idCourse: number, selectedPeriod: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("a", String(idCourse));
    params.set("per", String(selectedPeriod));
    router.push(`${revalidatePath}?${params.toString()}`);
  };

  const handleSelectGroup = (selectedGroupId: number) => {
    router.push(`${revalidatePath}?g=${selectedGroupId}`);
  };

  const handleBack = () => {
    if (courseId && period) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("a");
      params.delete("per");
      router.push(`${revalidatePath}?${params.toString()}`);
    } else if (groupId) {
      router.push(revalidatePath);
    }
  };

  const updateScore = (qualification: any, score: string) => {
    const scoreNum = Number(score);
    if (isNaN(scoreNum)) return;

    const existing = newQualifications.find(
      (q) => q.id_achie_stu === qualification.id_achie_stu,
    );

    if (existing) {
      setNewQualifications(
        newQualifications.map((q) =>
          q.id_achie_stu === qualification.id_achie_stu
            ? { ...q, score: scoreNum }
            : q,
        ),
      );
    } else {
      setNewQualifications([
        ...newQualifications,
        {
          id_achie_stu: qualification.id_achie_stu,
          id_achievement: qualification.id_achievement,
          id_student: qualification.id_student,
          score: scoreNum,
        },
      ]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.set("qualifications", JSON.stringify(newQualifications));
    formData.set("revalidatePath", revalidatePath);
    updateAction(formData);
  };

  // Refetch después de actualizar
  useEffect(() => {
    if (updateState.success && courseId && period) {
      setNewQualifications([]);
      setIsEditing(false);
      // Reload qualifications
      const reload = async () => {
        const result = await getQualificationsAction(courseId, period);
        if (result.success && result.data) {
          const processed = processQualifications(
            result.data as any[],
            achievements,
          );
          setStudentQualifications(processed);
        }
      };
      reload();
    }
  }, [
    updateState.success,
    courseId,
    period,
    achievements,
    processQualifications,
  ]);
  const columns = [
    {
      title: "Curso",
      dataIndex: "name",
      key: "name",
      render: (_: unknown, record: Group) => formatGroupName(record),
    },
    {
      title: "Jornada",
      dataIndex: "working_time",
      key: "working_time",
      render: (_: unknown, record: Group) =>
        formatWorkingTime(record.working_time),
    },
    {
      title: "Asignaturas",
      dataIndex: "coursesCount",
      key: "coursesCount",
      render: (_: unknown, record: Group) => record.coursesCount ?? 0,
    },
    {
      title: "Profesor del grupo",
      dataIndex: "representative",
      key: "representative",
      render: (_: unknown, record: Group) => {
        if (!record.representative) {
          return "-";
        }
        return record.representative;
      },
    },
    {
      title: "Asignaturas",
      key: "actions",
      render: (_: unknown, record: Group) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            router.push(`${DEFAULT_REVALIDATE_PATH}?group=${record.id_group}`)
          }
        >
          <File style={{ color: "#0055A6", fontSize: "20px" }} />
        </Button>
      ),
    },
  ];
  const subjectColumns = useMemo(
    () => [
      { title: "Asignatura", dataIndex: "name", key: "name" },
      {
        title: "Profesor",
        key: "teacher",
        render: (_: unknown, record: Course) => {
          return `${record.teacher?.last_name} ${record.teacher?.name}`;
        },
      },

      {
        title: "Promediar",
        dataIndex: "average",
        key: "average",
        render: (_: unknown, record: Course) => record.average ?? "Si",
      },
      {
        title: "Logros",
        key: "achievements",
        children: [
          {
            title: "Per 1",
            key: "per1",
            render: (_: unknown, record: Course) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentParams = new URLSearchParams(
                    searchParams.toString(),
                  );
                  currentParams.set("subject", String(record.id_course));
                  currentParams.set("per", "1");
                  router.push(`${pathname}?${currentParams.toString()}`);
                }}
              >
                <File style={{ color: "#0055A6", fontSize: "20px" }} />
              </Button>
            ),
          },
          {
            title: "Per 2",
            key: "per2",
            render: (_: unknown, record: Course) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentParams = new URLSearchParams(
                    searchParams.toString(),
                  );
                  currentParams.set("subject", String(record.id_course));
                  currentParams.set("per", "2");
                  router.push(`${pathname}?${currentParams.toString()}`);
                }}
              >
                <File style={{ color: "#0055A6", fontSize: "20px" }} />
              </Button>
            ),
          },
          {
            title: "Per 3",
            key: "per3",
            render: (_: unknown, record: Course) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentParams = new URLSearchParams(
                    searchParams.toString(),
                  );
                  currentParams.set("subject", String(record.id_course));
                  currentParams.set("per", "3");
                  router.push(`${pathname}?${currentParams.toString()}`);
                }}
              >
                <File style={{ color: "#0055A6", fontSize: "20px" }} />
              </Button>
            ),
          },
          {
            title: "Per 4",
            key: "per4",
            render: (_: unknown, record: Course) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentParams = new URLSearchParams(
                    searchParams.toString(),
                  );
                  currentParams.set("subject", String(record.id_course));
                  currentParams.set("per", "4");
                  router.push(`${pathname}?${currentParams.toString()}`);
                }}
              >
                <File style={{ color: "#0055A6", fontSize: "20px" }} />
              </Button>
            ),
          },
          {
            title: "Per Final",
            datIndex: "",
            key: "average",
            render: (_: unknown, record: Course) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentParams = new URLSearchParams(
                    searchParams.toString(),
                  );
                  currentParams.set("subject", String(record.id_course));
                  currentParams.set("per", "final");
                  router.push(`${pathname}?${currentParams.toString()}`);
                }}
              >
                <File style={{ color: "#0055A6", fontSize: "20px" }} />
              </Button>
            ),
          },
        ],
      },
    ],
    [],
  );
  const studentsColumns = useMemo(() => {
    const cols: Array<any> = [
      {
        title: "Estudiante",
        dataIndex: "name",
        key: "name",
        render: (_: unknown, record: Student) => (
          <span>
            {record.last_name} {record.name}
          </span>
        ),
      },
    ];
    if (achievements.length > 0) {
      achievements.forEach((achievement, index) => {
        cols.push({
          title: index + 1,
          dataIndex: achievement.id_achievement,
          key: achievement.id_achievement,
          align: "center",
          render: (_: unknown, record: Student) => (
            <Input type="number" className="max-w-12" />
          ),
        });
      });
    }
    return cols;
  }, [achievements]);
  
  if (groupId && !courseId) {
    return (
      <ContainerComponents>
        <div className="w-full flex items-center justify-between my-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <strong className="text-xl text-foreground ps-8">
              Cursos creados para el año {yearName} para la calificación de
              logros e indicadores de logros por asignatura
            </strong>
          </div>
        </div>
        <div className="p-5 bg-base-100 rounded-2xl">
          {courses.length ? (
            <Table columns={subjectColumns} data={courses} rowKey="id_course" />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              Aún no hay asignaturas registradas para este grupo.
            </div>
          )}
        </div>
      </ContainerComponents>
    );
  }
  if (groupId && courseId && !period) {
    return (
      <ContainerComponents>
        <div className="w-full flex items-center justify-between my-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <strong className="text-xl text-foreground ps-8">
              Cursos creados para el año {yearName} para la calificación de
              logros e indicadores de logros por asignatura
            </strong>
          </div>
        </div>
        <div className="p-5 bg-base-100 rounded-2xl">
          {courses.length ? (
            <Table columns={subjectColumns} data={courses} rowKey="id_course" />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              Aún no hay asignaturas registradas para este grupo.
            </div>
          )}
        </div>
      </ContainerComponents>
    );
  }
  if (groupId && courseId && period) {
    return (
      <div>
        <div className="w-full flex items-center justify-between my-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>
        <div className="p-5 bg-base-100 rounded-2xl mb-2">
          {achievements.length ? (
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={achievement.id_achievement} className="text-sm">
                  <span className="text-main-blue font-bold">{index + 1}</span>. {achievement.description}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              Aún no hay logros registrados para este curso.
            </div>
          )}
        </div>
        <div className="p-5 bg-base-100 rounded-2xl">
          {students.length ? (
            <Table
              columns={studentsColumns}
              data={students}
              rowKey="id_student"
            />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              Aún no hay estudiantes registrados para este curso.
            </div>
          )}
          {studentQualifications.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Estudiante</th>
                      {achievements.map((_, index) => (
                        <th key={index} className="text-center">
                          {index + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {studentQualifications.map((student, studentIndex) => (
                      <tr key={studentIndex}>
                        <td>{student.student}</td>
                        {achievements.map((achievement) => {
                          const qual =
                            student[
                              `qualification_${achievement.id_achievement}`
                            ];
                          return (
                            <td
                              key={achievement.id_achievement}
                              className="text-center"
                            >
                              {isEditing ? (
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="5"
                                  className="input input-bordered input-sm w-16 text-center"
                                  placeholder={qual?.score?.toString() || "0"}
                                  onChange={(e) =>
                                    updateScore(qual, e.target.value)
                                  }
                                />
                              ) : (
                                <span>{qual?.score ?? "0"}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isEditing && newQualifications.length > 0 && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="bg-main-blue hover:bg-main-blue/90 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isUpdating ? "Guardando..." : "Guardar notas"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
  if (!groupId && !courseId && !period) {
    return (
      <ContainerComponents>
        <div className="w-full flex items-center justify-between my-3">
          <div className="flex items-center gap-4">
            {(groupId || courseId) && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            )}
            <strong className="text-xl text-foreground ps-8">
              Cursos creados para el año {yearName} para la calificación de
              logros e indicadores de logros por asignatura
            </strong>
          </div>
        </div>
        <div className="p-5 bg-base-100 rounded-2xl">
          {groups.length ? (
            <Table columns={columns} data={groups} rowKey="id_group" />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              Aún no hay grupos registrados para el año seleccionado.
            </div>
          )}
        </div>
        {groupId && !courseId && !isLoading && (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Asignatura</th>
                  <th>Profesor</th>
                  <th className="text-center">1 Per.</th>
                  <th className="text-center">2 Per.</th>
                  <th className="text-center">3 Per.</th>
                  <th className="text-center">4 Per.</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No hay cursos para este grupo
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id_course}>
                      <td>{course.name}</td>
                      <td>{course.teacher?.name}</td>
                      {[1, 2, 3, 4].map((p) => (
                        <td key={p} className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleSelectCourse(course.id_course, p)
                            }
                          >
                            -
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {courseId && period && !isLoading && (
          <div className="space-y-4">
            {achievements.length > 0 && (
              <div className="space-y-1">
                {achievements.map((achievement, index) => (
                  <div key={achievement.id_achievement} className="text-sm">
                    {index + 1}. {achievement.description}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-main-blue hover:text-main-blue/80"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Cambiar notas ya calificadas
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setNewQualifications([]);
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>

            {studentQualifications.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Estudiante</th>
                        {achievements.map((_, index) => (
                          <th key={index} className="text-center">
                            {index + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {studentQualifications.map((student, studentIndex) => (
                        <tr key={studentIndex}>
                          <td>{student.student}</td>
                          {achievements.map((achievement) => {
                            const qual =
                              student[
                                `qualification_${achievement.id_achievement}`
                              ];
                            return (
                              <td
                                key={achievement.id_achievement}
                                className="text-center"
                              >
                                {isEditing ? (
                                  <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    className="input input-bordered input-sm w-16 text-center"
                                    placeholder={qual?.score?.toString() || "0"}
                                    onChange={(e) =>
                                      updateScore(qual, e.target.value)
                                    }
                                  />
                                ) : (
                                  <span>{qual?.score ?? "0"}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {isEditing && newQualifications.length > 0 && (
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isUpdating}
                      className="bg-main-blue hover:bg-main-blue/90 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isUpdating ? "Guardando..." : "Guardar notas"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </ContainerComponents>
    );
  }
}
