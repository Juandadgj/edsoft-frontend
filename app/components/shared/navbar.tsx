"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import BigLogo from "../../../public/assets/logo@2x.png";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/cn";
import { themeChange } from "theme-change";
import { MoonFilled, SunFilled } from "@ant-design/icons";

interface NavProps {
  actualPage: "Inicio" | "Instituciones" | "Contact";
  withNavigation?: boolean;
}
enum NavbarState {
  "INICIO" = "/",
  "INSTITUCIONES" = "/instituciones",
  "CONTACTO" = "/contact",
}
export const Navbar = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToggle(!toggle);
  };
  const [theme, setTheme] = useState("dark");
  const [toggle, setToggle] = useState(false);

  const pathName = usePathname();
  const paths = [
    { name: "Inicio", path: "/" },
    { name: "Lista de Inst. Educativas", path: "/institutions" },
    { name: "Contacto", path: "/contact" },
  ];
  // useEffect(() => {
  //   // The 'false' parameter is required for React projects
  //   themeChange(false);
  //   if (document) {
  //     const theme = document.documentElement.getAttribute("data-theme");
  //     if (theme) {
  //       setTheme(theme);
  //     }
  //   }
  // }, []);
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex px-5 pt-0 w-full h-auto pb-5", {
        "bg-[#030712]": pathname === "/contact",
        "bg-base-200": pathname !== "/contact",
      })}
    >
      <div className="h-full w-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src={BigLogo} className="w-16 h-16 mr-3" alt="Edsoft Logo" />
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap transition-colors text-foreground`}
          >
            Edsoft
          </span>
        </Link>
        <details className="dropdown dropdown-botton dropdown-end lg:hidden ">
          <summary
            onClick={handleClick}
            tabIndex={0}
            className="btn bg-transparent border-none"
          >
            {toggle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#e11d48"
                  d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
                />
              </svg>
            ) : (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#0055A6"
                    d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
                  />
                </svg>
              </div>
            )}
          </summary>

          <ul
            className="dropdown-content  z-1 menu p-2 shadow  bg-white text-black rounded-box w-52"
            tabIndex={0}
          >
            <div className="p-3">
              <div>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff"
                  href="/"
                >
                  Inicio
                </Link>
              </div>

              <div>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff m-0"
                  href="/instituciones"
                >
                  Lista de Inst. Educativas
                </Link>
              </div>
              <div>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff"
                  href="/contact"
                >
                  Contacto
                </Link>
              </div>
            </div>
          </ul>
        </details>
        <div className=" hidden lg:flex">
          <ul className="flex text-2xl ">
            {paths.map((path, index) => (
              <li
                key={index}
                className={cn("mx-6 px-2 py-2 h-20", {
                  "bg-main-blue text-white rounded-b-[30px] h-20":
                    path.path === pathName,
                  "text-white": pathName === NavbarState.CONTACTO,
                })}
              >
                <Link
                  className="hover:text-gray7 transition-colors	"
                  aria-current="page"
                  href={path.path}
                >
                  <h3 style={{ fontWeight: "400" }}>{path.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
          {/* {theme === "dark" ? (
            <button data-act-class="shadow-outline" data-set-theme="light" onClick={()=> setTheme("light")}>
              <SunFilled />
            </button>
          ) : (
            <button data-act-class="shadow-outline" data-set-theme="dark" onClick={()=> setTheme("dark")}>
              <MoonFilled />
            </button>
          )} */}
        </div>
      </div>
    </nav>
  );
};
