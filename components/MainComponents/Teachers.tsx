import { useMemo } from "react";
import {
  useDeleteTeacherMutation,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useTeachersQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import Table from "../Table";
import { Input } from "../Input";

const columns = [
  {
    Header: "Apellido y Nombre",
    accessor: "name",
  },
  {
    Header: "Certi. Matri.",
    accessor: "certi",
  },
  { Header: "Info", accessor: "info" },
  { Header: "Editar", accessor: "edit" },
  { Header: "Sacar", accessor: "leave" },
];

function Teachers() {
  const [DeleteDocente] = useDeleteTeacherMutation();
  const [AddTeacher] = useCreateTeacherMutation();
  const [UpdateTeacher] = useUpdateTeacherMutation();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);

  // Form to manage inputs values
  const [formValues, setFormValues] = useState<any>({
    name: "",
    last_name: "",
    type_id: 1,
    identification: "",
    direction: "",
    phone: "",
    email: "",
    degree: "",
  });

  // Obj to manage every input error
  const [errors, setErrors] = useState<any>({
    name: "",
    last_name: "",
    identification: "",
    direction: "",
    phone: "",
    email: "",
    degree: "",
  });

  const { data, loading, refetch } = useTeachersQuery({
    fetchPolicy: "network-only",
  });

  // Here we validate if every item is filled and if it is we return true
  const validationEvent = () => {
    if (
      formValues.name &&
      formValues.last_name &&
      formValues.identification &&
      formValues.direction &&
      formValues.phone &&
      formValues.email &&
      formValues.degree
    ) {
      return true;
    } else {
      for (const item in formValues) {
        if (!formValues[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };

  // We are using formvalues for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }

    for (const i in formValues) {
      if (i === "id_teacher") {
        setFormValues((val: any) => ({ ...val, [i]: undefined }));
      } else if (i === "type_id") {
        setFormValues((val: any) => ({ ...val, [i]: 1 }));
      } else {
        setFormValues((val: any) => ({ ...val, [i]: "" }));
      }
    }
  };

  useEffect(() => {
    setActive(true);
  }, []);

  const arrayInputs: Array<any> = [
    {
      html: (
        <Input
          name="name"
          value={formValues.name}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          type="text"
          label="Nombres"
          errorText={errors.name}
        />
      ),
    },
    {
      html: (
        <Input
          name="last_name"
          value={formValues.last_name}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          type="text"
          label="Apellidos"
          errorText={errors.last_name}
        />
      ),
    },
    {
      html: (
        <Input
          name="identification"
          value={formValues.identification}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          type="text"
          label="Numero de Identificacion"
          errorText={errors.identification}
        />
      ),
    },
    {
      html: (
        <Input
          required
          name="direction"
          value={formValues.direction}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          type="text"
          label="Direccion"
          errorText={errors.direction}
        />
      ),
    },
    {
      html: (
        <Input
          required
          name="phone"
          value={formValues.phone}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          label="Telefono"
          type="text"
          errorText={errors.phone}
        />
      ),
    },
    {
      html: (
        <Input
          required
          name="email"
          value={formValues.email}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          type="email"
          placeholder="example@correo.com"
          label="Correo electronico"
          errorText={errors.email}
        />
      ),
    },
    {
      html: (
        <Input
          required
          name="degree"
          value={formValues.degree}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          type="text"
          label="Titulo"
          errorText={errors.degree}
        />
      ),
    },
  ];

  const processedTeachers = useMemo(() => {
    if (!data?.teachers) return [];

    return data.teachers.map((teacher, index) => ({
      name: teacher?.name ?? "",
      lastName: teacher?.last_name ?? "",
      degree: teacher?.degree ?? "",
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            cleaningStates();
            setFormValues((t: any) => ({
              ...t,
              id_teacher: teacher?.id_teacher,
              name: teacher?.name,
              last_name: teacher?.last_name,
              identification: teacher?.identification,
              direction: teacher?.direction,
              phone: teacher?.phone,
              email: teacher?.email,
              degree: teacher?.degree,
            }));
            modal?.showModal();
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
          </svg>
        </button>
      ),
      borrar: (
        <button
          className="border-0"
          onClick={() =>
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
              if (result.isConfirmed && teacher?.id_teacher) {
                DeleteDocente({
                  variables: { idDocente: teacher.id_teacher },
                }).then((res) => {
                  if (res.data?.deleteTeacher) {
                    Swal.fire({
                      title: "Eliminado",
                      text: "Docente Eliminado!",
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
            })
          }
        >
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
  }, [data, DeleteDocente]);

  const handlerCreateTeacher = async () => {
    return await AddTeacher({ variables: { createTeacherInput: formValues } });
  };

  const handlerUpdateTeacher = async (form: any) => {
    return await UpdateTeacher({
      variables: { updateTeacherInput: formValues },
    });
  };
  const modal = document.getElementById("modal") as HTMLDialogElement;

  return (
    <div className="rounded-tl-[20px] w-full overflow-hidden bg-gray1 p-10 pb-3 h-full">
      <div className="h-[6%] flex justify-between">
        <div>
          <strong className="text-xl text-black ps-8">Lista de Docentes</strong>
        </div>
        <div className="text-end pr-6 h-full [&>button]:h-20">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-full btn-sm rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              cleaningStates();
              setTypeAdd(true);
              modal?.showModal();
            }}
          >
            <h4 className="text-white text-xs">+ Nuevo Docente</h4>
          </button>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        <div className="text-black h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.teachers ? (
            <div className=" border-white py-4 h-full">
              <Table
                column={columns}
                data={processedTeachers}
                type={"teacher"}
              />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      </div>

      {/* Modal */}
      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Docente Creado!"}
        updateSuccessMsg={"Docente Actualizado!"}
        formValues={formValues}
        addMutation={handlerCreateTeacher}
        updateMutation={handlerUpdateTeacher}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default Teachers;
