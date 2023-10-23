import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import { SchoolNav } from "./SchoolNav";
import { SchoolAvatar } from "./SchoolAvatar";

const Layaout = ({ children }: { children: React.ReactNode }) => {
  const [textComponent, setTextComponent] = useState("Inicio");
  const [activeComponent, setActiveComponent] = useState("SchoolHome");
  const router = useRouter();
  const {} = router.query

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const manageComponentStatus = ({ target }: any) => {
    console.log(target.id, target.innerText, target.alt);
    router.push(`/dashboard/${target.id}`)
  };

  return (
    <div className="h-screen">
      {router.asPath === "/dashboard" ? null : (
        <SchoolNav
          textComponent={textComponent}
          manage={manageComponentStatus}
        />
      )}

      {router.asPath === "/dashboard" ? (
        <SchoolAvatar
          textComponent={textComponent}
          homeAvatar={true}
          manage={manageComponentStatus}
        />
      ) : null}

      <div
        className={`flex ${
          router.asPath === "/dashboard" ? "h-full" : "h-[90%]"
        } w-full`}
      >
        {router.asPath === "/dashboard" ? (
          <SideBar manage={manageComponentStatus} logo={true} />
        ) : (
          <SideBar manage={manageComponentStatus} logo={false} />
        )}
        <div className="bg-blue3 flex flex-col h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layaout;
