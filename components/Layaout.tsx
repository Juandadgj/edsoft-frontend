import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import { SchoolNav } from "./SchoolNav";
import { SchoolAvatar } from "./SchoolAvatar";

interface ILayaout {
  children: React.ReactNode;
  textpage: string;
}

const Layaout = ({ children, textpage }: ILayaout) => {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      router.push("/instituciones");
    }
  }, []);

  const manageComponentStatus = ({ target }: any) => {
    console.log("a", target.id, target.innerText, target.alt);
    router.push(`/dashboard/${target.id}`);
  };
  return (
    <div className="h-screen">
      {router.asPath === "/dashboard" ? null : (
        <SchoolNav textComponent={textpage} />
      )}

      {router.asPath === "/dashboard" ? <SchoolAvatar /> : null}

      <div
        className={`flex ${
          router.asPath == "/dashboard" ? "h-full" : "h-[90%]"
        } w-full`}
      >
        <div className="w-[5%] max-w-[65px]">
          <SideBar manage={manageComponentStatus} logo={false} />
        </div>
        <div className="bg-main-blue flex flex-col h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layaout;
