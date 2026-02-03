"use client";

import { useMemo, useState } from "react";
import { ContainerComponents } from "@/app/components/shared/container";
import { Button } from "@/app/components/ui/button";
import { INDICATOR_OPTIONS, type IndicatorOption } from "./constants";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Group, Student } from "@/app/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCourseLevel } from "@/app/shared/course-level";
import Table from "@/app/components/ui/table";
import { ChartColumnIncreasing, Table2 } from "lucide-react";
import { title } from "process";

interface IndicatorReportProps {
  optionId: number;
  groups?: Group[];
  periods?: Array<{ id: number; name: string }>;
  years?: Array<{ id: number; name: string }>;
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Leyend({ data }: { data: Array<{ name: string; value: number }> }) {
  function stringToDeterministicHash(str: string): number {
    const normalizedStr = str.trim().toLowerCase();
    let hash = 0;
    if (normalizedStr.length === 0) return 0;
    for (let i = 0; i < normalizedStr.length; i++) {
      const char = normalizedStr.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convertir a entero de 32 bits (esto es importante para JavaScript)
    }
    return Math.abs(hash); // Asegurar que el hash sea positivo para el módulo
  }
  function getNameColor(name: string): string {
    if (!name) {
      return "#B2B5B8"; // Color gris por defecto
    }

    const hash = stringToDeterministicHash(name); // Usamos la función de hash mejorada

    const index = hash % COLORS.length;

    return COLORS[index];
  }
  return (
    <div className="w-full">
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Color
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cantidad
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((entry, index) => (
              <tr key={`cell-${index}`}>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div
                    style={{
                      background: getNameColor(entry.name),
                    }}
                    className="w-4 h-4 rounded-full"
                  ></div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{entry.name}</div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{entry.value}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function IndicatorReport({
  optionId,
  groups = [],
  periods = [],
  years = [],
}: IndicatorReportProps) {
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const groupId = params.get("group");
  const option = INDICATOR_OPTIONS.find((opt) => opt.id === optionId);
  const [isGenerating, setIsGenerating] = useState(false);
  function stringToDeterministicHash(str: string): number {
    const normalizedStr = str.trim().toLowerCase();
    let hash = 0;
    if (normalizedStr.length === 0) return 0;
    for (let i = 0; i < normalizedStr.length; i++) {
      const char = normalizedStr.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convertir a entero de 32 bits (esto es importante para JavaScript)
    }
    return Math.abs(hash); // Asegurar que el hash sea positivo para el módulo
  }
  function getNameColor(name: string): string {
    if (!name) {
      return "#B2B5B8"; // Color gris por defecto
    }

    const hash = stringToDeterministicHash(name); // Usamos la función de hash mejorada

    const index = hash % COLORS.length;

    return COLORS[index];
  }

  const groupsColumns = useMemo(() => {
    const cols: Array<any> = [
      {
        title: "Curso",
        key: "name",
        render: (_: unknown, record: Group) =>
          getCourseLevel(record.level, record.sublevel),
      },
      {
        title: "Jornada",
        dataIndex: "working_time",
        key: "working_time",
      },
      {
        title: "Profesor del Grupo",
        dataIndex: "representative",
        key: "representative",
        render: (_: unknown, record: Group) => record.representative || "-",
      },
    ];
    if (option?.type === "grades-per-course") {
      cols.push({
        title: "Porcentaje",
        key: "select",
        render: (_: unknown, record: Group) => {
          return (
            <Button
              type="button"
              onClick={() => {
                const currentParams = new URLSearchParams(params.toString());
                currentParams.set("group", String(record.id_group));
                router.push(`${pathname}?${currentParams.toString()}`);
              }}
            >
              <ChartColumnIncreasing size={16} />
            </Button>
          );
        },
      });
    }
    if (option?.type === "average-students-per-period") {
      cols.push(
        {
          title: "Periodos individuales",
          key: "individual-periods",
          children: [
            {
              title: "1",
              key: "1",
              render: (_: unknown, record: Group) => (
                <Button
                  type="button"
                  onClick={() => {
                    const currentParams = new URLSearchParams(
                      params.toString(),
                    );
                    currentParams.set("group", String(record.id_group));
                    currentParams.set("period", String(1));
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                >
                  <ChartColumnIncreasing size={16} />
                </Button>
              ),
            },
            {
              title: "2",
              key: "2",
              render: (_: unknown, record: Group) => (
                <Button
                  type="button"
                  onClick={() => {
                    const currentParams = new URLSearchParams(
                      params.toString(),
                    );
                    currentParams.set("group", String(record.id_group));
                    currentParams.set("period", String(2));
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                >
                  <ChartColumnIncreasing size={16} />
                </Button>
              ),
            },
            {
              title: "3",
              key: "3",
              render: (_: unknown, record: Group) => (
                <Button
                  type="button"
                  onClick={() => {
                    const currentParams = new URLSearchParams(
                      params.toString(),
                    );
                    currentParams.set("group", String(record.id_group));
                    currentParams.set("period", String(3));
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                >
                  <ChartColumnIncreasing size={16} />
                </Button>
              ),
            },
            {
              title: "4",
              key: "4",
              render: (_: unknown, record: Group) => (
                <Button
                  type="button"
                  onClick={() => {
                    const currentParams = new URLSearchParams(
                      params.toString(),
                    );
                    currentParams.set("group", String(record.id_group));
                    currentParams.set("period", String(4));
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                >
                  <ChartColumnIncreasing size={16} />
                </Button>
              ),
            },
            {
              title: "F",
              key: "F",
              render: (_: unknown, record: Group) => (
                <Button
                  type="button"
                  onClick={() => {
                    const currentParams = new URLSearchParams(
                      params.toString(),
                    );
                    currentParams.set("group", String(record.id_group));
                    currentParams.set("period", String(5));
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                >
                  <ChartColumnIncreasing size={16} />
                </Button>
              ),
            },
          ],
        },
        {
          title: "Periodos agrupados",
          key: "grouped-periods",
          children: [
            {
              title: "1-2",
              key: "1",
              render: (_: unknown, record: Group) => (
                <Button
                  type="button"
                  onClick={() => {
                    const currentParams = new URLSearchParams(
                      params.toString(),
                    );
                    currentParams.set("group", String(record.id_group));
                    currentParams.set("period", String(1));
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                >
                  <ChartColumnIncreasing size={16} />
                </Button>
              ),
            },
            {
              title: "1-3",
              key: "2",
              render: (_: unknown, record: Group) => (
                <Button
                  type="button"
                  onClick={() => {
                    const currentParams = new URLSearchParams(
                      params.toString(),
                    );
                    currentParams.set("group", String(record.id_group));
                    currentParams.set("period", String(2));
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                >
                  <ChartColumnIncreasing size={16} />
                </Button>
              ),
            },
            {
              title: "1-4",
              key: "3",
              render: (_: unknown, record: Group) => (
                <Button
                  type="button"
                  onClick={() => {
                    const currentParams = new URLSearchParams(
                      params.toString(),
                    );
                    currentParams.set("group", String(record.id_group));
                    currentParams.set("period", String(3));
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                >
                  <ChartColumnIncreasing size={16} />
                </Button>
              ),
            },
          ],
        },
      );
    }
    if (option?.type === "average-courses-per-period") {
      cols.push({
        title: "Estudiantes",
        dataIndex: "students",
        key: "students",
      },
      {
        title: "Promedio",
        dataIndex: "average",
        key: "average",
      }
    );
    }
    return cols;
  }, [option?.type]);
  const studentColumns = useMemo(() => {
    const cols: Array<any> = [
      {
        title: "Pto",
        dataIndex: "pto",
        key: "pto",
      },
      {
        title: "Apellido y nombre",
        dataIndex: "name",
        key: "name",
        render: (_: unknown, record: Student) => {
          return (
            <div>
              <div>
                {record.name} {record.last_name}
              </div>
            </div>
          );
        },
      },
      {
        title: "Promedio",
        dataIndex: "average",
        key: "average",
      },
      {
        title: "Medalla",
        dataIndex: "medal",
        key: "medal",
      },
    ];
    return cols;
  }, [option?.type]);
  if (!option) {
    return (
      <ContainerComponents>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Opción de indicador no válida</p>
        </div>
      </ContainerComponents>
    );
  }

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implementar generación cuando el backend esté listo
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsGenerating(false);
    alert("Funcionalidad pendiente de implementación en el backend");
  };

  if (option.type === "students-per-course") {
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
          {option.type === "students-per-course" && (
            <div className="mt-6 p-4 border border-dashed border-muted-foreground rounded-lg min-h-80">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResponsiveContainer height={400}>
                  <PieChart>
                    <Pie
                      data={data02}
                      cx={"50%"}
                      cy={"50%"}
                      innerRadius="50%"
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive
                      label
                    >
                      {data02.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getNameColor(entry.name)}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Leyend data={data02} />
              </div>
            </div>
          )}
        </div>
      </ContainerComponents>
    );
  }
  if (groupId && option.type === "grades-per-course") {
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
          <div className="mt-6 p-4 border border-dashed border-muted-foreground rounded-lg min-h-80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveContainer height={400}>
                <PieChart>
                  <Pie
                    data={data02}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius="50%"
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive
                    label
                  >
                    {data02.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getNameColor(entry.name)}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Leyend data={data02} />
            </div>
          </div>
        </div>
      </ContainerComponents>
    );
  }
  if (groupId && option.type === "average-students-per-period") {
    return (
      <ContainerComponents>
        <div className="w-full flex items-center justify-between mb-6">
          <h3>
            <strong className="text-xl text-foreground ps-8">
              {option.title}
            </strong>
          </h3>
        </div>
        <div className="space-y-6 p-5 bg-base-100 rounded-2xl">
          {groups.length ? (
            <Table columns={studentColumns} data={[]} rowKey="id_group" />
          ) : (
            <div className="text-center py-10 text-sm text-foreground/70">
              No hay estudiantes registrados para el grupo seleccionado.
            </div>
          )}
        </div>
      </ContainerComponents>
    );
  }
  if (option.type === "average-courses-per-period") {
    return (
      <ContainerComponents>
        <div className="w-full flex items-center justify-between mb-6">
          <h3>
            <strong className="text-xl text-foreground ps-8">
              {option.title}
            </strong>
          </h3>
        </div>
        <div className="space-y-6 p-5 bg-base-100 rounded-2xl">
          {Array.from(Array(5).keys()).map((i) => (
            <div key={i} className="space-y-6 mb-4 border rounded-2xl p-5">
              <h4 className="text-xl text-foreground ps-8">
                <strong>Promedio de cursos para el periodo {i === Array(5).length - 1 ? 'Final' : i + 1}</strong>
              </h4>
              {groups.length ? (
                <Table
                  columns={groupsColumns}
                  data={groups}
                  rowKey="id_group"
                />
              ) : (
                <div className="text-center py-10 text-sm text-foreground/70">
                  No hay grupos registrados para el año seleccionado.
                </div>
              )}
            </div>
          ))}
        </div>
      </ContainerComponents>
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
      <div className="space-y-6 p-5 bg-base-100 rounded-2xl">
        {groups.length ? (
          <Table columns={groupsColumns} data={groups} rowKey="id_group" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            No hay grupos registrados para el año seleccionado.
          </div>
        )}
      </div>
    </ContainerComponents>
  );
}
