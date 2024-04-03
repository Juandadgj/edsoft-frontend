import { useMemo } from "react";
import {
  useGroupsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useTeachersQuery,
} from "../../generated/graphql";
import { useState } from "react";

import Table from "../Table";
import DynamicModal from "../DynamicModal";

import Swal from "sweetalert2";

const columns = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Jornada",
    accessor: "jornada",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  {
    Header: "Editar",
    accessor: "editar",
  },
  {
    Header: "Borrar",
    accessor: "borrar",
  },
];

function CreateCourses() {
  const year = sessionStorage.getItem("year");
  const yearParse = parseInt(year ? year : "", 10);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);
  const { data: teachers } = useTeachersQuery();
  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [idGroup, setIdGroup] = useState<any>(0);
  const [course, setCourse] = useState<any>(0);
  const [group, setGroup] = useState<any>("");
  const [workingTime, setWorkingTime] = useState<any>("");
  const [teacher, setTeacher] = useState<any>("");

  const [errors, setErrors] = useState<any>({
    course: "",
    group: "",
    working_time: "",
    teacher: "",
  });

  const { data, loading, refetch } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: yearParse } },
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
  const arrayInputs: Array<any> = [
    {
      html: (
        <div className="form-control text-black">
          <div className="label text-gray5 p-1">
            <label className="text-xs">Curso</label>
          </div>
          <div className="w-full">
            <select
              name="course"
              value={course ? course : "Selecciona un curso"}
              onChange={({ target }: any) => {
                setCourse(target.value);
              }}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            >
              <option disabled selected>
                Selecciona un curso
              </option>
              {courses.map((course: any, index) => (
                <option key={index} value={course.value}>
                  {course.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text-alt text-[red]">{errors.course}</label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <div className="label text-gray5 p-1">
            <label className="text-xs">Grupo</label>
          </div>
          <div className="w-full">
            <select
              name="group"
              value={group ? group : "Selecciona un grupo"}
              onChange={({ target }: any) => {
                setGroup(target.value);
              }}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            >
              <option disabled selected>
                Selecciona un grupo
              </option>
              {groups.map((group: any, index) => (
                <option key={index} value={group.value}>
                  {group.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text-alt text-[red]">{errors.group}</label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <div className="label text-gray5 p-1">
            <label className="text-xs">Jornada</label>
          </div>
          <div className="w-full">
            <select
              id="working"
              name="working"
              value={workingTime ? workingTime : "Selecciona una jornada"}
              onChange={({ target }: any) => {
                setWorkingTime(target.value);
              }}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            >
              <option disabled selected>
                Selecciona una jornada
              </option>
              {working_time.map((time: any, index) => (
                <option key={index} value={time.value}>
                  {time.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.working_time}
            </label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <div className="label text-gray5 p-1">
            <label className="text-xs">Profesor de grupo</label>
          </div>
          <div className="w-full">
            <select
              name="teacher"
              value={teacher ? teacher : "Selecciona un profesor"}
              onChange={({ target }: any) => {
                setTeacher(target.value);
              }}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            >
              <option disabled selected>
                Selecciona un profesor
              </option>
              {teachers?.teachers.map((teacher: any) => (
                <option key={teacher?.id_teacher} value={teacher?.id_teacher}>
                  {teacher?.name} {teacher?.last_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.teacher}
            </label>
          </div>
        </div>
      ),
    },
  ];

  const validationEvent = () => {
    if (course && group && workingTime && teacher) {
      return true;
    } else {
      !course
        ? setErrors((err: any) => ({ ...err, course: "Curso Requerido!" }))
        : setErrors((err: any) => ({ ...err, course: "" }));
      !group
        ? setErrors((err: any) => ({
            ...err,
            group: "Grupo Requerido!",
          }))
        : setErrors((err: any) => ({ ...err, group: "" }));
      !workingTime
        ? setErrors((err: any) => ({
            ...err,
            working_time: "Jornada Requerido!",
          }))
        : setErrors((err: any) => ({ ...err, working_time: "" }));
      !teacher
        ? setErrors((err: any) => ({ ...err, teacher: "Profesor Requerido!" }))
        : setErrors((err: any) => ({ ...err, teacher: "" }));
      return false;
    }
  };
  // We are using formvalues for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    setIdGroup(0);
    setCourse(null);
    setGroup("");
    setWorkingTime("");
    setTeacher("");
    setWorkingTime("");
  };

  const handlerCreateGroup = async () => {
    return await createGroup({
      variables: {
        createGroupInput: {
          id_year: yearParse,
          level: course,
          sublevel: group,
          representative: teacher.toString(),
          working_time: workingTime,
        },
      },
    });
  };

  const handlerUpdateGroup = async (form: any) => {
    return await updateGroup({
      variables: {
        updateGroupInput: {
          id_group: idGroup,
          representative: teacher.toString(),
          working_time: workingTime,
        },
      },
    });
  };

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
      name: `${group?.level}-${group?.sublevel}` ?? "",
      jornada: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            setIdGroup(group?.id_group);
            setCourse(group?.level);
            setGroup(group?.sublevel);
            setTeacher(group?.representative);
            setWorkingTime(group?.working_time);
            modal?.showModal();
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

  const modal = document.getElementById("modal") as HTMLDialogElement;

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-10 pb-3">
      <div className="flex justify-between h-[6%]">
        <div>
          <strong className="text-xl text-black ps-8 pb-4">
            Cursos Creados para el año {year}
          </strong>
        </div>
        <div className="text-end pr-6">
          <button
            type="button"
            className="btn bg-main-blue btn-primary w-[16rem] mb-0 pb-0 !h-full btn-sm rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setTypeAdd(true);
              modal?.showModal();
            }}
          >
            <h4 className="text-white text-xs">+ Nuevo Curso</h4>
          </button>
        </div>
      </div>
      <div
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]"
      >
        <div className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : data?.groups ? (
            <div className="d-flex border-white py-4 h-full">
              <Table column={columns} data={processedCourses} type={"groups"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      </div>
      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Grupo Creado!"}
        updateSuccessMsg={"Grupo Actualizado!"}
        addMutation={handlerCreateGroup}
        updateMutation={handlerUpdateGroup}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default CreateCourses;
