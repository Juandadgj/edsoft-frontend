import { Input } from "@/components/Input";
import {
  useCreateTeacherMutation,
  useTeachersQuery,
  useUpdateTeacherMutation,
} from "@/generated/graphql";
import React from "react";

export const TeacherForm = ({ teacher, onClose }: { teacher?: any; onClose: any }) => {
  const { refetch } = useTeachersQuery({
    fetchPolicy: "network-only",
  });
  const [AddTeacher] = useCreateTeacherMutation();
  const [UpdateTeacher] = useUpdateTeacherMutation();
  const [formValues, setFormValues] = React.useState<any>({
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
  const [errors, setErrors] = React.useState<any>({
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

  const handlerCreateTeacher = async () => {
    if (validationEvent()) {
      await AddTeacher({ variables: { createTeacherInput: formValues } }).then(
        (res) => {
          if (res.data) {
            cleaningStates();
            refetch();
          }
        }
      );
    }
  };
  const handlerUpdateTeacher = async (form: any) => {
    if (validationEvent()) {
      await UpdateTeacher({
        variables: { updateTeacherInput: formValues },
      }).then((res) => {
        if (res.data) {
          cleaningStates();
          refetch();
        }
      });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
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
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!formValues?.id ? (
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
          <button onClick={onClose} className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
