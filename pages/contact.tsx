import Nav from "../components/Nav";
import ClientService from "../public/assets/clientService@2x.png";
import ContactDown from "../public/assets/ContactDown.png";
import contacDown from "../public/assets/sasa.svg";
import Ellipse from "../components/Ellipse";
import React, { useEffect, useState } from "react";
import { Grid, styled } from "@mui/material";
import facebookIcon from "../public/assets/social-media/facebook.png";
import wathsappIcon from "../public/assets/social-media/whatsapp.png";
import gmailIcon from "../public/assets/social-media/gmail.png";
import twitterIcon from "../public/assets/social-media/twiter.png";
import Image from "next/image";

function Contact() {
  const [active, setActive] = useState(false);

  const ContactContainer = styled("div")(({ theme }) => ({
    // backgroundImage: `url(${ClientService})`,
    position: "relative",
    height: "100%",
  }));

  const Elipse1 = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "55vh",
    right: "1rem",
    [theme.breakpoints.down(1270)]: {
      right: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      right: "0px",
      top: "51vh",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));
  const Elipse2 = styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: "4rem",
    left: "3rem",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));

  useEffect(() => {
    setActive(true);
    sessionStorage.removeItem("userToken");
  }, []);

  return (
    <React.Fragment>
      <ContactContainer>
        <div className="relative">
          <h1
            className={`absolute z-10 inset-0 bottom-[50%] top-[40%] text-7xl max-[1100px]:text-6xl max-[900px]:text-5xl max-[700px]:text-4xl text-center font-bold opacity ${
              active && "active"
            } transitionDown ${active && "active"}`}
          >
            Contáctate con Nosotros
          </h1>
          <Image
            src={ClientService}
            alt=""
            style={{ minHeight: "100%" }}
            className="w-full h-full blur-[2px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0056a6ad] to-[#53003A96] opacity-80"></div>
        </div>
        <Grid style={{ width: "100%", position: "absolute", top: 0 }}>
          <Grid>
            <Nav actualPage="Contact" withNavigation />
          </Grid>
        </Grid>

        <div className="h-full w-full flex flex-col bg-white">
          <div className="flex mt-6 gap-3 justify-around items-center flex-row max-[800px]:flex-col">
            <div className="">
              <h4
                className={`opacity${active ? "active" : ""} animate-fade-right ${
                  active ? "active" : ""
                } text-black text-2xl font-semibold max-[800px]:text-lg max-[800px]:text-center`}
              >
                SystemPlus (San Marcos - Sucre)
                <br />
                Gilberto Guerrero
                <br />
                Movil: 3114174048 - 3116935117
                <br />
                Teléfono : 2954410
                <br />
                systempluscolombia@hotmail.com
              </h4>
            </div>
            <div className="w-[3px] h-[200px] bg-gray5 max-[800px]:hidden "></div>
            <div
              className={`font-semibold text-black text-2xl opacity${
                active ? "active" : ""
              } animate-fade-left ${active ? "active" : ""} max-[800px]:text-lg max-[800px]:text-center`}
            >
              <h4>
                Larry José Morales J.
                <br />
                Barranquilla - Atlántico <br /> Movil: 3013975504
              </h4>
            </div>
          </div>
          <div>
            <p className="flex justify-start ml-[8%] text-gray4 max-[800px]:justify-center max-[800px]:ml-[0] max-[800px]:text-center">
              <br />
              informacion@edsoft.com
              <br />
              informacion@eaduatlantico.com
              <br />
              soporte@edsoft.com
              <br />
              soporte@eaduatlantico.com
            </p>
          </div>
          <div className="flex justify-end  h-full">
            <Image
              src={contacDown}
              alt=""
              className="w-[600px] relative h-full"
            />
            <div className="absolute flex flex-row gap-10 right-6 bottom-5">
              <a href="mailto:informacion@edsoft.com" className="h-16 w-16">
                <Image
                  src={facebookIcon}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </a>
              <a href="http://localhost:3000/" className="h-16 w-16">
                <Image
                  src={twitterIcon}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </a>
              <a href="http://localhost:3000/" className="h-16 w-16">
                <Image
                  src={gmailIcon}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </a>
              <a href="http://localhost:3000/" className="h-16 w-16">
                <Image
                  src={wathsappIcon}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </a>
            </div>
          </div>
        </div>

        <Elipse1>
          <Ellipse className="mr-5" width={70} height={70} />
        </Elipse1>
        <Elipse2>
          <Ellipse className="mr-5" width={70} height={70} />
        </Elipse2>
      </ContactContainer>
    </React.Fragment>
  );
}

export default Contact;
