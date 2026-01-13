import Nav from "../components/Nav";
import { useMemo } from "react";
import { useGetInstitutionsQuery } from "../generated/graphql";
import { useEffect } from "react";
import TableComponent from "@/components/Table";
import { Table } from "antd";
const { Column, ColumnGroup } = Table;
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
import { data } from "autoprefixer";
const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <h4 className="text-center">{text}</h4>,
  },
  {
    title: "Dirección",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    render: (_: any, record: any) => (
      <div className="flex flex-row justify-center">
        <Link href={`/login?id=${record.id}&colegio=${record.name}`}>
          <button className="border-0">
            <EyeOutlined />
          </button>
        </Link>
      </div>
    ),
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
    <div className="w-full h-full pb-3">
      <Nav actualPage="Instituciones" withNavigation />
      <div className="mt-4 md:mt-8">
        <div className="lg:mx-24 sm:mx-10 bg-white shadow-2xl rounded-4xl p-9">
          <div className="flex justify-center items-center font-bold text-black text-xl my-5">
            <h4>Lista de instituciones Educativas</h4>
          </div>
          {error && <div>¡Ocurrio un error!</div>}
          {data?.institutions && !loading && (
            <Table
              rowKey={"id"}
              columns={columns}
              dataSource={processedInstitutions}
              pagination={false}
            />
          )}
          {loading}
        </div>
      </div>
    </div>
  );
}

export default Institutions;
