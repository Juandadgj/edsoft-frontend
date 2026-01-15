import { useMemo } from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import teachers from "@/shared/teachers";
import { Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useCreateTeacherMutation,
  useDeleteTeacherMutation,
  useTeachersQuery,
  useUpdateTeacherMutation,
} from "@/generated/graphql";
import TableComponent from "@/components/Table";
import DynamicModal from "@/components/DynamicModal";
import CustomModal from "@/components/CustomModal";
import { TeacherForm } from "../../forms/TeacherForm";
import { ContainerComponents } from "@/components/ContainerComponents";
import { Input } from "@/components/Input";

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Grado",
    dataIndex: "degree",
    key: "degree",
  },
  {
    title: "Acciones",
    key: "actions",
    render: (text: any, record: any) => (
      <Space size="middle">
        {record.update}
        {record.delete}
      </Space>
    ),
  },
];
function Teachers() {
  const [DeleteDocente] = useDeleteTeacherMutation();
  const [open, setOpen] = useState(false);
  const [teacher, setTeacher] = useState<any>({
    id_teacher: 0,
    name: "",
    last_name: "",
    type_id: 1,
    identification: "",
    direction: "",
    phone: "",
    email: "",
    degree: "",
  });
  const { data, loading, refetch, error } = useTeachersQuery({
    fetchPolicy: "network-only",
  });
  const processedTeachers = useMemo(() => {
    if (!data) return [];
    return data.teachers.map((teacher, index) => ({
      name: `${teacher?.name} ${teacher?.last_name}`,
      degree: teacher?.degree,
      update: (
        <button
          className="border-0"
          onClick={() => handlerUpdateTeacher(teacher)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 36 36"
          >
            <path
              fill="#0055A6"
              d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z"
              className="clr-i-outline clr-i-outline-path-1"
            />
            <path
              fill="#0055A6"
              d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.69 1.69 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z"
              className="clr-i-outline clr-i-outline-path-2"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </button>
      ),
      delete: (
        <button
          className="border-0"
          onClick={() =>
            Swal.fire({
              title: "¿Estás seguro?",
              text: "No podrás revertir esta acción!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#0055a6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Eliminar",
            }).then((result) => {
              // If there is an id selected we delete that teacher
              if (result.isConfirmed && teacher?.id_teacher) {
                DeleteDocente({
                  variables: { idDocente: teacher.id_teacher },
                }).then((res) => {
                  if (res.data?.deleteTeacher) {
                    Swal.fire({
                      title: "Eliminado",
                      text: "Docente Eliminado!",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    refetch();
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Ha habido un error...",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
              }
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <path
              fill="#e11d48"
              d="M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12ZM94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Zm48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Z"
            />
          </svg>
        </button>
      ),
    }));
  }, [data, DeleteDocente]);
  const handlerCreateTeacher = async () => {
    setOpen(true);
    setTeacher({
      name: "",
      last_name: "",
      type_id: 1,
      identification: "",
      direction: "",
      phone: "",
      email: "",
      degree: "",
    });
  };
  const handlerUpdateTeacher = (teacher: any) => {
    setOpen(true);
    setTeacher({
      id_teacher: teacher.id_teacher,
      name: teacher.name,
      last_name: teacher.last_name,
      type_id: teacher.type_id,
      identification: teacher.identification,
      direction: teacher.direction,
      phone: teacher.phone,
      email: teacher.email,
      degree: teacher.degree,
    });
  };
  const hanclerCloseModal = () => {
    setOpen(false);
    setTeacher({
      id_teacher: 0,
      name: "",
      last_name: "",
      type_id: 1,
      identification: "",
      direction: "",
      phone: "",
      email: "",
      degree: "",
    });
  };
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">Lista de Docentes</strong>
        </h3>
        <div className="flex items-center gap-2">
          <Input type="text" className="grow" placeholder="Buscar" />
          <button
            onClick={handlerCreateTeacher}
            className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
          >
            Crear docente
          </button>
        </div>
      </div>
      <div className="text-black">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        )}
        {data?.teachers && (
          <TableComponent column={columns} data={processedTeachers} />
        )}
        {error && <h3>¡Ocurrio un error!</h3>}
      </div>
      <CustomModal
        open={open}
        title={teacher.id_teacher ? "Editar Docente" : "Crear Docente"}
      >
        <TeacherForm
          teacher={teacher}
          onClose={hanclerCloseModal}
          setTeacher={setTeacher}
          setOpen={setOpen}
        />
      </CustomModal>
    </ContainerComponents>
  );
}

export default Teachers;
