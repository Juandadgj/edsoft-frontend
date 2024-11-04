import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export const SchoolAvatar = () => {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <div className="dropdown dropdown-end">
        <button className="btn btn-ghost btn-circle avatar flex items-center justify-center">
          <div className="w-10 rounded-[100%]">
            <img
              src={"/assets/institucionLogo@2x.png"}
              alt="icon"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-52 mt-2"
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
