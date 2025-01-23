import { Input } from "@/components/Input";
import {
  useCreateQualificationTypeMutation,
  useGetQualificationQuery,
  useUpdateQualificationsMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const QualificationTypeForm = ({
  qualification,
  setQualification,
  onClose,
  setOpen,
}: {
  qualification?: any;
  setQualification: any;
  onClose: any;
  setOpen: any;
}) => {
  const { refetch } = useGetQualificationQuery({
    fetchPolicy: "network-only",
  });
  const [AddQualificationType] = useCreateQualificationTypeMutation();
  const [UpdateQualificationType] = useUpdateQualificationsMutation();

  const [errors, setErrors] = useState<any>({
    ceiling_score: "",
    floor_score: "",
    id_type_qual: "",
    name: "",
    year: "",
  });

  const validationEvent = () => {
    if (
      qualification.ceiling_score &&
      qualification.floor_score &&
      qualification.name &&
      qualification.year
    ) {
      return true;
    } else {
      for (const item in qualification) {
        if (!qualification[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };

  // Me are using qualification for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    for (const i in qualification) {
      setQualification((val: any) => ({ ...val, [i]: "" }));
    }
  };

  const handlerCreateQualificationType = async () => {
    if (validationEvent()) {
      await AddQualificationType({
        variables: { createTypeQualificationInput: qualification },
      }).then((res) => {
        if (res.data?.createTypeQualification) {
          cleaningStates();
          setOpen(false);
          refetch();
        }
      });
    }
  };
  const handlerUpdateQualificationType = async () => {
    if (validationEvent()) {
      await UpdateQualificationType({
        variables: { updateQualificationsInput: qualification },
      }).then((res)=> {
        if (res.data?.updateQualifications) {
          cleaningStates();
          setOpen(false);
          refetch();
        }
      })
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Input
        required
        name="name"
        type="text"
        value={qualification.name}
        onChange={({ target }: any) =>
          setQualification({ ...qualification, [target.name]: target.value })
        }
        label="Nombre del tipo de nota"
        errorText={errors.name}
      />
      <Input
        required
        name="floor_score"
        type="number"
        value={qualification.floor_score}
        onChange={({ target }: any) => {
          const val = parseFloat(target.value);
          setQualification({ ...qualification, [target.name]: val });
        }}
        label="Piso"
        errorText={errors.floor_score}
      />
      <Input
        required
        name="ceiling_score"
        type={"number"}
        value={qualification.ceiling_score}
        onChange={({ target }: any) => {
          const val = parseFloat(target.value);
          setQualification({ ...qualification, [target.name]: val });
        }}
        label="Ceiling"
        errorText={errors.ceiling_score}
      />
      <Input
        required
        name="year"
        type={"number"}
        value={qualification.year}
        onChange={({ target }: any) => {
          const val = parseInt(target.value);
          setQualification({ ...qualification, [target.name]: val });
        }}
        label="Año"
        errorText={errors.year}
      />
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!qualification?.id ? (
            <button
              onClick={handlerCreateQualificationType}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Agregar
            </button>
          ) : (
            <button
              onClick={handlerUpdateQualificationType}
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
