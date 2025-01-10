import React from "react";
import { useRouter } from "next/router";
import teachers from "@/shared/teachers";
import { Table, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const TableComponent = ({ data, column, type }: { data: any; column: any; type?: string }) => {
  const { asPath } = useRouter();
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
      <Table columns={column} dataSource={data} />
    </div>
  );
};

export default TableComponent;
