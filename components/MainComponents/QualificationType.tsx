import { useMemo } from "react";
import {
  useCreateQualificationTypeMutation,
  useDeleteQualificationTypeMutation,
  useGetQualificationQuery,
  useUpdateQualificationsMutation,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DynamicModal from "../DynamicModal";

import Table from "../Table";
import { Input } from "../Input";

const columns = [
  {
    Header: "Nombre Calificacion",
    accessor: "qualificationName",
  },
  {
    Header: "Floor",
    accessor: "floor",
  },
  {
    Header: "Ceiling",
    accessor: "ceiling",
  },
  {
    Header: "Año",
    accessor: "year",
  },
  {
    Header: "Notas",
    accessor: "notes",
  },
  {
    Header: "Editar",
    accessor: "edit",
  },
  {
    Header: "Borrar",
    accessor: "delete",
  },
];

function QualificationType() {
  const [DeleteQualificationType] = useDeleteQualificationTypeMutation();
  const [AddQualificationType] = useCreateQualificationTypeMutation();
  const [UpdateQualificationType] = useUpdateQualificationsMutation();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);

  const { data, loading, error, refetch } = useGetQualificationQuery();

  // Form to manage inputs values
  const [formValues, setFormValues] = useState<any>({
    ceiling_score: "",
    floor_score: "",
    name: "",
    year: "",
  });

  // Obj to manage every input error
  const [errors, setErrors] = useState<any>({
    ceiling_score: "",
    floor_score: "",
    id_type_qual: "",
    name: "",
    year: "",
  });

  useEffect(() => {
    setActive(true);
  }, []);

  // Here we validate if every item is filled and if it is we return true
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

  const arrayInputs: Array<any> = [
    {
      html: (
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
      ),
    },
    {
      html: (
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
      ),
    },
    {
      html: (
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
      ),
    },
    {
      html: (
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
      ),
    },
  ];

  const porcessedQualificationType = useMemo(() => {
    if (!data?.typeQualifications) return [];
    return data.typeQualifications.map((quty, index) => ({
      qualificationName: quty?.name ?? "",
      floor: quty?.floor_score ?? "",
      ceiling: quty?.ceiling_score ?? "",
      year: quty?.year ?? "",
      notes: <button className="border-0 ">imagen notitas</button>,
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            // We set the values selected to our inputs
            setFormValues((t: any) => ({
              ...t,
              id_type_qual: quty?.id_type_qual,
              ceiling_score: quty?.ceiling_score,
              floor_score: quty?.floor_score,
              name: quty?.name,
              year: quty?.year,
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
      borrar: (
        <button
          className="border-0"
          onClick={() =>
            Swal.fire({
              title: "¿Estás seguro?",
              text: "No podrás revertir esta acción!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#0055a6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Eliminar",
            }).then((result) => {
              // If there is an id selected we delete that teacher
              if (result.isConfirmed && quty?.id_type_qual) {
                DeleteQualificationType({
                  variables: { idQualificationType: quty?.id_type_qual },
                }).then((res) => {
                  if (res.data?.deleteTypeQualification) {
                    Swal.fire({
                      title: "Eliminado",
                      text: "Tipo Calificacion Eliminada!",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    refetch();
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Ha habido un error...",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
              }
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <path
              fill="#e11d48"
              d="M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12ZM94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Zm48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Z"
            />
          </svg>
        </button>
      ),
    }));
  }, [data, DeleteQualificationType]);

  const handlerCreateQualificationType = async () => {
    return await AddQualificationType({
      variables: { createTypeQualificationInput: formValues },
    });
  };
  const handlerUpdateQualificationType = async () => {
    return await UpdateQualificationType({
      variables: { updateQualificationsInput: formValues },
    });
  };
  const modal = document.getElementById("modal") as HTMLDialogElement;

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-10 pb-3">
      <div className="h-[6%] flex justify-between">
        <div>
          <strong className="text-xl text-black ps-8">
            Tipo de calificacion
          </strong>
        </div>
        <div className="text-end pr-6 h-full [&>button]:h-20">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-full btn-sm rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setTypeAdd(true);
              modal?.showModal();
            }}
          >
            <h4 className="text-white text-xs">+ Nueva calificacion</h4>
          </button>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        <div className="text-black h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.typeQualifications ? (
            <div className="d-flex border-white py-4 h-full">
              <Table
                column={columns}
                data={porcessedQualificationType}
                type={"qualificationType"}
              />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      </div>
      {/* Modal */}

      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Calificacion Creada!"}
        updateSuccessMsg={"Calificacion Actualizada!"}
        formValues={formValues}
        addMutation={handlerCreateQualificationType}
        updateMutation={handlerUpdateQualificationType}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default QualificationType;
