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
    console.log("navigation", actualPage);
  }, []);
  return (
    <nav
      className={`flex ${
        actualPage === "Contact" ? "bg-transparent" : "bg-#EFEFEF"
      } px-8 pt-0 w-full h-auto p-5`}
    >
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
          <Image src={BigLogo} className="w-16 h-16 mr-3" alt="Edsoft Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            Edsoft
          </span>
        </Link>

        <div className="navbar-toggler border-0 flex  lg:hidden ">
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
          <div className="w-[50%] hidden lg:flex">
            <ul className="flex text-2xl ">
              <li
                className={`
                mx-6 px-2 py-2
                transition-colors	
                duration-500
                ${actualPage === "Contact" ? "text-gray2" : "text-black"}
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
                ${actualPage === "Contact" ? "text-gray2" : "text-black"}
                  ${
                    actualPage === "Instituciones"
                      ? " bg-main-blue !text-white rounded-b-[30px] h-[80px]"
                      : "text-gray6"
                  }  `}
              >
                <Link
                  className={`hover:text-gray7 transition-colors ${actualPage === "Instituciones" && "active"} `}
                  aria-current="page"
                  href="/instituciones"
                  style={{ minWidth: "310px" }}
                >
                  <h3 style={{ fontWeight: "400" }}>
                    Lista de Inst. Educativas
                  </h3>
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
                <Link className="hover:text-gray7 transition-colors" aria-current="page" href="/contact">
                  <h3 style={{ fontWeight: "400" }}>Contacto</h3>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
