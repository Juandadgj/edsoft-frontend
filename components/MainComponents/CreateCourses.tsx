import { useMemo } from "react";
import {
  useGroupsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useTeachersQuery,
  useScholearYearSelectedQuery,
} from "../../generated/graphql";
import { useState } from "react";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import useSchoolYear from "@/hooks/useSchoolYear";
import TableComponent from "../Table";
import CustomModal from "../CustomModal";
import { CourseForm } from "./forms/CourseForm";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Jornada",
    dataIndex: "jornada",
    key: "jornada",
  },
  {
    title: "Profesor del Grupo",
    dataIndex: "group_teacher",
    key: "group_teacher",
  },
  {
    title: "Editar",
    dataIndex: "editar",
    key: "editar",
  },
  {
    title: "Borrar",
    dataIndex: "borrar",
    key: "borrar",
  },
];

function CreateCourses() {
  const { data: year } = useScholearYearSelectedQuery({
    fetchPolicy: "network-only",
  });
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);
  const { data: teachers } = useTeachersQuery();
  const [deleteGroup] = useDeleteGroupMutation();
  const [idGroup, setIdGroup] = useState<any>(0);
  const [course, setCourse] = useState<any>(0);
  const [group, setGroup] = useState<any>("");
  const [workingTime, setWorkingTime] = useState<any>("");
  const [teacher, setTeacher] = useState<any>("");

  const { data, loading, refetch } = useGroupsQuery({
    variables: {
      filterGroupInput: { id_year: year?.scholearYearSelected?.id_year },
    },
  });

  const courses = [
    { value: -3, text: "Parvulo" },
    { value: -2, text: "Prejardin" },
    { value: -1, text: "Jardin" },
    { value: 0, text: "Transición" },
    { value: 1, text: "Primero" },
    { value: 2, text: "Segundo" },
    { value: 3, text: "Tercero" },
    { value: 4, text: "Cuarto" },
    { value: 5, text: "Quinto" },
    { value: 6, text: "Sexto" },
    { value: 7, text: "Septimo" },
    { value: 8, text: "Octavo" },
    { value: 9, text: "Noveno" },
    { value: 10, text: "Decimo" },
    { value: 11, text: "Undecimo" },
    { value: 12, text: "PreUniversitario" },
    { value: 13, text: "Ciclo I" },
    { value: 14, text: "Ciclo II" },
    { value: 15, text: "Ciclo III" },
    { value: 16, text: "Ciclo IV" },
    { value: 20, text: "Ciclo VI (Sem. 2)" },
    { value: 17, text: "Ciclo V (Sem. 1)" },
    { value: 18, text: "Ciclo VI (Sem. 1)" },
    { value: 19, text: "Ciclo V (Sem. 2)" },
  ];
  const groups = [
    { value: "A", text: "A" },
    { value: "B", text: "B" },
    { value: "C", text: "C" },
    { value: "D", text: "D" },
    { value: "E", text: "E" },
    { value: "F", text: "F" },
    { value: "G", text: "G" },
    { value: "H", text: "H" },
    { value: "I", text: "I" },
    { value: "J", text: "J" },
    { value: "K", text: "K" },
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" },
    { value: "5", text: "5" },
    { value: "6", text: "6" },
    { value: "7", text: "7" },
    { value: "8", text: "8" },
    { value: "9", text: "9" },
    { value: "10", text: "10" },
  ];
  const working_time = [
    { value: "M", text: "Mañana" },
    { value: "T", text: "Tarde" },
    { value: "N", text: "Noche" },
    { value: "S", text: "Sabatina" },
  ];

  const handlerDeleteCourse = async (id_group: number | undefined) => {
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
      if (result.isConfirmed && id_group) {
        deleteGroup({
          variables: { idGroup: id_group },
        }).then((res) => {
          if (res.data?.deleteGroup) {
            Swal.fire({
              title: "Eliminado",
              text: "Curso Eliminado!",
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
    });
  };

  const processedCourses = useMemo(() => {
    if (!data?.groups) return [];
    return data.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}`,
      jornada: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setCourse({
              name: group?.level,
              level: group?.level,
              id_group: group?.id_group,
              teacher: group?.representative,
              subject: group?.sublevel,
              period: group?.working_time,
              working_time: group?.working_time,
            });
            setOpen(true);
          }}
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
      borrar: (
        <button
          className="border-0"
          onClick={() => handlerDeleteCourse(group?.id_group)}
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
  }, [data]);
  const hanclerCloseModal = () => {
    setOpen(false);
    setCourse({
      name: "",
      level: "",
      id_group: "",
      teacher: "",
      subject: "",
      period: "",
      working_time: "",
    });
  };
  console.log(year);
  return (
    <div className=" w-full overflow-hidden h-full">
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[10px] h-full py-4 px-2">
        <div className="w-full flex items-center justify-between my-3">
          <strong className="text-xl text-black ps-8 pb-4">
            Cursos Creados para el año {year?.scholearYearSelected?.id_year}
          </strong>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
              onClick={() => {
                setCourse({
                  name: "",
                  level: "",
                  id_group: "",
                  id_year: "",
                  teacher: "",
                  subject: "",
                  period: "",
                  working_time: "",
                });
                setOpen(true);
              }}
            >
              <h4 className="text-white text-xs">+ Nuevo Curso</h4>
            </button>
          </div>
        </div>
        <div className="text-black h-full">
          <div className="h-full">
            {loading && (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-main-blue"></span>
              </div>
            )}
            {data?.groups && (
              <TableComponent column={columns} data={processedCourses} />
            )}
          </div>
        </div>
      </div>
      <CustomModal open={open}>
        <CourseForm
          course={course}
          onClose={hanclerCloseModal}
          courses={courses}
          groups={groups}
          working_time={working_time}
          year={year}
          teachers={teachers?.teachers}
        />
      </CustomModal>
    </div>
  );
}

export default CreateCourses;
