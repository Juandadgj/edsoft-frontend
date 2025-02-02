import { ContainerComponents } from "@/components/ContainerComponents";
import CustomModal from "@/components/CustomModal";
import { Input } from "@/components/Input";
import TableComponent from "@/components/Table";
import {
  CreateStudentInput,
  Group,
  GroupsQuery,
  useCreateEnrollmentMutation,
  useCreateStudentMutation,
  useGroupsLazyQuery,
  useScholearYearSelectedQuery,
} from "@/generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { notification, Table } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
export type NotificationType = "success" | "info" | "warning" | "error";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profesor del Grupo",
    dataIndex: "representative",
    key: "representative",
  },
  {
    title: "Horario",
    dataIndex: "working_time",
    key: "working_time",
  },
  {
    title: "Matricular",
    dataIndex: "enrollment",
    key: "enrollment",
  },
];
interface TStudent extends CreateStudentInput {
  name: string;
  last_name: string;
  email: string;
  identification: string;
  sex: string;
  birthday: null | undefined;
  direction: string;
  phone: string;
  father: string;
  mother: string;
  guardian: string;
  status: string;
  type_id: number;
}

const NewStudent = () => {
  const [open, setOpen] = useState(false);
  const { data: year } = useScholearYearSelectedQuery();
  const router = useRouter();
  const { g } = router.query;
  const [
    getGroups,
    { data: groupsData, loading: groupsLoading, error: groupsError },
  ] = useGroupsLazyQuery({
    variables: { filterGroupInput: { id_year: year?.scholearYearSelected.id_year } },
  });
  const [createStudent, { data, loading, error }] = useCreateStudentMutation();
  const [
    createEnrollment,
    {
      data: enrollmentData,
      loading: enrollmentLoading,
      error: enrollmentError,
    },
  ] = useCreateEnrollmentMutation();
  const [groupsList, setGroupsList] = useState<Group[]>();
  const [group, setGroup] = useState<{
    id_group: number;
    level: number | undefined | null;
    sublevel: string | undefined | null;
  }>();
  const [enrollment, setEnrollment] = useState(false);
  const [student, setStudent] = useState<TStudent>({
    name: "",
    last_name: "",
    email: "",
    identification: "",
    sex: "",
    birthday: null,
    direction: "",
    phone: "",
    father: "",
    mother: "",
    guardian: "",
    status: "",
    type_id: 4,
  });

  const [errors, setErrors] = useState<any>({
    name: "",
    last_name: "",
    email: "",
    identification: "",
    sex: "",
    direction: "",
    phone: "",
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, type: NotificationType) => {
    api[type]({
      message: `${message}`,
      description: "",
    });
  };

  const validationEvent = () => {
    if (
      student.name &&
      student.last_name &&
      student.email &&
      student.identification &&
      student.direction &&
      student.phone
    ) {
      return true;
    } else {
      for (const item in student) {
        if (!student[item as keyof TStudent]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };
  const handlerCreateStudent = async () => {
    createStudent({
      variables: { createStudentInput: student, idGroup: group?.id_group ?? 0 },
    }).then((res) => {
      if (res.data) {
        createEnrollment({
          variables: {
            createEnrollmentInput: {
              id_student: res.data.createStudent.id_student,
              id_group: group?.id_group ?? 0,
              year: year?.scholearYearSelected.id_year,
            },
          },
        });
      }
    });
  };

  const handlerSetStudent = ({ target }: any) => {
    setStudent({ ...student, [target.name]: target.value });
  };
  const handlerSelectGroup = () => {
    if (validationEvent()) {
      setEnrollment(true);
    }
  };
  const handlerOpenModal = (group: any) => {
    setGroup(group);
    setOpen(true);
  };
  const processedGroups = (groups: Group[] | null | undefined) => {
    if (!groups) return [];
    return groups.map((group) => ({
      id_group: group?.id_group,
      name: `${getCourseLevel(group?.level)} - ${group?.sublevel}`,
      representative: group?.representative ?? "",
      working_time: group.working_time,
      enrollment: (
        <button onClick={() => handlerOpenModal(group)}>
          Selecionar grupo
        </button>
      ),
    }));
  };

  useEffect(() => {
    if (enrollment) {
      getGroups();
    }
  }, [enrollment]);

  useEffect(() => {
    if (groupsData?.groups) {
      setGroupsList(processedGroups(groupsData.groups as Group[]));
    }
  }, [groupsData]);
  useEffect(() => {
    if (enrollmentData) {
      openNotification("Estudiante matriculado con éxito", "success");
      setOpen(false);
      setEnrollment(false);
    }
    if (enrollmentError) {
      openNotification("Error al matricular estudiante", "error");
    }
  }, [enrollmentData]);
  return (
    <ContainerComponents>
      {contextHolder}
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Estudiante nuevo en el sistema
          </strong>
        </h3>
      </div>
      {enrollment && (
        <div className={`w-full px-3 overflow-x-auto animate-fade-left h-full`}>
          {groupsLoading && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {groupsData && <TableComponent column={columns} data={groupsList} />}
          {groupsError && (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-md text-red-500">{groupsError.message}</h1>
            </div>
          )}
        </div>
      )}
      {!enrollment && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 h-full">
          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <p>Apellidos</p>
              </label>
              <Input
                value={student.last_name}
                name="last_name"
                onChange={handlerSetStudent}
                type="text"
                errorText={errors.last_name}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <p className="w-full">Nombres</p>
              </label>
              <Input
                value={student.name}
                name="name"
                onChange={handlerSetStudent}
                type="text"
                errorText={errors.name}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <p className=" w-full">Tipo de Identificación</p>
              </label>
              <div className="w-full">
                <select className="border rounded-btn border-gray5 w-full h-11 bg-transparent font-normal">
                  <option disabled selected>
                    Who shot first?
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="label">
              <p className="w-full">Identificación / Código</p>
            </label>
            <Input
              value={student.identification}
              name="identification"
              onChange={handlerSetStudent}
              type="text"
              errorText={errors.identification}
            />
          </div>
          <div className="w-full">
            <label className="label">
              <p className="w-full">Sexo</p>
            </label>
            <select className="border rounded-btn border-gray5 w-full h-11 bg-transparent font-normal">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div className="w-full">
            <label className="label">
              <span>Lugar de nacimiento</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="w-full">
            <label className="label">
              <span>Direccion</span>
            </label>
            <Input
              value={student.direction}
              name="direction"
              onChange={handlerSetStudent}
              type="text"
              errorText={errors.direction}
            />
          </div>

          <div className="w-full">
            <label className="label">
              <span>Telefono</span>
            </label>
            <Input
              value={student.phone}
              name="phone"
              onChange={handlerSetStudent}
              type="text"
              errorText={errors.phone}
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Foto</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered border-gray5 file-input-sm w-full h-9 bg-transparent text-xs file:text-main-blue file:font-semibold file:bg-transparent file:border-0 file:border-r file:border-gray5 hover:file:bg-main-blue hover:file:text-white"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Nombre y apellido del acudiente</span>
            </label>
            <Input type="text" />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Correo</span>
            </label>
            <Input
              value={student.email}
              name="email"
              onChange={handlerSetStudent}
              type="text"
              errorText={errors.email}
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Barrio</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Sistema salud</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Tipo de sangre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>EPS</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Capacidad excepcional</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Código</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Código Municipio. Exp</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Sisben</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Estrato</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Identificación acudiente</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Dirección del acudiente</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Número celular del acudiente</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <p className="break-words">Fecha de nacimiento del acudiente</p>
            </label>
            <Input
              type="date"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              placeholder="Select date"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Nombre y apellido de la madre</span>
            </label>
            <Input
              value={student.mother}
              name="mother"
              onChange={handlerSetStudent}
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Identificacion de la madre</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Dirección de la madre</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Número celular de la madre</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <p className="break-words">Fecha de nacimiento de la madre</p>
            </label>
            <Input
              type="date"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              placeholder="Select date"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Estudios de la madre</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Profesión de la madre</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Nombre y apellido del padre</span>
            </label>
            <Input
              value={student.father}
              name="father"
              onChange={handlerSetStudent}
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Identificacion del padre</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Dirección del padre</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Número celular del padre</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <p className="break-words">Fecha de nacimiento del padre</p>
            </label>
            <Input
              type="date"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              placeholder="Select date"
            />
          </div>
          <h1
            className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold"
            text-sm
          >
            Población Víctima del Conflicto (Debe presentar la certificación
            correspondiente)
          </h1>

          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <span>
                  Beneficiario Hijos dependientes de Madre Cabeza de Familia
                </span>
              </label>
              <Input
                type="text"
                className="input border-gray5 w-full h-9 bg-transparent text-xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <span>Alumno Madre Cabeza de Familia</span>
              </label>
              <Input
                type="text"
                className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <span>Alumno Madre Cabeza de Familia</span>
              </label>
              <Input
                type="text"
                className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              />
            </div>
          </div>
          <div className="items-center">
            <label className="label">
              <span>Beneficiario Veterano Fuerza Pública</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Beneficiario Héroe Nación</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            En situación de desplazamiento
          </h1>

          <div className="items-center">
            <label className="label">
              <span>Departamento expulsor</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Municipio expulsor</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold text-sm">
            Procedencia Académica (instituciones anteriores)
          </h1>

          <div className="items-center">
            <label className="label w-1/4 justify-start text-left">
              <p className="break-words">Estado</p>
            </label>
            <select className="border rounded-btn h-11 border-gray5 w-full bg-transparent font-normal">
              <option disabled selected>
                Nuevo
              </option>
              <option>Nuevo-Repitente</option>
              <option>Antiguo</option>
              <option>Antiguo-Repitente</option>
            </select>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Estudio vigencia anterior</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Institucion Educativa Procedencia</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Grado procedencia</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Año procedencia</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Ciudad procedencia</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Etnias
          </h1>
          <div className="items-center">
            <label className="label">
              <span>Afrodesendiente</span>
            </label>
            <td className="flex gap-2">
              <Input
                type="radio"
                name="radio-1"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-1"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Negritudes</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-2"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-2"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>ROM</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-3"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-3"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>ZENÚ</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-4"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-4"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Listado de categorías de discapacidad
          </h1>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad Física</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-5"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-5"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad Auditiva</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-6"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-6"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad Visual</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-7"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-7"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Sordo ceguera</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-8"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-8"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad Intelectual</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-9"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-9"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad psicosocial</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-10"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-10"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad múltiple</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-11"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-11"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Enfermedad que padece el estudiante</span>
            </label>
            <Input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Listado de capacidades y/o talentos excepcionales
          </h1>

          <div className="items-center">
            <label className="label">
              <span>En tecnología</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-12"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-12"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En Liderazgo y emprendimiento</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-13"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-13"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En ciencias naturales o básicas</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-14"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-14"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En artes o letras</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-15"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-15"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En Actividad física, ejercicio y deporte</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-16"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-16"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En Ciencias Sociales o humanas</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-17"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-17"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>
          <div
            className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center p-5"
            onClick={handlerSelectGroup}
          >
            <button className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500">
              Matricular Estudiante
            </button>
          </div>
        </div>
      )}
      <CustomModal open={open}>
        <div>
          <h1 className="text-center text-2xl font-medium text-main-blue">
            Advertencia
          </h1>
          <div className="my-3">
            <h3>
              ¿Estas seguro de que quieres matricular al estudiante{" "}
              {student.name} {student.last_name} en el curso {group?.level}{" "}
              {group?.sublevel}?
            </h3>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <button
              disabled={enrollmentLoading}
              onClick={handlerCreateStudent}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Matricular
            </button>
            <button
              onClick={() => setOpen(false)}
              className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
            >
              Cancelar
            </button>
          </div>
          {loading && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {error && (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <h1>Parece que hubo un error</h1>
              <h3 className="text-md text-red-500">{error.message}</h3>
              <div className="w-full flex justify-center items-center gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </CustomModal>
    </ContainerComponents>
  );
};

export default NewStudent;
