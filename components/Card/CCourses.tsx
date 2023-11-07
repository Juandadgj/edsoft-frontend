import React from "react";
import { CourseCard } from "./types";
import { useRouter } from "next/router";

const CCourses = (props: CourseCard) => {
  const {
    id_course,
    id_group,
    name,
    teacher,
    route,
  } = props;
  console.log(props);
  const router = useRouter();

  const handlerSelectedAchievement = (
    id: number | undefined,
    per: number | undefined
  ) => {
    router.push(`/dashboard/${route}&g=${id_group}&a=${id}&per=${per}`);
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
          <p
            className="cursor-pointer"
            onClick={() => handlerSelectedAchievement(id_course, 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="#0055A6"
                d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z"
              />
            </svg>
          </p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p
            className="cursor-pointer"
            onClick={() => handlerSelectedAchievement(id_course, 2)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="#0055A6"
                d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z"
              />
            </svg>
          </p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p
            className="cursor-pointer"
            onClick={() => handlerSelectedAchievement(id_course, 3)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="#0055A6"
                d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z"
              />
            </svg>
          </p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p
            className="cursor-pointer"
            onClick={() => handlerSelectedAchievement(id_course, 4)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="#0055A6"
                d="M1664 512h256v1536H256V512h256V384h128v128h896V384h128v128zm128 128h-128v128h128V640zm-256 0H640v128h896V640zm-1024 0H384v128h128V640zM384 1920h1408V896H384v1024zM256 384V256H128v1408H0V128h256V0h128v128h896V0h128v128h256v128h-256v128h-128V256H384v128H256zm384 1024v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128zm-768 256v-128h128v128H640zm256 0v-128h128v128H896zm256 0v-128h128v128h-128zm-256-512v-128h128v128H896zm256 0v-128h128v128h-128zm256 0v-128h128v128h-128z"
              />
            </svg>
          </p>
        </td>
      </tr>
    </div>
  );
};

export default CCourses;
