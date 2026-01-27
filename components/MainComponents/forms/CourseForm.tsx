import { groupService, teacherService } from "@/services/api.service";
import React, { useState } from "react";

export const CourseForm = ({
  course,
  setCourse,
  onClose,
  courses,
  groups,
  working_time,
  year,
  teachers,
  onSuccess,
}: {
  course?: any;
  setCourse: any;
  onClose: any;
  courses?: any[];
  groups?: any[];
  working_time?: any[];
  year?: any;
  teachers?: any[];
  onSuccess?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({
    course: "",
    group: "",
    working_time: "",
    teacher: "",
  });
  const validationEvent = () => {
    if (
      course.level &&
      course.sublevel &&
      course.workingTime &&
      course.representative
    ) {
      return true;
    } else {
      !course
        ? setErrors((err: any) => ({ ...err, course: "Curso Requerido!" }))
        : setErrors((err: any) => ({ ...err, course: "" }));
      !course.sublevel
        ? setErrors((err: any) => ({
            ...err,
            group: "Grupo Requerido!",
          }))
        : setErrors((err: any) => ({ ...err, group: "" }));
      !course.workingTime
        ? setErrors((err: any) => ({
            ...err,
            working_time: "Jornada Requerido!",
          }))
        : setErrors((err: any) => ({ ...err, working_time: "" }));
      !course.representative
        ? setErrors((err: any) => ({ ...err, teacher: "Profesor Requerido!" }))
        : setErrors((err: any) => ({ ...err, teacher: "" }));
      return false;
    }
  };
  const handlerCreateGroup = async () => {
    if (validationEvent()) {
      setLoading(true);
      try {
        const createData = {
          id_year: year || 0,
          level: Number(course.level),
          sublevel: course.sublevel,
          representative: course.representative.toString(),
          working_time: course.workingTime,
        };
        const res = await groupService.create(createData);
        if (res) {
          onSuccess?.();
          onClose();
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const handlerUpdateGroup = async () => {
    if (validationEvent()) {
      setLoading(true);
      try {
        const updateData = {
          id_group: course.id_group,
          level: Number(course.level),
          sublevel: course.sublevel,
          representative: course.representative.toString(),
          working_time: course.workingTime,
          id_year: year || 0,
        };
        const res = await groupService.update(updateData);
        if (res) {
          onSuccess?.();
          onClose();
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Curso</label>
        </div>
        <div className="w-full">
          <select
            name="level"
            value={course.level ? course.level : "Selecciona un curso"}
            onChange={({ target }: any) => {
              setCourse((t: any) => ({
                ...t,
                [target.name]: target.value,
              }));
            }}
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          >
            <option disabled selected>
              Selecciona un curso
            </option>
            {courses?.map((course: any, index) => (
              <option key={index} value={course.value}>
                {course.text}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">{errors.course}</label>
        </div>
      </div>
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Grupo</label>
        </div>
        <div className="w-full">
          <select
            name="sublevel"
            value={course.sublevel ? course.sublevel : "Selecciona un grupo"}
            onChange={({ target }: any) => {
              setCourse((t: any) => ({
                ...t,
                [target.name]: target.value,
              }));
            }}
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          >
            <option disabled selected>
              Selecciona un grupo
            </option>
            {groups?.map((group: any, index) => (
              <option key={index} value={group.value}>
                {group.text}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">{errors.group}</label>
        </div>
      </div>
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Jornada</label>
        </div>
        <div className="w-full">
          <select
            name="workingTime"
            value={
              course.workingTime ? course.workingTime : "Selecciona una jornada"
            }
            onChange={({ target }: any) => {
              setCourse((t: any) => ({
                ...t,
                [target.name]: target.value,
              }));
            }}
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          >
            <option disabled selected>
              Selecciona una jornada
            </option>
            {working_time?.map((time: any, index) => (
              <option key={index} value={time.value}>
                {time.text}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">
            {errors.working_time}
          </label>
        </div>
      </div>
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Profesor de grupo</label>
        </div>
        <div className="w-full">
          <select
            name="representative"
            value={
              course.representative
                ? course.representative
                : "Selecciona un profesor"
            }
            onChange={({ target }: any) => {
              setCourse((t: any) => ({
                ...t,
                [target.name]: target.value,
              }));
            }}
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          >
            <option disabled selected>
              Selecciona un profesor
            </option>
            {teachers?.map((teacher: any) => (
              <option key={teacher?.id_teacher} value={teacher?.id_teacher}>
                {teacher?.name} {teacher?.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">{errors.teacher}</label>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!course.id_group ? (
            <button
              onClick={handlerCreateGroup}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Agregar
            </button>
          ) : (
            <button
              onClick={handlerUpdateGroup}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Editar
            </button>
          )}
        </div>
        <div>
          <button
            onClick={onClose}
            className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
