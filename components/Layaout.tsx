import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SchoolAvatar } from "./SchoolAvatar";
import { Layout, Menu, Select, theme } from "antd";
import Image from "next/image";
import Logo from "../public/assets/logo@2x.png";
import { BreadCrumbs } from "./BreadCrumbs";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  useGetSchoolarYearsQuery,
  useScholearYearSelectedQuery,
  useSelectScholarYearMutation,
} from "@/generated/graphql";
import {
  AcademicProcessIcon,
  AnualProgramingIcon,
  FuncionariesIcon,
  ReportsIcon,
  SettingsIcon,
} from "@/shared/icons";

interface ILayaout {
  children: React.ReactNode;
  textpage: string;
}
const { useToken } = theme;

const { Header, Sider, Content } = Layout;

const Layaout = ({ children, textpage }: ILayaout) => {
  const { data: schoolYears } = useGetSchoolarYearsQuery();
  const { data: scholarYear } = useScholearYearSelectedQuery();
  const [
    selectScholarYear,
    { data: scholarYearData },
  ] = useSelectScholarYearMutation({ fetchPolicy: "network-only" });
  const handlerSelectYear = async (year: number) => {
    await selectScholarYear({ variables: { idYear: year } });
    window.location.reload();
  };
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
       router.push("/instituciones");
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="h-screen">
      <div
        className="h-full bg-white"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#25429e #F3F4F6",
          scrollbarGutter: "100px",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "white",
          }}
          className=" py-4 h-full bg-white"
          width={260}
        >
          <div className="flex items-center justify-center gap-2 mb-1 h-[7%]">
            <Image src={Logo} alt="Inicio" className={`h-10 w-10`} />
            {!collapsed && (
              <h1 className="font-bold text-2xl text-black">EdSoft</h1>
            )}
          </div>
          <Menu
            className="h-[93%] overflow-auto bg-white dark:bg-gray7"
            mode="inline"
            items={[
              {
                icon: <FuncionariesIcon color="white" />,
                key: "1",
                label: "Funcionarios",
                children: [
                  {
                    key: "1-1",
                    label: "Docentes",
                    onClick: () =>
                      router.push(
                        "/dashboard/funcionarios?componente=profesores"
                      ),
                  },
                  {
                    key: "1-2",
                    label: "Secretarios",
                    onClick: () =>
                      router.push(
                        "/dashboard/funcionarios?componente=secretarios"
                      ),
                  },
                ],
              },
              {
                icon: <AnualProgramingIcon />,
                key: "2",
                label: "Programacion Anual",
                children: [
                  {
                    key: "2-1",
                    label: "Tipo de Calificación",
                    onClick: () =>
                      router.push(
                        "/dashboard/programacion-anual?componente=calificacion"
                      ),
                  },
                  {
                    key: "2-2",
                    label: "Establecer año",
                    onClick: () =>
                      router.push(
                        "/dashboard/programacion-anual?componente=establecer-año"
                      ),
                  },
                  {
                    key: "2-3",
                    label: "Copiar Año Anterior",
                    onClick: () =>
                      router.push(
                        "/dashboard/programacion-anual?componente=copiar-año"
                      ),
                  },
                  {
                    key: "2-4",
                    label: "Crear Cursos",
                    onClick: () =>
                      router.push(
                        "/dashboard/programacion-anual?componente=crear-curso"
                      ),
                  },
                  {
                    key: "2-5",
                    label: "Áreas",
                    onClick: () =>
                      router.push(
                        "/dashboard/programacion-anual?componente=areas"
                      ),
                  },
                  {
                    key: "2-6",
                    label: "Asignaturas",
                    onClick: () =>
                      router.push(
                        "/dashboard/programacion-anual?componente=asignaturas"
                      ),
                  },
                  {
                    key: "2-7",
                    label: "Logros",
                    onClick: () =>
                      router.push(
                        "/dashboard/programacion-anual?componente=logros"
                      ),
                  },
                  {
                    key: "2-8",
                    label: "Matrículas",
                    onClick: () =>
                      router.push(
                        "/dashboard/programacion-anual?componente=matriculas"
                      ),
                  },
                ],
              },
              {
                icon: <AcademicProcessIcon />,
                key: "3",
                label: "Proceso Academico",
                children: [
                  {
                    key: "3-1",
                    label: "Calificación",
                    onClick: () =>
                      router.push(
                        "/dashboard/proceso-anual?componente=calificacion"
                      ),
                  },
                ],
              },
              {
                icon: <ReportsIcon />,
                key: "4",
                label: "Reportes",
                children: [
                  {
                    key: "4-1",
                    label: "Indicadores",
                    onClick: () =>
                      router.push("/dashboard/reportes?componente=indicadores"),
                  },
                  {
                    key: "4-2",
                    label: "Planillas",
                    onClick: () =>
                      router.push("/dashboard/reportes?componente=planillas"),
                  },
                  {
                    key: "4-3",
                    label: "Listados",
                    onClick: () =>
                      router.push("/dashboard/reportes?componente=listados"),
                  },
                  {
                    key: "4-4",
                    label: "Entregables",
                    onClick: () =>
                      router.push("/dashboard/reportes?componente=entregables"),
                  },
                ],
              },
              {
                icon: <SettingsIcon />,
                key: "5",
                label: "Ajustes",
                children: [
                  { key: "5-1", label: "Panel principal", onClick: () => router.push("/dashboard/ajustes") },
                  { key: "5-2", label: "Cerrar sesion" },
                ],
              },
            ]}
          />
        </Sider>
      </div>
      <Layout>
        <Header
          style={{
            background: "white",
          }}
          className="bg-white flex justify-between items-center w-full relative gap-2"
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
              }}
            >
              {collapsed ? (
                <MenuUnfoldOutlined color="white" />
              ) : (
                <MenuFoldOutlined color="white" />
              )}
            </button>
            <div className="hidden md:flex">
              <BreadCrumbs page={textpage} />
            </div>
          </div>
          <div className="flex items-center">
            <Select
              className="custom-select"
              style={{ width: "80px" }}
              onChange={handlerSelectYear}
              placeholder="Seleccione año"
              defaultValue={scholarYear?.scholearYearSelected.id_year}
              value={scholarYear?.scholearYearSelected.id_year}
              options={schoolYears?.scholarYears.map((year: any) => {
                return {
                  value: year.id_year,
                  label: year.id_year,
                };
              })}
              suffixIcon={
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.8276 1.48228L6.40232 5.93505C6.13077 6.20829 5.69049 6.20829 5.41893 5.93505L0.993671 1.48228C0.722115 1.20903 0.722115 0.766019 0.993671 0.492775C1.26523 0.21953 1.70551 0.21953 1.97706 0.492775L5.91063 4.45079L9.84419 0.492775C10.1157 0.219531 10.556 0.219531 10.8276 0.492775C11.0991 0.766019 11.0991 1.20904 10.8276 1.48228Z"
                    fill="black"
                  />
                </svg>
              }
            />
            <SchoolAvatar />
          </div>
        </Header>
        <Content className="p-10 py-5 h-full overflow-auto">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Layaout;
