import React, { useState } from "react";
import { EnrollmentCard } from "./types";
import Link from "next/link";

const CEnrollment = (props: EnrollmentCard) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);

    setTimeout(() => {
      setIsSelected(false);
    }, 200);
  };
  const { icon, title, id } = props;
  return (
    <div
      style={{ borderRadius: "30px" }}
      className="w-[70%] h-full cursor-pointer transition-transform shadow-2xl bg-white hover:bg-[#ededed89] hover:scale-105 text-center p-4"
    >
      <Link href={`programacion-anual?componente=matriculas&opcion=${id}`}>
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-md font-semibold text-black">{title}</h3>
      </Link>
    </div>
  );
};

export default CEnrollment;
