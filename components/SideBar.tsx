// import { FC } from 'react';
// import Logo2 from '../public/assets/logo@2x.png';
import SettingsIcon from "@mui/icons-material/Settings";
import Groups2Icon from "@mui/icons-material/Groups2";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import RouteIcon from "@mui/icons-material/Route";
import AssessmentIcon from "@mui/icons-material/Assessment";

// import Logo from '../public/assets/logo@2x.png';
import { useEffect, useState } from "react";
// import styled from '@emotion/styled';
import { Box } from "@mui/material";
import { SchoolLogo } from "./SchoolLogo";
import { useRouter } from "next/router";

const SideBar = ({ manage, logo }: any) => {
  const [active, setActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="h-full w-full">
      <ul className="bg-blue3 w-full h-full ps-1 flex flex-col justify-evenly flex-nowrap">
        {logo ? (
          <div className="bg-[#1A3187] rounded-custom ms-2 text-white fs-4 dropdown dropend">
            {" "}
            <SchoolLogo sideBar={true} />{" "}
          </div>
        ) : null}

        <li className="mt-3 text-white fs-4 dropdown dropdown-hover dropdown-right flex justify-center">
          <button
            className="button bg-blue3"
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
              <Groups2Icon className="h-12 w-11" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] z-30">
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

        <li className="mt-3 text-white fs-4 dropdown dropdown-right flex justify-center">
          <button
            className="button bg-blue3"
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
              <ContentPasteIcon className="h-12 w-11" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] z-30">
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
                  router.push("/dashboard/programacion-anual?componente=establecer")
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
                  router.push("/dashboard/programacion-anual?componente=crear-curso")
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
                  router.push("/dashboard/programacion-anual?componente=asignatura")
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
                  router.push("/dashboard/programacion-anual?componente=matriculas")
                }
              >
                Matrículas
              </button>
            </li>
          </ul>
        </li>

        <li className="nav-item mt-3 text-white fs-4 dropdown dropdown-right flex justify-center">
          <button
            className="button bg-blue3"
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
              <RouteIcon className="h-12 w-11" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] z-30">
            <li>
              <button className="dropdown-item" id="Teachers" onClick={() => router.push("/dashboard/proceso-anual?componente=calificacion")}>
                Calificación
              </button>
            </li>
          </ul>
        </li>

        <li className="nav-item mt-3 mb-10 text-white fs-4 dropdown dropdown-right flex justify-center">
          <button
            className="button bg-blue3"
            type="button"
            data-toggle="tooltip"
            data-placement="left"
            title="Reportes"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <div
              className={`opacity${active ? "active" : ""} transitionRight ${
                active ? "active" : ""
              }`}
            >
              <AssessmentIcon className="h-12 w-11" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="menu dropdown-content ms-1 text-black bg-white rounded-[5px] !top-[-110px] z-30">
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
      </ul>
    </div>
  );
};

export default SideBar;
