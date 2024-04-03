import React, { useEffect } from "react";
import PublicIcon from "@mui/icons-material/Public";
import SubjectIcon from "@mui/icons-material/Subject";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useRouter } from "next/router";
import NavigationComponent from "./NavigationComponent";
import Link from "next/link";

const cardsSpreadsheet: any[] = [
  {
    id: 1,
    icon: <PublicIcon color="success" fontSize="inherit" />,
    title: "Calificacion (Nota General)",
    page: "entregables",
    query: "",
  },
  {
    id: 2,
    icon: <SubjectIcon color="success" fontSize="inherit" />,
    title: "Calificacion con logros",
    page: "entregables",
    query: "",
  },
  {
    id: 3,
    icon: <DragIndicatorIcon color="success" fontSize="inherit" />,
    title: "Calificacion con logros e indicadores de logros",

    page: "entregables",
    query: "",
  },
  {
    id: 4,
    icon: <CancelPresentationIcon color="error" fontSize="inherit" />,
    title:
      "Calificacion de logros, Mostrar calificacion Numerica y alfabatica (Solo logros calificados o señalados)",
    page: "entregables",
    query: "",
  },
  {
    id: 5,
    icon: <CancelPresentationIcon color="error" fontSize="inherit" />,
    title:
      "Calificacion de logros, Mostrar calificacion Numerica y alfabetica (Todos los logros)",
    page: "entregables",
    query: "",
  },
  {
    id: 6,
    icon: <CancelPresentationIcon color="error" fontSize="inherit" />,
    title: "Boletines e Informes Configurables",
    page: "entregables",
    query: "",
  },
  {
    id: 7,
    icon: <SubjectIcon color="success" fontSize="inherit" />,
    title: "Certificado de estudiante",
    page: "entregables",
    query: "",
  },
  {
    id: 8,
    icon: <DragIndicatorIcon color="success" fontSize="inherit" />,
    title: "Carnet Estudiantil",
    page: "entregables",
    query: "",
  },
];

const Deliverables = () => {
  const router = useRouter();
  const { opcion } = router.query;
  return (
    <div className="rounded-tl-[20px] w-full bg-gray1 p-10 pb-3 h-full">
      {opcion ? (
        ""
      ) : (
        <div className="h-[6%] flex justify-between">
          <div>
            <strong className="text-xl text-black ps-8">
              Lista de Docentes
            </strong>
          </div>
        </div>
      )}
      {opcion ? (
        <NavigationComponent />
      ) : (
        <div className="h-[94%] flex justify-start gap-6">
          <div
            className="flex flex-wrap w-full justify-start gap-6 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#25429e #F3F4F6",
              scrollbarGutter: "20px",
            }}
          >
            {cardsSpreadsheet.map((item: any, i: any) => (
              <div key={i} className="w-1/4 py-4">
                <div
                  style={{ borderRadius: "30px" }}
                  className="w-[70%] h-full cursor-pointer transition-transform bg-white hover:bg-[#ededed89] hover:scale-105 text-center p-4 flex justify-center items-center"
                >
                  <Link
                    href={`reportes?componente=entregables&opcion=${item.id}`}
                  >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h3 className="text-sm font-semibold text-black">
                      {item.title}
                    </h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deliverables;
