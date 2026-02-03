import Image from "next/image";
import InicioImagen from "../../public/assets/interactive-dashboard-tablet.png";
import Ellipse from "../components/shared/ellipse";

export default async function Home() {
  return (
    <main className="h-dvh w-full overflow-auto md:overflow-hidden ">
      <div className="h-full w-full block relative">
        <div className=" animate-fade-right animate-duration-1000 md:px-16 md:pt-9">
          <h5 className="text-foreground text-xl flex">
            <Ellipse className="mr-5" width={40} height={40} />
            ¡Bienvenido!
          </h5>
        </div>
        <div className="flex justify-center items-center flex-col md:flex-row p-6 pt-0 md:p-16 md:pt-0 ">
          <div className="animate-fade-right animate-duration-700 p-8 border-transparent md:border-r-4 md:border-gray4">
            <h2 className={`font-bold mb-6 transitionUp`}>
              <div className="w-full text-3xl lg:text-4xl md:text-3xl">
                <span className={"text-main-blue"}>Crea | </span>
                <span className="text-foreground">
                  gestionas
                  <br /> y publica calificaciones
                </span>
              </div>
            </h2>
            <p className={`text-gray-3 dark:text-foreground text-xl md:text-xl lg:text-2xl ms-2`}>
              Acceder a <span className="text-black dark:text-foreground">toda</span> la información
              institucional, académica, administrativa, financiera y cultural de
              la Institución educativa sobre asignaturas, horarios de clases,
              datos generales de la institución como{" "}
              <span className="text-black dark:text-foreground">
                eventos, talleres, jornadas pedagógicas, etc.
              </span>
            </p>
          </div>
          <div
            className="animate-fade-left animate-duration-700 py-7 md:py-14 px-8 w-full"
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
        <div className="absolute hidden md:block md:-bottom-70 md:-right-55 lg:-bottom-50 lg:right-50 min-[1170px]:-bottom-65 min-[1170px]:-right-30 ">
          <Ellipse className="mr-5" width={500} height={500} />
        </div>
        <div className="absolute hidden min-[1271px]:block min-[1271px]:bottom-60 min-[1271px]:right-5">
          <Ellipse className="mr-5" width={130} height={130} />
        </div>
        <div style={{ position: "absolute", bottom: "10rem", right: "50rem" }}>
          <Ellipse className="mr-5" width={60} height={60} />
        </div>
      </div>
    </main>
  );
}
