import React from "react";
import { AreaCard } from "./types";

const CAreas = (props: AreaCard) => {
  const {borrar,edit,name} = props
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {edit}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {borrar}
        </td>
      </tr>
    </div>
  );
};

export default CAreas;
