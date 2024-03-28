import { useMemo } from "react";
import { useEffect, useState } from "react";
import {
  useCreateSetYearMutation,
  useGetSchoolarYearsQuery,
  useUpdateScholarYearMutation,
} from "../../generated/graphql";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import Table from "../Table";
import { Input } from "../Input";

const columns = [
  {
    Header: "Año",
    accessor: "year",
  },
  {
    Header: "Rector",
    accessor: "rector",
  },
  {
    Header: "Secretario",
    accessor: "secretary",
  },
  {
    Header: "Detalle",
    accessor: "details",
  },
  {
    Header: "Editar",
    accessor: "edit",
  },
];

function SetYear() {
  const [AddSetYear] = useCreateSetYearMutation();
  const [UpdateSchoolarYear] = useUpdateScholarYearMutation();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);

  // Form to manage inputs values
  const [formValues, setFormValues] = useState<any>({
    id_year: "",
    rector: "",
    secretary: "",
    comment: "",
  });

  // Obj to manage every input error
  const [errors, setErrors] = useState<any>({
    id_year: "",
    rector: "",
    secretary: "",
    comment: "",
  });

  const { data, loading, error, refetch } = useGetSchoolarYearsQuery();

  useEffect(() => {
    setActive(true);
  }, []);

  const validationEvent = () => {
    if (formValues.id_year && formValues.rector && formValues.secretary) {
      if (typeAdd) {
        const year_repeated = data?.scholarYears.filter(
          (schoYear) => schoYear?.id_year === formValues.id_year
        );
        if (year_repeated!.length > 0) {
          setOpen(false);
          Swal.fire({
            icon: "error",
            title: "Año establecido ya existe...",
            showConfirmButton: false,
            timer: 1700,
          });
          cleaningStates();
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

  const arrayInputs: Array<any> = [
    {
      html: (
        <Input
          required
          disabled={!typeAdd}
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
      ),
    },
    {
      html: (
        <Input
          required
          name="rector"
          type="text"
          value={formValues.rector}
          onChange={({ target }: any) => {
            setFormValues({ ...formValues, [target.name]: target.value });
          }}
          placeholder="Rector"
          label="Nombres y Apellidos del rector"
          errorText={errors.rector}
        />
      ),
    },
    {
      html: (
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
      ),
    },
    {
      html: (
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
      ),
    },
  ];

  const processedScholarYears = useMemo(() => {
    if (!data?.scholarYears) return [];
    return data.scholarYears.map((schoYear, index) => ({
      year: schoYear?.id_year ?? "",
      rector: schoYear?.rector ?? "",
      secretary: schoYear?.secretary ?? "",
      details: schoYear?.comment ?? "",
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            setFormValues((t: any) => ({
              ...t,
              id_year: schoYear?.id_year,
              secretary: schoYear?.secretary,
              rector: schoYear?.rector,
              comment: schoYear?.comment,
            }));
            modal?.showModal();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 36 36"
          >
            <path
              fill="#0055A6"
              d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z"
              className="clr-i-outline clr-i-outline-path-1"
            />
            <path
              fill="#0055A6"
              d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.69 1.69 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z"
              className="clr-i-outline clr-i-outline-path-2"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </button>
      ),
    }));
  }, [data]);

  const handlerCreateSetYear = async () => {
    return await AddSetYear({
      variables: { createScholarYearInput: formValues },
    });
  };
  const handlerUpdateSetYear = async () => {
    return await UpdateSchoolarYear({
      variables: { updateScholarYearInput: formValues },
    });
  };

  const modal = document.getElementById("modal") as HTMLDialogElement;

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-10 pb-3">
      <div className="h-[6%] flex justify-between">
        <div>
          <strong className="text-xl text-black ps-8 pb-4">
            Elegir Año Académico
          </strong>
        </div>
        <div className="text-end pr-6">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-full btn-sm rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setTypeAdd(true);
              modal?.showModal();
            }}
          >
            <h4 className="text-white text-xs">+ Nuevo Año</h4>
          </button>
        </div>
      </div>
      <div className="mx-auto  bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        <div className="text-black h-full">
          {loading && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          )}
          {error && <div>¡Ocurrio un error!</div>}
          {data?.scholarYears && !loading && (
            <div className="border-white py-4 h-full">
              <Table
                column={columns}
                data={processedScholarYears}
                type={"setYear"}
              />
            </div>
          )}
        </div>
      </div>

      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Calificacion Creada!"}
        updateSuccessMsg={"Calificacion Actualizada!"}
        formValues={formValues}
        addMutation={handlerCreateSetYear}
        updateMutation={handlerUpdateSetYear}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default SetYear;
