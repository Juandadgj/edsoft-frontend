import { useMemo } from "react";
import { useEffect, useState } from "react";
import {
  useGenerateReportAreaLazyQuery,
  useGenerateStudentsListUndeterminatedLazyQuery,
  useGroupsQuery,
} from "@/generated/graphql";
import Table from "@/components/Table";
import { useRouter } from "next/router";
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

  const [
    getGenerateReport,
    { data: reports },
  ] = useGenerateReportAreaLazyQuery();

  const [
    reportArea,
    { data: areaReport },
  ] = useGenerateStudentsListUndeterminatedLazyQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    setActive(true);
  }, []);

  const handlerSpreadsheet = (id: any) => {
    reportArea({
      variables: {
        generateStudentsListUndeterminatedInput: {
          id_group: id,
        },
      },
    });
  };

  const processedGroups = useMemo(() => {
    if (!data?.groups) return [];
    return data.groups.map((group, index) => ({
      id_group: group?.id_group ?? "",
      name: `${group?.level}-${group?.sublevel}`,
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

  useEffect(() => {
    if (areaReport) {
      window
        .open()
        ?.document.write(
          areaReport.generateStudentsListUndeterminated.report_content
        );
    }
  }, [areaReport]);

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
        {data?.groups && (
          <TableComponent column={columns} data={processedGroups} />
        )}
      </div>
      {g && pdfBase64 && (
        <iframe
          src={`data:application/pdf;base64,${pdfBase64.generateReport.report_content}`}
          width="100%"
          height="600"
          title="PDF Viewer"
        />
      )}
    </ContainerComponents>
  );
};

export default GlobalGradesUndetermined;
