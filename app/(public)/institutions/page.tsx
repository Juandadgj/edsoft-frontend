import { InstitutionsClient } from "../../components/home/institutions/institutions-client";
import serverApi from "@/app/lib/api/server-api";
import { Institution } from "@/app/types";

// Forzar renderizado dinámico porque usamos cookies para autenticación
export const dynamic = 'force-dynamic';

async function Institutions() {
 const data = await serverApi.get<Institution[]>('/institutions');
  return (
    <div className="w-full h-full pb-3">
      <div className="mt-4 md:mt-8">
        <div className="lg:mx-24 sm:mx-10 bg-base-100 shadow-2xl rounded-4xl p-9">
          <div className="flex justify-center items-center font-bold text-foreground text-xl my-5">
            <h4>Lista de instituciones Educativas</h4>
          </div>
          <InstitutionsClient institutions={data} />
        </div>
      </div>
    </div>
  );
}

export default Institutions;
