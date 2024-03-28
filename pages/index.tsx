import Ellipse from "../components/Ellipse";
import Nav from "../components/Nav";
import InicioImagen from "../public/assets/interactive-dashboard-tablet.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function Home() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("userToken");
  }, []);

  return (
    <>
      <div className="bg-[#EFEFEF] h-screen overflow-auto md:overflow-hidden">
        <Nav actualPage="Inicio" withNavigation />
        <div className="h-full w-full block relative">
          <div className="my-2 animate-fade-right animate-duration-1000 px-6 pt-6 md:px-16 md:pt-9">
            <h5 className="text-gray3 text-xl flex">
              <Ellipse className="mr-5" width={40} height={40} />
              ¡Bienvenido!
            </h5>
          </div>
          <div className="flex justify-center items-center p-6 pt-0 md:p-16 md:pt-0 ">
            <div className="animate-fade-right animate-duration-700 p-8 border-transparent md:border-r-4 md:border-gray4">
              <h2
                className={`font-bold mb-6 opacity${
                  active ? "active" : ""
                } transitionUp`}
              >
                <div className="w-full text-3xl lg:text-4xl md:text-3xl">
                  <span className={"text-main-blue"}>Crea | </span>
                  <span className="text-gray3">
                    gestiona
                    <br /> y publica calificaciones
                  </span>
                </div>
              </h2>
              <p className={`text-gray3 text-xl md:text-xl lg:text-2xl ms-2`}>
                Acceder a <span className="text-black">toda</span> la
                información institucional, académica, administrativa, financiera
                y cultural de la Institución educativa sobre asignaturas,
                horarios de clases, datos generales de la institución como{" "}
                <span className="text-black">
                  eventos, talleres, jornadas pedagógicas, etc.
                </span>
              </p>
            </div>
            <div
              className="animate-fade-left animate-duration-700 p-14 hidden md:block w-full"
              style={{ maxHeight: "calc(100vh - 93px)" }}
            >
              <Image
                src={InicioImagen}
                alt="Interactive Tablet"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
          <div style={{ position: "absolute", top: "10rem", right: "20px" }}>
            <Ellipse className="mr-5" width={60} height={60} />
          </div>
          <div className="absolute hidden md:block md:bottom-[-280px] md:right-[-220px] lg:bottom-[-200px] lg:right-[200px] min-[1170px]:bottom-[-260px] min-[1170px]:right-[-120px] ">
            <Ellipse className="mr-5" width={500} height={500} />
          </div>
          <div className="absolute hidden min-[1271px]:block min-[1271px]:bottom-[240px] min-[1271px]:right-[20px]">
            <Ellipse className="mr-5" width={130} height={130} />
          </div>
          <div
            style={{ position: "absolute", bottom: "10rem", right: "50rem" }}
          >
            <Ellipse className="mr-5" width={60} height={60} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
