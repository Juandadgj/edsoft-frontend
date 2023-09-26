import React from "react";
import { SecretariesCard } from "./types";

const CScretaries = (props: SecretariesCard) => {
  const { name, lastName, editar, borrar } = props;

  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          <p className="w-full"> {name}</p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="w-full">{lastName}</p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <div className="w-full">{editar}</div>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <div className="w-full">{borrar}</div>
        </td>
      </tr>
    </div>
  );
};

export default CScretaries;
