import React from "react";
import { GroupsCars } from "./types";

const CCourses = (props: GroupsCars) => {
  const {
    name,
    jornada,
    group_teacher,
    editar,
    borrar,
    asignaturas,
    see,
    students,
    course_count,
    click,
  } = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }} onClick={click}>
      <tr
        className={`flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold 
        `}
      >
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        {jornada && (
          <td className="flex w-full justify-center items-center text-center py-0">
            {jornada}
          </td>
        )}
        <td className="flex w-full justify-center items-center text-center py-0">
          {group_teacher}
        </td>
        {editar && (
          <td className="flex w-full justify-center items-center text-center py-0">
            {editar}
          </td>
        )}
        {borrar && (
          <td className="flex w-full justify-center items-center text-center py-0">
            {borrar}
          </td>
        )}
        {course_count && (
          <td className="flex w-full justify-center items-center text-center py-0">
            {course_count}
          </td>
        )}
        {asignaturas && (
          <td className="flex w-full justify-center items-center text-center py-0">
            {asignaturas}
          </td>
        )}
        {students && (
          <td className="flex w-full justify-center items-center text-center py-0">
            {students}
          </td>
        )}
        {see && (
          <td className="flex w-full justify-center items-center text-center py-0 ">
            {see}
          </td>
        )}
      </tr>
    </div>
  );
};

export default CCourses;
