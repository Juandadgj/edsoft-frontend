import { ContainerComponents } from "@/components/ContainerComponents";
import React from "react";
import { CourseComponent } from "../../CourseComponent";
import { useRouter } from "next/router";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const GradesPerCourse = () => {
  const { query, replace, push, back, asPath } = useRouter();
  const { g, a, per } = query;
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
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <strong className="text-xl text-black ps-8">
          Porcentaje de notas por curso
        </strong>
      </div>
      {!g && <CourseComponent isCreate={false} showSubjects={false} />}
      {g && (
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
                  <Cell key={`cell-${index}`} fill={getNameColor(entry.name)} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
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
                  {data02.map((entry, index) => (
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
                        <div className="text-sm text-gray-900">
                          {entry.name}
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entry.value}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </ContainerComponents>
  );
};

export default GradesPerCourse;
