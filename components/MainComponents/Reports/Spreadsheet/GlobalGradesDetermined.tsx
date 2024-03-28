import { useMemo } from "react";
import { useEffect, useState } from "react";
import edit from "../../../public/assets/01editar.png";
import delet from "../../../public/assets/01eliminar.png";
import BookIcon from '@mui/icons-material/Book';
import Image from "next/image";
import { useCoursesLazyQuery, useGroupsQuery } from "@/generated/graphql";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import DescriptionIcon from '@mui/icons-material/Description';

const columns = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Jornada",
    accessor: "working_time",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  {
    Header: "Asignatura",
    accessor: "editar",
  }
];

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
    Header: "Planilla",
    accessor: "editar",
  }
];

const GlobalGradesDetermined = () => {
  const router = useRouter();
  const { g } = router.query;
  const today = new Date();
  const year = today.getFullYear();
  const [active, setActive] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses },
  ] = useCoursesLazyQuery();

  const { data, loading } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2017 } },
  });

  const handlerSelectedCourse = (id: number | undefined) => {
    const currentParams = new URLSearchParams(router.asPath.split('?')[1]);
    currentParams.set('g', `${id}`);
    router.push(`${router.pathname}?${currentParams.toString()}`);
    // router.push(`/dashboard/reportes?componente=planillas&&opcion=2g=${id}`);
  };

  const processedCourses = (data: any) => {
    if (!data) return [];
    return data.map((courses: any, index: any) => ({
      id_course: courses?.id_course,
      id_group: courses?.id_group,
      name: `${courses?.name}` ?? "",
      teacher: `${courses?.teacher.name}` ?? "-",
      editar: (
        <button className="btn btn-ghost border-0">
          <DescriptionIcon color="action" fontSize="medium" />
        </button>
      )
    }));
  };

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

  useEffect(() => {
    setActive(true);
  }, []);

  const processedGroups = useMemo(() => {
    if (!data?.groups) return [];
    return data.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}` ?? "",
      working_time: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button onClick={() => handlerSelectedCourse(group?.id_group)} className="btn btn-ghost border-0">
          <BookIcon color="action" fontSize="medium" />
        </button>
      ),
      route: 'reportes'
    }));
  }, [data]);

  return (
    <div className="rounded-tl-[20px] w-full h-[70vh] overflow-hidden bg-gray1">
      <div >
        <div className="pb-4" >
          <strong className="text-2xl text-black ps-8 pb-4">
            Cursos Creados para el año {year} para la planilla de nota por
            asignatura
          </strong>
        </div>
      </div>
      <div
        
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        
        {g ? (
          <div  className="text-black h-full">
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
          </div>
        ): 
        <div  className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.groups ? (
            <div className="d-flex border-white py-4 h-full">
              <Table column={columns} data={processedGroups} type={"groups"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>}
      </div>
    </div>
  );
}

export default GlobalGradesDetermined
