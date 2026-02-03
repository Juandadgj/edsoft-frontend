"use client";

import { startTransition, useActionState, useEffect, useMemo, useState } from "react";
import { ContainerComponents } from "@/app/components/shared/container";
import { Button } from "@/app/components/ui/button";
import { LISTING_OPTIONS, type ListingReportType } from "./constants";
import { Group } from "@/app/types";
import Table from "@/app/components/ui/table";
import { getCourseLevel } from "@/app/shared/course-level";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateListingReportAction } from "./actions";
import { File } from "lucide-react";

interface ListingReportProps {
  optionId: number;
  groups?: Group[];
  areas?: Array<{ id: number; name: string }>;
  years?: Array<{ id: number; name: string }>;
}

export function ListingReport({
  optionId,
  groups = [],
  areas = [],
  years = [],
}: ListingReportProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const option = LISTING_OPTIONS.find((opt) => opt.id === optionId);
  const [state, action, isPending] = useActionState(
    generateListingReportAction,
    {
      success: false,
      message: "",
    },
  );
  if (!option) {
    return (
      <ContainerComponents>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Opción de listado no válida</p>
        </div>
      </ContainerComponents>
    );
  }

  const handleGenerate = async ({
    reportType,
    groupId,
    periodId,
  }: {
    reportType: string;
    groupId: number;
    periodId?: number;
  }) => {
    startTransition(() => {
      action({
        reportType: reportType,
        groupId: Number(groupId),
        periodId: Number(periodId),
      });
    });
  };
  useEffect(() => {
    if (state.success) {
      console.log(state.data, "Estado de listados generados");
      window.open()?.document.write(state.data?.report_content || "");
    }
  }, [state]);
  const groupsColumns = useMemo(() => {
    const cols: Array<any> = [
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
    ];
    if (option?.type !== "global-notes-sheet-by-course") {
      cols.push({
        title: "Listar",
        key: "select",
        render: (_: unknown, record: Group) => {
          return (
            <Button
              type="button"
              onClick={() =>
                handleGenerate({
                  groupId: record.id_group,
                  reportType: option.type,
                })
              }
            >
              <File className="w-4 h-4" />
            </Button>
          );
        },
      });
    }
    if (option?.type === "global-notes-sheet-by-course") {
      cols.push(
        {
          title: "P.1",
          key: "export",
          render: (_: unknown, record: Group) => {
            return (
              <Button
                variant={"outline"}
                type="button"
                onClick={() =>
                  handleGenerate({
                    reportType: option.type,
                    groupId: record.id_group,
                    periodId: 1,
                  })
                }
              >
                Exportar Excel
              </Button>
            );
          },
        },
        {
          title: "P.2",
          key: "export",
          render: (_: unknown, record: Group) => {
            return (
              <Button
                variant={"outline"}
                type="button"
                onClick={() =>
                  handleGenerate({
                    reportType: option.type,
                    groupId: record.id_group,
                    periodId: 2,
                  })
                }
              >
                Exportar Excel
              </Button>
            );
          },
        },
        {
          title: "P.3",
          key: "export",
          render: (_: unknown, record: Group) => {
            return (
              <Button
                variant={"outline"}
                type="button"
                onClick={() =>
                  handleGenerate({
                    reportType: option.type,
                    groupId: record.id_group,
                    periodId: 3,
                  })
                }
              >
                Exportar Excel
              </Button>
            );
          },
        },
        {
          title: "P.4",
          key: "export",
          render: (_: unknown, record: Group) => {
            return (
              <Button
                variant={"outline"}
                type="button"
                onClick={() =>
                  handleGenerate({
                    reportType: option.type,
                    groupId: record.id_group,
                    periodId: 4,
                  })
                }
              >
                Exportar Excel
              </Button>
            );
          },
        },
      );
    }
    return cols;
  }, [option?.type, params]);

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
        <div className="mt-6 overflow-x-auto">
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
      </div>
    </ContainerComponents>
  );
}
