import { useMemo } from "react";
import { useGroupsQuery } from "@/generated/graphql";
import DescriptionIcon from "@mui/icons-material/Description";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Jornada",
    dataIndex: "working_time",
    key: "working_time",
  },
  {
    title: "Profesor del Grupo",
    dataIndex: "group_teacher",
    key: "group_teacher",
  },
  {
    title: "Planillar",
    dataIndex: "editar",
    key: "editar",
  },
];
const AbsencesPerMonth = () => {
  const { year } = useSchoolYear();
  const { data, loading } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });

  const processedGroups = useMemo(() => {
    if (!data?.groups) return [];
    return data.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}`,
      working_time: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button className="btn btn-ghost border-0">
          <DescriptionIcon color="action" fontSize="medium" />
        </button>
      ),
    }));
  }, [data]);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3 className="">
          <strong className="text-2xl text-black ps-8">
            Cursos Creados para el año {year} para la planilla de inasistencia
            por mes
          </strong>
        </h3>
      </div>
      <div className="h-full">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        ) : data?.groups ? (
          <TableComponent column={columns} data={processedGroups} />
        ) : (
          <h3>¡Ocurrio un error!</h3>
        )}
      </div>
    </ContainerComponents>
  );
};

export default AbsencesPerMonth;
