'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Group, Student } from '@/app/types';
import { getCourseLevel } from '@/app/shared/course-level';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import Table from '@/app/components/ui/table';
import { Button } from '@/app/components/ui/button';
import Modal from '@/app/components/ui/modal';
import { UserPlus } from 'lucide-react';

interface StudentLastYearProps {
  groups: Group[];
  previousYearStudents: Student[];
  selectedGroupId: number | null;
  selectedYear: number | null;
  revalidatePath?: string;
  onSelectGroup?: (groupId: number) => void;
  onBack?: () => void;
  onEnrollStudent?: (studentId: number, groupId: number) => void;
}

export function StudentLastYear({
  groups,
  previousYearStudents,
  selectedGroupId,
  selectedYear,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onSelectGroup,
  onBack,
  onEnrollStudent,
}: StudentLastYearProps) {
  const router = useRouter();
  const selectedGroup = groups.find((g) => g.id_group === selectedGroupId);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [enrollingStudent, setEnrollingStudent] = useState(false);

  // Columnas para la tabla de grupos
  const groupsColumns = useMemo(
    () => [
      {
        title: 'Curso',
        key: 'name',
        render: (_: unknown, record: Group) =>
          getCourseLevel(record.level, record.sublevel),
      },
      {
        title: 'Profesor del Grupo',
        key: 'representative',
        render: (_: unknown, record: Group) => record.representative || '-',
      },
      {
        title: 'Jornada',
        dataIndex: 'working_time',
        key: 'working_time',
      },
      {
        title: 'Seleccionar',
        key: 'select',
        render: (_: unknown, record: Group) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSelectGroup?.(record.id_group)}
          >
            Seleccionar Curso
          </Button>
        ),
      },
    ],
    [onSelectGroup]
  );

  // Columnas para la tabla de estudiantes del año anterior
  const studentsColumns = useMemo(
    () => [
      {
        title: 'Apellido y Nombre',
        key: 'fullName',
        render: (_: unknown, record: Student) =>
          `${record.last_name || ''} ${record.name || ''}`,
      },
      {
        title: 'Identificación',
        dataIndex: 'identification',
        key: 'identification',
      },
      {
        title: 'Teléfono',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Curso Anterior',
        key: 'previousCourse',
        render: (_: unknown, record: Student) => {
          // Mostrar el grupo del año anterior si está disponible
          const previousGroup = record.groups?.[0];
          if (previousGroup) {
            return getCourseLevel(previousGroup.level, previousGroup.sublevel);
          }
          return 'N/A';
        },
      },
      {
        title: 'Matricular',
        key: 'enroll',
        render: (_: unknown, record: Student) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleOpenConfirm(record)}
            title="Matricular en el grupo seleccionado"
          >
            <UserPlus size={16} className="mr-1" />
            Matricular
          </Button>
        ),
      },
    ],
    []
  );

  const handleOpenConfirm = (student: Student) => {
    setSelectedStudent(student);
    setShowConfirmModal(true);
  };

  const handleCloseConfirm = () => {
    setSelectedStudent(null);
    setShowConfirmModal(false);
  };

  const handleEnrollStudent = async () => {
    if (!selectedStudent || !selectedGroupId) return;

    setEnrollingStudent(true);
    try {
      onEnrollStudent?.(selectedStudent.id_student, selectedGroupId);
      handleCloseConfirm();
    } catch (error) {
      console.error('Error al matricular estudiante:', error);
    } finally {
      setEnrollingStudent(false);
    }
  };

  // Si no hay grupo seleccionado, mostrar lista de grupos
  if (!selectedGroupId) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Elija el curso para ingresar estudiantes del año anterior para el {selectedYear}
        </h3>

        {groups.length > 0 ? (
          <Table columns={groupsColumns} data={groups} rowKey="id_group" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            No hay grupos registrados para el año {selectedYear}.
          </div>
        )}
      </div>
    );
  }

  // Mostrar estudiantes del año anterior para matricular
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Matricular estudiantes en {getCourseLevel(selectedGroup?.level, selectedGroup?.sublevel)}
        </h3>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <div className="bg-base-100 p-4 rounded-lg border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-foreground/70">Curso destino:</span>{' '}
            <strong>{getCourseLevel(selectedGroup?.level, selectedGroup?.sublevel)}</strong>
          </div>
          <div>
            <span className="text-foreground/70">Profesor:</span>{' '}
            <strong>{selectedGroup?.representative || 'Sin asignar'}</strong>
          </div>
          <div>
            <span className="text-foreground/70">Año:</span>{' '}
            <strong>{selectedYear}</strong>
          </div>
          <div>
            <span className="text-foreground/70">Estudiantes disponibles:</span>{' '}
            <strong>{previousYearStudents.length}</strong>
          </div>
        </div>
      </div>

      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <p className="text-sm text-foreground">
          <strong>Nota:</strong> A continuación se muestran los estudiantes del año anterior
          que pueden ser matriculados en el curso seleccionado.
        </p>
      </div>

      {previousYearStudents.length > 0 ? (
        <Table columns={studentsColumns} data={previousYearStudents} rowKey="id_student" />
      ) : (
        <div className="text-center py-10 text-sm text-foreground/70">
          No hay estudiantes del año anterior disponibles para matricular.
        </div>
      )}

      {/* Modal de confirmación */}
      <Modal
        open={showConfirmModal}
        close={handleCloseConfirm}
        title="Confirmar Matrícula"
      >
        <div className="space-y-4">
          <div className="text-center">
            <p className="mb-4">
              ¿Está seguro de matricular al estudiante{' '}
              <strong>
                {selectedStudent?.last_name} {selectedStudent?.name}
              </strong>{' '}
              en el curso{' '}
              <strong>
                {getCourseLevel(selectedGroup?.level, selectedGroup?.sublevel)}
              </strong>
              ?
            </p>
          </div>

          <div className="flex justify-center gap-2">
            <Button
              type="button"
              variant="destructive"
              onClick={handleCloseConfirm}
              disabled={enrollingStudent}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleEnrollStudent}
              disabled={enrollingStudent}
            >
              {enrollingStudent ? 'Matriculando...' : 'Matricular'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
