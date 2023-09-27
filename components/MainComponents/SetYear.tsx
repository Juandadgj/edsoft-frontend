import DynamicTable from "../DynamicTable";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import edit from "../../public/assets/01editar.png";
import { Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  useCreateSetYearMutation,
  useGetSchoolarYearsQuery,
  useUpdateSchoolarYearMutation,
} from "../../generated/graphql";
import { styled } from "@material-ui/styles";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import Image from "next/image";
import Table from "../Table";

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

function SetYear() {
  const [AddSetYear] = useCreateSetYearMutation();
  const [UpdateSchoolarYear] = useUpdateSchoolarYearMutation();
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
        <CssTextField
          required
          disabled={!typeAdd}
          label="Año"
          name="id_year"
          color="success"
          type="number"
          value={formValues.id_year}
          onChange={({ target }: any) => {
            const val = parseInt(target.value);
            setFormValues({ ...formValues, [target.name]: val });
          }}
          helperText={errors.id_year}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Rector"
          name="rector"
          color="success"
          type="text"
          value={formValues.rector}
          onChange={({ target }: any) => {
            setFormValues({ ...formValues, [target.name]: target.value });
          }}
          helperText={errors.rector}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Secretaria"
          name="secretary"
          color="success"
          type="text"
          value={formValues.secretary}
          onChange={({ target }: any) => {
            setFormValues({ ...formValues, [target.name]: target.value });
          }}
          helperText={errors.secretary}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Detalles"
          name="comment"
          color="success"
          type="text"
          value={formValues.comment}
          onChange={({ target }: any) => {
            setFormValues({ ...formValues, [target.name]: target.value });
          }}
          helperText={errors.comment}
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
            setOpen(true);
          }}
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
  }, [data]);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container>
        <Grid item xs={6}>
          <strong className="text-2xl text-black ps-8 pb-4">
            Elegir Año Académico
          </strong>
        </Grid>
        <Grid item xs={6} className="text-end pr-6">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-2 rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setTypeAdd(true);
              setOpen(true);
            }}
          >
            <h4 className="text-white">+ Nuevo Año</h4>
          </button>
        </Grid>
      </Grid>
      <Grid
        container
        className="mx-auto  bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
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
                      placeholder="Buscar Año"
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
        <Grid item xs={12} className="text-black">
          {loading && (
            <div className="w-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          )}
          {error && <div>¡Ocurrio un error!</div>}
          {data?.scholarYears && !loading && (
            <div
              className="d-flex border-white py-4"
              style={{ height: "32rem" }}
            >
              <Table
                column={columns}
                data={processedScholarYears}
                type={"setYear"}
              />
            </div>
          )}
        </Grid>
      </Grid>

      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Calificacion Creada!"}
        updateSuccessMsg={"Calificacion Actualizada!"}
        formValues={formValues}
        addMutation={AddSetYear}
        updateMutation={UpdateSchoolarYear}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default SetYear;
