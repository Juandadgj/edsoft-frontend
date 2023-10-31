import React from "react";
import { CourseCard } from "./types";
import { useRouter } from "next/router";

const CCourses = (props: CourseCard) => {
  const { id_course, id_group, name, teacher , periodo1, periodo2, periodo3, periodo4 } =
    props;
  console.log(props);
  const router = useRouter()

  const handlerSelectedAchievement = (
    id: number | undefined,
    per: number | undefined
  ) => {
    router.push(
      `/dashboard/programacion-anual?componente=logros&g=${id_group}&a=${id}&per=${per}`
    );
  };
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {teacher}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="cursor-pointer" onClick={() => handlerSelectedAchievement(id_course, 1)}>
            {" "}
            {periodo1}
          </p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="cursor-pointer" onClick={() => handlerSelectedAchievement(id_course, 2)}>
            {periodo2}
          </p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="cursor-pointer" onClick={() => handlerSelectedAchievement(id_course, 3)}>
            {periodo3}
          </p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="cursor-pointer" onClick={() => handlerSelectedAchievement(id_course, 4)}>
            {periodo4}
          </p>
        </td>
      </tr>
    </div>
  );
};

export default CCourses;
