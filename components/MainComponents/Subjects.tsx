import { useMemo } from "react";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useCreateCourseMutation,
  useTeachersQuery,
  useGetAreasQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "../Table";
import { useRouter } from "next/router";
import DynamicModal from "../DynamicModal";
import Image from "next/image";
import edit from "../../public/assets/01editar.png";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";

const columnsGroup = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  {
    Header: "Asignaturas",
    accessor: "courses",
  },
];

const columnsSubjects = [
  {
    Header: "Asignatura",
    accessor: "name",
  },
  {
    Header: "Area",
    accessor: "area",
  },
  {
    Header: "Profesor",
    accessor: "professor",
  },
  {
    Header: "IHC",
    accesor: "ihc",
  },
  {
    Header: "Valor %",
    accesor: "percentage",
  },
  {
    Header: "Promediar",
    accesor: "ihc",
  },
  {
    Header: "Editar",
    accessor: "edit",
  },
  {
    Header: "Borrar",
    accessor: "delete",
  },
];

function Subjects() {
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();
  const { c } = router.query;
  const [selectedGroup, setSelectedGroup] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses, refetch },
  ] = useCoursesLazyQuery({ fetchPolicy: "network-only" });
  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2017 } },
  });
  const { data: teachers } = useTeachersQuery();
  const { data: areas } = useGetAreasQuery();
  const [AddCourse] = useCreateCourseMutation();
  const [UpdateCourse] = useUpdateCourseMutation();
  const [DeleteCourse] = useDeleteCourseMutation({});

  const handlerSelectedCourse = (id: number | undefined) => {
    router.push(`/dashboard/programacion-anual?componente=asignatura&c=${id}`);
  };

  const [formValues, setFormValues] = useState<any>({
    name: "",
    id_area: 0,
    area: "",
    id_tehacer: 0,
    teacher: "",
    hour: 0,
    percentage: 0,
    average: "",
    id_group: c,
  });
  const [course, setCourse] = useState<number>(0);
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState(0);
  const [area, setArea] = useState(0);
  const [hour, setHour] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [average, setAverage] = useState("");

  const [errors, setErrors] = useState<any>({
    name: "",
    id_area: "",
    id_teacher: "",
    teacher: "",
    average: "",
    percentage: "",
    hour: "",
  });

  const options = [];
  for (let i = 1; i <= 24; i++) {
    options.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  const optionsPercentage = [];
  for (let i = 1; i <= 100; i++) {
    optionsPercentage.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  const handlerSelect = (event: any) => {
    setFormValues({ ...formValues, id_area: event.target.value });
  };
  const arrayInputs: any[] = [
    {
      html: (
        <div className="text-black">
          <input
            type="text"
            value={name}
            id=""
            name="name"
            placeholder="Nombre de la asignatura"
            className="input border-gray5 w-full h-12 bg-transparent text-sm"
            onChange={({ target }: any) => setName(target.value)}
          />
          <div>
            <label className="label-text-alt text-[red]">{errors.name}</label>
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
              {errors.id_teacher}
            </label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <FormControl fullWidth>
            <InputLabel id="label-area">Area</InputLabel>
            <Select
              labelId="label-area"
              id="area"
              name="id_area"
              value={area}
              label="Area"
              onChange={({ target }: any) => {
                setArea(target.value);
              }}
            >
              {areas?.areas.map((area: any) => (
                <MenuItem key={area?.id_area} value={area?.id_area}>
                  {area?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.id_area}
            </label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="from-control text-black">
          <FormControl fullWidth>
            <InputLabel id="average">Promediar</InputLabel>
            <Select
              labelId="average"
              id="demo-simple-select"
              name="average"
              value={average}
              label="Promediar"
              onChange={({ target }: any) => setAverage(target.value)}
            >
              <MenuItem value={"Si"}> Si</MenuItem>
              <MenuItem value={"No"}> No</MenuItem>
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.average}
            </label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div>
          <FormControl fullWidth>
            <InputLabel id="hour">IHC</InputLabel>
            <Select
              labelId="hour"
              id="demo-simple-select"
              name="hour"
              value={hour}
              label="ihc"
              onChange={({ target }: any) => setHour(target.value)}
            >
              {options}
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">{errors.hour}</label>
          </div>
        </div>
      ),
    },
    ,
    {
      html: (
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Valor %</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="percentage"
              value={percentage}
              label="Valor %"
              onChange={({ target }: any) => setPercentage(target.value)}
            >
              {optionsPercentage}
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.percentage}
            </label>
          </div>
        </div>
      ),
    },
  ];
  const validationEvent = () => {
    if (name && teacher && area && average && percentage && hour) {
      return true;
    } else {
      !name
        ? setErrors((err: any) => ({ ...err, name: "Nombre Requerido!" }))
        : setErrors((err: any) => ({ ...err, name: "" }));
      !teacher
        ? setErrors((err: any) => ({
            ...err,
            id_teacher: "Profesor Requerido!",
          }))
        : setErrors((err: any) => ({ ...err, id_teacher: "" }));
      !area
        ? setErrors((err: any) => ({ ...err, id_area: "Area Requerido!" }))
        : setErrors((err: any) => ({ ...err, id_area: "" }));
      !average
        ? setErrors((err: any) => ({ ...err, average: "Promedio Requerido!" }))
        : setErrors((err: any) => ({ ...err, average: "" }));
      !percentage
        ? setErrors((err: any) => ({
            ...err,
            percentage: "Porcentaje Requerido!",
          }))
        : setErrors((err: any) => ({ ...err, percentage: "" }));
      !hour
        ? setErrors((err: any) => ({ ...err, hour: "Horario Requerido!" }))
        : setErrors((err: any) => ({ ...err, hour: "" }));
      return false;
    }
  };

  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    setCourse(0);
    setName("");
    setTeacher(0);
    setArea(0);
    setAverage("")
    setHour(0)
    setPercentage(0)
  };

  const processedSubjects = (data: any) => {
    return data.map((courses: any, index: number) => ({
      name: courses?.name ?? "",
      area: courses.id_area ?? "",
      teacher: courses?.teacher.name ?? "-",
      hour: courses?.hour ?? "",
      percentage: courses.percentage,
      average: courses.average,
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            // We set the values selected to our inputs
            setFormValues((t: any) => ({
              ...t,
              id_course: courses.id_course,
              name: courses?.name,
              id_area: courses?.id_area,
              id_teacher: courses.id_teacher,
              hour: courses?.hour,
              percentage: courses?.percentage,
              average: courses?.average,
              id_group: courses?.id_group,
            }));
            setCourse(courses.id_course);
            setName(courses.name);
            setTeacher(courses.id_teacher);
            setArea(courses.id_area);
            setAverage(courses.average);
            setHour(courses.hour);
            setPercentage(courses.percentage);
            setOpen(true);
          }}
        >
          <Image className={``} src={edit} alt="" width={50} height={50} />
        </button>
      ),
      borrar: (
        <button onClick={() => handlerDeleteCourse(courses.id_course)}>
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
  };

  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups.groups.map((group, index) => ({
      id: group?.id_group,
      name: `${group?.level}-${group?.sublevel}` ?? "",
      group_teacher: group?.representative ?? "",
      asignaturas: group?.coursesCount,
      click: () => handlerSelectedCourse(group?.id_group),
    }));
  }, [groups]);

  useEffect(() => {
    if (c) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(c) } },
      })
    }
  }, [router]);


  useEffect(() => {
    if (courses) {
      setSelectedGroup(processedSubjects(courses?.courses));
    }
  }, [courses]);

  const handlerCreateCourse = async () => {
    return await AddCourse({
      variables: {
        createCourseInput: {
          name: name,
          id_area: area,
          id_teacher: teacher,
          average: average,
          hour: hour,
          percentage: percentage,
          id_group: Number(c),
        },
      },
    });
  };

  const handlerUpdateCourse = async () => {
    return await UpdateCourse({
      variables: {
        updateCourseInput: {
          name: name,
          id_course: course,
          id_area: area,
          id_teacher: teacher,
          average: average,
          hour: hour,
          percentage: percentage,
          id_group: Number(c),
        },
      },
    })
  };
  const handlerDeleteCourse = async (id_course: number) => {
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
      if (result.isConfirmed && id_course) {
        DeleteCourse({
          variables: { idCourse: id_course },
        }).then((res) => {
          if (res.data?.deleteCourse) {
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
  const handlerRefetchCourse = () => {
    refetch()
  };

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <div className="flex justify-between">
        <Grid item xs={12}>
          <strong className="text-2xl text-black ps-8">
            Asignaturas creadas para el año {year}
          </strong>
        </Grid>
        {c && (
          <Grid item xs={6} className="text-end pr-6">
            <button
              type="button"
              className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-2 rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
              onClick={() => {
                setTypeAdd(true);
                setOpen(true);
              }}
            >
              <h4 className="text-white">+ Nueva asignatura</h4>
            </button>
          </Grid>
        )}
      </div>
      <Grid
        container
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        {!c ? (
          <Grid item xs={12} className="h-full">
            {loadingGroups ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : groups?.groups ? (
              <div className=" border-white py-4 h-full">
                <Table
                  column={columnsGroup}
                  data={processedGroups}
                  type={"groups"}
                />
              </div>
            ) : (
              <h3>¡Ocurrio un error!</h3>
            )}
          </Grid>
        ) : (
          <Grid item xs={12} className="text-black h-full">
            {loadingCourses ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : courses?.courses ? (
              <div className=" border-white py-4 h-full">
                <Table
                  column={columnsSubjects}
                  data={selectedGroup}
                  type={"subject"}
                />
              </div>
            ) : (
              errorCourses && <h3>Ocurrio un error: {errorCourses?.message}</h3>
            )}
          </Grid>
        )}
      </Grid>
      {/* Modal */}
      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Curso creado!"}
        updateSuccessMsg={"Curso actualizado!"}
        formValues={{ course, c }}
        addMutation={handlerCreateCourse}
        updateMutation={handlerUpdateCourse}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={handlerRefetchCourse}
      />
    </div>
  );
}

export default Subjects;
