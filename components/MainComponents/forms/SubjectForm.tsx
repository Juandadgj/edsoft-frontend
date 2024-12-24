import { Input } from "@/components/Input";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const SubjectForm = ({
  subject,
  onClose,
  areas,
  courses,
  groups,
  hour,
  teachers,
}: {
  subject?: any;
  onClose: any;
  areas?: any[];
  courses?: any[];
  groups?: any[];
  hour?: any[];
  teachers?: any[];
}) => {
  const [addCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [formValues, setFormValues] = useState<any>({
    name: "",
    id_course: "",
    id_group: "",
    id_teacher: "",
    average: "",
    hour: "",
    percentage: "",
  });
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
      formValues.name &&
      formValues.id_teacher &&
      formValues.id_area &&
      formValues.average &&
      formValues.hour
    ) {
      return true;
    } else {
      !formValues.name
        ? setErrors((err: any) => ({ ...err, name: "Nombre Requerido!" }))
        : setErrors((err: any) => ({ ...err, name: "" }));
      !formValues.id_teacher
        ? setErrors((err: any) => ({
            ...err,
            id_teacher: "Profesor Requerido!",
          }))
        : setErrors((err: any) => ({ ...err, id_teacher: "" }));
      !formValues.id_area
        ? setErrors((err: any) => ({ ...err, id_area: "Area Requerido!" }))
        : setErrors((err: any) => ({ ...err, id_area: "" }));
      !formValues.average
        ? setErrors((err: any) => ({ ...err, average: "Promedio Requerido!" }))
        : setErrors((err: any) => ({ ...err, average: "" }));
      !formValues.hour
        ? setErrors((err: any) => ({ ...err, hour: "Horario Requerido!" }))
        : setErrors((err: any) => ({ ...err, hour: "" }));
      return false;
    }
  };

  const handlerCreateCourse = async () => {
    if (validationEvent()) {
      await addCourse({
        variables: {
          createCourseInput: {
            name: formValues.name,
            id_area: formValues.id_area,
            id_teacher: formValues.id_teacher,
            average: formValues.average,
            hour: formValues.hour,
            percentage: formValues.percentage,
            id_group: formValues.id_group,
          },
        },
      });
    }
  };

  const handlerUpdateCourse = async () => {
    if (validationEvent()) {
      await updateCourse({
        variables: {
          updateCourseInput: {
            id_course: formValues.id_course,
            name: formValues.name,
            id_area: formValues.id_area,
            id_teacher: formValues.id_teacher,
            average: formValues.average,
            hour: formValues.hour,
            percentage: formValues.percentage,
            id_group: formValues.id_group,
          },
        },
      });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Input
        type="text"
        value={formValues.name}
        name="name"
        label="Nombre de la asignatura"
        onChange={({ target }: any) =>
          setFormValues((t: any) => ({ ...t, name: target.value }))
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
              formValues.id_teacher
                ? formValues.id_teacher
                : "Selecciona un profesor"
            }
            onChange={({ target }: any) => {
              setFormValues((t: any) => ({
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
            value={
              formValues.id_area ? formValues.id_area : "Selecciona un area"
            }
            onChange={({ target }: any) => {
              setFormValues((t: any) => ({
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
            value={formValues.average ? formValues.average : "Promediar"}
            onChange={({ target }: any) => {
              setFormValues((t: any) => ({
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
            value={formValues.hour ? formValues.hour : "Intensidad Horaria"}
            onChange={({ target }: any) => {
              setFormValues((t: any) => ({
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
              formValues.percentage
                ? formValues.percentage
                : "Selecciona porcentaje"
            }
            onChange={({ target }: any) =>
              setFormValues((t: any) => ({ ...t, percentage: target.value }))
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
    </div>
  );
};
