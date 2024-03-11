import React from "react";
import { SubjectCard } from "./types";

const CSubject = (props: SubjectCard) => {
  const { name, area, teacher, hour, percentage, average, editar, borrar } =
    props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {area}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {teacher}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {hour}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {percentage}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {average}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {editar}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {borrar}
        </td>
      </tr>
    </div>
  );
};

export default CSubject;
