import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export const SchoolHome = ({ textComponent, manage }: any) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-full"
      style={{
        backgroundImage: `url("/assets/background@2x.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <h1 className="text-white mb-2 text-6xl font-bold">Bienvenido</h1>
      <h6 className="text-muted mb-2">
        La mejor forma de gestionar su colegio
      </h6>

      <div className="block absolute end-0 mr-7">
        <div className="bg-btn text-white mb-4 p-4 rounded-[100%]">
          <a href="#!" role="button">
            <WhatsAppIcon color="success" />
          </a>
        </div>
        <div className="bg-btn  text-white p-4 rounded-[100%]">
          <a href="#!" role="button">
            <MailOutlineIcon color="error" />
          </a>
        </div>
      </div>
    </div>
  );
};
