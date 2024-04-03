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

const columns = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  {
    Header: "Planillar",
    accessor: "editar",
  },
];

const GlobalGradesUndetermined = () => {
  const router = useRouter();
  const { g } = router.query;
  const today = new Date();
  const year = today.getFullYear();
  const [active, setActive] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>([]);
  const [pdfBase64, setPdfBase64] = useState<any>("");

  const { data, loading } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2017 } },
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
      name: `${group?.level}-${group?.sublevel}` ?? "",
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
    <div className="h-full">
      <div className="h-[6%]">
        <div className="pb-4">
          <strong className="text-xl text-black ps-8">
            Cursos Creados para el año {year} para la planilla de notas simple
          </strong>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        <div className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : data?.groups ? (
            <div className="d-flex border-white py-4 h-full">
              <Table column={columns} data={processedGroups} type={"groups"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      </div>
      {g && pdfBase64 && (
        <iframe
          src={`data:application/pdf;base64,${pdfBase64.generateReport.report_content}`}
          width="100%"
          height="600"
          title="PDF Viewer"
        />
      )}
    </div>
  );
};

export default GlobalGradesUndetermined;
