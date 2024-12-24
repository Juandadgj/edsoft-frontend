import { Input } from "@/components/Input";
import {
  useCreateAreaMutation,
  useUpdateAreaMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const AreaForm = ({ area, onClose }: { area?: any; onClose: any }) => {
  const [UpdateArea] = useUpdateAreaMutation();
  const [CreateArea] = useCreateAreaMutation();
  const [formValue, setFormValue] = useState<any>({
    name: "",
    status: "",
  });
  const [errors, setErrors] = useState<any>({
    name: "",
  });
  const handlerCreateArea = async () => {
    if (validationEvent()) {
      await CreateArea({ variables: { createAreaInput: formValue } });
    }
    cleaningStates();
  };
  const handlerUpdateArea = async () => {
    if (validationEvent()) {
      await UpdateArea({ variables: { updateAreaInput: formValue } });
    }
    cleaningStates();
  };
  const validationEvent = () => {
    if (formValue.name && formValue.status) {
      return true;
    } else {
      for (const item in formValue) {
        if (!formValue[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };
  // Me are using formvalue for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    for (const i in formValue) {
      setFormValue((val: any) => ({ ...val, [i]: "" }));
    }
  };
  const arrayInputs: Array<any> = [
    {
      html: (
        <Input
          required
          name="name"
          type="text"
          value={formValue.name}
          onChange={({ target }: any) =>
            setFormValue({ ...formValue, [target.name]: target.value })
          }
          label="Nombre del area"
          errorText={errors.name}
        />
      ),
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="form-control text-black">
        <div className="label text-gray5 p-1">
          <label className="text-xs">Nombre</label>
        </div>
        <div className="w-full">
          <input
            name="name"
            value={area ? area.name : ""}
            onChange={({ target }: any) =>
              setFormValue((t: any) => ({
                ...t,
                [target.name]: target.value,
              }))
            }
            className="border rounded-btn border-gray5 w-full h-12 bg-transparent text-sm px-2"
          />
        </div>
        <div>
          <label className="label-text-alt text-[red]">{errors.name}</label>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!formValue?.id ? (
            <button
              onClick={handlerCreateArea}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Agregar
            </button>
          ) : (
            <button
              onClick={handlerUpdateArea}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Editar
            </button>
          )}
        </div>
        <div>
          <button
            onClick={() => {
              onClose();
              cleaningStates();
            }}
            className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
