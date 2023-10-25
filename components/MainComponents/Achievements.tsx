import DynamicTable from "../DynamicTable";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useCoursesLazyQuery,
  useGroupsQuery, useAchievementsLazyQuery } from "../../generated/graphql";
import Image from "next/image";
import { useRouter } from "next/router";
import Table from "../Table";
import edit from "../../public/assets/01editar.png";
import delet from "../../public/assets/01eliminar.png";
import { FilterAchievementInput, Achievement } from '../../generated/graphql';


// const columns = [
//   {
//     Header: "Periodo",
//     accessor: "period",
//   },
//   {
//     Header: "Descripcion",
//     accessor: "description",
//   },
// ];

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
    Header: "Periodo 1",
    accessor: "sad",
  },
];

const columnsGroup = [
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

const prueba = {
  
}

function Achievements() {
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();
  const { g, a, per } = router.query;
  const [active, setActive] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<any>([]);
  
  const [getAchievements, { data: achievements, loading: loadingAchievements, error }] =
    useAchievementsLazyQuery();
  
  const processedAchievements = (data: any) => {
    if (!data?.achievements) return [];
    return data.achievements.map((achievements: any, index: any) => ({
      index: index ?? "",
      description: achievements?.description ?? "",
    }));
  };

  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2017 } },
  });

  const processedGroups = useMemo(()=>{
    if(!groups?.groups) return [];
    return groups?.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}` ?? "",
      group_teacher: group?.representative ?? "",
      asignaturas: 4,
      click: () => handlerSelectedCourse(group?.id_group),
    }))
  }, [groups]);

  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses, refetch },
  ] = useCoursesLazyQuery();

  const handlerSelectedAchievement = (id: number | undefined, per: number | undefined) => {
    console.log("bellaco")
    router.push(`/dashboard/programacion-anual?componente=logros&g=${g}&a=${id}&per=${per}`);
  }

  const processedCourses = (data: any) => {
    if(!data) return [];
    return data.map((courses: any, index: any) => ({
      name: `${courses?.name}` ?? "",
      teacher: `${courses?.id_teacher}` ?? "-",
      periodo: `${courses?.period}` ?? "-",
      click: () => handlerSelectedAchievement(courses?.id_course, courses?.period),
    }));
  };

  const handlerSelectedCourse = (id: number | undefined) => {
    console.log("click");
    router.push(`/dashboard/programacion-anual?componente=logros&g=${id}`);
  };

  useEffect(() => {
    if (a && per) {
      getAchievements({
        variables: { filterAchievementInput: { id_course: Number(a), period: Number(per) } },
      }).then((res) => {
        const { data } = res;
        setSelectedAchievements(processedAchievements(data?.achievements));
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
  }, [g]);

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
        {!g ? (
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
        ) : (
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
            achievements.achievements.map((a, i) => (
              <h1 key={i}>{a?.description}</h1>
            ))
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
