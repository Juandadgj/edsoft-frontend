import { styled } from "@mui/material";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { AnyCnameRecord } from "dns";
import Link from "next/link";
import { TeachersCard } from "./types";

const CTeachers = (props: TeachersCard) => {
  const { name, lastName, degree, editar, borrar } = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-4 my-4 bg-gray1 border-none rounded-[20px] text-xl font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {lastName}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {degree}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {editar}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {borrar}
        </td>
      </tr>
    </div>
  );
};

export default CTeachers;
