import Table from "@/components/Table";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import { Input } from "@/components/Input";
import { studentService } from "@/services/api.service";
import type { Student } from "@/types/api.types";
const columns = [
  {
    title: "Apellido y Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Certi. Matri.",
    dataIndex: "certi",
    key: "certi",
  },
  {
    title: "Info",
    dataIndex: "info",
    key: "info",
  },
  {
    title: "Editar",
    dataIndex: "edit",
    key: "edit",
  },
  {
    title: "Sacar",
    dataIndex: "leave",
    key: "leave",
  },
];

export const SearchStudent = () => {
  const router = useRouter();
  const [identification, setIdentification] = useState("");
  const [name, setName] = useState("");
  const [students, setStudents] = useState<any>([]);
  const [loadingStudentsData, setLoadingStudentsData] = useState(false);
  const [errorStudentsData, setErrorStudentsData] = useState<any>(null);
  const [studentsData, setStudentsData] = useState<Student[] | null>(null);

  const processedStudents = useCallback((data: Student[]) => {
    if (!data) return [];
    return data.map((student: Student) => ({
      id_student: student?.id_student,
      name: `${student.name} ${student.last_name}`,
      certified: "",
      info: (
        <button
          className="btn bg-transparent border-none p-0 hover:bg-transparent"
          onClick={() => router.push(`estudiante/${student.id_student}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0055a6"
              d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20zm-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17zM9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7zm0 2v1h6V9zm0 2v1h4v-1z"
            />
          </svg>
        </button>
      ),
      edit: (
        <button className="btn bg-transparent border-none p-0 hover:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0055a6"
              d="M14 22v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v3h-2V9h-5V4H6v16h6v2zm13.025-5.025l-.475-.45l.925.925z"
            />
          </svg>
        </button>
      ),
      leave: (
        <button className="btn bg-transparent border-none p-0 hover:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 14 14"
          >
            <g
              fill="none"
              stroke="#e11d48"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="5" cy="3.75" r="2.25" />
              <path d="M6.5 13.5h-6V12a4.5 4.5 0 0 1 7.39-3.45m.61 2.95h5" />
            </g>
          </svg>
        </button>
      ),
    }));
  }, [router]);

  const handlerSearchStudents = useCallback(async () => {
    setLoadingStudentsData(true);
    setErrorStudentsData(null);
    try {
      const data = await studentService.getAll({ name, identification } as any);
      setStudentsData(data);
      setStudents(processedStudents(data));
    } catch (error) {
      setErrorStudentsData(error);
      console.error("Error searching students:", error);
    } finally {
      setLoadingStudentsData(false);
    }
  }, [name, identification, processedStudents]);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3 className="">
          <strong className="text-xl text-black ps-8">
            Busqueda de Estudiantes
          </strong>
        </h3>
      </div>
      <div className="w-full h-full">
        <div className="w-full h-full">
          <div className="flex flex-col justify-start items-center w-full p-8 h-full">
            <div className="w-full max-w-3xl border-2 border-gray-200 shadow-gray-200 rounded-[10px] p-10">
              <h1 className="text-black text-xl text-center">
                Ingrese identificacion-Codigo del estudiante o parte del nombre
                o apellido para la busqueda del estudiante.
              </h1>
              <div className="flex w-full gap-2">
                <div className="form-control w-full">
                
                  <Input
                    label="Nombre"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="form-control w-full">
                  <Input
                    label="Indentificacion"
                    value={identification}
                    onChange={(e: any) => setIdentification(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center mt-2">
                {loadingStudentsData ? (
                  <div className="w-full flex justify-center items-center">
                    <span className="loading loading-dots loading-lg bg-main-blue"></span>
                  </div>
                ) : (
                  <button
                    className="btn btn-sm h-10 border-none text-white text-xs bg-[#0b5ed7] hover:bg-[#0b5ed7]"
                    onClick={handlerSearchStudents}
                  >
                    Buscar Estudiante
                  </button>
                )}
              </div>
            </div>
            {studentsData && (
              <div className="text-black text-sm w-full flex justify-center items-center my-5">
                <div className="w-full">
                  <h1 className="text-center">Resultados de busqueda</h1>
                  <div>
                    <TableComponent column={columns} data={students} />
                  </div>
                </div>
              </div>
            )}
            {errorStudentsData && (
              <div className="text-sm font-semibold text-red-500 w-full flex justify-center items-center mt-5">
                <div className="w-full">
                  <h1 className="text-center">{(errorStudentsData as any)?.message || "Error en la búsqueda"} </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ContainerComponents>
  );
};
