import Layaout from "@/components/Layaout";
import Areas from "@/components/MainComponents/Areas";
import CopyYear from "@/components/MainComponents/CopyYear";
import CreateCourses from "@/components/MainComponents/CreateCourses";
import { Enrollment } from "@/components/MainComponents/Enrollment";
import QualificationType from "@/components/MainComponents/QualificationType";
import SetYear from "@/components/MainComponents/SetYear";
import Subjects from "@/components/MainComponents/Subjects";
import { useRouter } from "next/router";
import React from "react";

export default function Anual() {
  const router = useRouter();
  const { componente } = router.query;
  console.log(router.query)
  return (
    <Layaout>
      {componente == "calificacion" && <QualificationType />}
      {componente == "establecer" && <SetYear />}
      {componente == "copiar" && <CopyYear />}
      {componente == "crear-curso" && <CreateCourses />}
      {componente == "area" && <Areas />}
      {componente == "asignatura" && <Subjects />}
      {componente == "logros" && <Enrollment />}
      {componente == "matriculas" && <Enrollment />}
    </Layaout>
  );
}
