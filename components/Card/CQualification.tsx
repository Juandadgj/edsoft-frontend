import React from "react";

export const CQualification = (props: any) => {
  console.log("props", props);
  const { name, logros } = props;
  return (
    <div className="w-full">
      <tr className=" flex items-center justify-center p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className=" justify-center items-center text-center">{name}</td>
        {logros &&
          logros.map((logros: any, index: number) => (
            <td className="justify-center items-center text-center">{index}</td>
          ))}
      </tr>
    </div>
  );
};
