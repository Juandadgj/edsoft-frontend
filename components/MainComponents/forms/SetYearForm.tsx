import { Input } from "@/components/Input";
import { scholarYearService } from "@/services/api.service";
import React from "react";

const SetYearForm = ({
  year,
  years,
  onClose,
  setSchoolYear,
  type,
  onSuccess,
}: {
  year: any;
  years: any;
  onClose: any;
  setSchoolYear: any;
  type: boolean;
  onSuccess?: () => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<any>({
    id_year: "",
    rector: "",
    secretary: "",
    comment: "",
  });
  const validationEvent = () => {
    if (year.id_year && year.rector && year.secretary) {
      if (year.id_year) {
        const year_repeated = years?.filter(
          (schoYear: any) => schoYear?.id_year === year.id_year
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
      for (const item in year) {
        if (!year[item]) {
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
    for (const i in year) {
      setSchoolYear((val: any) => ({ ...val, [i]: "" }));
    }
  };
  const handlerCreateYear = async () => {
    if (validationEvent()) {
      setLoading(true);
      try {
        const createData = {
          id_year: year.id_year,
          rector: year.rector,
          secretary: year.secretary,
          comment: year.comment,
        };
        const res = await scholarYearService.create(createData);
        if (res) {
          cleaningStates();
          onSuccess?.();
          onClose();
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const handlerUpdateYear = async () => {
    if (validationEvent()) {
      setLoading(true);
      try {
        const updateData = {
          id_year: year.id_year,
          rector: year.rector,
          secretary: year.secretary,
          comment: year.comment,
        };
        const res = await scholarYearService.update(updateData);
        if (res) {
          cleaningStates();
          onSuccess?.();
          onClose();
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Input
        required
        name="id_year"
        type="number"
        value={year.id_year}
        onChange={({ target }: any) => {
          const val = parseInt(target.value);
          setSchoolYear({ ...year, [target.name]: val });
        }}
        label="Año escolar"
        errorText={errors.id_year}
      />
      <Input
        required
        name="rector"
        type="text"
        value={year.rector}
        onChange={({ target }: any) => {
          setSchoolYear({ ...year, [target.name]: target.value });
        }}
        label="Nombres y Apellidos del rector"
        errorText={errors.rector}
      />
      <Input
        required
        name="secretary"
        type="text"
        value={year.secretary}
        onChange={({ target }: any) => {
          setSchoolYear({ ...year, [target.name]: target.value });
        }}
        label="Nombres y Apellidos del secretario"
        errorText={errors.secretary}
      />
      <Input
        required
        name="comment"
        type="text"
        value={year.comment}
        onChange={({ target }: any) => {
          setSchoolYear({ ...year, [target.name]: target.value });
        }}
        label="Comentarios"
        errorText={errors.comment}
      />
      <div className="flex justify-center items-center gap-3 col-span-2">
        <div>
          {type ? (
            <button
              onClick={handlerUpdateYear}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Editar año
            </button>
          ) : (
            <button
              onClick={handlerCreateYear}
              className="btn bg-main-blue border-none text-white hover:bg-[#0b5ed7] transition duration-500"
            >
              Guardar año
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
