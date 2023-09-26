import React from "react";
import { SetYearCard } from "./types";

const CSetYear = (props: SetYearCard) => {
  const { year, rector, secretary, details, edit } = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          <p className="w-full">{year}</p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="w-full">{rector}</p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {secretary}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {year}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {details}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {edit}
        </td>
      </tr>
    </div>
  );
};

export default CSetYear;
