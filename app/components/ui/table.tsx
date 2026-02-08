import React from "react";
import { Table as AntTable } from "antd";

export default function Table({ columns, data, rowKey }: { columns: any[]; data: any[]; rowKey: string }) {
  return (
    <AntTable
      rowKey={rowKey}
      columns={columns}
      dataSource={data}
      scroll={{ x: "max-content" }}
      pagination={false}
      size="small"
    />
  );
}
