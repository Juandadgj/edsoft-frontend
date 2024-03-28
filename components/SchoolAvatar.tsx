import React, { useState } from "react";
import { useRouter } from "next/router";

export const SchoolAvatar = () => {
  const router = useRouter();  
  return (
    <div className="absolute mr-5 right-0 top-10">
      <div className="dropdown dropdown-left">
        <button
          className="w-20 p-2 hover:scale-105 transition duration-500"
        >
          <div className="avatar">
            <div className="w-20 rounded-[100%]">
              <img src={"/assets/institucionLogo@2x.png"} alt="icon" />
            </div>
          </div>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-52"
        >
          <li>
            <button
              className="dropdown-item"
              id="Teachers"
              onClick={() => router.push("/dashboard")}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              id="Teachers"
              onClick={() => router.push("/dashboard/ajustes")}
            >
              Cambiar contraseña
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              id="Teachers"
              onClick={() => router.push("/instituciones")}
            >
              Cerrar sesion
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
