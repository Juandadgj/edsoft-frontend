import { useMemo } from "react";
import { useEffect, useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import {
  useCoursesLazyQuery,
  useGenerateStudentsListDeterminatedLazyQuery,
  useGroupsQuery,
} from "@/generated/graphql";
import { useRouter } from "next/router";
import DescriptionIcon from "@mui/icons-material/Description";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profesor del Grupo",
    dataIndex: "group_teacher",
    key: "group_teacher",
  },
  {
    title: "Planillar",
    dataIndex: "editar",
    key: "editar",
  },
];

const columsCourses = [
  {
    title: "Asignatura",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profesor",
    dataIndex: "teacher",
    key: "teacher",
  },
  {
    title: "Planilla",
    dataIndex: "editar",
    key: "editar",
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
      name: `${getCourseLevel(group?.level)} - ${group?.sublevel}`,
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
            {loadingCourses && (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-main-blue"></span>
              </div>
            )}
            {courses?.courses && (
                <TableComponent column={columsCourses} data={selectedCourses} />
            )}
          </div>
        )}
        {!g && (
          <div className="h-full">
            <div className="h-full">
              {loading && (
                <div className="w-full h-full flex justify-center items-center">
                  <span className="loading loading-dots loading-lg bg-main-blue"></span>
                </div>
              )}
              {data?.groups && (
                  <TableComponent column={columns} data={processedGroups} />
              )}
            </div>
          </div>
        )}
      </div>
    </ContainerComponents>
  );
};

export default GlobalGradesDetermined;
