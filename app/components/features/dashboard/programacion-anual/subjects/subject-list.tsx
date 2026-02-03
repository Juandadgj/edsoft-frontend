"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Course, Area, Teacher, Group } from "@/app/types";
import { ContainerComponents } from "@/app/components/shared/container";
import Table from "@/app/components/ui/table";
import Modal from "@/app/components/ui/modal";
import { SubjectForm } from "./subject-form";
import { SubjectDeleteModal } from "./subject-delete-modal";
import { DEFAULT_REVALIDATE_PATH } from "./constants";
import { getCourseLevel } from "@/app/shared/course-level";

interface SubjectListProps {
  subjects: Course[];
  groups: Group[];
  areas: Area[];
  teachers: Teacher[];
  selectedYear: number | null;
  revalidatePath?: string;
}

export function SubjectList({
  subjects,
  groups,
  areas,
  teachers,
  selectedYear,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
}: SubjectListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("g");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Course | null>(null);

  const selectedGroupId = groupId ? Number(groupId) : null;

  // Cuando no hay grupo seleccionado, mostrar lista de grupos
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
        dataIndex: "representative",
        key: "representative",
        render: (_: unknown, record: Group) => record.representative || "-",
      },
      {
        title: "Asignaturas",
        dataIndex: "coursesCount",
        key: "coursesCount",
        render: (_: unknown, record: Group) => record.coursesCount ?? 0,
      },
      {
        title: "Ver",
        key: "select",
        render: (_: unknown, record: Group) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-main-blue"
            onClick={() =>
              router.push(`${DEFAULT_REVALIDATE_PATH}?g=${record.id_group}`)
            }
          >
            Ver asignaturas
          </button>
        ),
      },
    ],
    [router],
  );

  // Columnas para asignaturas
  const subjectColumns = useMemo(
    () => [
      { title: "Asignatura", dataIndex: "name", key: "name" },
      {
        title: "Área",
        key: "area",
        render: (_: unknown, record: Course) => {
          const area = areas.find((a) => a.id_area === record.id_area);
          return area?.name ?? "-";
        },
      },
      {
        title: "Profesor",
        key: "teacher",
        render: (_: unknown, record: Course) => {
          const teacher = teachers.find(
            (t) => t.id_teacher === record.id_teacher,
          );
          return teacher ? `${teacher.name} ${teacher.last_name}` : "-";
        },
      },
      { title: "IHC", dataIndex: "hour", key: "hour" },
      {
        title: "Valor %",
        dataIndex: "percentage",
        key: "percentage",
        render: (_: unknown, record: Course) => record.percentage ?? "-",
      },
      {
        title: "Promediar",
        dataIndex: "average",
        key: "average",
        render: (_: unknown, record: Course) => record.average ?? "Si",
      },
      {
        title: "Editar",
        key: "edit",
        render: (_: unknown, record: Course) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-main-blue"
            onClick={() => {
              setSelectedSubject(record);
              setIsFormOpen(true);
            }}
          >
            Editar
          </button>
        ),
      },
      {
        title: "Eliminar",
        key: "delete",
        render: (_: unknown, record: Course) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-error"
            onClick={() => {
              setSelectedSubject(record);
              setIsDeleteOpen(true);
            }}
          >
            Eliminar
          </button>
        ),
      },
    ],
    [areas, teachers],
  );

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedSubject(null);
  };

  const filteredSubjects = selectedGroupId
    ? subjects.filter((s) => s.id_group === selectedGroupId)
    : [];

  const selectedGroup = groups.find((g) => g.id_group === selectedGroupId);

  if (!selectedGroupId) {
    return (
      <div className="p-5 bg-base-100 rounded-2xl">
        {groups.length ? (
          <Table columns={groupsColumns} data={groups} rowKey="id_group" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            No hay grupos registrados para el año seleccionado.
          </div>
        )}
      </div>
    );
  }
  return (
    <ContainerComponents>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 my-3">
        <div>
          <strong className="text-xl text-foreground ps-1">
            {selectedGroupId
              ? `Asignaturas de ${getCourseLevel(selectedGroup?.level, selectedGroup?.sublevel)}`
              : `Asignaturas creadas para el año ${selectedYear ?? ""}`}
          </strong>
          {selectedGroupId && (
            <button
              type="button"
              className="btn btn-ghost btn-xs ml-2"
              onClick={() => router.push(DEFAULT_REVALIDATE_PATH)}
            >
              ← Volver a grupos
            </button>
          )}
        </div>
        {selectedGroupId && (
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-6 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={() => {
              setSelectedSubject(null);
              setIsFormOpen(true);
            }}
          >
            + Nueva asignatura
          </button>
        )}
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        {filteredSubjects.length ? (
          <Table
            columns={subjectColumns}
            data={filteredSubjects}
            rowKey="id_course"
          />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            Aún no hay asignaturas registradas para este grupo.
          </div>
        )}
      </div>

      <Modal
        open={isFormOpen}
        title={selectedSubject ? "Editar asignatura" : "Nueva asignatura"}
      >
        <SubjectForm
          subject={selectedSubject}
          groups={groups}
          areas={areas}
          teachers={teachers}
          selectedGroupId={selectedGroupId}
          revalidatePath={revalidatePath}
          onClose={closeForm}
        />
      </Modal>

      <SubjectDeleteModal
        open={isDeleteOpen}
        subject={selectedSubject}
        revalidatePath={revalidatePath}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedSubject(null);
        }}
      />
    </ContainerComponents>
  );
}
