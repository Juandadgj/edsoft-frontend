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
import Table from "../Table";
import { useRouter } from "next/router";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import { Input } from "../Input";
import { useScholarYearContext } from "@/context/YearContext";
import useSchoolYear from "@/hooks/useSchoolYear";

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
  const { year } = useSchoolYear();
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
    variables: { filterGroupInput: { id_year: year } },
  });
  const { data: teachers } = useTeachersQuery();
  const { data: areas } = useGetAreasQuery();
  const [AddCourse] = useCreateCourseMutation();
  const [UpdateCourse] = useUpdateCourseMutation();
  const [DeleteCourse] = useDeleteCourseMutation({});

  const handlerSelectedCourse = (id: number | undefined) => {
    router.push(`/dashboard/programacion-anual?componente=asignaturas&c=${id}`);
  };

  const [course, setCourse] = useState<number>(0);
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState<number>(0);
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
  const modal = document.getElementById("modal") as HTMLDialogElement;

  const options = [];
  for (let i = 1; i <= 24; i++) {
    options.push(
      <option key={i} value={i} className="text-xs">
        {i}
      </option>
    );
  }
  const optionsPercentage = [];
  for (let i = 1; i <= 100; i++) {
    optionsPercentage.push(
      <option key={i} value={i} className="text-xs">
        {i}
      </option>
    );
  }

  const arrayInputs: any[] = [
    {
      html: (
        <Input
          type="text"
          value={name}
          name="name"
          label="Nombre de la asignatura"
          onChange={({ target }: any) => setName(target.value)}
        />
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <div className="label text-gray5 p-1">
            <label className="text-xs">Profesor de la asignatura</label>
          </div>
          <div className="w-full">
            <select
              id="teacher"
              name="teacher"
              value={teacher ? teacher : "Selecciona un profesor"}
              onChange={({ target }: any) => {
                setTeacher(target.value);
              }}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
              required
            >
              <option disabled>Selecciona un profesor</option>
              {teachers?.teachers.map((teacher: any) => (
                <option
                  key={teacher?.id_teacher}
                  value={teacher?.id_teacher}
                  className="text-xs"
                >
                  {teacher?.name} {teacher?.last_name}
                </option>
              ))}
            </select>
          </div>
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
          <div className="label text-gray5 p-1">
            <label className="text-xs">
              Area donde pertenece la asignatura
            </label>
          </div>
          <div className="w-full">
            <select
              id="area"
              name="id_area"
              value={area ? area : "Selecciona un area"}
              onChange={({ target }: any) => {
                setArea(target.value);
              }}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            >
              <option disabled>Selecciona un area</option>
              {areas?.areas.map((area: any) => (
                <option
                  key={area?.id_area}
                  value={area?.id_area}
                  className="text-xs"
                >
                  {area.name}
                </option>
              ))}
            </select>
          </div>
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
          <div className="label text-gray5 p-1">
            <label className="text-xs">
              Promediar con todas las asignatura
            </label>
          </div>
          <div className="w-full">
            <select
              id="area"
              name="id_area"
              value={average ? average : "Promediar"}
              onChange={({ target }: any) => {
                setAverage(target.value);
              }}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            >
              <option selected disabled>
                Promediar
              </option>
              <option value={"Si"}> Si</option>
              <option value={"No"}> No</option>
            </select>
          </div>
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
        <div className="form-control text-black">
          <div className="label text-gray5 p-1">
            <label className="text-xs">Intensidad horaria (Semanal)</label>
          </div>
          <div className="w-full">
            <select
              value={hour ? hour : "Intensidad Horaria"}
              onChange={({ target }: any) => {
                setHour(target.value);
              }}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            >
              <option selected disabled>
                Intensidad Horaria
              </option>
              {options}
            </select>
          </div>
          <div>
            <label className="label-text-alt text-[red]">{errors.hour}</label>
          </div>
        </div>
      ),
    },
    ,
    {
      html: (
        <div className="form-control text-black">
          <div className="label text-gray5 p-1">
            <label className="text-xs">Valor porcentual</label>
          </div>
          <div className="w-full">
            <select
              name="percentage"
              value={percentage ? percentage : "Selecciona porcentaje"}
              onChange={({ target }: any) => setPercentage(target.value)}
              className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            >
              <option selected disabled>
                Selecciona porcentaje
              </option>
              {optionsPercentage}
            </select>
          </div>
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
    setAverage("");
    setHour(0);
    setPercentage(0);
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
            cleaningStates();
            setCourse(courses.id_course);
            setName(courses.name);
            setTeacher(courses.id_teacher);
            setArea(courses.id_area);
            setAverage(courses.average);
            setHour(courses.hour);
            setPercentage(courses.percentage);
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
          </svg>{" "}
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
    const { c, ...rest } = router.query; // Elimina 'opcion' de la URL
    if (c) {
      router.replace({
        pathname: router.pathname,
        query: rest,
      });
    }
  }, []);

  useEffect(() => {
    if (c) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(c) } },
      });
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
    });
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
    refetch();
  };
  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-10 pb-3">
      <div className=" h-[6%] flex justify-between">
        <div>
          <strong className="text-xl text-black ps-8">
            Asignaturas creadas para el año {year}
          </strong>
        </div>
        {c && (
          <div className="text-end pr-6">
            <button
              type="button"
              className="btn bg-main-blue btn-primary w-[16rem] mb-0 pb-0 !h-full btn-sm rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
              onClick={() => {
                setTypeAdd(true);
                modal?.showModal();
              }}
            >
              <h4 className="text-white text-xs">+ Nueva asignatura</h4>
            </button>
          </div>
        )}
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        {!c ? (
          <div className="h-full">
            {loadingGroups ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-main-blue"></span>
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
          </div>
        ) : (
          <div className="text-black h-full">
            {loadingCourses ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-main-blue"></span>
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
          </div>
        )}
      </div>
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
