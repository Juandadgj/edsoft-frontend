import React from "react";
import { CourseCard } from "./types";

const CCourses = (props: CourseCard) => {
  const { name, teacher, click, periodo1, periodo2, periodo3, periodo4 } = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }} onClick={click}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {teacher}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {periodo1}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {periodo2}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {periodo3}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {periodo4}
        </td>
      </tr>
    </div>
  );
};

export default CCourses;
