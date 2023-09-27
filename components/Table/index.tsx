import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import CInstitutions from "../Card/CInstitutions";
import Card from "../Card";
import { TableContainer } from "@material-ui/core";
import { useRouter } from "next/router";

const Table = ({ data, column, type }: any) => {
  const {asPath} = useRouter()
  console.log(asPath)
  return (
    <div className={`w-full  overflow-x-auto animate-fade-left ${asPath == '/instituciones' ? 'h-full' : 'h-96'}`}>
      <table className="table text-black ">
        <thead className="flex items-center justify-center">
          <tr className="flex w-full justify-center border-blue3 border-b-4 text-xl font-semibold">
            {column.map((key: any, index: any) => (
              <th key={key} className="w-full text-center text-blue3 whitespace-normal flex items-center justify-center">
                <p className="w-full">{key.Header}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full py-4 ">
          {data.map((item: any, key: any) => (
            <Card key={key} type={type} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
