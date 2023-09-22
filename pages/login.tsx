import Logo from "../public/assets/logo@2x.png";
import LogoInst from "../public/assets/institucionLogo@2x.png";
import BackArrow from "../public/assets/backArrow.png";
import { useLoginLazyQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
//import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material";
//import { useLocation } from 'react-router-dom';
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const { id, colegio } = router.query;
  //const navigate = useNavigate();
  const [user, setUser] = useState({
    password: "barco",
    user: "gilberto",
    id_institution: 1059,
  });

  const [username, setUsername] = useState('')
  const [getUser, { data }] = useLoginLazyQuery();

  useEffect(() => {
    if (!id || !colegio) {
      router.push("/instituciones");
      return;
    }
    if (data) {
      console.log(data.signin);
      const {
        signin: { token },
      } = data;
      console.log(token);
      if (token) {
        sessionStorage.setItem("userToken", token);
      }
      router.push("/dashboard");
    }
  }, [data, router]);

  const ContainerLogin = styled("div")(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    width: "33%",
    height: "75%",
    padding: "0.75rem",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    marginTop: "0",
    borderRadius: "25px",
    [theme.breakpoints.down("lg")]: {
      width: "40%",
    },
    [theme.breakpoints.down("md")]: {
      width: "63.3%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
      margin: 0,
      paddingTop: "6rem",
      borderRadius: "0px",
    },
  }));
  const WrapperLogin = styled("div")(({ theme }) => ({
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "#EFEFEF",
    position: "relative",
  }));
  const WrapperNavLink = styled("div")(({ theme }) => ({
    top: 0,
    width: "100%",
    display: "flex",
    padding: "2rem",
    paddingTop: "0",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
      paddingLeft: "1rem",
      justifyContent: "space-between",
    },
  }));
  const ImgBack = styled("img")(({ theme }) => ({
    width: "60px",
    height: "70px",

    [theme.breakpoints.down("sm")]: {
      width: "60px",
      height: "60px",
    },
  }));
  const NameInstitution = styled("strong")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  }));
  const handlerChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUsername(e.target.value)
  };
  return (
    <WrapperLogin>
      <WrapperNavLink>
        <Link
          href={"/instituciones"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={BackArrow} alt="Back Arrow" className="block mx-0 my-0" />
        </Link>
        <Link
          href={"/instituciones"}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="Logo EdSoft"
              className="block w-16 h-16 align-text-middle my-3"
              style={{ marginRight: "0px", marginLeft: "1rem" }}
              width={64}
              height={64}
            />
            <h3 className="align-middle mx-2 text-4xl	font-bold">EdSoft</h3>
          </div>
        </Link>
      </WrapperNavLink>

      <ContainerLogin className="mx-auto align-text-middle row  shadow-sm">
        <Image
          src={LogoInst}
          alt="Logo institucion"
          className="block w-28 align-text-middle mx-auto mt-5"
          width={112}
          height={40}
        />
        <p className="text-black fs-3 mx-auto text-center ">
          <span className="text-black bold mx-auto align-text-middle pb-4 font-size:large">
            <NameInstitution>{colegio}</NameInstitution>
          </span>
          <br />
          <span className="text-gray4  font-size:small mx-auto align-middle pt-5 fs-4">
            <small>Inicia sesión</small>
          </span>
        </p>
        <div>
          <div className="">
            <input
              className="w-full bg-gray2 text-black rounded-4 border-0 py-2 ps-6 fs-4 mb-4 mx-auto"
              type="text"
              placeholder="Usuario"
              value={user.user}
              name="user"
              onChange={handlerChangeUser}
            />
            <input
              className="w-full text-black bg-gray2 rounded-4 border-0 pe-20 py-2 ps-6 fs-4  mb-4 col-lg-9 mx-auto"
              type="password"
              placeholder="Contraseña"
              value={user.password}
              name="password"
              onChange={handlerChangeUser}
            />
          </div>
        </div>
        <span className="text-blue2 col-lg-10 bl-4 ml-lg-5 my-3">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;¿Olvidaste tu contraseña?</p>
        </span>
    <button
          type="button"
          className="btn bg-blue2  btn-primary rounded-5 pl-4 ml-4 mx-auto col-lg-9 h-15 mb-5 "
          onClick={e => {
            e.preventDefault();
            getUser({ variables: user });
          }}>
          <h4 className="text-white pt-2">Iniciar Sesion</h4>
        </button>
      </ContainerLogin>
    </WrapperLogin>
  );
}

export default Login;
