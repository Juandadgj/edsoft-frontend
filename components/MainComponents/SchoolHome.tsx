import { WhatsAppOutlined } from "@ant-design/icons";
import { MailIcon } from "lucide-react";
import React from "react";

export const SchoolHome = ({ textComponent, manage }: any) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-full rounded-btn"
      style={{
        backgroundImage: `url("/assets/background@2x.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <h1 className="text-white mb-2 text-6xl font-bold">Bienvenido</h1>
      <h6 className="text-white mb-2">
        La mejor forma de gestionar su colegio
      </h6>

      <div className="block absolute end-3 mr-7 gap-2 pr-4">
        <div className="mb-1">
          <a href="#!" role="button">
            <WhatsAppOutlined style={{ fontSize: "20px", color: "#00bc7d" }} />
          </a>
        </div>
        <div className="">
          <a href="#!" role="button">
            <MailIcon size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};
