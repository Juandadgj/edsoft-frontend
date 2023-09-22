import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import CInstitutions from "../Card/CInstitutions";
import Card from "../Card";
import { TableContainer } from "@material-ui/core";

const Table = ({ data, column, type }: any) => {
  return (
    <div className="w-full h-auto">
      <table className="table text-black ">
        <thead className="flex items-center justify-center">
          <tr className="flex w-full justify-center border-blue3 border-b-4 text-xl font-semibold">
            {column.map((key: any, index: any) => (
              <th className="w-full text-center text-blue3 whitespace-normal flex items-center justify-center">
                <p className="w-full">{key.Header}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full py-4 animate-fade-left ">
          {data.map((item: any) => (
            <Card type={type} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
