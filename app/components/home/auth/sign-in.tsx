"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../../ui/button";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import LogoInst from "../../../../public/assets/institucionLogo@2x.png";
import { Input } from "../../ui/input";

import { login } from "@/app/lib/actions/action";

export const SignIn = () => {
  const router = useRouter();
  const { colegio, id } = useParams<{ id: string; colegio: string }>();
  const [username, setUsername] = useState("gilberto");
  const [password, setPassword] = useState("barco");
  const [isPending, startTransition] = useTransition();
  const handleLogin = async () => {
    startTransition(async () => {
      const result = await login({
        user: username,
        password: password,
        id_institution: 1059,
      });
      if (result.status === 200) {
        router.push("/dashboard");
      }
    });
  };
  return (
    <div className="h-screen bg-base-200">
      <div className="mx-auto flex flex-col justify-center items-center shadow-sm rounded-[25px] w-[33%] h-[75%] p-4 bg-base-100">
        <Image
          src={LogoInst}
          alt="Logo institucion"
          className="rounded-md"
          width={112}
        />
        <p className="text-black fs-3 mx-auto text-center ">
          <span className="text-black bold mx-auto align-text-middle pb-4  text-lg animate-fade-left">
            <strong className="text-black text-lg">{colegio}</strong>
          </span>
          <br />
          <span className="text-foreground mx-auto text-center pt-5 text-2xl">
            <small>Inicia sesión</small>
          </span>
        </p>
        <div className=" flex flex-col gap-2 w-full">
          <Input
            name="user"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-main-blue my-3">
            <p>¿Olvidaste tu contraseña?</p>
          </span>
          <Button
            className="btn bg-main-blue pl-4 mb-5 hover:bg-[#0b5ed7] text-white border-none"
            onClick={handleLogin}
            disabled={isPending}
          >
            Iniciar sesion {isPending && <span className="ml-2">...</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};
