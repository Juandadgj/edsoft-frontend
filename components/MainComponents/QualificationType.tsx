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
import CustomModal from "../CustomModal";
import { QualificationTypeForm } from "./forms/QualificationTypeForm";
import { ContainerComponents } from "../ContainerComponents";

const columns = [
  {
    title: "Nombre Calificacion",
    dataIndex: "qualificationName",
    key: "qualificationName",
  },
  {
    title: "Piso",
    dataIndex: "floor",
    key: "floor",
  },
  {
    title: "Ceiling",
    dataIndex: "ceiling",
    key: "ceiling",
  },
  {
    title: "Año",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Notas",
    dataIndex: "notes",
    key: "notes",
  },
  {
    title: "Editar",
    dataIndex: "edit",
    key: "edit",
  },
  {
    title: "Borrar",
    dataIndex: "borrar",
    key: "borrar",
  },
];

function QualificationType() {
  const [DeleteQualificationType] = useDeleteQualificationTypeMutation();
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);

  const { data, loading, error, refetch } = useGetQualificationQuery();

  // Form to manage inputs values
  const [qualification, setQualification] = useState<any>({
    ceiling_score: "",
    floor_score: "",
    name: "",
    year: "",
  });

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
            setOpen(true);
            setQualification({
              id_type_qual: quty?.id_type_qual,
              ceiling_score: quty?.ceiling_score,
              floor_score: quty?.floor_score,
              name: quty?.name,
              year: quty?.year,
            });
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
  const hanclerCloseModal = () => {
    setOpen(false);
    setQualification({
      ceiling_score: "",
      floor_score: "",
      name: "",
      year: "",
    });
  };
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Tipo de calificacion
          </strong>
        </h3>
        <div className="flex items-center gap-2">
          <Input type="text" className="grow" placeholder="Buscar" />
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={() => {
              setQualification({
                ceiling_score: "",
                floor_score: "",
                name: "",
                year: "",
              });
              setOpen(true);
            }}
          >
            <h4 className="text-white text-xs">+ Nueva calificacion</h4>
          </button>
        </div>
      </div>
      <div className="text-black">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        ) : data?.typeQualifications ? (
          <div className="d-flex border-white py-4 h-full">
            <Table
              column={columns}
              data={porcessedQualificationType}
            />
          </div>
        ) : (
          <h3>¡Ocurrio un error!</h3>
        )}
      </div>
      {/* Modal */}
      <CustomModal open={open} title={qualification.id_type_qual ? "Editar tipo calificacion" : "Crear tipo calificacion"}>
        <QualificationTypeForm
          qualification={qualification}
          setQualification={setQualification}
          onClose={hanclerCloseModal}
          setOpen={setOpen}
        />
      </CustomModal>
    </ContainerComponents>
  );
}

export default QualificationType;
