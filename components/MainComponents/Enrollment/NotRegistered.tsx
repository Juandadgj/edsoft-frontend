import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "@/graphql/queries/GetStudents";

const columns = [
  {
    Header: "Curso",
    accessor: "subjectName",
  },
  {
    Header: " Id del profesor",
    accessor: "teacherId",
  },
  {
    Header: "Asignaturas",
    accessor: "subjects",
  },
];

export const NotRegistered = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [active, setActive] = useState(false);
  const { data, loading, error } = useQuery(GET_STUDENTS);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-5">
      <div className="pb-4">
        <div>
          <strong className="text-2xl text-black ps-8">
            Estudiantes no matriculados en el {year}
          </strong>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5">
        <div>
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.courses ? (
            <div
              className="d-flex border-white py-4"
              style={{ height: "32rem" }}
            >
              {/* <Table
                column={columns}
                data={processedStudents}
                type={"subject"}
              /> */}
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      </div>
    </div>
  );
};
