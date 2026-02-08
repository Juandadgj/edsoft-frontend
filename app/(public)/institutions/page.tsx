import { InstitutionsClient } from "../../components/home/institutions/institutions-client";
import serverApi from "@/app/lib/api/server-api";
import { Institution } from "@/app/types";

// Forzar renderizado dinámico porque usamos cookies para autenticación
export const dynamic = "force-dynamic";

async function Institutions() {
  const data = await serverApi.get<Institution[]>("/institutions");

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-base-200/90 via-base-200/60 to-base-100 py-10 transition-colors duration-300 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">
            Instituciones
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-base-content md:text-3xl">
            Lista de instituciones educativas
          </h1>
        </header>

        <div className="relative rounded-3xl border border-base-300/60 bg-base-100/90 shadow-2xl shadow-base-300/30">
          <div className="absolute inset-x-4 top-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-main-blue py-0.5" aria-hidden />
          <div className="relative flex flex-col gap-4 px-4 pb-4 pt-10 sm:px-6 sm:pb-6">
            <InstitutionsClient institutions={data} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Institutions;
