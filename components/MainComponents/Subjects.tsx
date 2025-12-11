import { useMemo } from "react";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useCreateCourseMutation,
  useTeachersQuery,
  useGetAreasQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useScholearYearSelectedQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import Table from "../Table";
import { useRouter } from "next/router";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import { Input } from "../Input";
import useSchoolYear from "@/hooks/useSchoolYear";
import { GroupsCars } from "../Card/types";
import TableComponent from "../Table";
import { ContainerComponents } from "../ContainerComponents";
import CustomModal from "../CustomModal";
import { SubjectForm } from "./forms/SubjectForm";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { CourseComponent } from "./CourseComponent";

const columnsGroup = [
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
    title: "Asignaturas",
    dataIndex: "courses_count",
    key: "courses_count",
  },
  { title: "Ver", dataIndex: "select", key: "select" },
];

const columnsSubjects = [
  {
    title: "Asignatura",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Area",
    dataIndex: "area",
    key: "area",
  },
  { title: "Profesor", dataIndex: "teacher", key: "teacher" },
  { title: "IHC", dataIndex: "hour", key: "hour" },
  { title: "Valor %", dataIndex: "percentage", key: "percentage" },
  { title: "Promediar", dataIndex: "average", key: "average" },
  { title: "Editar", dataIndex: "edit", key: "edit" },
  { title: "Borrar", dataIndex: "delete", key: "delete" },
];

function Subjects() {
  const { year } = useSchoolYear();
  const router = useRouter();
  const { g } = router.query;
  const [selectedGroup, setSelectedGroup] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses, refetch },
  ] = useCoursesLazyQuery({ fetchPolicy: "network-only" });
  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });
  const { data: teachers } = useTeachersQuery();
  const { data: areas } = useGetAreasQuery();
  const [DeleteCourse] = useDeleteCourseMutation({});
  const [subject, setSubject] = useState<any>({
    name: "",
    id_teacher: "",
    id_area: "",
    average: "",
    hour: "",
    percentage: "",
  });
  const processedSubjects = (data: any) => {
    return data.map((courses: any, index: number) => ({
      name: courses?.name ?? "",
      area: courses.id_area ?? "",
      teacher: courses?.teacher.name ?? "-",
      hour: courses?.hour ?? "",
      percentage: courses.percentage,
      average: courses.average,
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setSubject({
              id_course: courses.id_course,
              name: courses.name,
              id_teacher: courses.id_teacher,
              id_area: courses.id_area,
              average: courses.average,
              hour: courses.hour,
              percentage: courses.percentage,
              id_group: courses.id_group,
            });
            setOpen(true);
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
      delete: (
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

  useEffect(() => {
    if (g) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(g) } },
      });
    }
  }, [router]);

  useEffect(() => {
    if (courses) {
      setSelectedGroup(processedSubjects(courses?.courses));
    }
  }, [courses]);

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

  const handlerCloseModal = () => {
    setOpen(false);
    setSubject({
      name: "",
      id_teacher: "",
      id_area: "",
      average: "",
      hour: "",
      percentage: "",
      id_group: "",
    });
    refetch();
  };
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <div>
          <strong className="text-xl text-black ps-8">
            Asignaturas creadas para el año {year}
          </strong>
        </div>
        {g && (
          <div className="text-end pr-6">
            <button
              type="button"
              className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
              onClick={() => {
                setSubject({
                  name: "",
                  id_teacher: "",
                  id_area: "",
                  average: "",
                  hour: "",
                  percentage: "",
                  id_group: g,
                });
                setOpen(true);
              }}
            >
              <h4 className="text-white text-xs">+ Nueva asignatura</h4>
            </button>
          </div>
        )}
      </div>
      {!g ? (
        <CourseComponent isCreate={false} showSubjects={true} />
      ) : (
        <div className="text-black h-full">
          {loadingCourses ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : courses?.courses ? (
            <div className=" border-white py-4 h-full">
              <TableComponent column={columnsSubjects} data={selectedGroup} />
            </div>
          ) : (
            errorCourses && <h3>Ocurrio un error: {errorCourses?.message}</h3>
          )}
        </div>
      )}
      {/* Modal */}
      <CustomModal
        open={open}
        title={subject?.id_course ? "Editar Curso" : "Agregar Curso"}
      >
        <SubjectForm
          subject={subject}
          setSubject={setSubject}
          onClose={handlerCloseModal}
          areas={areas?.areas}
          courses={courses?.courses}
          groups={groups?.groups}
          teachers={teachers?.teachers}
        />
      </CustomModal>
    </ContainerComponents>
  );
}

export default Subjects;
