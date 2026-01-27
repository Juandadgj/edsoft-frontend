import { useMemo, useCallback, useState, useEffect } from "react";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import useSchoolYear from "@/hooks/useSchoolYear";
import TableComponent from "../Table";
import CustomModal from "../CustomModal";
import { CourseForm } from "./forms/CourseForm";
import { ContainerComponents } from "../ContainerComponents";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { CourseComponent } from "./CourseComponent";
import { teacherService } from "@/services/api.service";
import type { Teacher } from "@/types/api.types";

function CreateCourses() {
  const { year } = useSchoolYear();
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [course, setCourse] = useState<any>(0);

  const fetchTeachers = useCallback(async () => {
    try {
      const data = await teacherService.getAll();
      setTeachers(data || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const courses = [
    { value: -3, text: "Parvulo" },
    { value: -2, text: "Prejardin" },
    { value: -1, text: "Jardin" },
    { value: 0, text: "Transición" },
    { value: 1, text: "Primero" },
    { value: 2, text: "Segundo" },
    { value: 3, text: "Tercero" },
    { value: 4, text: "Cuarto" },
    { value: 5, text: "Quinto" },
    { value: 6, text: "Sexto" },
    { value: 7, text: "Septimo" },
    { value: 8, text: "Octavo" },
    { value: 9, text: "Noveno" },
    { value: 10, text: "Decimo" },
    { value: 11, text: "Undecimo" },
    { value: 12, text: "PreUniversitario" },
    { value: 13, text: "Ciclo I" },
    { value: 14, text: "Ciclo II" },
    { value: 15, text: "Ciclo III" },
    { value: 16, text: "Ciclo IV" },
    { value: 17, text: "Ciclo V (Sem. 1)" },
    { value: 18, text: "Ciclo VI (Sem. 1)" },
    { value: 19, text: "Ciclo V (Sem. 2)" },
    { value: 20, text: "Ciclo VI (Sem. 2)" },
  ];
  const groups = [
    { value: "A", text: "A" },
    { value: "B", text: "B" },
    { value: "C", text: "C" },
    { value: "D", text: "D" },
    { value: "E", text: "E" },
    { value: "F", text: "F" },
    { value: "G", text: "G" },
    { value: "H", text: "H" },
    { value: "I", text: "I" },
    { value: "J", text: "J" },
    { value: "K", text: "K" },
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" },
    { value: "5", text: "5" },
    { value: "6", text: "6" },
    { value: "7", text: "7" },
    { value: "8", text: "8" },
    { value: "9", text: "9" },
    { value: "10", text: "10" },
  ];
  const working_time = [
    { value: "M", text: "Mañana" },
    { value: "T", text: "Tarde" },
    { value: "N", text: "Noche" },
    { value: "S", text: "Sabatina" },
  ];
  const hanclerCloseModal = () => {
    setOpen(false);
    setCourse({
      name: "",
      level: "",
      sublevel: "",
      representative: "",
      working_time: "",
    });
  };
  const handlerEditCourse = async (course: any) => {
    setOpen(true);
    setCourse({
      id_group: course.id_group,
      name: course.name,
      level: course.level,
      sublevel: course.sublevel,
      representative: course.representative,
      working_time: course.working_time,
    });
  };
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <strong className="text-xl text-black ps-8 pb-4">
          Cursos Creados para el año {year}
        </strong>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={() => {
              setCourse({
                name: "",
                level: "",
                id_group: "",
                id_year: "",
                teacher: "",
                subject: "",
                period: "",
                working_time: "",
              });
              setOpen(true);
            }}
          >
            <h4 className="text-white text-xs">+ Nuevo Curso</h4>
          </button>
        </div>
      </div>
      <div className="text-black">
        <CourseComponent
          isCreate={true}
          showSubjects={false}
          setCourse={handlerEditCourse}
        />
      </div>
      <CustomModal
        open={open}
        title={course.id_group ? "Editar curso" : "Crear curso"}
      >
        <CourseForm
          course={course}
          setCourse={setCourse}
          onClose={hanclerCloseModal}
          courses={courses}
          groups={groups}
          working_time={working_time}
          year={year}
          teachers={teachers}
        />
      </CustomModal>
    </ContainerComponents>
  );
}

export default CreateCourses;
