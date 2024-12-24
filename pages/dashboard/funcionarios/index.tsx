import Layaout from "@/components/Layaout";
import Secretaries from "@/components/MainComponents/officers/secretarie/Secretaries";
import Teachers from "@/components/MainComponents/officers/teacher/Teachers";

import { useRouter } from "next/router";
import React from "react";

export default function Funcionaries() {
  const router = useRouter();
  const { componente } = router.query;
  return (
    <Layaout textpage="Funcionarios">
      {componente == "profesores" && <Teachers />}
      {componente == "secretarios" && <Secretaries />}
    </Layaout>
  );
}
