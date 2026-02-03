"use client";
import { EyeOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import Table from "../../ui/table";

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <h4 className="text-center">{text}</h4>,
  },
  {
    title: "Dirección",
    dataIndex: "direction",
    key: "direction",
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

export const InstitutionsClient = ({
  institutions,
}: {
  institutions: ({
    id_institution: number;
    name: string;
    direction: string;
  } | null)[];
}) => {
  return (
    <div>
      {institutions && (
        <Table columns={columns} data={institutions} rowKey="id_institution" />
      )}
    </div>
  );
};
