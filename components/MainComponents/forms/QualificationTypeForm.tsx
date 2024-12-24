import { Input } from "@/components/Input";
import {
  useCreateQualificationTypeMutation,
  useUpdateQualificationsMutation,
} from "@/generated/graphql";
import React, { useState } from "react";

export const QualificationTypeForm = ({
  qualification,
  onClose,
}: {
  qualification?: any;
  onClose: any;
}) => {
  const [AddQualificationType] = useCreateQualificationTypeMutation();
  const [UpdateQualificationType] = useUpdateQualificationsMutation();
  const [formValues, setFormValues] = useState<any>({
    ceiling_score: "",
    floor_score: "",
    name: "",
    year: "",
  });
  const [errors, setErrors] = useState<any>({
    ceiling_score: "",
    floor_score: "",
    id_type_qual: "",
    name: "",
    year: "",
  });

  const validationEvent = () => {
    if (
      formValues.ceiling_score &&
      formValues.floor_score &&
      formValues.name &&
      formValues.year
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

  // Me are using formvalues for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }

    for (const i in formValues) {
      setFormValues((val: any) => ({ ...val, [i]: "" }));
    }
  };
  const handlerCreateQualificationType = async () => {
    if (validationEvent()) {
      await AddQualificationType({
        variables: { createTypeQualificationInput: formValues },
      });
    }
  };
  const handlerUpdateQualificationType = async () => {
    if (validationEvent()) {
      await UpdateQualificationType({
        variables: { updateQualificationsInput: formValues },
      });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Input
        required
        name="name"
        type="text"
        value={formValues.name}
        onChange={({ target }: any) =>
          setFormValues({ ...formValues, [target.name]: target.value })
        }
        label="Nombre del tipo de nota"
        errorText={errors.name}
      />
      <Input
        required
        name="floor_score"
        type="number"
        value={formValues.floor_score}
        onChange={({ target }: any) => {
          const val = parseFloat(target.value);
          setFormValues({ ...formValues, [target.name]: val });
        }}
        label="Piso"
        errorText={errors.floor_score}
      />
      <Input
        required
        name="ceiling_score"
        type={"number"}
        value={formValues.ceiling_score}
        onChange={({ target }: any) => {
          const val = parseFloat(target.value);
          setFormValues({ ...formValues, [target.name]: val });
        }}
        label="Ceiling"
        errorText={errors.ceiling_score}
      />
      <Input
        required
        name="year"
        type={"number"}
        value={formValues.year}
        onChange={({ target }: any) => {
          const val = parseInt(target.value);
          setFormValues({ ...formValues, [target.name]: val });
        }}
        label="Año"
        errorText={errors.year}
      />
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!formValues?.id ? (
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
