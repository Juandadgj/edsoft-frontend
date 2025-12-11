import Layaout from "@/components/Layaout";
import { BestStudents } from "@/components/MainComponents/settings/BestStudents";
import React from "react";

const BestStundentsPage = () => {
  return (
    <Layaout textpage="Mejores estudiantes">
      <BestStudents />
    </Layaout>
  );
};

export default BestStundentsPage;
