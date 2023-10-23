import React from "react";
import { GroupsCars } from "./types";

const CCourses = (props: GroupsCars) => {
  const {name, jornada, group_teacher, editar, borrar, asignaturas, id_group, click} = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }} onClick={click}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        {jornada && (
          <td className="flex w-full justify-center items-center text-center">
            {jornada}
          </td>
        )}
        <td className="flex w-full justify-center items-center text-center">
          {group_teacher}
        </td>
        {editar && (
          <td className="flex w-full justify-center items-center text-center">
            {editar}
          </td>
        )}
        {borrar && (
          <td className="flex w-full justify-center items-center text-center">
            {borrar}
          </td>
        )}
        {asignaturas && (
          <td className="flex w-full justify-center items-center text-center">
            {asignaturas}
          </td>
        )}
      </tr>
    </div>
  );
};

export default CCourses;
