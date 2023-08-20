import BigLogo from "../public/assets/logo@2x.png";
import * as React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface NavProps {
  actualPage: "Inicio" | "Instituciones" | "Contact";
  withNavigation?: boolean;
}

function Nav(
  { actualPage, withNavigation }: NavProps = {
    actualPage: "Inicio",
    withNavigation: true,
  }
) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setToggle(!toggle);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    console.log("navigation", withNavigation);
  }, []);
  return (
<<<<<<< Updated upstream
    <nav className="flex bg-white px-8 pt-0 w-full h-auto p-5">
=======
    <nav className="flex bg-#EFEFEF px-8 pt-0 w-full h-auto">
>>>>>>> Stashed changes
      <div className="h-full w-full flex justify-between items-center">
        {/* <Link
          className="w-auto ms-5 flex items-center text-black"
          href="/"
        >
          <Image
            src={BigLogo}
            alt="Logo EdSoft"
            className="inline-block w-12 h-12"

          />
          <h3
            className={`align-middle mx-2 font-bold text-5xl`}
          >
            EdSoft
          </h3>
        </Link> */}

        <Link href="/" className="flex items-center">
          <Image src={BigLogo} className="h-8 mr-3" alt="Edsoft Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            Edsoft
          </span>
        </Link>

<<<<<<< Updated upstream
        <div className="navbar-toggler border-0 flex  lg:hidden ">
=======
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 17 14"
          >
            <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>
          </ul>
        </div>

        {/* <div className="navbar-toggler border-0 md:hidden sm:flex">
>>>>>>> Stashed changes
          <Button
            // className="btn dropdown-toggle border-0"
            // type="button"
            data-toggle="dropdown"
            aria-expanded="false"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            {open ? (
              <ClearIcon className="h-15 w-11" sx={{ fontSize: 40 }} />
            ) : (
              <MenuIcon className="h-15 w-11" sx={{ fontSize: 40 }} />
            )}
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <div className="p-3">
              <MenuItem sx={{ fontSize: 20 }}>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff"
                  href="/"
                  onClick={handleClose}
                >
                  Inicio
                </Link>
              </MenuItem>

              <MenuItem sx={{ fontSize: 20 }}>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff m-0"
                  href="/instituciones"
                  onClick={handleClose}
                >
                  Lista de Inst. Educativas
                </Link>
              </MenuItem>
              <MenuItem sx={{ fontSize: 20 }}>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff"
                  href="/contact"
                  onClick={handleClose}
                >
                  Contacto
                </Link>
              </MenuItem>
            </div>
          </Menu>
        </div>

        {withNavigation && (
          <div className="text-black w-[60%] hidden lg:flex">
            <ul className="flex text-2xl">
              <li className={`
                mx-6 px-2 py-2
                hover:text-gray7
                transition-colors	
                duration-500
                  ${
                    actualPage === "Inicio" ? " bg-main-blue !text-white rounded-b-[30px] h-[80px]" : "text-gray6"
                  } `}>
                <Link
                  
                  aria-current="page"
                  href="/"
                >
                  <h3 style={{ fontWeight: "400" }}>Inicio</h3>
                </Link>
              </li>
              <li className={`
                  mx-6 px-2 py-2 hover:text-gray7
                  transition-colors	
                  duration-500
                  ${
                    actualPage === "Instituciones" ? " bg-main-blue !text-white rounded-b-[30px] h-[80px]" : "text-gray6"
                  }  `}>
                <Link
                  className={`${
                    actualPage === "Instituciones" && "active"
                  } `}
                  aria-current="page"
                  href="/instituciones"
                  style={{ minWidth: "310px" }}
                >
                  <h3 style={{ fontWeight: "400" }}>
                    Lista de Inst. Educativas
                  </h3>
                </Link>
              </li>
              <li className={`
                  mx-6 px-2 py-2 hover:text-gray7
                  transition-colors	
                  duration-500
                  ${
                    actualPage === "Contact" ? " bg-main-blue !text-white rounded-b-[30px] h-[80px]" : "text-gray6"
                  }  ${actualPage == "Contact" ? "text-white" : false}`}>
                <Link
                  aria-current="page"
                  href="/contact"
                >
                  <h3 style={{ fontWeight: "500" }}>Contacto</h3>
                </Link>
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </nav>
  );
}

export default Nav;
