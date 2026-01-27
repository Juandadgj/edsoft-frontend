import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ChartAreaIcon } from "lucide-react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { groupService } from "@/services/api.service";
import type { Group } from "@/types/api.types";

const AverageStudentsPerPeriod = () => {
  const { year } = useSchoolYear();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  const fetchGroups = useCallback(async () => {
    try {
      setLoadingGroups(true);
      const response = await groupService.getAll({ id_year: year });
      setGroups(response);
    } catch (error) {
      console.error("Error fetching groups:", error);
      setGroups([]);
    } finally {
      setLoadingGroups(false);
    }
  }, [year]);

  useEffect(() => {
    if (year) {
      fetchGroups();
    }
  }, [year, fetchGroups]);

  const columns = [
    {
      title: "Curso",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Jornada",
      dataIndex: "hour",
      key: "hour",
    },
    {
      title: "Profesor del Grupo",
      dataIndex: "group_teacher",
      key: "group_teacher",
    },
    {
      title: "Periodos individual",
      dataIndex: "actions",
      key: "actions",
      children: [
        {
          title: "1",
          dataIndex: "periodo1",
          key: "periodo1",
          render: (_: any, record: any) => (
            <button>
              <ChartAreaIcon className="w-5 h-5 text-gray-600" />
            </button>
          ),
        },
        {
          title: "2",
          dataIndex: "periodo2",
          key: "periodo2",
          render: (_: any, record: any) => (
            <button>
              <ChartAreaIcon className="w-5 h-5 text-gray-600" />
            </button>
          ),
        },
        {
          title: "3",
          dataIndex: "periodo3",
          key: "periodo3",
          render: (_: any, record: any) => (
            <button>
              <ChartAreaIcon className="w-5 h-5 text-gray-600" />
            </button>
          ),
        },
        {
          title: "4",
          dataIndex: "periodo4",
          key: "periodo4",
          render: (_: any, record: any) => (
            <button>
              <ChartAreaIcon className="w-5 h-5 text-gray-600" />
            </button>
          ),
        },

        {
          title: "F",
          dataIndex: "final",
          key: "final",
          render: (_: any, record: any) => (
            <button>
              <ChartAreaIcon className="w-5 h-5 text-gray-600" />
            </button>
          ),
        },
      ],
    },
    {
      title: "Periodos agrupados",
      dataIndex: "actions",
      key: "actions",
      children: [
        {
          title: "1 - 2",
          dataIndex: "periodo1",
          key: "periodo1",
          render: (_: any, record: any) => (
            <button>
              <ChartAreaIcon className="w-5 h-5 text-gray-600" />
            </button>
          ),
        },
        {
          title: "1 - 3",
          dataIndex: "periodo2",
          key: "periodo2",
          render: (_: any, record: any) => (
            <button>
              <ChartAreaIcon className="w-5 h-5 text-gray-600" />
            </button>
          ),
        },
        {
          title: "1 - 4",
          dataIndex: "periodo3",
          key: "periodo3",
          render: (_: any, record: any) => (
            <button>
              <ChartAreaIcon className="w-5 h-5 text-gray-600" />
            </button>
          ),
        },
      ],
    },
  ];

  const processedGroups = useMemo(
    () =>
      groups.map((group) => ({
        id: group?.id_group,
        name: `${group?.level} - ${group?.sublevel}`,
        hour: group?.working_time ?? "",
        group_teacher: group?.representative ?? "",
      })),
    [groups]
  );
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <strong className="text-xl text-black ps-8">
          Porcenta de estudiantes por curso
        </strong>
      </div>
      {groups && groups.length > 0 && (
        <TableComponent column={columns} data={processedGroups} />
      )}
    </ContainerComponents>
  );
};

export default AverageStudentsPerPeriod;
