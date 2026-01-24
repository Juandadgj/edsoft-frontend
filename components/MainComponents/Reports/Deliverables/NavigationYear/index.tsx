import { ContainerComponents } from "@/components/ContainerComponents";
import { CourseComponent } from "@/components/MainComponents/CourseComponent";
import TableComponent from "@/components/Table";
import { useGetSchoolarYearsQuery } from "@/generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import { Configuration } from "./Configuration";
import Students from "./Students";

const columns = [
  { title: "Año", dataIndex: "year", key: "year" },
  { title: "Rector", dataIndex: "rector", key: "rector" },
  { title: "Secretario", dataIndex: "secretary", key: "secretary" },
];

export const NavigationYear = () => {
  const router = useRouter();
  const { year, g, s } = router.query;
  const { data, loading, error } = useGetSchoolarYearsQuery({
    fetchPolicy: "network-only",
  });
  const handlerSelectScholarYear = async (year: number | undefined) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, year: year },
    });
  };
  const processedScholarYears = () => {
    if (!data?.scholarYears) return [];
    return data.scholarYears.map((schoYear) => ({
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
        {error && <div>¡Ocurrio un error! {error.message}</div>}
        {data?.scholarYears && (
          <div className="border-white py-4 h-full">
            <TableComponent column={columns} data={processedScholarYears()} />
          </div>
        )}
      </div>
    </ContainerComponents>
  );
};
