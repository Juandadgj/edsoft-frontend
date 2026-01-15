import React from "react";
import { Table } from "antd";

const TableComponent = ({ data, column }: { data: any; column: any }) => {
  return (
    <div className="w-full">
      <Table
        rowKey={"id"}
        columns={column}
        dataSource={data}
        scroll={{ x: "max-content" }}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default TableComponent;
