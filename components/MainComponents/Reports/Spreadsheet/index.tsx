import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
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
    <div
      className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#25429e #F3F4F6",
        scrollbarGutter: "20px",
      }}
    >
      {opcion ? (
        ""
      ) : (
        <Grid container className="pb-6">
          <Grid item xs={12}>
            <strong className="text-2xl text-black ps-8">
              Crear planilla de:
            </strong>
          </Grid>
        </Grid>
      )}
      {opcion ? (
        <>{opcionelegida?.component}</>
      ) : (
        <div className="flex flex-wrap ps-8 justify-start gap-4">
          {cardsSpreadsheet.map((item: any, i: any) => (
            <div key={i} className=" w-1/4 h-full p-4 ">
              <div
                style={{ borderRadius: "30px" }}
                className="w-[70%] h-full cursor-pointer transition-transform shadow-2xl bg-white hover:bg-[#ededed89] hover:scale-105 text-center p-4"
              >
                <Link
                  href={`reportes?componente=planillas&opcion=${item.id}`}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3 className="text-md font-semibold text-black">
                    {item.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Spreadsheet;
