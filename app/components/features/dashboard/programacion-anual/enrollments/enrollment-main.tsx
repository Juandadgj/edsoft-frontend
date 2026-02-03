'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Group, Student } from '@/app/types';
import { ContainerComponents } from '@/app/components/shared/container';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { NewStudentForm } from './new-student-form';
import { StudentsPerCourse } from './students-per-course';
import { SearchStudent } from './search-student';
import { StudentLastYear } from './student-last-year';
import { createEnrollmentAction } from './actions';

const enrollmentOptions = [
  {
    id: 1,
    title: 'Ingreso de nuevos estudiantes',
    description: 'Registrar un nuevo estudiante en el sistema y matricularlo',
    icon: '👤',
    color: 'text-success',
  },
  {
    id: 3,
    title: 'Mostrar estudiantes por curso',
    description: 'Ver los estudiantes matriculados en cada curso',
    icon: '👥',
    color: 'text-success',
  },
  {
    id: 4,
    title: 'Buscar estudiantes habilitados',
    description: 'Buscar estudiantes por nombre o identificación',
    icon: '🔍',
    color: 'text-info',
  },
  {
    id: 5,
    title: 'Matricular estudiantes del año anterior',
    description: 'Matricular estudiantes que cursaron el año anterior',
    icon: '📋',
    color: 'text-success',
  },
];

interface EnrollmentMainProps {
  groups: Group[];
  students: Student[];
  previousYearStudents?: Student[];
  selectedYear: number | null;
  revalidatePath?: string;
}

export function EnrollmentMain({
  groups,
  students,
  previousYearStudents = [],
  selectedYear,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
}: EnrollmentMainProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const option = searchParams.get('opcion');
  const groupId = searchParams.get('group');
  const studentIdParam = searchParams.get('studentId');

  const selectedOptionId = option ? Number(option) : null;
  const selectedGroupId = groupId ? Number(groupId) : null;
  const studentId = studentIdParam ? Number(studentIdParam) : null;

  const selectedOption = enrollmentOptions.find(
    (o) => o.id === selectedOptionId
  );

  // Handlers para navegación
  const handleSelectGroup = useCallback(
    (gId: number) => {
      router.push(`${revalidatePath}?opcion=${selectedOptionId}&group=${gId}`);
    },
    [router, revalidatePath, selectedOptionId]
  );

  const handleBack = useCallback(() => {
    if (selectedGroupId) {
      router.push(`${revalidatePath}?opcion=${selectedOptionId}`);
    } else if (selectedOptionId) {
      router.push(revalidatePath);
    }
  }, [router, revalidatePath, selectedOptionId, selectedGroupId]);

  const handleBackToMenu = useCallback(() => {
    router.push(revalidatePath);
  }, [router, revalidatePath]);

  const handleEnrollStudent = useCallback(
    async (studentId: number, gId: number) => {
      try {
        const formData = new FormData();
        formData.append('id_student', String(studentId));
        formData.append('id_group', String(gId));
        formData.append('year', String(selectedYear ?? new Date().getFullYear()));
        formData.append('revalidatePath', revalidatePath);

        await createEnrollmentAction({ success: false, message: '' }, formData);
        router.refresh();
      } catch (error) {
        console.error('Error al matricular estudiante:', error);
      }
    },
    [selectedYear, revalidatePath, router]
  );

  // Vista principal: Menú de opciones
  if (!selectedOptionId) {
    return (
      <ContainerComponents>
        <div className="w-full flex flex-col gap-2 mb-6">
          <strong className="text-xl text-foreground">
            Gestiones de Estudiantes {selectedYear}
          </strong>
          <p className="text-sm text-foreground/70">
            Seleccione una opción para gestionar las matrículas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrollmentOptions.map((item) => (
            <Link
              key={item.id}
              href={`${revalidatePath}?opcion=${item.id}`}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-200 border hover:border-main-blue/30"
            >
              <div className="card-body">
                <div className="card-title items-start gap-3">
                  <span className={`text-3xl ${item.color}`}>{item.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-foreground">{item.title}</span>
                    <span className="text-sm font-normal text-foreground/60">
                      {item.description}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ContainerComponents>
    );
  }

  // Opción 1: Ingreso de nuevos estudiantes
  if (selectedOptionId === 1) {
    const heading = studentId ? 'Editar estudiante' : selectedOption?.title;
    return (
      <ContainerComponents>
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <strong className="text-xl text-foreground">
              {heading}
            </strong>
            <button
              type="button"
              className="btn btn-ghost btn-xs ml-2"
              onClick={handleBackToMenu}
            >
              ← Volver al menú
            </button>
          </div>
        </div>

        <NewStudentForm
          groups={groups}
          selectedYear={selectedYear}
          revalidatePath={revalidatePath}
          studentId={studentId}
        />
      </ContainerComponents>
    );
  }

  // Opción 3: Mostrar estudiantes por curso
  if (selectedOptionId === 3) {
    return (
      <ContainerComponents>
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <strong className="text-xl text-foreground">
              {selectedOption?.title} - Año {selectedYear}
            </strong>
            {!selectedGroupId && (
              <button
                type="button"
                className="btn btn-ghost btn-xs ml-2"
                onClick={handleBackToMenu}
              >
                ← Volver al menú
              </button>
            )}
          </div>
        </div>

        <div className="p-5 bg-base-100 rounded-2xl">
          <StudentsPerCourse
            groups={groups}
            students={students}
            selectedGroupId={selectedGroupId}
            selectedYear={selectedYear}
            revalidatePath={revalidatePath}
            onSelectGroup={handleSelectGroup}
            onBack={handleBack}
          />
        </div>
      </ContainerComponents>
    );
  }

  // Opción 4: Buscar estudiantes habilitados
  if (selectedOptionId === 4) {
    return (
      <ContainerComponents>
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <strong className="text-xl text-foreground">
              Búsqueda de Estudiantes
            </strong>
            <button
              type="button"
              className="btn btn-ghost btn-xs ml-2"
              onClick={handleBackToMenu}
            >
              ← Volver al menú
            </button>
          </div>
        </div>

        <SearchStudent revalidatePath={revalidatePath} />
      </ContainerComponents>
    );
  }

  // Opción 5: Matricular estudiantes del año anterior
  if (selectedOptionId === 5) {
    return (
      <ContainerComponents>
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <strong className="text-xl text-foreground">
              {selectedOption?.title}
            </strong>
            {!selectedGroupId && (
              <button
                type="button"
                className="btn btn-ghost btn-xs ml-2"
                onClick={handleBackToMenu}
              >
                ← Volver al menú
              </button>
            )}
          </div>
        </div>

        <div className="p-5 bg-base-100 rounded-2xl">
          <StudentLastYear
            groups={groups}
            previousYearStudents={previousYearStudents}
            selectedGroupId={selectedGroupId}
            selectedYear={selectedYear}
            revalidatePath={revalidatePath}
            onSelectGroup={handleSelectGroup}
            onBack={handleBack}
            onEnrollStudent={handleEnrollStudent}
          />
        </div>
      </ContainerComponents>
    );
  }

  // Fallback para opciones no implementadas
  return (
    <ContainerComponents>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <strong className="text-xl text-foreground">
            {selectedOption?.title || 'Opción no encontrada'}
          </strong>
          <button
            type="button"
            className="btn btn-ghost btn-xs ml-2"
            onClick={handleBackToMenu}
          >
            ← Volver al menú
          </button>
        </div>
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        <p className="text-center text-foreground/70">
          Esta funcionalidad está en desarrollo.
        </p>
      </div>
    </ContainerComponents>
  );
}
