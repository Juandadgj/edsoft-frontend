import React, { useState } from "react";
import { EnrollmentCard } from "./types";
import Link from "next/link";
import { useRouter } from "next/router";

const CEnrollment = (props: EnrollmentCard) => {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter()
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
      className="w-full h-full cursor-pointer shadow-2xl bg-white hover:bg-[#ededed89] hover:scale-105 transition duration-500 text-center p-4 flex justify-center items-center"
    >
      <Link href={`${router.asPath}&opcion=${id}`}>
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-sm  text-black">{title}</h3>
      </Link>
    </div>
  );
};

export default CEnrollment;
