import * as React from "react";
import Logo from "../public/assets/logo@2x.png";
import Image from "next/image";
import { BreadCrumbs } from "./BreadCrumbs";

type TSchoolNav = {
  textComponent: string;
};

export const SchoolNav = ({ textComponent }: TSchoolNav) => {
  return (
    <div className="h-[10%] max-h-60 bg-[#0055A6] flex justify-between items-center w-full relative">
      <div className="ps-0 w-full">
        <div className="flex justify-center md:justify-start items-center gap-5 h-full w-full">
          <div className="flex items-center">
            <Image src={Logo} alt="Inicio" className={`h-16 w-16 ps-1`} />
            <h1 className="font-bold text-2xl">EdSoft</h1>
          </div>
          <div className="hidden md:flex">
            <BreadCrumbs page={textComponent} />
          </div>
        </div>
      </div>
    </div>
  );
};
