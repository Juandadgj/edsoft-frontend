import React from "react";
import { useRouter } from "next/router";
import teachers from "@/shared/teachers";
import { Table, Button, Space } from "antd";

const TableComponent = ({
  data,
  column,
  type,
}: {
  data: any;
  column: any;
  type?: string;
}) => {
  return (
    <div className="h-full pb-14">
      <Table
        className="overflow-y-auto h-full"
        columns={column}
        dataSource={data}
        scroll={{ x: "max-content" }}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#25429e #F3F4F6",
          scrollbarGutter: "100px",
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default TableComponent;
