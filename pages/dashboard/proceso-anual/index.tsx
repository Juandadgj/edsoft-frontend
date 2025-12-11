import Layaout from "@/components/Layaout";
import Qualification from "@/components/MainComponents/Qualification";

import { useRouter } from "next/router";
import React from "react";

export default function Anual() {
  const router = useRouter();
  const { componente } = router.query;
  return (
    <Layaout textpage="Proceso anual">
      {componente == "calificacion" && <Qualification />}
    </Layaout>
  );
}
