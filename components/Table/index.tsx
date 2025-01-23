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
    <div className="">
      <Table
        columns={column}
        dataSource={data}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default TableComponent;
