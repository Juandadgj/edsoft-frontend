import React from "react";
import { DeliverableCard } from "./types";

const CDeliverables = (props: DeliverableCard) => {
  const {name, working_time, group_teacher, id_group, click} = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }} onClick={click}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold hover:bg-gray6 cursor-pointer transition duration-500">
        <td className="flex w-full justify-center items-center text-cente py-2">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center py-2">
          {group_teacher}
        </td>
      </tr>
    </div>
  );
};

export default CDeliverables;