import Nav from "../components/Nav";
import Ellipse from "../components/Ellipse";
import React, { useEffect, useState } from "react";
import facebookIcon from "../public/assets/social-media/facebook.png";
import wathsappIcon from "../public/assets/social-media/whatsapp.png";
import gmailIcon from "../public/assets/social-media/gmail.png";
import twitterIcon from "../public/assets/social-media/twiter.png";
import Image from "next/image";

function Contact() {
  useEffect(() => {
    sessionStorage.removeItem("userToken");
  }, []);

  return (
    <React.Fragment>
      <div className="w-full h-full ">
        <div
          className="h-[500px] w-full relative"
          style={{
            backgroundImage: `url('/assets/clientService@2x.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="h-full w-full flex justify-center items-center">
            <h1
              className={`z-10 text-xl md:text-4xl lg:text-6xl text-center font-bold`}
            >
              Contáctate con Nosotros
            </h1>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0056a6ad] to-[#53003A96] opacity-80"></div>
        </div>

        <div style={{ width: "100%", position: "absolute", top: 0 }}>
          <div>
            <Nav actualPage="Contact" withNavigation />
          </div>
        </div>
        <div className="h-full w-full flex flex-col bg-white">
          <div className="flex justify-center items-center mt-6 gap-3 flex-row max-[800px]:flex-col w-full h-full relative">
            <div className="h-full w-1/2 flex justify-center items-center">
              <div className="">
                <h4
                  className={`animate-fade-right text-black text-base md:text-xl font-semibold max-[800px]:text-center`}
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
                <div className="">
                  <p className="flex justify-start text-gray4 max-[800px]:justify-center max-[800px]:ml-[0] max-[800px]:text-center">
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
              </div>
            </div>
            <div className="w-[3px] h-[200px] bg-gray5 max-[800px]:hidden"></div>
            <div
              className={`h-full w-1/2 flex justify-center items-center  font-semibold text-black text-xl  animate-fade-left max-[800px]:text-lg max-[800px]:text-center`}
            >
              <h4>
                Larry José Morales J.
                <br />
                Barranquilla - Atlántico <br /> Movil: 3013975504
              </h4>
            </div>
            <div className="absolute hidden md:block top-0 right-0">
              <Ellipse className="mr-5" width={70} height={70} />
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-center relative p-4 pt-6 h-full md:h-[200px] w-full bg-none md:bg-[url('/assets/sasa.svg')] md:bg-no-repeat md:bg-right-bottom md:bg-[length:45%]">
            <div className="flex flex-col  md:flex-row md:justify-end md:items-end gap-10 h-full">
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
            <div className="absolute hidden md:block bottom-10 left-5">
              <Ellipse className="mr-5" width={70} height={70} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Contact;
