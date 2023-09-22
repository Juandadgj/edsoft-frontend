import Link from "next/link";
import React from "react";
import { InstitutionCard } from "./types";

const CInstitutions = (props:InstitutionCard) => {
  const { name, address, id } = props;
  return (
    <Link
      href={`/login?id=${id}&colegio=${encodeURIComponent(name)}`}
      className="w-full"
    >
      <tr className="flex w-full p-4 my-4 bg-gray1 border-none rounded-[20px] text-xl font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {address}
        </td>
      </tr>
    </Link>
  );
};

export default CInstitutions;
