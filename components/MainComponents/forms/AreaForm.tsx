import { Input } from "@/components/Input";
import {
  useCreateAreaMutation,
  useGetAreasQuery,
  useUpdateAreaMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const AreaForm = ({
  area,
  onClose,
  setArea,
}: {
  area?: any;
  onClose: any;
  setArea: any;
}) => {
    const {refetch} = useGetAreasQuery();
  
  const [UpdateArea] = useUpdateAreaMutation();
  const [CreateArea] = useCreateAreaMutation();

  const [errors, setErrors] = useState<any>({
    name: "",
  });
  const handlerCreateArea = async () => {
    if (validationEvent()) {
      await CreateArea({ variables: { createAreaInput: {
        name: area.name,
        status: area.status,
      } } }).then((res) => {
        if (res.data) {
          refetch()
          cleaningStates();
          onClose();
        }
      });
    }
  };
  const handlerUpdateArea = async () => {
    if (validationEvent()) {
      await UpdateArea({ variables: { updateAreaInput: area } }).then((res) => {
        if (res.data) {
          refetch()
          onClose();
          cleaningStates();
        }
      });
    }
  };
  const validationEvent = () => {
    if (area.name) {
      return true;
    } else {
      for (const item in area) {
        if (!area[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };
  // Me are using area for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    for (const i in area) {
      setArea((val: any) => ({ ...val, [i]: "" }));
    }
  };

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
              setArea((t: any) => ({
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
          {!area?.id_area ? (
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
