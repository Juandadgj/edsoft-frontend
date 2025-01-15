import { useScholearYearSelectedQuery, useSelectScholarYearMutation } from "@/generated/graphql";
import { useEffect, useState } from "react";

const useSchoolYear = () => {
  const { data: scholarYear } = useScholearYearSelectedQuery({ fetchPolicy: "network-only" });
  const [
    selectScholarYear,
    { data: scholarYearData },
  ] = useSelectScholarYearMutation({ fetchPolicy: "network-only" });
  const sessionYear = sessionStorage.getItem("year");
  const yearParse = parseInt(sessionYear ? sessionYear : "", 10);
  const [year, setYear] = useState<number | undefined>(yearParse);

  useEffect(() => {
    const storedYear = sessionStorage.getItem("year");
    if (storedYear) {
      setYear(parseInt(storedYear, 10));
    } else {
      setYear(scholarYear?.scholearYearSelected?.id_year);
    }
  }, []); // Se ejecuta solo una vez al montar el componente
  useEffect(() => {
    if (scholarYearData?.selectScholarYear) {
      sessionStorage.setItem(
        "year",
        scholarYearData.selectScholarYear?.id_year.toString()
      );
      setYear(scholarYearData.selectScholarYear?.id_year);
    }
  }, [scholarYearData]); // Se ejecuta para actualizar el año escolar
  return {
    year: year,
    selectScholarYear: selectScholarYear,
  };
};

export default useSchoolYear;
