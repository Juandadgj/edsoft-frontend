import { useMemo } from "react";
import { useEffect, useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import {
  useCoursesLazyQuery,
  useGenerateStudentsListDeterminatedLazyQuery,
  useGroupsQuery,
} from "@/generated/graphql";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import DescriptionIcon from "@mui/icons-material/Description";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "@/components/ContainerComponents";

const columns = [
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
    accessor: "editar",
  },
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
  },
];

const GlobalGradesDetermined = () => {
  const router = useRouter();
  const { g } = router.query;
  const { year } = useSchoolYear();
  const [selectedCourses, setSelectedCourses] = useState<any>([]);

  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses },
  ] = useCoursesLazyQuery();

  const { data, loading } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });

  const [reportArea] = useGenerateStudentsListDeterminatedLazyQuery({
    fetchPolicy: "network-only",
  });

  const handlerSpreadsheet = (id_course: number) => {
    reportArea({
      variables: {
        generateStudentsListDeterminatedInput: {
          id_group: Number(g),
          id_course: id_course,
        },
      },
    }).then((res) => {
      const { data } = res;
      handleOpenHTML(data?.generateStudentsListDeterminated.report_content);
    });
  };

  const handleOpenHTML = (htmlString: any) => {
    window.open()?.document.write(htmlString);
  };

  const handlerSelectedCourse = (id: number | undefined) => {
    router.push(`${router.asPath}&g=${id}`);
  };

  const processedGroups = useMemo(() => {
    if (!data?.groups) return [];
    return data.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}`,
      working_time: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button
          onClick={() => handlerSelectedCourse(group?.id_group)}
          className="btn btn-ghost border-0"
        >
          <BookIcon color="action" fontSize="medium" />
        </button>
      ),
    }));
  }, [data]);

  const processedCourses = (data: any) => {
    if (!data) return [];
    return data.map((courses: any, index: any) => ({
      id_course: courses?.id_course,
      id_group: courses?.id_group,
      name: `${courses?.name}`,
      teacher: `${courses?.teacher.name}`,
      editar: (
        <button
          className="btn btn-ghost border-0"
          onClick={() => handlerSpreadsheet(Number(courses.id_course))}
        >
          <DescriptionIcon color="action" fontSize="medium" />
        </button>
      ),
    }));
  };

  useEffect(() => {
    if (g) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(g) } },
      });
    }
  }, [router]);

  useEffect(() => {
    if (courses) {
      setSelectedCourses(processedCourses(courses.courses));
    }
  }, [courses]);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8 pb-4">
            Cursos Creados para el año {year} para la planilla de nota por
            asignatura
          </strong>
        </h3>
      </div>

      <div className="h-full">
        {g && (
          <div className="text-black h-full">
            {loadingCourses ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-main-blue"></span>
              </div>
            ) : courses?.courses ? (
              <div className=" border-white py-4 h-full">
                <div
                  className={`w-full px-3 overflow-x-auto animate-fade-left h-full `}
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#25429e #F3F4F6",
                    scrollbarGutter: "20px",
                  }}
                >
                  <table className="table text-black">
                    <thead className="flex items-center justify-center">
                      <tr className="flex w-full justify-center border-main-blue border-b-4 text-base font-semibold">
                        {columsCourses.map((key: any, index: any) => (
                          <th
                            key={index}
                            className="w-full text-center text-main-blue whitespace-normal flex items-center justify-center"
                          >
                            <p className="w-full">{key.Header}</p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="w-full py-2">
                      {selectedCourses.map((item: any, index: number) => (
                        <div
                          style={{ textDecoration: "none", width: "100%" }}
                          key={index}
                        >
                          <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold">
                            <td className="flex w-full justify-center items-center text-center py-0">
                              {item.name}
                            </td>
                            <td className="flex w-full justify-center items-center text-center py-0">
                              {item.teacher}
                            </td>
                            <td className="flex w-full justify-center items-center text-center py-0">
                              {item.editar}
                            </td>
                          </tr>
                        </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              errorCourses && <h3>Ocurrio un error: {errorCourses?.message}</h3>
            )}
          </div>
        )}
        {!g && (
          <div className="h-full">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-main-blue"></span>
              </div>
            ) : data?.groups ? (
              <div className="d-flex border-white py-4 h-full">
                <Table
                  column={columns}
                  data={processedGroups}
                  type={"groups"}
                />
              </div>
            ) : (
              <h3>¡Ocurrio un error!</h3>
            )}
          </div>
        )}
      </div>
    </ContainerComponents>
  );
};

export default GlobalGradesDetermined;
