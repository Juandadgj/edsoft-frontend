import { Input } from "@/components/Input";
import {
  useCreateTeacherMutation,
  useTeachersQuery,
  useUpdateTeacherMutation,
} from "@/generated/graphql";
import { notification } from "antd";
import React from "react";

export const TeacherForm = ({
  teacher,
  setTeacher,
  onClose,
  setOpen,
}: {
  teacher?: any;
  setTeacher: any;
  onClose: any;
  setOpen: any;
}) => {
  const { refetch } = useTeachersQuery({
    fetchPolicy: "network-only",
  });
  const [AddTeacher, { loading, data, error }] = useCreateTeacherMutation();
  const [
    UpdateTeacher,
    { loading: loadingUpdate, data: dataUpdate, error: errorUpdate },
  ] = useUpdateTeacherMutation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string) => {
    api.info({
      message: message,
      placement: "topRight",
    });
  };
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
      teacher.name &&
      teacher.last_name &&
      teacher.identification &&
      teacher.direction &&
      teacher.phone &&
      teacher.email &&
      teacher.degree
    ) {
      return true;
    } else {
      for (const item in teacher) {
        if (!teacher[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };
  // We are using teacher for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    for (const i in teacher) {
      if (i === "id_teacher") {
        setTeacher((val: any) => ({ ...val, [i]: undefined }));
      } else if (i === "type_id") {
        setTeacher((val: any) => ({ ...val, [i]: 1 }));
      } else {
        setTeacher((val: any) => ({ ...val, [i]: "" }));
      }
    }
  };

  const handlerCreateTeacher = async () => {
    if (validationEvent()) {
      await AddTeacher({ variables: { createTeacherInput: teacher } }).then(
        (res: any) => {
          if (res.data?.createTeacher) {
            cleaningStates();
            refetch();
            openNotification("Docente creado exitosamente");
            setOpen(false);
          }
        }
      );
    }
  };
  const handlerUpdateTeacher = async () => {
    if (validationEvent()) {
      await UpdateTeacher({
        variables: { updateTeacherInput: teacher },
      }).then((res: any) => {
        if (res.data?.updateTeacher) {
          cleaningStates();
          refetch();
          openNotification("Docente actualizado exitosamente");
          setOpen(false);
        }
      });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {contextHolder}
      <Input
        name="name"
        value={teacher.name}
        onChange={({ target }: any) =>
          setTeacher({ ...teacher, [target.name]: target.value })
        }
        type="text"
        label="Nombres"
        errorText={errors.name}
      />
      <Input
        name="last_name"
        value={teacher.last_name}
        onChange={({ target }: any) =>
          setTeacher({ ...teacher, [target.name]: target.value })
        }
        type="text"
        label="Apellidos"
        errorText={errors.last_name}
      />
      <Input
        name="identification"
        value={teacher.identification}
        onChange={({ target }: any) =>
          setTeacher({ ...teacher, [target.name]: target.value })
        }
        type="text"
        label="Numero de Identificacion"
        errorText={errors.identification}
      />
      <Input
        required
        name="direction"
        value={teacher.direction}
        onChange={({ target }: any) =>
          setTeacher({ ...teacher, [target.name]: target.value })
        }
        type="text"
        label="Direccion"
        errorText={errors.direction}
      />
      <Input
        required
        name="phone"
        value={teacher.phone}
        onChange={({ target }: any) =>
          setTeacher({ ...teacher, [target.name]: target.value })
        }
        label="Telefono"
        type="text"
        errorText={errors.phone}
      />
      <Input
        required
        name="email"
        value={teacher.email}
        onChange={({ target }: any) =>
          setTeacher({ ...teacher, [target.name]: target.value })
        }
        type="email"
        placeholder="example@correo.com"
        label="Correo electronico"
        errorText={errors.email}
      />
      <Input
        required
        name="degree"
        value={teacher.degree}
        onChange={({ target }: any) =>
          setTeacher({ ...teacher, [target.name]: target.value })
        }
        type="text"
        label="Titulo"
        errorText={errors.degree}
      />
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!teacher?.id_teacher ? (
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
