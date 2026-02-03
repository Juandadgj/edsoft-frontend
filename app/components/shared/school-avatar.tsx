import { logout } from "@/app/lib/auth/session";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const SchoolAvatar = () => {
  const router = useRouter();
  const [isPending, transition] = useTransition();
  const handlerLogout = () => {
    transition(() => {
      logout();
    });
  };
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
          className="dropdown-content z-1 menu shadow bg-white text-black rounded-box w-52 p-2 mt-2"
        >
          <li>
            <div
              id="Teachers"
              onClick={() => router.push("/dashboard")}
            >
              Inicio
            </div>
          </li>
          <li>
            <div
              id="Teachers"
              onClick={() => router.push("/dashboard/ajustes")}
            >
              Cambiar contraseña
            </div>
          </li>
          <li>
            <button
              id="Teachers"
              onClick={handlerLogout}
              disabled={isPending}
            >
              Cerrar sesion
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
