"use client";

import {
  startTransition,
  use,
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ContainerComponents } from "@/app/components/shared/container";
import { Button } from "@/app/components/ui/button";
import {
  ActionState,
  DEFAULT_REVALIDATE_PATH,
  SPREADSHEET_OPTIONS,
  type SpreadsheetOption,
} from "./constants";
import { Course, Group } from "@/app/types";
import Table from "@/app/components/ui/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCourseLevel } from "@/app/shared/course-level";
import { generateSpreadsheetReportAction } from "./actions";

interface SpreadsheetReportProps {
  optionId: number;
  groups?: Group[];
  subjects?: Course[];
  periods?: Array<{ id: number; name: string }>;
}

const initialState: ActionState = {
  success: false,
  message: "",
};

export function SpreadsheetReport({
  optionId,
  groups = [],
  subjects = [],
  periods = [],
}: SpreadsheetReportProps) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const groupId = params.get("group");
  const option = SPREADSHEET_OPTIONS.find((opt) => opt.id === optionId);
  const [state, action, isPending] = useActionState(
    generateSpreadsheetReportAction,
    initialState,
  );
  const handlerGenerate = async ({
    reportType,
    groupId,
    subjectId,
    periodId,
  }: {
    reportType: string;
    groupId: number;
    subjectId?: number;
    periodId?: number;
  }) => {
    startTransition(() => {
      action({
        reportType: reportType,
        groupId: Number(groupId),
        subjectId: Number(subjectId),
        periodId: Number(periodId),
      });
    });
  };
  const groupsColumns = [
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
      render: (_: unknown, record: Group) => {
        if (option?.type === "students-list-undeterminated") {
          return (
            <Button
              type="button"
              onClick={() =>
                handlerGenerate({
                  reportType: option?.type,
                  groupId: Number(record.id_group),
                })
              }
            >
              Generar planilla
            </Button>
          );
        }
        if (option?.type === "general-absences") {
          return (
            <Button
              type="button"
              onClick={() => {
                handlerGenerate({
                  reportType: option?.type,
                  groupId: Number(record.id_group),
                });
              }}
            >
              Generar planilla
            </Button>
          );
        }
        if (option?.type === "absences-per-month") {
          return (
            <Button
              type="button"
              onClick={() => {
                handlerGenerate({
                  reportType: option?.type,
                  groupId: Number(record.id_group),
                });
              }}
            >
              Generar planilla
            </Button>
          );
        }
        return (
          <Button
            type="button"
            onClick={() => {
              const currentParams = new URLSearchParams(params.toString());
              currentParams.set("group", String(record.id_group));
              router.push(`${pathname}?${currentParams.toString()}`);
            }}
          >
            Ver asignaturas
          </Button>
        );
      },
    },
  ];

  const subjectColumns = useMemo(() => {
    const cols: Array<any> = [
      { title: "Asignatura", dataIndex: "name", key: "name" },
      {
        title: "Profesor",
        key: "teacher",
        render: (_: unknown, record: Course) => {
          return record.teacher ? record.teacher.name : "-";
        },
      },
    ];
    if (option?.type === "students-list-determinated") {
      cols.push({
        title: "Ver planilla",
        key: "spreadsheet",
        render: (_: unknown, record: Course) => {
          return (
            <Button
              type="button"
              onClick={() => {
                handlerGenerate({
                  reportType: option?.type,
                  groupId: Number(record.id_group),
                  subjectId: Number(record.id_course),
                });
              }}
            >
              Generar planilla
            </Button>
          );
        },
      });
    }
    if (option?.type === "achievements-and-indicators") {
      cols.push({
        title: "Ver logros",
        key: "spreadsheet",
        children: [
          {
            title: "Per 1.",
            key: "spreadsheet",
            render: (_: unknown, record: Course) => {
              return "-";
            },
          },
          {
            title: "Per 2.",
            key: "spreadsheet",
            render: (_: unknown, record: Course) => {
              return "-";
            },
          },
          {
            title: "Per 3.",
            key: "sheet",
            render: (_: unknown, record: Course) => {
              return "-";
            },
          },
          {
            title: "Per 4.",
            key: "spreadsheet",
            render: (_: unknown, record: Course) => {
              return "-";
            },
          },
        ],
      });
    }
    return cols;
  }, [option?.type]);
  useEffect(() => {
    if (state.success) {
      console.log(state.data)
      window.open()?.document.write(state.data?.report_content || '');
    }
  }, [state]);
  
  if (!option) {
    return (
      <ContainerComponents>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Opción de reporte no válida</p>
        </div>
      </ContainerComponents>
    );
  }

  if (groupId) {
    return (
      <div className="p-5 bg-base-100 rounded-2xl">
        {subjects.length ? (
          <Table columns={subjectColumns} data={subjects} rowKey="id_course" />
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
      <div className="w-full flex items-center justify-between mb-6">
        <h3>
          <strong className="text-xl text-foreground ps-8">
            {option.title}
          </strong>
        </h3>
      </div>
      <div className="space-y-6">
        <div className="p-5 bg-base-100 rounded-2xl">
          {groups.length ? (
            <Table columns={groupsColumns} data={groups} rowKey="id_group" />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              No hay grupos registrados para el año seleccionado.
            </div>
          )}
        </div>
      </div>
    </ContainerComponents>
  );
}
