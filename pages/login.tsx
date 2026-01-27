import { authService } from "@/services/api.service";
import type { Auth } from "@/types/api.types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/assets/logo@2x.png";
import LogoInst from "../public/assets/institucionLogo@2x.png";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function Test() {
  const router = useRouter();
  const { id, colegio } = router.query;
  const [username, setUsername] = useState("gilberto");
  const [password, setPassword] = useState("barco");
  const [data, setData] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getUser = async (signInInput: { user: string; password: string; id_institution: number }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.signIn(signInInput);
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || !colegio) {
      router.push("/instituciones");
      return;
    }
  }, [id, colegio, router]);

  useEffect(() => {
    if (data) {
      const token = data.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        router.push("/dashboard");
      }
    }
  }, [data, router]);
  return (
    <div className="h-screen bg-[#EFEFEF]">
      <div className="flex items-center justify-start px-5 py-2">
        <Link
          href={"/instituciones"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowLeft size={30} color="#000000" />
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
      </div>
      <div className="bg-white mx-auto flex flex-col justify-center items-center shadow-sm rounded-[25px] w-[33%] h-[75%] p-4">
        <Image
          src={LogoInst}
          alt="Logo institucion"
          className="block w-28 align-text-middle mx-auto mt-5"
          width={112}
          height={40}
        />
        <p className="text-black fs-3 mx-auto text-center ">
          <span className="text-black bold mx-auto align-text-middle pb-4  text-lg animate-fade-left">
            <strong className="text-black text-lg">{colegio}</strong>
          </span>
          <br />
          <span className="text-gray4 mx-auto align-middle pt-5">
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
          {error && <div className="text-red-500">¡Ocurrio un error! {error.message}</div>}
          <Button
            className="btn bg-main-blue pl-4 mb-5 hover:bg-[#0b5ed7] text-white border-none"
            onClick={() => {
              getUser({
                password: password,
                user: username,
                id_institution: 1059,
              });
            }}
          >
            Iniciar sesion {loading && "..."}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Test;
