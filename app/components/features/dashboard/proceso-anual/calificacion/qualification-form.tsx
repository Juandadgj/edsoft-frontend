'use client';

import { useState, useEffect, useActionState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ContainerComponents } from '@/app/components/shared/container';
import { Button } from '@/app/components/ui/button';
import { Edit3, ArrowLeft, Save, Users } from 'lucide-react';
import type { Course, Achievement, QualificationUpdate } from './constants';
import { 
  getCoursesAction, 
  getAchievementsAction, 
  getQualificationsAction,
  updateQualificationsAction 
} from './actions';

// Componente interno para selector de grupos
interface GroupSelectorProps {
  groups: Array<{ id: number; name: string }>;
  onSelectGroup: (groupId: number) => void;
}

function GroupSelector({ groups, onSelectGroup }: GroupSelectorProps) {
  if (groups.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay grupos disponibles. Configure los grupos primero.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <button
          key={group.id}
          onClick={() => onSelectGroup(group.id)}
          className="card bg-base-100 hover:bg-base-200 transition-colors cursor-pointer"
        >
          <div className="card-body flex-row items-center gap-4">
            <div className="bg-main-blue/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-main-blue" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{group.name}</h3>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

interface QualificationFormProps {
  yearId?: number;
  yearName?: string;
  groups?: Array<{ id: number; name: string }>;
  revalidatePath?: string;
}

const initialState = { success: false, message: '' };

export function QualificationForm({ 
  yearId,
  yearName = '',
  groups = [],
  revalidatePath = '/dashboard/proceso-anual/calificacion',
}: QualificationFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const groupId = searchParams.get('g') ? Number(searchParams.get('g')) : null;
  const courseId = searchParams.get('a') ? Number(searchParams.get('a')) : null;
  const period = searchParams.get('per') ? Number(searchParams.get('per')) : null;

  // States
  const [courses, setCourses] = useState<Course[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [studentQualifications, setStudentQualifications] = useState<any[]>([]);
  const [newQualifications, setNewQualifications] = useState<QualificationUpdate[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [updateState, updateAction, isUpdating] = useActionState(updateQualificationsAction, initialState);

  // Procesa las calificaciones para mostrarlas en tabla
  const processQualifications = useCallback((qualificationsData: any[], achievementsData: Achievement[]) => {
    if (!qualificationsData || !achievementsData) return [];

    return qualificationsData.map((student: any) => {
      const studentAchievementIds = student.qualifications?.map(
        (q: any) => q.id_achievement
      ) || [];

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

      const qualificationsObject = allQualifications.reduce((acc: any, q: any) => {
        acc[`qualification_${q.id_achievement}`] = {
          id_achie_stu: q.id_achie_stu,
          id_achievement: q.id_achievement,
          id_student: q.id_student,
          score: q.score ?? null,
        };
        return acc;
      }, {});

      return {
        student: student.student,
        ...qualificationsObject,
      };
    });
  }, []);

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
          teacher: c.teacher?.name || '-',
        }));
        setCourses(processedCourses);
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
        setAchievements(achievementsResult.data as Achievement[]);
      }

      // Cargar calificaciones
      const qualificationsResult = await getQualificationsAction(courseId, period);
      if (qualificationsResult.success && qualificationsResult.data) {
        const processed = processQualifications(
          qualificationsResult.data as any[],
          achievementsResult.data as Achievement[]
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
    params.set('a', String(idCourse));
    params.set('per', String(selectedPeriod));
    router.push(`${revalidatePath}?${params.toString()}`);
  };

  const handleSelectGroup = (selectedGroupId: number) => {
    router.push(`${revalidatePath}?g=${selectedGroupId}`);
  };

  const handleBack = () => {
    if (courseId && period) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('a');
      params.delete('per');
      router.push(`${revalidatePath}?${params.toString()}`);
    } else if (groupId) {
      router.push(revalidatePath);
    }
  };

  const updateScore = (qualification: any, score: string) => {
    const scoreNum = Number(score);
    if (isNaN(scoreNum)) return;

    const existing = newQualifications.find(
      (q) => q.id_achie_stu === qualification.id_achie_stu
    );

    if (existing) {
      setNewQualifications(
        newQualifications.map((q) =>
          q.id_achie_stu === qualification.id_achie_stu
            ? { ...q, score: scoreNum }
            : q
        )
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
    formData.set('qualifications', JSON.stringify(newQualifications));
    formData.set('revalidatePath', revalidatePath);
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
          const processed = processQualifications(result.data as any[], achievements);
          setStudentQualifications(processed);
        }
      };
      reload();
    }
  }, [updateState.success, courseId, period, achievements, processQualifications]);

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
            Cursos creados para el año {yearName} para la calificación de logros e indicadores de logros por asignatura
          </strong>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Update status */}
      {updateState.message && (
        <div className={`p-3 rounded-md mb-4 ${updateState.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {updateState.message}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="w-full h-32 flex justify-center items-center">
          <span className="loading loading-dots loading-lg bg-main-blue"></span>
        </div>
      )}

      {/* Selector de grupo */}
      {!groupId && !isLoading && (
        <GroupSelector
          groups={groups}
          onSelectGroup={handleSelectGroup}
        />
      )}

      {/* Tabla de cursos */}
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
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">
                    No hay cursos para este grupo
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id_course}>
                    <td>{course.name}</td>
                    <td>{course.teacher}</td>
                    {[1, 2, 3, 4].map((p) => (
                      <td key={p} className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSelectCourse(course.id_course, p)}
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

      {/* Vista de calificaciones */}
      {courseId && period && !isLoading && (
        <div className="space-y-4">
          {/* Listado de logros */}
          {achievements.length > 0 && (
            <div className="space-y-1">
              {achievements.map((achievement, index) => (
                <div key={achievement.id_achievement} className="text-sm">
                  {index + 1}. {achievement.description}
                </div>
              ))}
            </div>
          )}

          {/* Botón de editar */}
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

          {/* Tabla de calificaciones */}
          {studentQualifications.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Estudiante</th>
                      {achievements.map((_, index) => (
                        <th key={index} className="text-center">{index + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {studentQualifications.map((student, studentIndex) => (
                      <tr key={studentIndex}>
                        <td>{student.student}</td>
                        {achievements.map((achievement) => {
                          const qual = student[`qualification_${achievement.id_achievement}`];
                          return (
                            <td key={achievement.id_achievement} className="text-center">
                              {isEditing ? (
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="5"
                                  className="input input-bordered input-sm w-16 text-center"
                                  placeholder={qual?.score?.toString() || '0'}
                                  onChange={(e) => updateScore(qual, e.target.value)}
                                />
                              ) : (
                                <span>{qual?.score ?? '0'}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Botón guardar */}
              {isEditing && newQualifications.length > 0 && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="bg-main-blue hover:bg-main-blue/90 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isUpdating ? 'Guardando...' : 'Guardar notas'}
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
