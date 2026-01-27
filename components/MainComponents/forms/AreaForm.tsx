import { Input } from "@/components/Input";
import { areaService } from "@/services/api.service";
import type { Area, CreateAreaDto, UpdateAreaDto } from "@/types/api.types";
import React, { useState } from "react";

export const AreaForm = ({
  area,
  onClose,
  setArea,
  onSuccess,
}: {
  area?: any;
  onClose: any;
  setArea: any;
  onSuccess?: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>({
    name: "",
  });

  const handlerCreateArea = async () => {
    if (validationEvent()) {
      setLoading(true);
      try {
        const createData: CreateAreaDto = {
          name: area.name,
          status: area.status,
        };
        const res = await areaService.create(createData);
        if (res) {
          onSuccess?.();
          cleaningStates();
          onClose();
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handlerUpdateArea = async () => {
    if (validationEvent()) {
      setLoading(true);
      try {
        const updateData: UpdateAreaDto = {
          id_area: area.id_area,
          name: area.name,
          status: area.status,
        };
        const res = await areaService.update(updateData);
        if (res) {
          onSuccess?.();
          onClose();
          cleaningStates();
        }
      } finally {
        setLoading(false);
      }
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
