import React from "react";
import Card from "../Card";
import { useRouter } from "next/router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import teachers from "@/shared/teachers";
import { Pagination } from "@mui/material";

const TableComponent = ({ data, column, type }: any) => {
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
      {/* <table className="table text-black">
        <thead className="flex items-center justify-center">
          <tr className="flex w-full justify-center border-main-blue border-b-4 text-base font-semibold">
            {column.map((key: any, index: any) => (
              <th
                key={index}
                className="w-full text-center text-main-blue whitespace-normal flex items-center justify-center"
              >
                <p className="w-full">{key.Header}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full py-2">
          {data.map((item: any, index: number) => (
            <Card key={index} type={type} item={item} />
          ))}
        </tbody>
      </table> */}
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {column.map((key: any, index: any) => (
                <TableCell key={index} align="center">{key.Header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                <TableCell align="center">{row.degree}</TableCell>
                <TableCell align="center">
                  <button className="border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 36 36"
                    >
                      <path
                        fill="#0055A6"
                        d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z"
                        className="clr-i-outline clr-i-outline-path-1"
                      />
                      <path
                        fill="#0055A6"
                        d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.69 1.69 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z"
                        className="clr-i-outline clr-i-outline-path-2"
                      />
                      <path fill="none" d="M0 0h36v36H0z" />
                    </svg>
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button className="border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="#e11d48"
                        d="M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12ZM94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Zm48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Z"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end items-center gap-3">
        <Pagination count={10} color="primary" />
      </div>
    </div>
  );
};

export default TableComponent;
