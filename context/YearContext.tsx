import { useScholearYearSelectedQuery, ScholarYear } from "@/generated/graphql";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IScholarYearContextProvider {
  children: React.ReactNode;
}
type TScholarYearContext = {
  schoolYear: number | undefined;
  setSchoolYear: any;
};
const ScholarYearContext = createContext(0);

const ScholarYearContextProvider = ({
  children,
}: IScholarYearContextProvider) => {
  const schoolYear = 2017
  // const year = sessionStorage.getItem("year")
  // const ssetSchoolYearet = (year: number) => {
  //   const yearString = JSON.stringify(year)
  //   sessionStorage.setItem("year", yearString)
  // }
  return (
    <ScholarYearContext.Provider value={1}>
      {children}
    </ScholarYearContext.Provider>
  );
};

export const useScholarYearContext = () => useContext(ScholarYearContext);

export default ScholarYearContextProvider;
