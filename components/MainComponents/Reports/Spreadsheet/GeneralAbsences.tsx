import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useGroupsQuery } from "@/generated/graphql";
import Table from "@/components/Table";
import DescriptionIcon from '@mui/icons-material/Description';

const columns = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Jornada",
    accessor: "working_time",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  {
    Header: "Planillar",
    accessor: "editar",
  }
];
const GeneralAbsences = () => {
  
  const year = sessionStorage.getItem("year");
  const yearParse = parseInt(year ? year : "", 10);
  const [active, setActive] = useState(false);
  
  const { data, loading } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: yearParse } },
  });

  useEffect(() => {
    setActive(true);
  }, []);

  const processedGroups = useMemo(() => {
    if (!data?.groups) return [];
    return data.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}` ?? "",
      working_time: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button className="btn btn-ghost border-0">
          <DescriptionIcon color="action" fontSize="medium" />
        </button>
      )
    }));
  }, [data]);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1">
      <div>
        <div className="pb-4">
          <strong className="text-2xl text-black ps-8">
            Cursos Creados para el año {year} para la planilla de inasistencia
          </strong>
        </div>
      </div>
      <div
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        <div  className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : data?.groups ? (
            <div
              className="d-flex border-white py-4 h-full"
            >
              <Table column={columns} data={processedGroups} type={"groups"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default GeneralAbsences
