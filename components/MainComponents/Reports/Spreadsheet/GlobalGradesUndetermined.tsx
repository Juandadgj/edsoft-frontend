import { useMemo } from "react";
import { useEffect, useState } from "react";

import Table from "@/components/Table";
import { useRouter } from "next/router";
import DescriptionIcon from "@mui/icons-material/Description";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "@/components/ContainerComponents";
import TableComponent from "@/components/Table";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { reportService } from "@/services/api.service";
import { useGroupsQuery } from "@/hooks/useRestApi";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
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

const GlobalGradesUndetermined = () => {
  const router = useRouter();
  const { g } = router.query;
  const { year } = useSchoolYear();
  const [active, setActive] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>([]);
  const [pdfBase64, setPdfBase64] = useState<any>("");

  const { data, loading } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: year } },
  });

  const handlerSpreadsheet = (id: any) => {
    reportService.studentsListUndeterminated({
      id_group: id,
    }).then((res) => {
      window.open()?.document.write(res.report_content);
    }).catch((err) => {
      console.error('Error generating report:', err);
    });
  };

  const processedGroups = useMemo(() => {
    if (!data) return [];
    return data.map((group, index) => ({
      id_group: group?.id_group ?? "",
      name: `${getCourseLevel(group?.level)} - ${group?.sublevel}`,
      working_time: group?.working_time ?? "",
      group_teacher: group?.representative ?? "",
      editar: (
        <button
          onClick={() => handlerSpreadsheet(group?.id_group)}
          className="btn btn-ghost border-0"
        >
          <DescriptionIcon color="action" fontSize="medium" />
        </button>
      ),
    }));
  }, [data]);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8 pb-4">
            Cursos Creados para el año {year} para la planilla de notas simple
          </strong>
        </h3>
      </div>
      <div className="h-full">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        )}
        {data && (
          <TableComponent column={columns} data={processedGroups} />
        )}
      </div>
      {g && pdfBase64 && (
        <iframe
          src={`data:application/pdf;base64,${pdfBase64}`}
          width="100%"
          height="600"
          title="PDF Viewer"
        />
      )}
    </ContainerComponents>
  );
};

export default GlobalGradesUndetermined;
