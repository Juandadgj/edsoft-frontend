import React from "react";
import AverageCoursesPerPeriod from "./AverageCoursesPerPeriod";
import AverageStudentsPerPeriod from "./AverageStudentsPerPeriod";
import GradesPerCourse from "./GradesPerCourse";
import StudentsPerCourse from "./StudentsPerCourse";
import { useRouter } from "next/router";
import Link from "next/link";

export const Indicators = () => {
  const items: any[] = [
    {
      id: 1,
      title: "Porcentaje de estudiantes por curso",
      page: "indicadores",
      query: "",
      componente: <StudentsPerCourse />,
    },
    {
      id: 2,
      title: "Porcentaje de notas por curso",
      page: "indicadores",
      query: "",
      componente: <GradesPerCourse />,
    },
    {
      id: 3,
      title: "Promedio de estudiantes por periodo",
      page: "indicadores",
      query: "",
      componente: <AverageStudentsPerPeriod />,
    },
    {
      id: 4,
      title: "Promedio de cursos por periodo",
      page: "indicadores",
      query: "",
      componente: <AverageCoursesPerPeriod />,
    },
  ];
  const router = useRouter();
  const { opcion } = router.query;
  return (
    <div>
      <div className="w-full flex items-center justify-between pb-6">
        <strong className="text-xl text-black ps-8">Indicadores</strong>
      </div>
      {!opcion && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {items.map((item: any, i: any) => (
            <div
              className="flex items-start gap-2 flex-wrap font-semibold card bg-white"
              key={i}
            >
              <Link
                key={i}
                href={`reportes?componente=indicadores&opcion=${item.id}`}
              >
                <div className="card-body w-full">
                  <div className="card-title">
                    <div className="text-black">{item.title}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      {opcion && (
        <div className="h-full w-full">
          {items.find((item) => item.id === Number(opcion))?.componente}
        </div>
      )}
    </div>
  );
};
