import DynamicTable from "../DynamicTable";
import { useMemo } from "react";
import {
  useGetAreasLazyQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { styled } from "@material-ui/styles";
import edit from "../../public/assets/01editar.png";
import delet from "../../public/assets/01eliminar.png";
import SearchIcon from "@mui/icons-material/Search";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import Image from "next/image";
import Table from "../Table";

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

const CssTextField = styled(TextField)({
  fontFamily: ["Scada", "sans-serif"].join(","),
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

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
        <CssTextField
          required
          label="Nombre Area"
          name="name"
          color="success"
          type="text"
          value={formValue.name}
          onChange={({ target }: any) =>
            setFormValue({ ...formValue, [target.name]: target.value })
          }
          helperText={errors.name}
        />
      ),
    },
  ];

  const processedAreas = useMemo(() => {
    if (!data?.areas) return [];
    return data.areas.map((areas, index) => ({
      name: areas?.name ?? "",
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setAreaAdd(false);
            // We set the values selected to our inputs
            setFormValue((a: any) => ({
              ...a,
              name: areas?.name,
              status: areas?.status,
              id_area: areas?.id_area,
            }));
            setOpen(true);
          }}
        >
          <Image
            className={`h-13 w-15`}
            src={delet}
            alt=""
            width={50}
            height={50}
          />
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
              if (result.isConfirmed && areas?.id_area) {
                DeleteArea({
                  variables: { idArea: areas?.id_area },
                }).then((res) => {
                  if (res.data?.deleteArea) {
                    console.log("DELETEADO");

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
          <Image
            className={`h-13 w-15`}
            src={edit}
            alt=""
            width={50}
            height={50}
          />
        </button>
      ),
    }));
  }, [data, DeleteArea]);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container>
        <Grid item xs={6}>
          <strong className="text-2xl text-black ps-8 pb-4">
            Listado de Áreas
          </strong>
        </Grid>
        <Grid item xs={6} className="text-end pr-6">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-2 rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setAreaAdd(true);
              setOpen(true);
            }}
          >
            <h4 className="text-white">+ Nueva Área</h4>
          </button>
        </Grid>
      </Grid>
      <Grid
        container
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        <Grid item xs={12}>
          <form role="search">
            <Grid container>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={1} className="text-end pt-4">
                    <SearchIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <input
                      className="w-full bg-gray2 text-black rounded-[2rem] border-0 p-3"
                      type="search"
                      placeholder="Buscar Área"
                      aria-label="Search"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} className="text-end">
                <select
                  className={`bg-gray2 text-gray3 rounded-[2rem] border-0 p-3 fs-5 w-[70%] opacity${
                    active ? "active" : ""
                  } transitionDown ${active ? "active" : ""}`}
                >
                  <option>Filtrar por</option>
                  <option>Nombre</option>
                  <option>Apellido</option>
                </select>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.areas ? (
            <div
              className="d-flex border-white py-4"
              style={{ height: "32rem" }}
            >
              <Table column={columns} data={processedAreas} type={"area"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </Grid>
      </Grid>
      {/* Modal */}

      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={areaAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Area Creada!"}
        updateSuccessMsg={"Area Actualizada!"}
        formValues={formValue}
        addMutation={CreateArea}
        updateMutation={UpdateArea}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default Areas;
