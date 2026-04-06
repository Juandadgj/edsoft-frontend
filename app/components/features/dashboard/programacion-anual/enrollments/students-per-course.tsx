"use client";

import { startTransition, useActionState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Group, Student } from "@/app/types";
import { getCourseLevel } from "@/app/shared/course-level";
import {
  DEFAULT_REVALIDATE_PATH,
  EnrollmentCertificateType,
} from "./constants";
import Table from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { Edit, FilePenLine, Info, Trash } from "lucide-react";
import { generateCertificateAction } from "./actions";

interface StudentsPerCourseProps {
  groups: Group[];
  students: Student[];
  selectedGroupId: number | null;
  selectedYear: number | null;
  revalidatePath?: string;
  onSelectGroup?: (groupId: number) => void;
  onBack?: () => void;
}

export function StudentsPerCourse({
  groups,
  students,
  selectedGroupId,
  selectedYear,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onSelectGroup,
  onBack,
}: StudentsPerCourseProps) {
  const router = useRouter();
  const selectedGroup = groups.find((g) => g.id_group === selectedGroupId);
  const groupStudents = useMemo(() => {
    if (!selectedGroupId) return [];
    return students;
  }, [students, selectedGroupId]);
  const WORKING_TIMES = [
    { value: "M", label: "Mañana" },
    { value: "T", label: "Tarde" },
    { value: "N", label: "Noche" },
    { value: "S", label: "Sabatina" },
  ];
  const [state, action, loading] = useActionState(generateCertificateAction, {
    success: false,
    message: "",
  });
  useEffect(() => {
    if (state.success) {
      console.log(state.data);
      window.open()?.document.write(state.data?.report_content || "");
    }
  }, [state]);
  const getGroupHours = (group?: Group) => {
    const workingTime = WORKING_TIMES.find(
      (wt) => wt.value === group?.working_time,
    );
    return workingTime ? workingTime.label : "N/A";
  };
  // Columnas para la tabla de grupos
  const groupsColumns = useMemo(
    () => [
      {
        title: "Curso",
        key: "name",
        render: (_: unknown, record: Group) =>
          getCourseLevel(record.level, record.sublevel),
      },
      {
        title: "Profesor del Grupo",
        key: "representative",
        render: (_: unknown, record: Group) => record.representative || "-",
      },
      {
        title: "Jornada",
        dataIndex: "working_time",
        key: "working_time",
      },
      {
        title: "Ver",
        key: "select",
        render: (_: unknown, record: Group) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSelectGroup?.(record.id_group)}
          >
            Ver Estudiantes
          </Button>
        ),
      },
    ],
    [onSelectGroup],
  );

  // Columnas para la tabla de estudiantes
  const studentsColumns = useMemo(
    () => [
      {
        title: "Apellido y Nombre",
        key: "fullName",
        render: (_: unknown, record: Student) =>
          `${record.last_name || ""} ${record.name || ""}`,
      },
      {
        title: "Identificación",
        dataIndex: "identification",
        key: "identification",
      },
      {
        title: "Certi. Matri. I",
        key: "certificate1",
        render: (_: unknown, record: Student) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              handleGenerateCertificate(
                record.id_student,
                EnrollmentCertificateType.Certificate1,
              )
            }
            title="Generar Certificado de Matrícula I"
          >
            <FilePenLine size={16} />
          </Button>
        ),
      },
      {
        title: "Certi. Matri. II",
        key: "certificate2",
        render: (_: unknown, record: Student) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              handleGenerateCertificate(
                record.id_student,
                EnrollmentCertificateType.Certificate2,
              )
            }
            title="Generar Certificado de Matrícula II"
          >
            <FilePenLine size={16} />
          </Button>
        ),
      },
      {
        title: "Info",
        key: "info",
        render: (_: unknown, record: Student) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              router.push(`/dashboard/estudiante/${record.id_student}`)
            }
            title="Ver información del estudiante"
          >
            <Info size={16} />
          </Button>
        ),
      },
      {
        title: "Acciones",
        key: "actions",
        render: (_: unknown, record: Student) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                router.push(
                  `${revalidatePath}?opcion=1&studentId=${record.id_student}`,
                )
              }
              title="Editar estudiante"
            >
              <Edit size={16} />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveFromGroup(record.id_student)}
              title="Retirar del grupo"
            >
              <Trash size={16} />
            </Button>
          </div>
        ),
      },
    ],
    [router, revalidatePath, selectedYear],
  );

  const handleGenerateCertificate = (
    idStudent: number,
    reportType: EnrollmentCertificateType,
  ) => {
    startTransition(() => {
      action({
        studentId: idStudent,
        reportType,
        year: selectedYear ?? new Date().getFullYear(),
      });
    });
  };

  const handleRemoveFromGroup = (idStudent: number) => {
    // TODO: Implementar remoción del grupo
    console.log("Remover estudiante del grupo:", idStudent);
  };

  // Si no hay grupo seleccionado, mostrar lista de grupos
  if (!selectedGroupId) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Seleccione un curso para ver sus estudiantes
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

  // Mostrar estudiantes del grupo seleccionado
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Estudiantes de{" "}
          {getCourseLevel(selectedGroup?.level, selectedGroup?.sublevel)}
        </h3>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <div className="bg-base-100 p-4 rounded-lg border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-foreground/70">Profesor:</span>{" "}
            <strong>{selectedGroup?.representative || "Sin asignar"}</strong>
          </div>
          <div>
            <span className="text-foreground/70">Jornada:</span>{" "}
            <strong>{getGroupHours(selectedGroup)}</strong>
          </div>
          <div>
            <span className="text-foreground/70">Año:</span>{" "}
            <strong>{selectedYear}</strong>
          </div>
          <div>
            <span className="text-foreground/70">Total estudiantes:</span>{" "}
            <strong>{groupStudents.length}</strong>
          </div>
        </div>
      </div>

      {groupStudents.length > 0 ? (
        <Table
          columns={studentsColumns}
          data={groupStudents}
          rowKey="id_student"
        />
      ) : (
        <div className="text-center py-10 text-sm text-foreground/70">
          No hay estudiantes matriculados en este grupo.
        </div>
      )}
    </div>
  );
}
