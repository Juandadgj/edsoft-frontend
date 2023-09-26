import React from 'react'
import { CourseCard } from './types'

const CCourses = (props: CourseCard) => {
  const {name,jornada,group_teacher,editar,borrar} = props
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {jornada}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {group_teacher}
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
}

export default CCourses