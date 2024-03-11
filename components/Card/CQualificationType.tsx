import React from "react";
import { QualifificationTypeCard } from "./types";

const CQualificationType = (props: QualifificationTypeCard) => {
  const { qualificationName, floor, ceiling, year, notes, edit, borrar } =
    props;

  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          <p className="w-full">{qualificationName}</p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="w-full">{floor}</p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {ceiling}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {year}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {notes}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {edit}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {borrar}
        </td>
      </tr>
    </div>
  );
};

export default CQualificationType;
