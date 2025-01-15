import Layaout from "@/components/Layaout";
import { useStudentByIdQuery } from "@/generated/graphql";
import { UserOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const columns = [
  {
    title: "Materia",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Docente",
    dataIndex: "teacher",
    key: "teacher",
  },
  {
    title: "Pr1",
    dataIndex: "definitives",
    key: "definitives",
    render: (_: any, record: any) => <div>{record?.definitives?.score1}</div>,
  },
  {
    title: "Pr2",
    dataIndex: "definitives",
    key: "definitives",
    render: (_: any, record: any) => <div>{record?.definitives?.score2}</div>,
  },
  {
    title: "Pr3",
    dataIndex: "definitives",
    key: "definitives",
    render: (_: any, record: any) => <div>{record?.definitives?.score3}</div>,
  },
  {
    title: "Pr4",
    dataIndex: "definitives",
    key: "definitives",
    render: (_: any, record: any) => <div>{record?.definitives?.score4}</div>,
  },
];
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
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#25429e #F3F4F6",
          scrollbarGutter: "20px",
        }}
      >
        <div>
          <strong className="text-xl text-black ps-8">General</strong>
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
                    <UserOutlined
                      style={{ fontSize: "40px", color: "black" }}
                    />
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
                  <div className="bg-white w-full h-full rounded-[2rem] p-5 px-2 text-black">
                    <Table
                      className="h-full"
                      dataSource={group?.courses?.map((c) => c)}
                      columns={columns}
                      scroll={{ x: 600 }}
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#25429e #F3F4F6",
                        scrollbarGutter: "20px",
                      }}
                      pagination={{
                        pageSize: 5,
                      }}
                    />
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
