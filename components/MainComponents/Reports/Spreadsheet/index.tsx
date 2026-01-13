import React, { useEffect } from "react";
import Card from "../../../Card";
import PublicIcon from "@mui/icons-material/Public";
import SubjectIcon from "@mui/icons-material/Subject";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import TodayIcon from "@mui/icons-material/Today";
import { useRouter } from "next/router";
import GlobalGradesundetermined from "./GlobalGradesUndetermined";
import GlobalGradesDetermined from "./GlobalGradesDetermined";
import AbsencesPerMonth from "./AbsencesPerMonth";
import GeneralAbsences from "./GeneralAbsences";
import AchievementsAndIndicators from "./AchievementsAndIndicators";
import Link from "next/link";

const cardsSpreadsheet: any[] = [
  {
    id: 1,
    icon: <PublicIcon color="success" fontSize="inherit" />,
    title: "Notas globales sin determinar materia",
    component: <GlobalGradesundetermined />,
    page: "planillas",
  },
  {
    id: 2,
    icon: <SubjectIcon color="success" fontSize="inherit" />,
    title: "Notas globales, Determinado por la materia",
    component: <GlobalGradesDetermined />,
    page: "planillas",
  },
  {
    id: 3,
    icon: <DragIndicatorIcon color="success" fontSize="inherit" />,
    title: "Logros y sus indicadores",
    component: <AchievementsAndIndicators />,
    page: "planillas",
  },
  {
    id: 4,
    icon: <CancelPresentationIcon color="error" fontSize="inherit" />,
    title: "Inasistencia General",
    component: <GeneralAbsences />,
    page: "planillas",
  },
  {
    id: 5,
    icon: <TodayIcon color="error" fontSize="inherit" />,
    title: "Inasistencia por mes",
    component: <AbsencesPerMonth />,
    page: "planillas",
  },
];

const Spreadsheet = () => {
  const router = useRouter();
  const { opcion } = router.query;
  const opcionelegida = cardsSpreadsheet.find(
    (card) => card.id === Number(opcion)
  );

  return (
    <div className="h-full w-full">
      {opcion ? (
        ""
      ) : (
        <div className="pb-6">
          <div>
            <strong className="text-xl text-black ps-8">
              Crear planilla de:
            </strong>
          </div>
        </div>
      )}
      {opcion ? (
        <div className="h-full w-full">{opcionelegida?.component}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {cardsSpreadsheet.map((item: any, i: any) => (
            <div className="flex items-start gap-2 flex-wrap font-semibold card bg-white" key={i}>
              <Link
                key={i}
                href={`reportes?componente=planillas&opcion=${item.id}`}
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

export default Spreadsheet;
