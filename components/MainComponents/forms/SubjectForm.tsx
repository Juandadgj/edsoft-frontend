import { Input } from "@/components/Input";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const SubjectForm = ({
  subject,
  setSubject,
  onClose,
  areas,
  courses,
  groups,
  hour,
  teachers,
}: {
  subject?: any;
  setSubject: any;
  onClose: any;
  areas?: any[];
  courses?: any[];
  groups?: any[];
  hour?: any[];
  teachers?: any[];
}) => {
  const [addCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const [errors, setErrors] = useState<any>({
    name: "",
    id_area: "",
    id_teacher: "",
    teacher: "",
    average: "",
    hour: "",
  });
  const options = [];
  for (let i = 1; i <= 24; i++) {
    options.push(
      <option key={i} value={i} className="text-xs">
        {i}
      </option>
    );
  }
  const optionsPercentage = [];
  for (let i = 1; i <= 100; i++) {
    optionsPercentage.push(
      <option key={i} value={i} className="text-xs">
        {i}
      </option>
    );
  }
  const validationEvent = () => {
    if (
      subject.name &&
      subject.id_teacher &&
      subject.id_area &&
      subject.average &&
      subject.hour
    ) {
      return true;
    } else {
      !subject.name
        ? setErrors((err: any) => ({ ...err, name: "Nombre Requerido!" }))
        : setErrors((err: any) => ({ ...err, name: "" }));
      !subject.id_teacher
        ? setErrors((err: any) => ({
            ...err,
            id_teacher: "Profesor Requerido!",
          }))
        : setErrors((err: any) => ({ ...err, id_teacher: "" }));
      !subject.id_area
        ? setErrors((err: any) => ({ ...err, id_area: "Area Requerido!" }))
        : setErrors((err: any) => ({ ...err, id_area: "" }));
      !subject.average
        ? setErrors((err: any) => ({ ...err, average: "Promedio Requerido!" }))
        : setErrors((err: any) => ({ ...err, average: "" }));
      !subject.hour
        ? setErrors((err: any) => ({ ...err, hour: "Horario Requerido!" }))
        : setErrors((err: any) => ({ ...err, hour: "" }));
      return false;
    }
  };

  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    for (const i in subject) {
      if (i === "id_teacher") {
        setSubject((val: any) => ({ ...val, [i]: undefined }));
      } else {
        setSubject((val: any) => ({ ...val, [i]: "" }));
      }
    }
  };

  const handlerCreateCourse = async () => {
    if (validationEvent()) {
      await addCourse({
        variables: {
          createCourseInput: {
            name: subject.name,
            id_area: Number(subject.id_area),
            id_teacher: Number(subject.id_teacher),
            average:  subject.average,
            hour:  Number(subject.hour),
            percentage: Number(subject.percentage),
            id_group:  Number(subject.id_group),
          },
        },
      }).then((res) => {
        if (res.data) {
          onClose();
          cleaningStates();
        }
      });
    }
  };

  const handlerUpdateCourse = async () => {
    if (validationEvent()) {
      await updateCourse({
        variables: {
          updateCourseInput: {
            id_course: subject.id_course,
            name: subject.name,
            id_area: Number(subject.id_area),
            id_teacher: Number(subject.id_teacher) ,
            average: subject.average,
            hour:  Number(subject.hour),
            percentage: Number(subject.percentage), 
            id_group:  Number(subject.id_group),
          },
        },
      }).then((res) => {
        if (res.data) {
          onClose();
          cleaningStates();
        }
      });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Input
        type="text"
        value={subject.name}
        name="name"
        label="Nombre de la asignatura"
        onChange={({ target }: any) =>
          setSubject((t: any) => ({ ...t, name: target.value }))
        }
      />
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Profesor de la asignatura</label>
        </div>
        <div className="w-full">
          <select
            id="teacher"
            name="teacher"
            value={
              subject.id_teacher ? subject.id_teacher : "Selecciona un profesor"
            }
            onChange={({ target }: any) => {
              setSubject((t: any) => ({
                ...t,
                id_teacher: target.value,
              }));
            }}
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
            required
          >
            <option disabled>Selecciona un profesor</option>
            {teachers?.map((teacher: any) => (
              <option
                key={teacher?.id_teacher}
                value={teacher?.id_teacher}
                className="text-xs"
              >
                {teacher?.name} {teacher?.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">
            {errors.id_teacher}
          </label>
        </div>
      </div>
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Area donde pertenece la asignatura</label>
        </div>
        <div className="w-full">
          <select
            id="area"
            name="id_area"
            value={subject.id_area ? subject.id_area : "Selecciona un area"}
            onChange={({ target }: any) => {
              setSubject((t: any) => ({
                ...t,
                id_area: target.value,
              }));
            }}
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          >
            <option disabled>Selecciona un area</option>
            {areas?.map((area: any) => (
              <option
                key={area?.id_area}
                value={area?.id_area}
                className="text-xs"
              >
                {area.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">{errors.id_area}</label>
        </div>
      </div>
      <div className="from-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Promediar con todas las asignatura</label>
        </div>
        <div className="w-full">
          <select
            id="area"
            name="id_area"
            value={subject.average ? subject.average : "Promediar"}
            onChange={({ target }: any) => {
              setSubject((t: any) => ({
                ...t,
                average: target.value,
              }));
            }}
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          >
            <option selected disabled>
              Promediar
            </option>
            <option value={"Si"}> Si</option>
            <option value={"No"}> No</option>
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">{errors.average}</label>
        </div>
      </div>
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Intensidad horaria (Semanal)</label>
        </div>
        <div className="w-full">
          <select
            value={subject.hour ? subject.hour : "Intensidad Horaria"}
            onChange={({ target }: any) => {
              setSubject((t: any) => ({
                ...t,
                hour: target.value,
              }));
            }}
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          >
            <option selected disabled>
              Intensidad Horaria
            </option>
            {options}
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">{errors.hour}</label>
        </div>
      </div>
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Valor porcentual</label>
        </div>
        <div className="w-full">
          <select
            name="percentage"
            value={
              subject.percentage ? subject.percentage : "Selecciona porcentaje"
            }
            onChange={({ target }: any) =>
              setSubject((t: any) => ({ ...t, percentage: target.value }))
            }
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          >
            <option selected disabled>
              Selecciona porcentaje
            </option>
            {optionsPercentage}
          </select>
        </div>
        <div>
          <label className="label-text-alt text-[red]">
            {errors.percentage}
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!subject?.id_course ? (
            <button
              onClick={handlerCreateCourse}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Agregar
            </button>
          ) : (
            <button
              onClick={handlerUpdateCourse}
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
