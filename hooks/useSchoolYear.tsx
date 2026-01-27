import { scholarYearService } from "@/services/api.service";
import type { ScholarYear } from "@/types/api.types";
import { useEffect, useState, useCallback } from "react";

const useSchoolYear = () => {
  const [scholarYear, setScholarYear] = useState<ScholarYear | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scholarYearService.getSelected()
      .then(setScholarYear)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const selectScholarYear = useCallback(async (options: { variables: { idYear: number } }) => {
    try {
      const result = await scholarYearService.select(options.variables.idYear);
      console.log(result, "result");
      setScholarYear(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    year: scholarYear?.id_year,
    loading,
    selectScholarYear,
  };
};

export default useSchoolYear;
