import { useState, useEffect, useCallback, useMemo } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import useSchoolYear from "@/hooks/useSchoolYear";
import TableComponent from "@/components/Table";
import { ContainerComponents } from "@/components/ContainerComponents";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { groupService } from "@/services/api.service";
import type { Group } from "@/types/api.types";

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

const GeneralAbsences = () => {
  const { year } = useSchoolYear();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      const response = await groupService.getAll({ id_year: year });
      setGroups(response);
    } catch (error) {
      console.error("Error fetching groups:", error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    if (year) {
      fetchGroups();
    }
  }, [year, fetchGroups]);

  const processedGroups = useMemo(() => {
    if (!groups) return [];
    return groups.map((group) => ({
      name: `${getCourseLevel(group?.level)} - ${group?.sublevel}`,
      working_time: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button className="btn btn-ghost border-0">
          <DescriptionIcon color="action" fontSize="medium" />
        </button>
      ),
    }));
  }, [groups]);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-2xl text-black ps-8">
            Cursos Creados para el año {year} para la planilla de inasistencia
          </strong>
        </h3>
      </div>
      <div className="h-full">
        <div className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : groups && groups.length > 0 ? (
            <TableComponent column={columns} data={processedGroups} />
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      </div>
    </ContainerComponents>
  );
};

export default GeneralAbsences;
