'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Achievement, Course, Group } from '@/app/types';
import { ContainerComponents } from '@/app/components/shared/container';
import Table from '@/app/components/ui/table';
import Modal from '@/app/components/ui/modal';
import { AchievementForm } from './achievement-form';
import { AchievementDeleteModal } from './achievement-delete-modal';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { getCourseLevel } from '@/app/shared/course-level';
import { Button } from '@/app/components/ui/button';

interface AchievementListProps {
  achievements: Achievement[];
  courses: Course[];
  groups: Group[];
  selectedYear: number | null;
  revalidatePath?: string;
}

const PERIODS = [1, 2, 3, 4];

export function AchievementList({
  achievements,
  courses,
  groups,
  selectedYear,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
}: AchievementListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('group');
  const courseId = searchParams.get('subject');
  const periodParam = searchParams.get('period');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Cerrar modales cuando cambian los searchParams (navegación con botón atrás)
  useEffect(() => {
    setIsFormOpen(false);
    setIsDeleteOpen(false);
    setSelectedAchievement(null);
  }, [searchParams]);

  const selectedGroupId = groupId ? Number(groupId) : null;
  const selectedCourseId = courseId ? Number(courseId) : null;
  const selectedPeriod = periodParam ? Number(periodParam) : null;

  // Grupos columns
  const groupsColumns = useMemo(
    () => [
      {
        title: 'Curso',
        key: 'name',
        render: (_: unknown, record: Group) => getCourseLevel(record.level, record.sublevel),
      },
      {
        title: 'Profesor del Grupo',
        dataIndex: 'representative',
        key: 'representative',
        render: (_: unknown, record: Group) => record.representative || '-',
      },
      {
        title: 'Ver',
        key: 'select',
        render: (_: unknown, record: Group) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-main-blue"
            onClick={() => router.push(`${DEFAULT_REVALIDATE_PATH}?group=${record.id_group}`)}
          >
            Ver asignaturas
          </button>
        ),
      },
    ],
    [router]
  );

  // Courses/Subjects columns with period buttons
  const coursesColumns = useMemo(
    () => [
      { title: 'Asignatura', dataIndex: 'name', key: 'name' },
      {
        title: 'Profesor',
        key: 'teacher',
        render: (_: unknown, record: Course) =>
          record.teacher ? `${record.teacher.name} ${record.teacher.last_name}` : '-',
      },
      ...PERIODS.map((period) => ({
        title: `${period} Per.`,
        key: `period_${period}`,
        render: (_: unknown, record: Course) => (
          <Button
            type="button"
            onClick={() =>
              router.push(`${DEFAULT_REVALIDATE_PATH}?group=${selectedGroupId}&subject=${record.id_course}&period=${period}`)
            }
          >
            Ver
          </Button>
        ),
      })),
    ],
    [router, selectedGroupId]
  );

  // Achievements columns
  const achievementsColumns = useMemo(
    () => [
      {
        title: 'Descripción',
        dataIndex: 'description',
        key: 'description',
        render: (_: unknown, record: Achievement) => (
          <span className="line-clamp-2">{record.description}</span>
        ),
      },
      {
        title: 'Editar',
        key: 'edit',
        render: (_: unknown, record: Achievement) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-main-blue"
            onClick={() => {
              console.log("set", record)
              setSelectedAchievement(record);
              setIsFormOpen(true);
            }}
          >
            Editar
          </button>
        ),
      },
      {
        title: 'Eliminar',
        key: 'delete',
        render: (_: unknown, record: Achievement) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-error"
            onClick={() => {
              setSelectedAchievement(record);
              setIsDeleteOpen(true);
            }}
          >
            Eliminar
          </button>
        ),
      },
    ],
    []
  );

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedAchievement(null);
  };

  const selectedGroup = groups.find((g) => g.id_group === selectedGroupId);
  const selectedCourse = courses.find((c) => c.id_course === selectedCourseId);

  // Determine current view
  const showGroups = !selectedGroupId;
  const showCourses = selectedGroupId && !selectedCourseId;
  const showAchievements = selectedGroupId && selectedCourseId && selectedPeriod;

  const getTitle = () => {
    if (showAchievements) {
      return `Logros de ${selectedCourse?.name ?? ''} - Periodo ${selectedPeriod}`;
    }
    if (showCourses) {
      return `Asignaturas de ${getCourseLevel(selectedGroup?.level, selectedGroup?.sublevel)}`;
    }
    return `Logros por curso para el año ${selectedYear ?? ''}`;
  };

  const getBackUrl = () => {
    if (showAchievements) {
      return `${DEFAULT_REVALIDATE_PATH}?g=${selectedGroupId}`;
    }
    if (showCourses) {
      return DEFAULT_REVALIDATE_PATH;
    }
    return null;
  };

  return (
    <ContainerComponents>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 my-3">
        <div>
          <strong className="text-xl text-foreground ps-1">{getTitle()}</strong>
          {getBackUrl() && (
            <button
              type="button"
              className="btn btn-ghost btn-xs ml-2"
              onClick={() => router.push(getBackUrl()!)}
            >
              ← Volver
            </button>
          )}
        </div>
        {showAchievements && (
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-6 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={() => {
              console.log("creando")
              setSelectedAchievement(null);
              setIsFormOpen(true);
            }}
          >
            + Nuevo logro
          </button>
        )}
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        {showGroups && (
          groups.length ? (
            <Table columns={groupsColumns} data={groups} rowKey="id_group" />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              No hay grupos registrados para el año seleccionado.
            </div>
          )
        )}

        {showCourses && (
          courses.length ? (
            <Table columns={coursesColumns} data={courses} rowKey="id_course" />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              No hay asignaturas registradas para este grupo.
            </div>
          )
        )}

        {showAchievements && (
          achievements.length ? (
            <Table columns={achievementsColumns} data={achievements} rowKey="id_achievement" />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              Aún no hay logros registrados para este periodo.
            </div>
          )
        )}
      </div>

      <Modal open={isFormOpen} title={selectedAchievement ? 'Editar logro' : 'Nuevo logro'} close={closeForm}>
        <AchievementForm
          achievement={selectedAchievement}
          courseId={selectedCourseId}
          period={selectedPeriod}
          revalidatePath={revalidatePath}
          onClose={closeForm}
        />
      </Modal>

      <AchievementDeleteModal
        open={isDeleteOpen}
        achievement={selectedAchievement}
        revalidatePath={revalidatePath}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedAchievement(null);
        }}
      />
    </ContainerComponents>
  );
}
