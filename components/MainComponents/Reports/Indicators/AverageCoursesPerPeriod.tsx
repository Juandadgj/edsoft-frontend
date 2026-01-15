import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import { useGroupsQuery } from "@/generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import React from "react";

const AverageCoursesPerPeriod = () => {
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
      title: "Estud.",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => <div>0</div>,
    },
    {
      title: "Promedio",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => <div>0</div>,
    },
  ];
  const periods = [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }];
  const { year } = useSchoolYear();
  const {
    data: groups,
    loading: loadingGroups,
    refetch,
  } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });
  const processedGroups = groups?.groups.map((group, index) => ({
    id: group?.id_group,
    name: `${group?.level} - ${group?.sublevel}`,
    hour: group?.working_time ?? "",
    group_teacher: group?.representative ?? "",
  }));
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3 h-">
        <strong className="text-xl text-black ps-8">
          Promedio de cursos por periodo
        </strong>
      </div>
      <div className="w-full">
        {periods.map((period, index) => (
          <div key={index} className="my-5">
            <h2 className="text-black">
              Promedio de los Cursos del {year} para el periodo {period.name}
            </h2>
            {groups?.groups && (
              <TableComponent column={columns} data={processedGroups} />
            )}
          </div>
        ))}
      </div>
    </ContainerComponents>
  );
};

export default AverageCoursesPerPeriod;
