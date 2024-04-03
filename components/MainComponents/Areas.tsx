import { useMemo } from "react";
import {
  useGetAreasLazyQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import Table from "../Table";
import { Input } from "../Input";

const columns = [
  {
    Header: "Nombre",
    accessor: "name",
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

function Areas() {
  const [UpdateArea] = useUpdateAreaMutation();
  const [CreateArea] = useCreateAreaMutation();
  const [DeleteArea] = useDeleteAreaMutation();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [areaAdd, setAreaAdd] = useState(false);

  const [getArea, { data, loading, error, refetch }] = useGetAreasLazyQuery();
  console.log(data, loading, error);

  // Form to manage inputs values
  const [formValue, setFormValue] = useState<any>({
    name: "",
    status: "",
  });

  useEffect(() => {
    console.log("VALUES: ", formValue);
  }, [formValue]);

  // Obj to manage every input error
  const [errors, setErrors] = useState<any>({
    name: "",
  });

  useEffect(() => {
    setActive(true);
    getArea();
  }, []);

  // Here we validate if every item is filled and if it is we return true
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
    getArea();
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

  const processedAreas = useMemo(() => {
    if (!data?.areas) return [];
    return data.areas.map((area, index) => ({
      name: area?.name ?? "",
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setAreaAdd(false);
            // We set the values selected to our inputs
            setFormValue((a: any) => ({
              ...a,
              name: area?.name,
              status: area?.status,
              id_area: area?.id_area,
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
          className="border-0 "
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
              // If there is an id selected we delete that area
              if (result.isConfirmed && area?.id_area) {
                DeleteArea({
                  variables: { idArea: area?.id_area },
                }).then((res) => {
                  if (res.data?.deleteArea) {
                    Swal.fire({
                      title: "Eliminado",
                      text: "Area Eliminada!",
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
  }, [data, DeleteArea]);

  const handlerCreateArea = async () => {
    return await CreateArea({ variables: { createAreaInput: formValue } });
  };

  const handlerUpdateArea = async () => {
    return await UpdateArea({ variables: { updateAreaInput: formValue } });
  };

  const modal = document.getElementById("modal") as HTMLDialogElement;

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-10 pb-3">
      <div className="flex justify-between h-[6%]">
        <div>
          <strong className="text-xl text-black ps-8 pb-4">
            Listado de Áreas
          </strong>
        </div>
        <div className="text-end pr-6">
          <button
            type="button"
            className="btn bg-main-blue btn-primary w-[16rem] mb-0 pb-0 !h-full btn-sm rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setAreaAdd(true);
              modal?.showModal();
            }}
          >
            <h4 className="text-white">+ Nueva Área</h4>
          </button>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        <div className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : data?.areas ? (
            <div className="d-flex border-white py-4 h-full">
              <Table column={columns} data={processedAreas} type={"area"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      </div>
      {/* Modal */}

      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={areaAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Area Creada!"}
        updateSuccessMsg={"Area Actualizada!"}
        formValues={formValue}
        addMutation={handlerCreateArea}
        updateMutation={handlerUpdateArea}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default Areas;
