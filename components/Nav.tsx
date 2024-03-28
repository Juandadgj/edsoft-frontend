import BigLogo from "../public/assets/logo@2x.png";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface NavProps {
  actualPage: "Inicio" | "Instituciones" | "Contact";
  withNavigation?: boolean;
}

function Nav({ actualPage }: NavProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToggle(!toggle);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    console.log("navigation", actualPage);
  }, []);
  return (
    <nav
      className={`flex ${
        actualPage === "Contact" ? "bg-transparent" : "bg-#EFEFEF"
      } px-8 pt-0 w-full h-auto p-5`}
    >
      <div className="h-full w-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src={BigLogo} className="w-16 h-16 mr-3" alt="Edsoft Logo" />
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap transition-colors ${
              actualPage === "Contact" ? "text-[white]" : "text-black"
            }`}
          >
            Edsoft
          </span>
        </Link>

        <details className="dropdown dropdown-botton dropdown-end lg:hidden ">
          <summary onClick={handleClick} tabIndex={0} className="btn bg-transparent border-none">
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
            className="dropdown-content  z-[1] menu p-2 shadow  bg-white text-black rounded-box w-52"
            tabIndex={0}
          >
            <div className="p-3">
              <div>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff"
                  href="/"
                  onClick={handleClose}
                >
                  Inicio
                </Link>
              </div>

              <div>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff m-0"
                  href="/instituciones"
                  onClick={handleClose}
                >
                  Lista de Inst. Educativas
                </Link>
              </div>
              <div>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff"
                  href="/contact"
                  onClick={handleClose}
                >
                  Contacto
                </Link>
              </div>
            </div>
          </ul>
        </details>
        <div className=" hidden lg:flex">
          <ul className="flex text-2xl ">
            <li
              className={`
                mx-6 px-2 py-2
                transition-colors	
                duration-500
                ${actualPage === "Contact" ? "text-[white]" : "text-black"}
                  ${
                    actualPage === "Inicio"
                      ? " bg-main-blue !text-white rounded-b-[30px] h-[80px]"
                      : "text-gray6"
                  } `}
            >
              <Link
                className="hover:text-gray7 transition-colors	"
                aria-current="page"
                href="/"
              >
                <h3 style={{ fontWeight: "400" }}>Inicio</h3>
              </Link>
            </li>
            <li
              className={`
                  mx-6 px-2 py-2
                  duration-500
                ${actualPage === "Contact" ? "text-[white]" : "text-black"}
                  ${
                    actualPage === "Instituciones"
                      ? " bg-main-blue !text-white rounded-b-[30px] h-[80px]"
                      : "text-gray6"
                  }  `}
            >
              <Link
                className={`hover:text-gray7 transition-colors ${
                  actualPage === "Instituciones" && "active"
                } `}
                aria-current="page"
                href="/instituciones"
                style={{ minWidth: "310px" }}
              >
                <h3 style={{ fontWeight: "400" }}>Lista de Inst. Educativas</h3>
              </Link>
            </li>
            <li
              className={`
                  mx-6 px-2 py-2
                  duration-500
                  ${
                    actualPage === "Contact"
                      ? " bg-main-blue !text-white rounded-b-[30px] h-[80px]"
                      : "text-gray6"
                  }  ${actualPage == "Contact" ? "text-white" : false}`}
            >
              <Link
                className="hover:text-gray7 transition-colors"
                aria-current="page"
                href="/contact"
              >
                <h3 style={{ fontWeight: "400" }}>Contacto</h3>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
