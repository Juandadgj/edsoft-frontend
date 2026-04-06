"use client";
import { ScholarYear } from "@/app/types";
import { MenuUnfoldOutlined, MoonFilled, SunFilled } from "@ant-design/icons";
import React, { useEffect, useState, useTransition } from "react";
import { Select } from "../ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AcademicProcessIcon,
  AnualProgramingIcon,
  FuncionariesIcon,
  ReportsIcon,
  SettingsIcon,
} from "./icons";
import Logo from "../../../public/assets/logo@2x.png";
import Link from "antd/es/typography/Link";
import { logout } from "@/app/lib/auth/session";
import { selectScholarYearAction } from "../features/dashboard/programacion-anual/set-year";
import { SchoolAvatar } from "./school-avatar";
import { themeChange } from "theme-change";

export default function ClientLayout({
  children,
  year,
  years,
}: {
  children: React.ReactNode;
  year?: ScholarYear | null;
  years?: ScholarYear[];
}) {
  const router = useRouter();
  const menu = [
    {
      key: "1",
      label: "Funcionarios",
      icon: <FuncionariesIcon color="white" />,
      children: [
        {
          key: "1-1",
          label: "Docentes",
          onClick: () => router.push("/dashboard/funcionarios/profesores"),
        },
        {
          key: "1-2",
          label: "Secretarios",
          onClick: () => router.push("/dashboard/funcionarios/secretarios"),
        },
      ],
    },
    {
      key: "2",
      label: "Programacion Anual",
      icon: <AnualProgramingIcon />,
      children: [
        {
          key: "2-1",
          label: "Tipo de Calificación",
          onClick: () =>
            router.push("/dashboard/programacion-anual/calificacion"),
        },
        {
          key: "2-2",
          label: "Establecer año",
          onClick: () =>
            router.push("/dashboard/programacion-anual/establecer-ano"),
        },
        {
          key: "2-3",
          label: "Copiar Año Anterior",
          onClick: () =>
            router.push("/dashboard/programacion-anual/copiar-año"),
        },
        {
          key: "2-4",
          label: "Crear Cursos",
          onClick: () => router.push("/dashboard/programacion-anual/curso"),
        },
        {
          key: "2-5",
          label: "Áreas",
          onClick: () => router.push("/dashboard/programacion-anual/areas"),
        },
        {
          key: "2-6",
          label: "Asignaturas",
          onClick: () =>
            router.push("/dashboard/programacion-anual/asignaturas"),
        },
        {
          key: "2-7",
          label: "Logros",
          onClick: () => router.push("/dashboard/programacion-anual/logros"),
        },
        {
          key: "2-8",
          label: "Matrículas",
          onClick: () =>
            router.push("/dashboard/programacion-anual/matriculas"),
        },
      ],
    },
    {
      key: "3",
      label: "Proceso Academico",
      icon: <AcademicProcessIcon />,
      children: [
        {
          key: "3-1",
          label: "Calificación",
          onClick: () => router.push("/dashboard/proceso-anual/calificacion"),
        },
      ],
    },
    {
      key: "4",
      label: "Reportes",
      icon: <ReportsIcon />,
      children: [
        {
          key: "4-1",
          label: "Indicadores",
          onClick: () => router.push("/dashboard/reportes/indicadores"),
        },
        {
          key: "4-2",
          label: "Planillas",
          onClick: () => router.push("/dashboard/reportes/planillas"),
        },
        {
          key: "4-3",
          label: "Listados",
          onClick: () => router.push("/dashboard/reportes/listados"),
        },
        {
          key: "4-4",
          label: "Entregables",
          onClick: () => router.push("/dashboard/reportes/entregables"),
        },
      ],
    },
    {
      key: "5",
      label: "Ajustes",
      icon: <SettingsIcon />,
      children: [
        {
          key: "5-1",
          label: "Panel principal",
          onClick: () => router.push("/dashboard/ajustes"),
        },
        { key: "5-2", label: "Cerrar sesion" },
      ],
    },
  ];
  const [theme, setTheme] = useState("dark");
  const [isPending, transition] = useTransition();
  const [isPendingLogout, transitionLogout] = useTransition();
  const handlerSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    transition(async () => {
      await selectScholarYearAction(Number(selectedYear));
      router.refresh();
    });
  };
  const handlerLogout = () => {
    transitionLogout(() => {
      logout();
    });
  };
  useEffect(() => {
    // The 'false' parameter is required for React projects
    themeChange(false);
    if (document) {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme) {
        setTheme(theme);
      }
    }
  }, []);
  return (
    <div className="flex flex-auto w-full h-full">
      <div
        className="bg-base-100 w-full h-full"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#25429e var(--base-200)",
          scrollbarGutter: "100px",
        }}
      >
        <div className="h-full">
          <div className="drawer lg:drawer-open h-full">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-start h-full">
              <header className="bg-base-100 flex justify-between items-center w-full relative gap-2 px-6 py-4 md:px-10">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="my-drawer-3"
                    className="btn btn-ghost hover:bg-main-blue hover:text-white border-none text-main-blue drawer-button lg:hidden"
                  >
                    <MenuUnfoldOutlined color="#25429e" />
                  </label>
                  {/* <div className="hidden md:flex">
                    <BreadCrumbs page={textpage} />
                  </div> */}
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    className="custom-select"
                    style={{ width: "80px" }}
                    onChange={handlerSelectYear}
                    value={year?.id_year}
                  >
                    {years && years.length > 0
                      ? years.map((sy) => (
                          <option key={sy.id_year} value={sy.id_year}>
                            {sy.id_year}
                          </option>
                        ))
                      : null}
                  </Select>
                  <SchoolAvatar />
                  {theme === "dark" ? (
                    <button
                      data-act-class="shadow-outline"
                      data-set-theme="light"
                      onClick={() => setTheme("light")}
                    >
                      <SunFilled />
                    </button>
                  ) : (
                    <button
                      data-act-class="shadow-outline"
                      data-set-theme="dark"
                      onClick={() => setTheme("dark")}
                    >
                      <MoonFilled />
                    </button>
                  )}
                </div>
              </header>
              <div className="p-5 w-full h-full bg-base-200">{children}</div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu block flex-none bg-base-100 rounded-box w-64 text-foreground h-full overflow-y-auto">
                <li>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Image src={Logo} alt="Inicio" className={`h-10 w-10`} />
                    <h1 className="font-bold text-2xl text-foreground">
                      EdSoft
                    </h1>
                  </div>
                </li>
                {menu.map((item) => (
                  <li key={item.key} className="">
                    <span className="hover:bg-main-blue hover:text-white">
                      {item.icon} <span>{item.label}</span>
                    </span>
                    {item.children && (
                      <ul>
                        {item.children.map((child) => {
                          if (child.key === "5-2") {
                            return (
                              <li key={child.key}>
                                <button
                                  onClick={() => {
                                    handlerLogout();
                                  }}
                                  disabled={isPendingLogout}
                                  className="hover:bg-main-blue hover:text-white"
                                >
                                  <span>{child.label}</span>
                                </button>
                              </li>
                            );
                          }
                          return (
                            <li key={child.key}>
                              <button
                                onClick={() =>
                                  child.onClick ? child.onClick() : null
                                }
                                className="hover:bg-main-blue hover:text-white"
                              >
                                <span>{child.label}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
