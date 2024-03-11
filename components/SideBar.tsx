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
      <ul className="bg-blue3 w-full h-full ps-1 flex flex-col justify-evenly flex-nowrap">
        {logo ? (
          <div className="bg-[#1A3187] rounded-custom ms-2 text-white  dropdown dropend">
            {" "}
            <SchoolLogo sideBar={true} />{" "}
          </div>
        ) : null}

        <li className="mt-3 text-white dropdown dropdown-hover dropdown-right flex justify-center">
          <button
            className="w-full border-none hover:bg-transparent transition duration-500 hover:scale-110"
            type="button"
            data-bs-toggle="dropdown"
            data-toggle="tooltip"
            data-placement="left"
            title="Funcionarios"
            aria-expanded="true"
          >
            <div
              className={`opacity${
                active ? "bg-white rounded-custom" : ""
              } transitionRight ${active ? "active" : ""}`}
            >
              <Groups2Icon className="h-7 w-7" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] z-30 text-xs">
            <li>
              <button
                className="dropdown-item"
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
                className="dropdown-item"
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

        <li className="mt-3 text-white dropdown dropdown-hover dropdown-right flex justify-center">
          <button
            className="w-full border-none hover:bg-transparent transition duration-500 hover:scale-110"
            type="button"
            data-bs-toggle="dropdown"
            data-toggle="tooltip"
            data-placement="left"
            title="Progreso Anual"
            aria-expanded="true"
          >
            <div
              className={`opacity${active ? "active" : ""} transitionRight ${
                active ? "active" : ""
              }`}
            >
              <ContentPasteIcon className="h-7 w-7" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] z-30 text-xs">
            <li>
              <button
                className="dropdown-item"
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
                className="dropdown-item"
                id="SetYear"
                onClick={() =>
                  router.push(
                    "/dashboard/programacion-anual?componente=establecer"
                  )
                }
              >
                Establecer año
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                id="CopyYear"
                onClick={() =>
                  router.push("/dashboard/programacion-anual?componente=copiar")
                }
              >
                Copiar Año Anterior
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
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
                className="dropdown-item"
                id="Areas"
                onClick={() =>
                  router.push("/dashboard/programacion-anual?componente=area")
                }
              >
                Áreas
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                id="Subjects"
                onClick={() =>
                  router.push(
                    "/dashboard/programacion-anual?componente=asignatura"
                  )
                }
              >
                Asignaturas
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
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
                className="dropdown-item"
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

        <li className="mt-3 text-white  dropdown dropdown-hover dropdown-right flex justify-center">
          <button
            className="w-full border-none hover:bg-transparent transition duration-500 hover:scale-110"
            type="button"
            data-bs-toggle="dropdown"
            data-toggle="tooltip"
            data-placement="left"
            title="P. Académico"
            aria-expanded="true"
          >
            <div
              className={`opacity${active ? "active" : ""} transitionRight ${
                active ? "active" : ""
              }`}
            >
              <RouteIcon className="h-7 w-7" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] z-30 text-xs">
            <li>
              <button
                className="dropdown-item"
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

        <li className="mt-3 text-white dropdown dropdown-hover dropdown-right flex justify-center w-full">
          <button
            className="w-full border-none hover:bg-transparent transition duration-500 hover:scale-110"
            type="button"
            data-toggle="tooltip"
            data-placement="left"
            title="Reportes"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <div>
              <AssessmentIcon className="h-7 w-7 object-cover" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] z-30 text-xs">
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Indicadores
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Planillas
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Listados
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Entregables
              </button>
            </li>
          </ul>
        </li>

        <li className="nav-item mt-3 mb-10 text-white  dropdown dropdown-hover dropdown-right flex justify-center">
          <button
            className="btn bg-transparent border-none hover:bg-transparent transition duration-500 hover:scale-110"
            type="button"
            data-toggle="tooltip"
            data-placement="left"
            title=""
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
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
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] z-30 text-xs">
            <li>
              <button
                className="dropdown-item"
                id="Teachers"
                onClick={() => router.push("/dashboard")}
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                id="Teachers"
                onClick={() => router.push("/dashboard/ajustes")}
              >
                Cambiar contraseña
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
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
