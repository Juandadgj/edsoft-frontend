import DynamicTable from "../DynamicTable";
import { useMemo } from "react";
import { useGetCoursesQuery } from "../../generated/graphql";
import { useEffect, useState } from "react";
import edit from "../../public/assets/01editar.png";
import delet from "../../public/assets/01eliminar.png";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Table from "../Table";

const columns = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Jornada",
    accessor: "jornada",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  {
    Header: "Editar",
    accessor: "editar",
  },
  {
    Header: "Borrar",
    accessor: "borrar",
  },
];

function CreateCourses() {
  const today = new Date();
  const year = today.getFullYear();
  const [active, setActive] = useState(false);
  const { data, loading } = useGetCoursesQuery();
  console.log(data);

  useEffect(() => {
    setActive(true);
  }, []);

  const processedCourses = useMemo(() => {
    if (!data?.groups) return [];
    return data.groups.map((group, index) => ({
      name: group?.id_group ?? "",
      jornada: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button className="border-0">
          <Image
            className={`h-13 w-15`}
            src={edit}
            alt=""
            width={50}
            height={50}
          />
        </button>
      ),
      borrar: (
        <button className="border-0 ">
          <Image
            className={`h-8 w-10`}
            src={delet}
            alt=""
            width={50}
            height={50}
          />
        </button>
      ),
    }));
  }, [data]);

  return (
    <div className="rounded-tl-[40px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container>
        <Grid item xs={6}>
          <strong className="text-2xl text-black ms-20">
            Cursos Creados para el año {year}
          </strong>
        </Grid>
        <Grid item xs={6} className="text-end pr-6">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-2 rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
          >
            <a href="/creardocente">
              <h4 className="text-white">+ Nuevo Curso</h4>
            </a>
          </button>
        </Grid>
      </Grid>
      <Grid
        container
        className="mx-auto bg-white border-2 shadow-2xl rounded-[2rem] p-5 h-full overflow-x-auto"
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
                      placeholder="Buscar Cursos"
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
          ) : data?.groups ? (
            <div
              className="d-flex border-white py-4"
              style={{ height: "32rem" }}
            >
              <Table column={columns} data={processedCourses} type={"course"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateCourses;
