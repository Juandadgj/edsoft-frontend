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
import { Input } from "../Input";
import TableComponent from "../Table";
import { ContainerComponents } from "../ContainerComponents";
import CustomModal from "../CustomModal";
import { AreaForm } from "./forms/AreaForm";
import { Space } from "antd";

const columns: {
  key: string;
  title: string;
  dataIndex: string;
  render?: any;
}[] = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    render: (_: any, record: any) => (
      <Space size="middle">
        {record.edit}
        {record.delete}
      </Space>
    ),
  },
];

const  Areas = () => {

  const [DeleteArea] = useDeleteAreaMutation();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const [getArea, { data, loading, error, refetch }] = useGetAreasLazyQuery();

  // Form to manage inputs values
  const [area, setArea] = useState<any>({
    name: "",
    status: "",
  });

  useEffect(() => {
    setActive(true);
    getArea();
  }, []);

  const processedAreas = useMemo(() => {
    if (!data?.areas) return [];
    return data.areas.map((area, index) => ({
      name: area?.name ?? "",
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setArea({
              name: area?.name,
              status: area?.status,
              id_area: area?.id_area,
            });
            setOpen(true);
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
      delete: (
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

  const hanclerCloseModal = () => {
    setOpen(false);
    setArea({
      name: "",
      status: "",
      id_area: "",
    });
  };
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8 pb-4">
            Listado de Áreas
          </strong>
        </h3>
        <div className="text-end pr-6">
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={() => {
              setArea({
                name: "",
                status: "",
                id_area: "",
              });
              setOpen(true);
            }}
          >
            <h4 className="text-white">+ Nueva Área</h4>
          </button>
        </div>
      </div>
      <div className="text-black">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        ) : data?.areas ? (
          <div className="border-white py-4 h-full">
            <TableComponent column={columns} data={processedAreas} />
          </div>
        ) : (
          <h3>¡Ocurrio un error!</h3>
        )}
      </div>
      <CustomModal open={open} title={area.id_area ? 'Editar area': 'Crear area'}>
        <AreaForm area={area} onClose={hanclerCloseModal} setArea={setArea} />
      </CustomModal>
    </ContainerComponents>
  );
}

export default Areas;
