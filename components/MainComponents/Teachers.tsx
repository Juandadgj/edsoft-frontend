import { useMemo } from "react";
import {
  useDeleteTeacherMutation,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useTeachersQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import edit from "../../public/assets/01editar.png";
import delet from "../../public/assets/01eliminar.png";
import { Grid, TextField } from "@mui/material";
import DynamicModal from "../DynamicModal";
import { styled } from "@material-ui/styles";
import Swal from "sweetalert2";
import Image from "next/image";
import Table from "../Table";

const columns = [
  {
    Header: "Apellido",
    accessor: "lastName",
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Título",
    accessor: "degree",
  },
  {
    Header: "Editar",
    accessor: "editar",
  },
  {
    Header: "Borrar",
    accessor: "borrar",
  },
];

const CssTextField = styled(TextField)({
  fontFamily: ["Scada", "sans-serif"].join(","),
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

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
        <CssTextField
          required
          label="Nombre"
          name="name"
          color="success"
          value={formValues.name}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.name}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Apellidos"
          name="last_name"
          color="success"
          value={formValues.last_name}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.last_name}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Identificacion"
          name="identification"
          color="success"
          value={formValues.identification}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.identification}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Direccion"
          name="direction"
          color="success"
          value={formValues.direction}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.direction}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Telefono"
          name="phone"
          color="success"
          value={formValues.phone}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.phone}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Email"
          type="email"
          name="email"
          color="success"
          value={formValues.email}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.email}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Titulo"
          name="degree"
          color="success"
          value={formValues.degree}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.degree}
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
            // We set the values selected to our inputs
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
            setOpen(true);
          }}
        >
          <Image className={``} src={edit} alt="" width={50} height={50} />
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

  const handlerUpdateTeacher = async (form:any) => {
   return await UpdateTeacher({variables:{updateTeacherInput: formValues}})
  }

  return (
    <div className="rounded-tl-[20px] w-full overflow-hidden bg-gray1 p-10 pb-3 h-screen">
      <div className="h-[6%] flex justify-between">
        <div>
          <strong className="text-xl text-black ps-8">
            Lista de Docentes
          </strong>
        </div>
        <div className="text-end pr-6 h-full [&>button]:h-20">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-full btn-sm rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setTypeAdd(true);
              setOpen(true);
            }}
          >
            <h4 className="text-white text-xs">+ Nuevo Docente</h4>
          </button>
        </div>
      </div>
      <Grid
        container
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]"
      >
        <Grid item xs={12} className="text-black h-full">
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
        </Grid>
      </Grid>

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
