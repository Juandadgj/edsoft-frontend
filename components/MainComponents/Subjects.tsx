import { useMemo, useCallback } from "react";
import { courseService, teacherService, groupService } from "@/services/api.service";
import type { Course, Teacher, Group } from "@/types/api.types";
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [errorCourses, setErrorCourses] = useState<any>(null);
  const [subject, setSubject] = useState<any>({
    name: "",
    id_teacher: "",
    id_area: "",
    average: "",
    hour: "",
    percentage: "",
  });

  const fetchCourses = useCallback(async (id_group: number) => {
    setLoadingCourses(true);
    try {
      const data = await courseService.getAll({ id_group });
      setCourses(data);
      setErrorCourses(null);
    } catch (error) {
      console.error(error);
      setErrorCourses(error);
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  const fetchGroups = useCallback(async () => {
    setLoadingGroups(true);
    try {
      const data = await groupService.getAll({ id_year: year });
      setGroups(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGroups(false);
    }
  }, [year]);

  const fetchTeachers = useCallback(async () => {
    try {
      const data = await teacherService.getAll();
      setTeachers(data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const processedSubjects = (data: Course[]) => {
    return data.map((course: Course, index: number) => ({
      name: course?.name ?? "",
      area: course.id_area ?? "",
      teacher: course?.teacher?.name ?? "-",
      hour: course?.hour ?? "",
      percentage: course.percentage,
      average: course.average,
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setSubject({
              id_course: course.id_course,
              name: course.name,
              id_teacher: course.id_teacher,
              id_area: course.id_area,
              average: course.average,
              hour: course.hour,
              percentage: course.percentage,
              id_group: course.id_group,
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
        <button onClick={() => handlerDeleteCourse(course.id_course)}>
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
    fetchGroups();
    fetchTeachers();
  }, [fetchGroups, fetchTeachers]);

  useEffect(() => {
    if (g) {
      fetchCourses(Number(g));
    }
  }, [g, fetchCourses]);

  useEffect(() => {
    setSelectedGroup(processedSubjects(courses));
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
    }).then(async (result) => {
      if (result.isConfirmed && id_course) {
        try {
          await courseService.delete(id_course);
          Swal.fire({
            title: "Eliminado",
            text: "Curso Eliminado!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          if (g) {
            fetchCourses(Number(g));
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Ha habido un error...",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
    if (g) {
      fetchCourses(Number(g));
    }
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
        <div className="text-black">
          {loadingCourses ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : courses.length > 0 ? (
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
          areas={[]}
          courses={courses}
          groups={groups}
          teachers={teachers}
        />
      </CustomModal>
    </ContainerComponents>
  );
}

export default Subjects;
