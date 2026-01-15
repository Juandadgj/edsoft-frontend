import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import { useGroupsQuery } from "@/generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ChartAreaIcon } from "lucide-react";
import React from "react";

const AverageStudentsPerPeriod = () => {
  const { year } = useSchoolYear();

  const {
    data: groups,
    loading: loadingGroups,
    refetch,
  } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });
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
  const processedGroups = groups?.groups.map((group, index) => ({
    id: group?.id_group,
    name: `${group?.level} - ${group?.sublevel}`,
    hour: group?.working_time ?? "",
    group_teacher: group?.representative ?? "",
  }));
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <strong className="text-xl text-black ps-8">
          Porcenta de estudiantes por curso
        </strong>
      </div>{" "}
      {groups?.groups && (
        <TableComponent column={columns} data={processedGroups} />
      )}
    </ContainerComponents>
  );
};

export default AverageStudentsPerPeriod;
