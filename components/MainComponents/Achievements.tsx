import { useMemo } from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useAchievementsLazyQuery,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import Table from "../Table";
import edit from "../../public/assets/01editar.png";
import delet from "../../public/assets/01eliminar.png";
import { FilterAchievementInput, Achievement } from "../../generated/graphql";

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
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  { Header: "Asignaturas", accessor: "subjects" },
];

function Achievements() {
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();
  const { g, a, per } = router.query;
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<any>([]);
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
    router.push(`/dashboard/programacion-anual?componente=logros&g=${id}`);
  };
  const processedAchievements = (data: any) => {
    if (!data?.achievements) return [];
    return data.achievements.map((achievements: any, index: any) => ({
      id_achievement: achievements?.id_achievement ?? "",
      description: achievements?.description ?? "",
      editar: (
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0055A6"
              d="M14 22v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5H14Zm7.5-6.575l-.925-.925l.925.925Zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025v.95ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v3h-2V9h-5V4H6v16h6v2H6Zm7-10Zm6.025 4.975l-.475-.45l.925.925l-.45-.475Z"
            />
          </svg>
        </div>
      ),
      indicator: (
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="text-center"
          >
            <path
              fill="#0055A6"
              d="M14 22v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5H14Zm7.5-6.575l-.925-.925l.925.925Zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025v.95ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v3h-2V9h-5V4H6v16h6v2H6Zm7-10Zm6.025 4.975l-.475-.45l.925.925l-.45-.475Z"
            />
          </svg>
        </div>
      ),
      borrar: (
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <path
              fill="#e11d48"
              d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24ZM100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Zm48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Z"
            />
          </svg>
        </div>
      ),
    }));
  };

  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups?.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}` ?? "",
      group_teacher: group?.representative ?? "",
      asignaturas: 4,
      click: () => handlerSelectedCourse(group?.id_group),
    }));
  }, [groups]);

  const processedCourses = (data: any) => {
    if (!data) return [];
    return data.map((courses: any, index: any) => ({
      id_course: courses?.id_course,
      id_group: courses?.id_group,
      name: `${courses?.name}` ?? "",
      teacher: `${courses?.id_teacher}` ?? "-",
      periodo1: "-",
      periodo2: "-",
      periodo3: "-",
      periodo4: "-",
    }));
  };

  useEffect(() => {
    if (a && per) {
      getAchievements({
        variables: {
          filterAchievementInput: { id_course: Number(a), period: Number(per) },
        },
      }).then((res) => {
        const { data } = res;
        setSelectedAchievements(processedAchievements(data));
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
      <Grid container className="pb-4">
        <Grid item xs={6}>
          <strong className="text-2xl text-black ps-8 pb-4">
            Logros por curso para el año {year}
          </strong>
        </Grid>
      </Grid>
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
          <Grid item xs={12} className="text-black h-full">
            {loadingAchievements ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : achievements?.achievements ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="border-none text-lg font-semibold text-blue3">
                      <th>Descripcion</th>
                      <th>Editar</th>
                      <th>Agregar indicador</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAchievements.map((a: any, i: number) => (
                      <tr key={a.id_achievement} className="border-none">
                        <th>{a?.description}</th>
                        <th>{a?.editar}</th>
                        <th>{a?.indicator}</th>
                        <th>{a?.borrar}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h3>Ocurrio un error</h3>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Achievements;
