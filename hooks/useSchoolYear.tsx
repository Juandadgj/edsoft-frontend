import { useScholearYearSelectedQuery, useSelectScholarYearMutation } from "@/generated/graphql";
import { useEffect, useState } from "react";

const useSchoolYear = () => {
  const { data: scholarYear } = useScholearYearSelectedQuery({ fetchPolicy: "network-only" });
  const [
    selectScholarYear,
    { data: scholarYearData },
  ] = useSelectScholarYearMutation({ fetchPolicy: "network-only" });
  return {
    year: scholarYear?.scholearYearSelected.id_year,
    selectScholarYear: selectScholarYear,
  };
};

export default useSchoolYear;
