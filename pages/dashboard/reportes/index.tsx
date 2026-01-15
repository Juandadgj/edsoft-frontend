


import Layaout from "@/components/Layaout";
import Deliverables from "@/components/MainComponents/Reports/Deliverables";
import { Indicators } from "@/components/MainComponents/Reports/Indicators";
import Spreadsheet from "@/components/MainComponents/Reports/Spreadsheet";
import { useRouter } from "next/router";
import React from "react";

export default function Reports() {
  const router = useRouter();
  const { componente } = router.query;
  return (
    <Layaout textpage="Reportes">
      {componente == "planillas" && <Spreadsheet />}
      {componente == "entregables" && <Deliverables />}
      {componente == "indicadores" && <Indicators />}
      {componente == "listados" && <Deliverables />}
    </Layaout>
  );
}
