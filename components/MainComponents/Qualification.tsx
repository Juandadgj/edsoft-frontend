import { useMemo } from "react";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useCreateCourseMutation,
  useAchievementsLazyQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "../Table";
import { useRouter } from "next/router";
import DynamicModal from "../DynamicModal";
import Image from "next/image";
import edit from "../../public/assets/01editar.png";

const Qualification = () => {
  const today = new Date();
  const router = useRouter();
  const { g, a, per } = router.query;
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);
  const [
    getAchievements,
    { data: achievements, loading: loadingAchievements, error },
  ] = useAchievementsLazyQuery();
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses, refetch },
  ] = useCoursesLazyQuery();

  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2017 } },
  });
  const handlerSelectedCourse = (id: number | undefined) => {
    router.push(`/dashboard/proceso-anual?componente=calificacion&g=${id}`);
  };

  const [formValues, setFormValues] = useState<any>({
    name: "",
    id_area: 0,
    id_teacher: 0,
    id_group: g,
    average: "",
    percentage: 0,
    hour: 0,
  });

  const columsCourses = [
    {
      Header: "Asignatura",
      accessor: "name",
    },
    {
      Header: "Profesor",
      accessor: "teacher",
    },
    {
      Header: "1 Per.",
      accessor: "perido",
    },
    {
      Header: "2 Per.",
      accessor: "perido",
    },
    {
      Header: "3 Per.",
      accessor: "perido",
    },
    {
      Header: "4 Per.",
      accessor: "perido",
    },
  ];

  const columnsGroup = [
    {
      Header: "Curso",
      accessor: "name",
    },
    {
      Header: "Jornada",
      accessor: "group_teacher",
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



  const student: any[] = [
    {
      name: "Michel Michel Michel",
    },
    {
      name: "Jose Daniel Jose Daniel",
    },
  ];

  const columnsQualification = [
    {
      Header: "Estudiante",
      accessor: "name",
    },
  ].concat(
    selectedAchievements.map((logro: any, i: number) => {
      return { Header: i.toString(), accessor: "achivement" };
    })
  );

  const processedStudent = () => {
    return student.map((s: any, index: number) => ({
      name: s?.name ?? "",
      logros: selectedAchievements,
    }));
  };

  const data = processedStudent();

  const processedSubjects = (data: any) => {
    return data.map((courses: any, index: number) => ({
      name: courses?.name ?? "",
      area: courses.id_area ?? "",
      teacher: courses?.id_teacher ?? "-",
      hour: courses?.hour ?? "",
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            // We set the values selected to our inputs
            setFormValues((t: any) => ({
              ...t,
              name: courses.id,
              id_area: courses.id_area,
              id_teacher: courses?.id_teacher,
              id_group: courses?.id_group,
              average: courses.average,
              percentage: courses.percentage,
              hour: courses.hour,
            }));
            setOpen(true);
          }}
        >
          <Image className={``} src={edit} alt="" width={50} height={50} />
        </button>
      ),
      borrar: "",
    }));
  };
  const processedCourses = (data: any) => {
    if (!data) return [];
    return data.map((courses: any, index: any) => ({
      id_course: courses?.id_course,
      id_group: courses?.id_group,
      name: `${courses?.name}` ?? "",
      teacher: `${courses?.teacher.name}` ?? "-",
      route: "proceso-anual?componente=calificacion",
    }));
  };

  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}` ?? "",
      jornada: group?.working_time,
      group_teacher: group?.representative ?? "",
      asignaturas: (
        <button
          className="btn bg-transparent border-none p-0 hover:bg-transparent"
          onClick={() => handlerSelectedCourse(group?.id_group)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 32 32"
          >
            <path
              fill="#0055a6"
              d="M24.875 1.375H8a1.995 1.995 0 0 0-1.98 1.792h1.605c1.102 0 2 .898 2 2c0 1.102-.898 2-2 2H6v1h1.625c1.104 0 2.002.897 2.002 2a2.004 2.004 0 0 1-2.002 2.002H6v.996h1.625c1.102 0 2 .898 2 2a2.005 2.005 0 0 1-2 2.004H6v.994h1.625c1.102 0 2 .898 2 2.002s-.898 2.002-2 2.002H6v.997h1.624c1.104 0 2.002.897 2.002 2a2.004 2.004 0 0 1-2.002 2.003h-1.62A1.998 1.998 0 0 0 8 29.124h16.875a2 2 0 0 0 2-2V3.375a2 2 0 0 0-2-2zm.375 7a1 1 0 0 1-1 1H14a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10.25a1 1 0 0 1 1 1v4.375zM8.625 25.165c0-.553-.45-1-1-1h-3.25a1 1 0 1 0 0 2h3.25c.55 0 1-.447 1-1zm-4.25-19h3.25a1 1 0 1 0 0-1.998h-3.25a1.001 1.001 0 0 0 0 2zm0 5.002h3.25a1 1 0 1 0 0-2h-3.25a1 1 0 1 0 0 2zm0 5h3.25a1 1 0 0 0 0-2h-3.25c-.553 0-1 .446-1 1s.447 1 1 1zm-1 3.998a1 1 0 0 0 1 1.002h3.25a1 1 0 0 0 0-2.002h-3.25a1 1 0 0 0-1 1z"
            />
          </svg>
        </button>
      ),
    }));
  }, [groups]);

  useEffect(() => {
    if (a && per) {
      getAchievements({
        variables: {
          filterAchievementInput: { id_course: Number(a), period: Number(per) },
        },
      }).then((res) => {
        const { data } = res;
        console.log("chi", data);
        setSelectedAchievements(data?.achievements);
      });
    }
  }, [router]);

  useEffect(() => {
    if (g) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(g) } },
      }).then((res) => {
        const { data } = res;
        setSelectedCourses(processedCourses(data?.courses));
      });
    }
  }, [router]);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <div className="flex justify-between">
        <Grid item xs={12}>
          <strong className="text-black text-xl ps-8">
            Cursos creados para el a�o 2023 Para la calificacion de logros e
            indicadores de logros por asignatura
          </strong>
        </Grid>
      </div>
      <Grid
        container
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        {!g && (
          <Grid item xs={12} className="h-full">
            {loadingGroups ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : groups?.groups ? (
              <div className="d-flex border-white py-4 h-full">
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
        )}
        {g && !a && !per && (
          <Grid item xs={12} className="text-black h-full">
            {loadingCourses ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : courses?.courses ? (
              <div className=" border-white py-4 h-full">
                <Table
                  column={columsCourses}
                  data={selectedCourses}
                  type={"courses"}
                />
              </div>
            ) : (
              errorCourses && <h3>Ocurrio un error: {errorCourses?.message}</h3>
            )}
          </Grid>
        )}
        {a && per && (
          <Grid item xs={12} className="h-full w-full">
            {loadingGroups ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : groups?.groups ? (
              <div className=" border-white h-full w-full ">
                <div
                  className={`w-full h-[80%] px-3 overflow-x-auto animate-fade-left `}
                >
                  <table className="table text-black ">
                    <thead className="w-full">
                      <tr className="border-blue3 border-b-4 text-xl font-semibold">
                        {columnsQualification.map((header: any, index: any) => (
                          <td
                            key={index}
                            className="items-center justify-center text-center text-blue3"
                          >
                            {header.Header}
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="w-full py-4 ">
                      {data.map((item: any, key: any) => (
                        <tr className="border-none p-3 bg-gray1">
                          <td className="text-center">{item.name}</td>
                          {item.logros &&
                            item.logros.map((logros: any, index: number) => (
                              <td className="text-center">{index}</td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-full flex justify-center items-center h-[20%]">
                  <button className="btn rounded-5 text-white bg-[#0b5ed7] hover:bg-[#0b5ed7]">
                    Guardar notas
                  </button>
                </div>
              </div>
            ) : (
              <h3>¡Ocurrio un error!</h3>
            )}
          </Grid>
        )}
      </Grid>

      {/* Modal */}
    </div>
  );
};

export default Qualification;
