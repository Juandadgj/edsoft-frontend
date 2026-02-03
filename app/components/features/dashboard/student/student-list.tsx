"use client";
import { Student } from "@/app/types";
import { UserIcon } from "lucide-react";
import React from "react";
import { DOCUMENT_TYPE_OPTIONS } from "../programacion-anual/enrollments";
import Table from "@/app/components/ui/table";
import { getCourseLevel } from "@/app/shared/course-level";
import { title } from "process";

export const StudentList = ({ student }: { student: Student }) => {
  const getDocumentTypeLabel = (typeId?: string | null) => {
    if (!typeId) return "-";
    const option = DOCUMENT_TYPE_OPTIONS.find((opt) => opt.value === typeId);
    return option?.label ?? typeId;
  };
  const qualificationsColumns = [
    {
      title: "Materia",
      key: "name",
      render: (_: unknown, record: { name?: string }) => record.name ?? "-",
    },
    {
      title: "Docente",
      key: "teacher",
      render: (_: unknown, record: { teacher?: string }) =>
        record.teacher ?? "-",
    },
    {
      title: "Pr1",
      key: "score1",
      render: (_: unknown, record: { definitives?: { score1?: string } }) => (
        <div>{record?.definitives?.score1 ?? "-"}</div>
      ),
    },
    {
      title: "Pr2",
      key: "score2",
      render: (_: unknown, record: { definitives?: { score2?: string } }) => (
        <div>{record?.definitives?.score2 ?? "-"}</div>
      ),
    },
    {
      title: "Pr3",
      key: "score3",
      render: (_: unknown, record: { definitives?: { score3?: string } }) => (
        <div>{record?.definitives?.score3 ?? "-"}</div>
      ),
    },
    {
      title: "Pr4",
      key: "score4",
      render: (_: unknown, record: { definitives?: { score4?: string } }) => (
        <div>{record?.definitives?.score4 ?? "-"}</div>
      ),
    },
  ];
  const columnsSubjects = [
    {
      title: "Curso",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Docente",
      key: "teacher",
      dataIndex: "teacher",
    },
    {
      title: "Pr1",
      key: "score1",
      dataIndex: ["definitives", "score1"],
    },
    {
      title: "Pr2",
      key: "score2",
      dataIndex: ["definitives", "score2"],
    },
    {
      title: "Pr3",
      key: "score3",
      dataIndex: ["definitives", "score3"],
    },
    {
      title: "Pr4",
      key: "score4",
      dataIndex: ["definitives", "score4"],
    },
  ];
  return (
    <div className=" p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Información del Estudiante
        </h1>
      </div>

      {/* Información General */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Avatar y Nombre */}
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <UserIcon className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {student.name} {student.last_name}
              </h2>
              <p className="text-foreground/60">Estudiante</p>
              <span
                className={`badge mt-1 ${
                  student.status === "active"
                    ? "badge-success"
                    : student.status === "inactive"
                      ? "badge-error"
                      : "badge-warning"
                }`}
              >
                {student.status === "active"
                  ? "Activo"
                  : student.status === "inactive"
                    ? "Inactivo"
                    : "Pendiente"}
              </span>
            </div>
          </div>

          {/* Detalles del estudiante */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-foreground/60 font-medium">
                Tipo de documento
              </p>
              <p className="text-foreground">
                {getDocumentTypeLabel(student.type_id)}
              </p>
            </div>
            <div>
              <p className="text-foreground/60 font-medium">Identificación</p>
              <p className="text-foreground">{student.identification ?? "-"}</p>
            </div>
            <div>
              <p className="text-foreground/60 font-medium">Sexo</p>
              <p className="text-foreground">{student.sex ?? "-"}</p>
            </div>
            <div>
              <p className="text-foreground/60 font-medium">
                Fecha de nacimiento
              </p>
              <p className="text-foreground">{student.birthday ?? "-"}</p>
            </div>
            <div>
              <p className="text-foreground/60 font-medium">Teléfono</p>
              <p className="text-foreground">{student.phone ?? "-"}</p>
            </div>
            <div>
              <p className="text-foreground/60 font-medium">Correo</p>
              <p className="text-foreground">{student.email ?? "-"}</p>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <p className="text-foreground/60 font-medium">Dirección</p>
              <p className="text-foreground">{student.direction ?? "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Información del Curso */}
      {/* {currentGroup && (
        <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpenIcon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Curso Actual
            </h3>
          </div>
          <p className="text-foreground text-lg">
            {getCourseLevel(currentGroup.level, currentGroup.sublevel)}
          </p>
        </div>
      )} */}

      {/* Información Familiar */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 border-b pb-2">
          Información Familiar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-foreground/60 font-medium">Acudiente</p>
            <p className="text-foreground">{student.guardian ?? "-"}</p>
            {student.guardian_mobile && (
              <p className="text-foreground/60 text-xs mt-1">
                Tel: {student.guardian_mobile}
              </p>
            )}
          </div>
          <div>
            <p className="text-foreground/60 font-medium">Madre</p>
            <p className="text-foreground">{student.mother ?? "-"}</p>
            {student.mother_mobile && (
              <p className="text-foreground/60 text-xs mt-1">
                Tel: {student.mother_mobile}
              </p>
            )}
          </div>
          <div>
            <p className="text-foreground/60 font-medium">Padre</p>
            <p className="text-foreground">{student.father ?? "-"}</p>
            {student.father_mobile && (
              <p className="text-foreground/60 text-xs mt-1">
                Tel: {student.father_mobile}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Información de Salud */}
      {(student.eps ||
        student.blood_type ||
        student.health_system ||
        student.illness) && (
        <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 border-b pb-2">
            Información de Salud
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            {student.eps && (
              <div>
                <p className="text-foreground/60 font-medium">EPS</p>
                <p className="text-foreground">{student.eps}</p>
              </div>
            )}
            {student.blood_type && (
              <div>
                <p className="text-foreground/60 font-medium">Tipo de Sangre</p>
                <p className="text-foreground">{student.blood_type}</p>
              </div>
            )}
            {student.health_system && (
              <div>
                <p className="text-foreground/60 font-medium">
                  Sistema de Salud
                </p>
                <p className="text-foreground">{student.health_system}</p>
              </div>
            )}
            {student.illness && (
              <div className="md:col-span-4">
                <p className="text-foreground/60 font-medium">Enfermedades</p>
                <p className="text-foreground">{student.illness}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calificaciones */}
      <div className="pt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-2 text-[12px]">
        {student.groups?.map((group) => (
          <div className="" key={group?.id_group}>
            <strong className="text-foreground ps-8 text-xl mb-2">
              {getCourseLevel(group?.level)} {group?.sublevel}
            </strong>
            <div className="bg-base-100 w-full rounded-2xl p-8 text-freground mt-2">
              <Table
                columns={columnsSubjects}
                data={group?.courses || []}
                rowKey="id_course"
                
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
