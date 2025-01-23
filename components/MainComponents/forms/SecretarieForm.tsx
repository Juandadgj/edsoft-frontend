import { Input } from "@/components/Input";
import {
  useCreateTeacherMutation,
  useTeachersQuery,
  useUpdateTeacherMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const SecretarieForm = ({
  secretarie,
  setSecretarie,
  onClose,
  setOpen
}: {
  secretarie?: any;
  setSecretarie: any;
  onClose: any;
  setOpen: any;
}) => {
  const { refetch } = useTeachersQuery({
    fetchPolicy: "network-only",
  });
  const [AddTeacher] = useCreateTeacherMutation();
  const [UpdateTeacher] = useUpdateTeacherMutation();
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
  // Here we validate if every item is filled and if it is we return true
  const validationEvent = () => {
    if (
      secretarie.name &&
      secretarie.last_name &&
      secretarie.identification &&
      secretarie.direction &&
      secretarie.phone &&
      secretarie.email &&
      secretarie.degree
    ) {
      return true;
    } else {
      for (const item in secretarie) {
        if (!secretarie[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };

  // Me are using secretarie for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }

    for (const i in secretarie) {
      if (i === "id_teacher") {
        setSecretarie((val: any) => ({ ...val, [i]: undefined }));
      } else if (i === "type_id") {
        setSecretarie((val: any) => ({ ...val, [i]: 2 }));
      } else {
        setSecretarie((val: any) => ({ ...val, [i]: "" }));
      }
    }
  };
  const handlerCreateTeacher = async () => {
    if (validationEvent()) {
      await AddTeacher({ variables: { createTeacherInput: secretarie } }).then(
        (res) => {
          if (res.data) {
            cleaningStates();
            refetch();
            setOpen(false);
          }
        }
      );
    }
  };
  const handlerUpdateTeacher = async (form: any) => {
    if (validationEvent()) {
      await UpdateTeacher({
        variables: { updateTeacherInput: secretarie },
      }).then((res) => {
        if (res.data) {
          cleaningStates();
          refetch();
          setOpen(false);
        }
      });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Input
        name="name"
        value={secretarie.name}
        onChange={({ target }: any) =>
          setSecretarie({ ...secretarie, [target.name]: target.value })
        }
        type="text"
        label="Nombres"
        errorText={errors.name}
      />
      <Input
        name="last_name"
        value={secretarie.last_name}
        onChange={({ target }: any) =>
          setSecretarie({ ...secretarie, [target.name]: target.value })
        }
        type="text"
        label="Apellidos"
        errorText={errors.last_name}
      />
      <Input
        name="identification"
        value={secretarie.identification}
        onChange={({ target }: any) =>
          setSecretarie({ ...secretarie, [target.name]: target.value })
        }
        type="text"
        label="Numero de Identificacion"
        errorText={errors.identification}
      />
      <Input
        required
        name="direction"
        value={secretarie.direction}
        onChange={({ target }: any) =>
          setSecretarie({ ...secretarie, [target.name]: target.value })
        }
        type="text"
        label="Direccion"
        errorText={errors.direction}
      />
      <Input
        required
        name="phone"
        value={secretarie.phone}
        onChange={({ target }: any) =>
          setSecretarie({ ...secretarie, [target.name]: target.value })
        }
        label="Telefono"
        type="text"
        errorText={errors.phone}
      />
      <Input
        required
        name="email"
        value={secretarie.email}
        onChange={({ target }: any) =>
          setSecretarie({ ...secretarie, [target.name]: target.value })
        }
        type="email"
        placeholder="example@correo.com"
        label="Correo electronico"
        errorText={errors.email}
      />
      <Input
        required
        name="degree"
        value={secretarie.degree}
        onChange={({ target }: any) =>
          setSecretarie({ ...secretarie, [target.name]: target.value })
        }
        type="text"
        label="Titulo"
        errorText={errors.degree}
      />
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!secretarie?.id_teacher ? (
            <button
              onClick={handlerCreateTeacher}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Agregar
            </button>
          ) : (
            <button
              onClick={handlerUpdateTeacher}
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
