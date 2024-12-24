import React from "react";
import { useRouter } from "next/router";
import teachers from "@/shared/teachers";
import { Table, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const TableComponent = ({ data, column, type }: { data: any; column: any; type?: string }) => {
  const { asPath } = useRouter();
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Grado",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            shape="round"
            size="small"
            icon={<EditOutlined />}
          />
          <Button
            type="primary"
            danger
            shape="round"
            size="small"
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];
  return (
    <div
      className={`w-full px-3 overflow-x-auto animate-fade-left ${
        asPath == "/instituciones" ? "h-full" : "h-full"
      }`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#25429e #F3F4F6",
        scrollbarGutter: "100px",
      }}
    >
      <Table columns={columns} dataSource={teachers} />
    </div>
  );
};

export default TableComponent;
