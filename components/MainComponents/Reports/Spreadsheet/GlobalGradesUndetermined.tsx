import { useMemo } from "react";
import { useEffect, useState } from "react";
import edit from "../../../public/assets/01editar.png";
import delet from "../../../public/assets/01eliminar.png";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import {
  useGenerateReportAreaLazyQuery,
  useGenerateReportLazyQuery,
  useGroupsQuery,
} from "@/generated/graphql";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import DescriptionIcon from "@mui/icons-material/Description";
import { useLazyQuery } from "@apollo/client";

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

const GlobalGradesundetermined = () => {
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

  const [getGenerateReport, { data: reports }] = useGenerateReportAreaLazyQuery();

  const [reportArea, { data: areaReport }] = useGenerateReportLazyQuery({fetchPolicy: "no-cache"});

  useEffect(() => {
    setActive(true);
  }, []);

  const handlerSpreadsheet = (id: any) => {
    reportArea({
      variables: {
        generateStudentsListInput: {
          id_group: id,
        },
      },
    }).then((res)=>{
      const {data} = res 
      console.log(data?.generateReport.report_content)
      setPdfBase64(data?.generateReport.report_content)
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

  const handleDownloadPDF = () => {
    console.log(pdfBase64)
    if (pdfBase64) {
      // Convert the base64 string to a Blob
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);
      // Abrir una nueva ventana con el PDF

       window.open(blobUrl, "_blank");

      // Liberar el objeto URL después de abrir la ventana
      URL.revokeObjectURL(blobUrl);
    } else {
      throw new Error(
        "pdfBase64 no está definido. Asegúrate de que haya datos antes de llamar a handleDownloadPDF."
      );
    }
  };

  const handleOpenHTML = (htmlString: string) => {
    window.open()?.document.write(htmlString);
  };

  // useEffect(() => {
  //   if (g) {
  //     getGenerateReport({
  //       variables: { generateStudentsListInput: { id_group: Number(g) } },
  //     }).then((res) => {
  //       const { data } = res;
  //       setPdfBase64(data);
  //     });
  //   }
  // }, [router])

  useEffect(() => {
    // Llama a handleDownloadPDF cuando pdfBase64 se actualiza
    if (pdfBase64) {
      handleDownloadPDF();
    }
  }, [pdfBase64]);

  // useEffect(() => {
  //   if (areaReport) {
  //     handleOpenHTML(areaReport.generateReportArea.report_content);
  //   }
  // }, [areaReport]);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1">
      <Grid container>
        <Grid className="pb-4" item xs={9}>
          <strong className="text-xl text-black ps-8">
            Cursos Creados para el año {year} para la planilla de notas simple
          </strong>
        </Grid>
      </Grid>
      <Grid
        container
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        <Grid item xs={12} className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.groups ? (
            <div className="d-flex border-white py-4 h-full">
              <Table column={columns} data={processedGroups} type={"groups"} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </Grid>
      </Grid>
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

export default GlobalGradesundetermined;
