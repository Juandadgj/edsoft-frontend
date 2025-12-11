import React from "react";
import { Table } from "antd";

const TableComponent = ({ data, column }: { data: any; column: any }) => {
  return (
    <div className="">
      <Table
        rowKey={"id"}
        columns={column}
        dataSource={data}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default TableComponent;
