import Layaout from "@/components/Layaout";
import Achievements from "@/components/MainComponents/Achievements";
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
  return (
    <Layaout textpage="Programacion anual">
      {componente == "calificacion" && <QualificationType />}
      {componente == "establecer-año" && <SetYear />}
      {componente == "copiar-año" && <CopyYear />}
      {componente == "crear-curso" && <CreateCourses />}
      {componente == "areas" && <Areas />}
      {componente == "asignaturas" && <Subjects />}
      {componente == "logros" && <Achievements />}
      {componente == "matriculas" && <Enrollment />}
    </Layaout>
  );
}
