import React, { useState } from "react";
import { useRouter } from "next/router";
import { SchoolAvatar } from "./SchoolAvatar";
import { Layout, Menu } from "antd";
import Image from "next/image";
import Logo from "../public/assets/logo@2x.png";
import { BreadCrumbs } from "./BreadCrumbs";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface ILayaout {
  children: React.ReactNode;
  textpage: string;
}
const { Header, Sider, Content } = Layout;

const Layaout = ({ children, textpage }: ILayaout) => {
  const router = useRouter();
  // useEffect(() => {
  //   const token = sessionStorage.getItem("userToken");
  //   if (!token) {
  //     router.push("/instituciones");
  //   }
  // }, []);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="h-screen">
      <div
        className="h-full"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#25429e #F3F4F6",
          scrollbarGutter: "100px",
        }}
      >
        <Sider
          style={{
            backgroundColor: "#efefef",
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className=" py-4 h-full"
          width={250}
        >
          <div className="flex items-center justify-center gap-2 mb-3 h-[10%]">
            <Image src={Logo} alt="Inicio" className={`h-10 w-10`} />
            {!collapsed && (
              <h1 className="font-bold text-2xl text-black">EdSoft</h1>
            )}
          </div>
          <Menu
            getPopupContainer={(node) => node.parentNode as HTMLElement}
            className="bg-gray1 h-[90%] overflow-auto"
            mode="inline"
            items={[
              {
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
                key: "5",
                label: "Ajustes",
                children: [
                  { key: "5-1", label: "Cambiar contraseña" },
                  { key: "5-2", label: "Cerrar sesion" },
                ],
              },
            ]}
          />
        </Sider>
      </div>
      <Layout>
        <Header className="bg-gray2 flex justify-between items-center w-full relative gap-2">
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
          <SchoolAvatar />
        </Header>
        <Content className="p-10 py-5 h-full overflow-auto">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Layaout;
