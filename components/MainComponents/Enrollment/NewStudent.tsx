import { ContainerComponents } from "@/components/ContainerComponents";
import { Input } from "@/components/Input";
import {
  CreateStudentInput,
  Group,
  GroupsQuery,
  useCreateStudentMutation,
  useGroupsLazyQuery,
} from "@/generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

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
    Header: "Horario",
    accessor: "editar",
  },
  {
    Header: "Matricular",
    accessor: "borrar",
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
  const modalComment = useRef<HTMLDialogElement>(null);
  const { year } = useSchoolYear();
  const router = useRouter();
  const { groups } = router.query;
  const [
    getGroups,
    { data: groupsData, loading: groupsLoading, error: groupsError },
  ] = useGroupsLazyQuery({
    variables: { filterGroupInput: { id_year: year } },
  });
  const [createStudent, { data, loading, error }] = useCreateStudentMutation();
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
  const handlerCreateStudent = () => {
    createStudent({
      variables: { createStudentInput: student, idGroup: group?.id_group ?? 0 },
    }).then(() => {
      setEnrollment(false);
      setTimeout(() => {
        modalComment.current?.close();
      }, 3000);
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
  const handlerOpenModal = (group: {
    id_group: number;
    level: number | undefined | null;
    sublevel: string | undefined | null;
  }) => {
    setGroup(group);
    modalComment.current?.showModal();
  };
  const processedGroups = (groups: Group[] | null | undefined) => {
    if (!groups) return [];
    return groups.map((group) => ({
      id_group: group?.id_group,
      level: group?.level,
      sublevel: group?.sublevel,
      representative: group?.representative ?? "",
      working_time: group.working_time,
      asignaturas: group?.coursesCount,
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
  console.log(enrollment);
  return (
    <ContainerComponents>
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
          {groupsData && (
            <table className="table text-black">
              <thead className="flex items-center justify-center">
                <tr className="flex w-full justify-center border-main-blue border-b-4 text-base font-semibold">
                  {columns.map((key: any, index: any) => (
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
                {groupsList?.map((item, index) => (
                  <div
                    key={index}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <tr
                      className={`flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold `}
                    >
                      <td className="flex w-full justify-center items-center text-center py-2">
                        {item.level}-{item.sublevel}
                      </td>
                      <td className="flex w-full justify-center items-center text-center py-2">
                        {item.representative}
                      </td>
                      <td className="flex w-full justify-center items-center text-center py-2">
                        {item.working_time}
                      </td>
                      <td className="flex w-full justify-center items-center text-center py-2">
                        <button
                          className="btn bg-transparent border-none shadow-none hover:bg-gray5"
                          onClick={() =>
                            handlerOpenModal({
                              id_group: item.id_group,
                              level: item.level,
                              sublevel: item.sublevel,
                            })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 2048 2048"
                          >
                            <path
                              fill="#25429e"
                              d="M1848 896q42 0 78 15t64 42t42 63t16 78q0 39-15 76t-43 65l-717 719l-377 94l94-377l717-718q28-28 65-42t76-15m51 249q21-21 21-51q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694l-34 135l135-34zM640 896H512V768h128zm896 0H768V768h768zM512 1152h128v128H512zm128-640H512V384h128zm896 0H768V384h768zM384 1664h443l-32 128H256V0h1536v743q-67 10-128 44V128H384zm384-512h514l-128 128H768z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </div>
                ))}
              </tbody>
            </table>
          )}
          {groupsError && (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-md text-red-500">{groupsError.message}</h1>
            </div>
          )}
        </div>
      )}
      {!enrollment && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 h-full overflow-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#25429e #F3F4F6",
            scrollbarGutter: "20px",
          }}
        >
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
      <dialog ref={modalComment} className="modal">
        <div className="modal-box text-black">
          {!data && !loading && !error && (
            <>
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
                  onClick={handlerCreateStudent}
                  className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
                >
                  Matricular
                </button>
                <button
                  onClick={() => modalComment.current?.close()}
                  className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
          {data && (
            <div className="w-full flex justify-center items-center">
              <h3>Estudiante matriculado satisfactoriamente!</h3>
            </div>
          )}
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
                  onClick={() => modalComment.current?.close()}
                  className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </ContainerComponents>
  );
};

export default NewStudent;
