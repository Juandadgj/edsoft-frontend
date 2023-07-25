import Nav from "../components/Nav";
import ClientService from "../public/assets/clientService.jpg";
import ContactDown from "../public/assets/ContactDown.png";
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
    [theme.breakpoints.down(1270)]: {
      // textAlign: 'center'
    },
  }));

  const WrapperContent = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    [theme.breakpoints.down(1270)]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  const FirstInformation = styled("div")(({ theme }) => ({
    display: "flex",
    borderRight: "2px solid #8D8D8D",
    width: "100%",
    padding: "30px",
    paddingLeft: "70px",
    paddingTop: "12px",
    paddingBottom:"12px",
    [theme.breakpoints.down(1270)]: {
      width: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
      borderRight: "none",
      borderBottom: "2px solid #8D8D8D",
      paddingBottom: "3rem",
      textAlign: "center",
    },
  }));
  const SecondInformation = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    className: "animate__fadeInLeft",
    paddingRight: "70px",
    [theme.breakpoints.down(1270)]: {
      width: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
      borderRight: "none",
      paddingTop: "3rem",
    },
  }));
  const WrapperInfo = styled("div")(({ theme }) => ({
    alignItems: "center",
    height: "50%",
    width: "auto",
    overflow: "hidden",
    padding: "40px 140px",

    [theme.breakpoints.down(1270)]: {
      padding: "60px",
      height: "auto",
    },
  }));
  const Emails = styled("div")(({ theme }) => ({
    paddingLeft: "70px",

    [theme.breakpoints.down(1270)]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      paddingTop: "50px",
      textAlign: "center",
    },
  }));
  const ContentInformation = styled("div")(({ theme }) => ({
    [theme.breakpoints.down(1270)]: {
      textAlign: "center",
    },
  }));
  const ContactBackground = styled("div")(({ theme }) => ({
    backgroundImage: `url("/assets/ContactDown.png")`,
    position: "absolute",
    bottom: 0,
    right: 0,
    height: "180px",
    width: "800px",
    backgroundSize: "cover",
    [theme.breakpoints.down(1270)]: {
      display: "none",
      textAlign: "center",
    },
  }));
  const WrapperSocial = styled("div")(({ theme }) => ({
    display: "flex",
    position: "absolute",
    bottom: 0,
    right: 0,
    gap: "40px",
    padding: "10px",
    paddingRight: "30px",
    zIndex: "4",
    [theme.breakpoints.down(1270)]: {
      textAlign: "center",
      position: "relative",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    },
  }));
  const Elipse1 = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "55vh",
    right: "3rem",
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
        <Grid
          style={{
            height: "50%",
            width: "100%",
            display: "flex",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <Image
            src={ClientService}
            alt=""
            style={{ minHeight: "100%", filter: "brightness(70%)" }}
            className="w-full h-full"
          />
          <Grid style={{ width: "100%", position: "absolute", top: 0 }}>
            <Grid>
              <Nav actualPage="Contact" withNavigation />
            </Grid>
            <Grid className="p-14 h-auto">
              <h1
                className={`text-white text-6xl	text-center font-bold  opacity${
                  active ? "active" : ""
                } transitionDown ${active ? "active" : ""}`}
              >
                <div>Contáctate con Nosotros</div>
              </h1>
            </Grid>
          </Grid>
        </Grid>

        <WrapperInfo>
          <div className="w-full pb-8">
            <WrapperContent>
              <FirstInformation>
                <h4
                  className={`opacity${
                    active ? "active" : ""
                  } transitionRight ${active ? "active" : ""} text-black text-2xl font-semibold	`}
                >
                  SystemPlus (San Marcos - Sucre).
                  <br />
                  Gilberto Guerrero.
                  <br />
                  Movil: 3114174048 - 3116935117.
                  <br />
                  Teléfono : 2954410.
                  <br />
                  systempluscolombia@hotmail.com
                </h4>
              </FirstInformation>
              <SecondInformation>
                <ContentInformation
                  className={`font-semibold text-black text-2xl opacity${
                    active ? "active" : ""
                  } transitionLeft ${active ? "active" : ""}`}
                >
                  <h4>
                    Larry José Morales J.
                    <br />
                    Barranquilla - Atlántico <br /> Movil: 3013975504
                  </h4>
                </ContentInformation>
              </SecondInformation>
            </WrapperContent>
            <Emails className=" text-gray4">
              <br />
              informacion@edsoft.com <br />
              informacion@eaduatlantico.com <br /> soporte@edsoft.com <br />
              soporte@eaduatlantico.com
            </Emails>
          </div>
        </WrapperInfo>
        <ContactBackground></ContactBackground>
        <WrapperSocial>
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
        </WrapperSocial>
        <Elipse1>
          <Ellipse className="mr-5" width={80} height={80} />
        </Elipse1>
        <Elipse2>
          <Ellipse className="mr-5" width={80} height={80} />
        </Elipse2>
      </ContactContainer>
    </React.Fragment>
  );
}

export default Contact;
