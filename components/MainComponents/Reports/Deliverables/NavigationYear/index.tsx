import { ContainerComponents } from "@/components/ContainerComponents";
import { CourseComponent } from "@/components/MainComponents/CourseComponent";
import TableComponent from "@/components/Table";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import { Configuration } from "./Configuration";
import Students from "./Students";
import { scholarYearService } from "@/services/api.service";
import type { ScholarYear } from "@/types/api.types";

const columns = [
  { title: "Año", dataIndex: "year", key: "year" },
  { title: "Rector", dataIndex: "rector", key: "rector" },
  { title: "Secretario", dataIndex: "secretary", key: "secretary" },
];

export const NavigationYear = () => {
  const router = useRouter();
  const { year, g, s } = router.query;
  const [scholarYears, setScholarYears] = useState<ScholarYear[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScholarYears = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await scholarYearService.getAll();
      setScholarYears(response);
    } catch (err) {
      console.error("Error fetching scholar years:", err);
      setError(err instanceof Error ? err.message : "Error al cargar los años");
      setScholarYears([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScholarYears();
  }, [fetchScholarYears]);

  const handlerSelectScholarYear = async (year: number | undefined) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, year: year },
    });
  };

  const processedScholarYears = () => {
    if (!scholarYears) return [];
    return scholarYears.map((schoYear) => ({
      year: (
        <button
          onClick={() => handlerSelectScholarYear(schoYear?.id_year)}
          className="btn bg-transparent hover:bg-transparent border-none shadow-none text-black text-base hover:text-main-blue hover:scale-105 transition duration-500"
        >
          {schoYear?.id_year}
        </button>
      ),
      rector: schoYear?.rector ?? "",
      secretary: schoYear?.secretary ?? "",
    }));
  };
  if (year && !g && !s) {
    return (
      <ContainerComponents>
        <CourseComponent isCreate={false} showSubjects={true} />;
        {s && <Configuration />}
      </ContainerComponents>
    );
  }
  if (g && !s) {
    return (
      <ContainerComponents>
        <Students />
      </ContainerComponents>
    );
  }
  if (s) {
    return (
      <ContainerComponents>
        <Configuration />
      </ContainerComponents>
    );
  }
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Escoger año para certificado
          </strong>
        </h3>
      </div>
      <div className="text-black">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        )}
        {error && <div>¡Ocurrio un error! {error}</div>}
        {scholarYears && scholarYears.length > 0 && (
          <div className="border-white py-4 h-full">
            <TableComponent column={columns} data={processedScholarYears()} />
          </div>
        )}
      </div>
    </ContainerComponents>
  );
};
