import { Input } from "@/components/Input";
import {
  useCreateSetYearMutation,
  useUpdateScholarYearMutation,
} from "@/generated/graphql";
import React from "react";

const SetYearForm = ({
  year,
  years,
  onClose,
}: {
  year: number;
  years: any;
  onClose: any;
}) => {
  const [AddSetYear] = useCreateSetYearMutation();
  const [UpdateSchoolarYear] = useUpdateScholarYearMutation();
  const [formValues, setFormValues] = React.useState<any>({
    id_year: "",
    rector: "",
    secretary: "",
    comment: "",
  });
  const [errors, setErrors] = React.useState<any>({
    id_year: "",
    rector: "",
    secretary: "",
    comment: "",
  });
  const validationEvent = () => {
    if (formValues.id_year && formValues.rector && formValues.secretary) {
      if (formValues.id_year) {
        const year_repeated = years?.scholarYears.filter(
          (schoYear: any) => schoYear?.id_year === formValues.id_year
        );
        if (year_repeated!.length > 0) {
          setErrors((err: any) => ({
            ...err,
            ["id_year"]: "Año establecido ya existe...",
          }));
          return false;
        }
      }
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

  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    for (const i in formValues) {
      setFormValues((val: any) => ({ ...val, [i]: "" }));
    }
  };
  const handlerCreateYear = async () => {
    if (validationEvent()) {
      await AddSetYear({
        variables: { createScholarYearInput: formValues },
      });
    }
  };
  const handlerUpdateYear = async () => {
    if (validationEvent()) {
      await UpdateSchoolarYear({
        variables: { updateScholarYearInput: formValues },
      });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Input
        required
        name="id_year"
        type="number"
        value={formValues.id_year}
        onChange={({ target }: any) => {
          const val = parseInt(target.value);
          setFormValues({ ...formValues, [target.name]: val });
        }}
        label="Año escolar"
        errorText={errors.id_year}
      />
      <Input
        required
        name="rector"
        type="text"
        value={formValues.rector}
        onChange={({ target }: any) => {
          setFormValues({ ...formValues, [target.name]: target.value });
        }}
        label="Nombres y Apellidos del rector"
        errorText={errors.rector}
      />
      <Input
        required
        name="secretary"
        type="text"
        value={formValues.secretary}
        onChange={({ target }: any) => {
          setFormValues({ ...formValues, [target.name]: target.value });
        }}
        label="Nombres y Apellidos del secretario"
        errorText={errors.secretary}
      />
      <Input
        required
        name="comment"
        type="text"
        value={formValues.comment}
        onChange={({ target }: any) => {
          setFormValues({ ...formValues, [target.name]: target.value });
        }}
        label="Comentarios"
        errorText={errors.comment}
      />
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {!formValues?.id_year ? (
            <button
              onClick={handlerCreateYear}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Agregar
            </button>
          ) : (
            <button
              onClick={handlerUpdateYear}
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

export default SetYearForm;
