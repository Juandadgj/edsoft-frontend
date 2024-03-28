import Nav from "../components/Nav";
import { useMemo } from "react";
import { useGetInstitutionsQuery } from "../generated/graphql";
import { useEffect } from "react";

import Table from "@/components/Table";

const columns = [
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Dirección",
    accessor: "address",
  },
];

function Institutions() {
  const { data, loading, error } = useGetInstitutionsQuery();

  useEffect(() => {
    sessionStorage.removeItem("userToken");
  }, []);

  const processedInstitutions = useMemo(() => {
    if (!data?.institutions) return [];
    console.log(data.institutions);
    return data.institutions.map((institution, index) => ({
      id: institution?.id_institution ?? index,
      name: institution?.name ?? "",
      address: institution?.direction ?? "",
    }));
  }, [data]);

  return (
    <div className="w-full bg-gray1 h-full pb-3">
      <Nav actualPage="Instituciones" withNavigation />
      <div className='mt-4 md:mt-8'>
        <div className="lg:mx-24 sm:mx-10 bg-white shadow-2xl rounded-[2rem] p-9">
          <div className="flex justify-center items-center font-bold text-black text-xl my-5">
            <h4>Lista de instituciones Educativas</h4>
          </div>
          {error && <div>¡Ocurrio un error!</div>}
          {data?.institutions && !loading && (
            <Table
              data={processedInstitutions}
              column={columns}
              type={"institution"}
            />
          )}
          {loading}
        </div>
      </div>
    </div>
  );
}

export default Institutions;
