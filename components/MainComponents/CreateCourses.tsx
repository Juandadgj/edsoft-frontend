import { useMemo } from "react";
import {
  useGroupsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useTeachersQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import edit from "../../public/assets/01editar.png";
import delet from "../../public/assets/01eliminar.png";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Table from "../Table";
import DynamicModal from "../DynamicModal";
import { styled } from "@material-ui/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
  const today = new Date();
  const year = today.getFullYear();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);
  const { data: teachers } = useTeachersQuery();
  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [idGroup, setIdGroup] = useState<any>(0);
  const [course, setCourse] = useState<any>(0);
  const [group, setGroup] = useState<any>("");
  const [workingTime, setWorkingTime] = useState<string | null | undefined>("");
  const [teacher, setTeacher] = useState<any>("");
  const [formValues, setFormValues] = useState<any>({
    name: "",
    last_name: "",
    type_id: 1,
    identification: "",
    direction: "",
    phone: "",
    email: "",
    degree: "",
  });

  const [errors, setErrors] = useState<any>({
    course: "",
    group: "",
    working_time: "",
    teacher: "",
  });

  const { data, loading, refetch } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });

  const CssTextField = styled(TextField)({
    fontFamily: ["Scada", "sans-serif"].join(","),
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "blue",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
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
  const arrayInputs: Array<any> = [
    {
      html: (
        <div className="form-control text-black">
          <FormControl fullWidth>
            <InputLabel id="label-course">Curso</InputLabel>
            <Select
              labelId="label-course"
              id="course"
              name="course"
              value={course}
              label="Course"
              onChange={({ target }: any) => {
                setCourse(target.value);
              }}
            >
              {courses.map((course: any, index) => (
                <MenuItem key={index} value={course.value}>
                  {course.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">{errors.course}</label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <FormControl fullWidth>
            <InputLabel id="label-group">Grupo</InputLabel>
            <Select
              labelId="label-group"
              id="group"
              name="group"
              value={group}
              label="Grupo"
              onChange={({ target }: any) => {
                setGroup(target.value);
              }}
            >
              {groups.map((group: any, index) => (
                <MenuItem key={index} value={group.value}>
                  {group.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">{errors.group}</label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <FormControl fullWidth>
            <InputLabel id="label-working">Jornada</InputLabel>
            <Select
              labelId="label-working"
              id="working"
              name="working"
              value={workingTime}
              label="Jornada"
              onChange={({ target }: any) => {
                setWorkingTime(target.value);
              }}
            >
              {working_time.map((time: any, index) => (
                <MenuItem key={index} value={time.value}>
                  {time.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth>
            <InputLabel id="label-teacher">Profesor</InputLabel>
            <Select
              labelId="label-teacher"
              id="teacher"
              name="teacher"
              value={teacher}
              label="Profesor"
              onChange={({ target }: any) => {
                setTeacher(target.value);
              }}
            >
              {teachers?.teachers.map((teacher: any) => (
                <MenuItem key={teacher?.id_teacher} value={teacher?.id_teacher}>
                  {teacher?.name} {teacher?.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          id_year: year,
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
            setOpen(true);
          }}
        >
          <Image
            className={`h-13 w-15`}
            src={edit}
            alt=""
            width={50}
            height={50}
          />
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

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container>
        <Grid item xs={6}>
          <strong className="text-2xl text-black ps-8 pb-4">
            Cursos Creados para el año {year}
          </strong>
        </Grid>
        <Grid item xs={6} className="text-end pr-6">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-2 rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setTypeAdd(true);
              setOpen(true);
            }}
          >
            <h4 className="text-white">+ Nuevo Curso</h4>
          </button>
        </Grid>
      </Grid>
      <Grid
        container
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        <Grid item xs={12} className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.groups ? (
            <div className="d-flex border-white py-4 h-full">
              <Table column={columns} data={processedCourses} type={"groups"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </Grid>
      </Grid>
      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Grupo Creado!"}
        updateSuccessMsg={"Grupo Actualizado!"}
        formValues={formValues}
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
