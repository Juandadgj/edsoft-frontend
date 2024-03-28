import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import { SchoolNav } from "./SchoolNav";
import { SchoolAvatar } from "./SchoolAvatar";


interface ILayaout {
  children : React.ReactNode
  textpage : string
}


const Layaout = ({ children, textpage }:  ILayaout) => {
  const [textComponent, setTextComponent] = useState("Inicio");
  const router = useRouter();
  const {} = router.query;

  // useEffect(() => {
  //   const token = sessionStorage.getItem("userToken");
  //   if (!token) {
  //     router.push("/instituciones");
  //   }
  // }, []);

  const manageComponentStatus = ({ target }: any) => {
    console.log("a", target.id, target.innerText, target.alt);
    router.push(`/dashboard/${target.id}`);
  };
  console.log(router.asPath === "/dashboard")
  return (
    <div className="h-screen">
      {router.asPath === "/dashboard" ? null : (
        <SchoolNav
          textComponent={textpage}
        />
      )}

      {router.asPath === "/dashboard" ? (
        <SchoolAvatar
        />
      ) : null}

      <div
        className={`flex ${
          router.asPath == "/dashboard" ? "h-full" : "h-[90%]"
        } w-full`}
      >
        <div className="w-[5%] max-w-[65px]">
          <SideBar manage={manageComponentStatus} logo={false} />
        </div>
        <div className="bg-blue3 flex flex-col h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layaout;
