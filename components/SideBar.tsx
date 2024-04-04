import Groups2Icon from "@mui/icons-material/Groups2";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import RouteIcon from "@mui/icons-material/Route";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useEffect, useState } from "react";
import { SchoolLogo } from "./SchoolLogo";
import { useRouter } from "next/router";
import Image from "next/image";

const SideBar = ({ manage, logo }: any) => {
  const [active, setActive] = useState(false);

  const router = useRouter();

  return (
    <div className="h-full w-full">
      <ul className="bg-main-blue w-full h-full ps-1 flex flex-col justify-evenly flex-nowrap">
        {logo ? (
          <div className="bg-[#1A3187] rounded-custom ms-2 text-white dropdown dropend">
            {" "}
            <SchoolLogo sideBar={true} />{" "}
          </div>
        ) : null}

        <li className="mt-3 text-white dropdown dropdown-right flex justify-center group">
          <div className="group w-full">
            <button className="btn btn-sm w-full border-none bg-transparent shadow-none hover:bg-transparent transition duration-500 hover:scale-110">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="M10.275 12q-.7 0-1.15-.525T8.8 10.25l.3-1.8q.2-1.075 1.013-1.763T12 6q1.1 0 1.913.688t1.012 1.762l.3 1.8q.125.7-.325 1.225T13.75 12zm-7.175.975q-.575.025-.988-.225t-.537-.775q-.05-.225-.025-.45t.125-.425q0 .025-.025-.1q-.05-.05-.25-.6q-.05-.3.075-.575T1.8 9.35l.05-.05q.05-.475.388-.8t.837-.325q.075 0 .475.1l.075-.025q.125-.125.325-.187T4.375 8q.275 0 .488.088t.337.262q.025 0 .038.013t.037.012q.35.025.612.212t.388.513q.05.175.038.338t-.063.312q0 .025.025.1q.175.175.275.388t.1.437q0 .1-.15.525q-.025.05 0 .1l.05.4q0 .525-.437.9t-1.063.375zM20 13q-.825 0-1.412-.587T18 11q0-.3.088-.562t.237-.513l-.7-.625q-.25-.2-.088-.5T18 8.5h2q.825 0 1.413.588T22 10.5v.5q0 .825-.587 1.413T20 13M0 18v-1.575q0-1.1 1.113-1.763T4 14q.325 0 .625.013t.575.062q-.35.5-.525 1.075T4.5 16.375V18zm6 0v-1.625q0-1.625 1.663-2.625t4.337-1q2.7 0 4.35 1T18 16.375V18zm14-4q1.8 0 2.9.663t1.1 1.762V18h-4.5v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14"
                  />
                </svg>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu w-36 max-w-xs absolute top-0 left-[100%] origin-left  ms-2 text-black bg-white rounded-[5px] z-30 text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 shadow-md transition duration-500"
            >
              <li>
                <p className="w-full" id="Teacher">
                  Funcionarios
                </p>
              </li>
            </ul>
          </div>

          <ul className="menu w-36  dropdown-content ms-2 text-black bg-white rounded-[5px] z-30 text-xs">
            <li>
              <button
                className=""
                id="profesores"
                onClick={() =>
                  router.push("/dashboard/funcionarios?componente=profesores")
                }
              >
                Docentes
              </button>
            </li>
            <li>
              <button
                className=""
                id="secretarias"
                onClick={() =>
                  router.push("/dashboard/funcionarios?componente=secretarios")
                }
              >
                Secretarios
              </button>
            </li>
          </ul>
        </li>

        <li className="mt-3 text-white dropdown dropdown-right flex justify-center group">
          <div className="group w-full">
            <button className="btn btn-sm w-full border-none bg-transparent shadow-none hover:bg-transparent transition duration-500 hover:scale-110">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5h-2v3H7V5H5zm7-14q.425 0 .713-.288T13 4q0-.425-.288-.712T12 3q-.425 0-.712.288T11 4q0 .425.288.713T12 5"
                  />
                </svg>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu w-36 max-w-xs absolute top-0 left-[100%] origin-left  ms-2 text-black bg-white rounded-[5px] z-30 text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 shadow-md transition duration-500"
            >
              <li>
                <p className="w-full" id="Teacher">
                  Programacion Anual
                </p>
              </li>
            </ul>
          </div>
          <ul className="menu w-36 dropdown-content ms-2 text-black bg-white rounded-[5px] z-30 text-xs">
            <li className="">
              <button
                className="w-[]"
                id="QualificationType"
                onClick={() =>
                  router.push(
                    "/dashboard/programacion-anual?componente=calificacion"
                  )
                }
              >
                Tipo De Calificación
              </button>
            </li>
            <li>
              <button
                className=""
                id="SetYear"
                onClick={() =>
                  router.push(
                    "/dashboard/programacion-anual?componente=establecer-año"
                  )
                }
              >
                Establecer año
              </button>
            </li>
            <li>
              <button
                className=""
                id="CopyYear"
                onClick={() =>
                  router.push(
                    "/dashboard/programacion-anual?componente=copiar-año"
                  )
                }
              >
                Copiar Año Anterior
              </button>
            </li>
            <li>
              <button
                className=""
                id="CreateCourses"
                onClick={() =>
                  router.push(
                    "/dashboard/programacion-anual?componente=crear-curso"
                  )
                }
              >
                Crear Cursos
              </button>
            </li>
            <li>
              <button
                className=""
                id="Areas"
                onClick={() =>
                  router.push("/dashboard/programacion-anual?componente=areas")
                }
              >
                Áreas
              </button>
            </li>
            <li>
              <button
                className=""
                id="Subjects"
                onClick={() =>
                  router.push(
                    "/dashboard/programacion-anual?componente=asignaturas"
                  )
                }
              >
                Asignaturas
              </button>
            </li>
            <li>
              <button
                className=""
                id="Achievements"
                onClick={() =>
                  router.push("/dashboard/programacion-anual?componente=logros")
                }
              >
                Logros
              </button>
            </li>
            <li>
              <button
                className=""
                id="Enrollment"
                onClick={() =>
                  router.push(
                    "/dashboard/programacion-anual?componente=matriculas"
                  )
                }
              >
                Matrículas
              </button>
            </li>
          </ul>
        </li>

        <li className="mt-3 text-white  dropdown dropdown-right flex justify-center">
          <div className="group w-full">
            <button className=" btn w-full border-none bg-transparent shadow-none hover:bg-transparent transition duration-500 hover:scale-110">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="M9 20.5q-1.458 0-2.479-1.021T5.5 17V8.479q-.875-.325-1.437-.991Q3.5 6.82 3.5 6.006q0-1.045.729-1.776q.728-.731 1.769-.731q1.04 0 1.771.731q.731.731.731 1.776q0 .814-.562 1.48q-.563.667-1.438.992V17q0 1.031.735 1.766t1.769.734q1.033 0 1.764-.734q.732-.735.732-1.766V7q0-1.458 1.021-2.479T15 3.5q1.458 0 2.479 1.021T18.5 7v8.521q.875.325 1.438.991q.562.667.562 1.481q0 1.045-.728 1.776q-.729.731-1.77.731q-1.04 0-1.771-.731q-.731-.731-.731-1.776q0-.814.563-1.493q.562-.679 1.437-.979V7q0-1.031-.735-1.766T14.996 4.5q-1.033 0-1.764.734Q12.5 5.97 12.5 7v10q0 1.458-1.021 2.479T9 20.5"
                  />
                </svg>{" "}
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu w-36 max-w-xs absolute top-0 left-[100%] origin-left  ms-2 text-black bg-white rounded-[5px] z-30 text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 shadow-md transition duration-500"
            >
              <li>
                <p className="w-full" id="Teacher">
                  Proceso Academico
                </p>
              </li>
            </ul>
          </div>

          <ul className="menu w-36 max-w-xs dropdown-content ms-2 text-black bg-white rounded-[5px] z-40 text-xs">
            <li>
              <button
                className=""
                id="Teachers"
                onClick={() =>
                  router.push(
                    "/dashboard/proceso-anual?componente=calificacion"
                  )
                }
              >
                Calificación
              </button>
            </li>
          </ul>
        </li>

        <div className="mt-3 text-white dropdown dropdown-right flex justify-center w-full group">
          <div className="group w-full">
            <button className=" btn w-full border-none bg-transparent shadow-none hover:bg-transparent transition duration-500 hover:scale-110">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#ffffff"
                    d="M15 20h2v4h-2zm5-2h2v6h-2zm-10-4h2v10h-2z"
                  />
                  <path
                    fill="#ffffff"
                    d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"
                  />
                </svg>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu w-36 max-w-xs absolute top-0 left-[100%] origin-left  ms-2 text-black bg-white rounded-[5px] z-30 text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 shadow-md transition duration-500"
            >
              <li>
                <p className="w-full" id="Teacher">
                  Reportes
                </p>
              </li>
            </ul>
          </div>
          <ul
            tabIndex={0}
            className="menu w-36 max-w-xs dropdown-content ms-2 text-black bg-white rounded-[5px] z-30 text-xs"
          >
            <li>
              <button className="" id="Teachers">
                Indicadores
              </button>
            </li>
            <li>
              <button
                className=""
                id="Spreadsheet"
                onClick={() =>
                  router.push("/dashboard/reportes?componente=planillas")
                }
              >
                Planillas
              </button>
            </li>
            <li>
              <button className="" id="Teachers">
                Listados
              </button>
            </li>
            <li>
              <button
                className=""
                id="Teachers"
                onClick={() =>
                  router.push("/dashboard/reportes?componente=entregables")
                }
              >
                Entregables
              </button>
            </li>
          </ul>
        </div>
        <li className="nav-item mt-3 text-white dropdown dropdown-right dropdown-end flex justify-center">
          <div className="w-full group">
            <button className="btn w-full bg-transparent border-none hover:bg-transparent transition duration-500 hover:scale-110">
              <div className="avatar">
                <div className="w-12 rounded-[100%]">
                  <img
                    src={"/assets/institucionLogo@2x.png"}
                    alt=""
                    className=""
                  />
                </div>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu w-36 max-w-xs absolute top-0 left-[100%] origin-left  ms-2 text-black bg-white rounded-[5px] z-30 text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 shadow-md transition duration-500"
            >
              <li>
                <p className="w-full" id="Teacher">
                  Ajustes
                </p>
              </li>
            </ul>
          </div>
          <ul className="menu w-36 max-w-xs dropdown-content top-0 ms-2 text-black bg-white rounded-[5px] z-30 text-xs">
            <li>
              <button
                className=""
                id="Teachers"
                onClick={() => router.push("/dashboard")}
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                className=""
                id="Teachers"
                onClick={() => router.push("/dashboard/ajustes")}
              >
                Cambiar contraseña
              </button>
            </li>
            <li>
              <button
                className=""
                id="Teachers"
                onClick={() => router.push("/instituciones")}
              >
                Cerrar sesion
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
