import Layaout from "@/components/Layaout";
import { useStudentByIdQuery } from "@/generated/graphql";

import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Student = ({ data }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: dataStudent,
    loading: loadingStudent,
    error: errorStudent,
  } = useStudentByIdQuery({ variables: { idStudent: Number(id) } });
  return (
    <Layaout textpage="Estudiante">
      <div
        className="rounded-tl-[20px] w-full h-[100vh] overflow-auto bg-gray1 p-9"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#25429e #F3F4F6",
          scrollbarGutter: "20px",
        }}
      >
        <div className="">
          <div>
            <strong className="text-xl text-black ps-8">General</strong>
          </div>
        </div>
        {loadingStudent && (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        )}
        {dataStudent?.studentByID && (
          <>
            <div className="bg-white border-none border-2 shadow-2xl rounded-[2rem] p-8 pb-0 text-black">
              <div className="flex justify-between gap-5 text-sm">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="avatar">
                    <div className="w-24 rounded-[100%]">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <div>
                    <h1>
                      <strong>
                        {dataStudent.studentByID.name}{" "}
                        {dataStudent.studentByID.last_name}
                      </strong>
                    </h1>
                    <p className="text-gray3">Estudiante</p>
                  </div>
                </div>
                <div className="w-1/3">
                  <h1>
                    <strong>Detalles del estudiante</strong>
                  </h1>
                  <div className="text-gray3">
                    <div>Nombres: {dataStudent.studentByID.name}</div>
                    <div>Apellidos: {dataStudent.studentByID.last_name}</div>
                    <div>
                      Indetifiacion: {dataStudent.studentByID.identification}
                    </div>
                    <div>
                      Nombre del acudiente: {dataStudent.studentByID.guardian}
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <h1>
                    <strong>Detalles de contacto</strong>
                  </h1>
                  <div className="text-gray3">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 14 14"
                      >
                        <g
                          fill="none"
                          stroke="#4d4d4d"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M11.5 5c0 2.49-4.5 8.5-4.5 8.5S2.5 7.49 2.5 5a4.5 4.5 0 0 1 9 0Z" />
                          <circle cx="7" cy="5" r="1.5" />
                        </g>
                      </svg>

                      <p> Direccion: {dataStudent.studentByID.direction}</p>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4d4d4d"
                          d="M4.05 21H3v-5.875L8 14.1l2.9 2.9q1-.575 1.863-1.237t1.587-1.388q.775-.75 1.45-1.625t1.225-1.85l-2.85-2.875L15.1 3H21v1.05q0 3.15-1.35 6.2T15.8 15.8q-2.5 2.5-5.562 3.85T4.05 21"
                        />
                      </svg>
                      <p>Telefono: {dataStudent.studentByID.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-8 text-sm">
                <div className="border-0 border-b-4 border-main-blue max-w-[150px] flex justify-center">
                  <p>
                    <strong>Registro por año</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 text-[12px]">
              {dataStudent.studentByID.groups?.map((group) => (
                <div className="" key={group?.id_group}>
                  <strong className="text-black ps-8 text-xl">
                    {group?.level} {group?.sublevel}
                  </strong>
                  <div className="bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 px-2 text-black w-full">
                    <table className=" w-full">
                      <thead className="border-b-2 border-gray6">
                        <div className="w-full flex justify-center text-center text-main-blue underline underline-offset-8 font-semibold pb-3">
                          <tr className="w-full justify-center flex px-2 ">
                            <td className="w-[38%] ">Materia</td>
                            <td className="w-[38%]">Docente</td>
                            <td className="w-[6%]">Pr1</td>
                            <td className="w-[6%]">Pr2</td>
                            <td className="w-[6%]">Pr3</td>
                            <td className="w-[6%]">Pr4</td>
                          </tr>
                        </div>
                      </thead>
                      <tbody className="">
                        {group?.courses?.map((course) => (
                          <div
                            key={course?.id_course}
                            className="flex justify-center items-center pt-3 text-center"
                          >
                            <tr className="w-full flex justify-center items-center bg-gray1 rounded-[2rem] px-2">
                              <td className="w-[38%]   py-2">{course?.name}</td>
                              <td className="w-[38%] h-full py-2">
                                {course?.teacher}
                              </td>

                              <td className="w-[6%]   py-2">
                                {course?.definitives?.score1}
                              </td>
                              <td className="w-[6%]   py-2">
                                {course?.definitives?.score2}
                              </td>
                              <td className="w-[6%]   py-2">
                                {course?.definitives?.score3}
                              </td>
                              <td className="w-[6%]   py-2">
                                {course?.definitives?.score4}
                              </td>
                            </tr>
                          </div>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layaout>
  );
};

export default Student;
