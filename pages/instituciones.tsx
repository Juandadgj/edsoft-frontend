import Nav from "../components/Nav";
import { useMemo, useCallback } from "react";
import { institutionService } from "@/services/api.service";
import type { Institution } from "@/types/api.types";
import { useEffect, useState } from "react";
import TableComponent from "@/components/Table";
import { Table } from "antd";
const { Column, ColumnGroup } = Table;
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
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
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInstitutions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await institutionService.getAll();
      setInstitutions(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("userToken");
    fetchInstitutions();
  }, [fetchInstitutions]);

  const processedInstitutions = useMemo(() => {
    if (!institutions) return [];
    return institutions.map((institution, index) => ({
      id: institution?.id_institution ?? index,
      name: institution?.name ?? "",
      address: institution?.direction ?? "",
    }));
  }, [institutions]);

  return (
    <div className="w-full h-full pb-3">
      <Nav actualPage="Instituciones" withNavigation />
      <div className="mt-4 md:mt-8">
        <div className="lg:mx-24 sm:mx-10 bg-white shadow-2xl rounded-4xl p-9">
          <div className="flex justify-center items-center font-bold text-black text-xl my-5">
            <h4>Lista de instituciones Educativas</h4>
          </div>
          {institutions && !loading && (
            <Table
              rowKey={"id_institution"}
              columns={columns}
              dataSource={processedInstitutions}
              pagination={false}
            />
          )}
          {loading && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Institutions;
