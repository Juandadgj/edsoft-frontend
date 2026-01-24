import React, { useEffect } from "react";
import PublicIcon from "@mui/icons-material/Public";
import SubjectIcon from "@mui/icons-material/Subject";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useRouter } from "next/router";
import NavigationComponent from "./NavigationComponent";
import Link from "next/link";
import { ContainerComponents } from "@/components/ContainerComponents";
import { NavigationYear } from "./NavigationYear";

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
    <div className="h-full w-full overflow-hidden">
      {opcion ? (
        ""
      ) : (
        <div className="w-full flex items-center justify-between pb-6">
          <strong className="text-xl text-black ps-8">
            Crear entregable de
          </strong>
        </div>
      )}
      {opcion && Number(opcion) !== 7 && <NavigationComponent />}
      {opcion && Number(opcion) === 7 && <NavigationYear />}
      {!opcion && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {cardsSpreadsheet.map((item: any, i: any) => (
            <div
              className="flex items-start gap-2 flex-wrap font-semibold card bg-white"
              key={i}
            >
              <Link
                href={`reportes?componente=entregables&opcion=${item.id}`}
                key={i}
              >
                <div className="card-body w-full">
                  <div className="card-title">
                    {item.icon}
                    <div className="text-black">{item.title}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deliverables;
