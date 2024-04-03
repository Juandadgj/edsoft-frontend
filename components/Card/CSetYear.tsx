import React from "react";
import { SetYearCard } from "./types";

const CSetYear = (props: SetYearCard) => {
  const { selected, year, rector, secretary, details, edit } = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold">
        <td className="flex w-full justify-center items-center text-center">
          {selected ? (
            <div className="w-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 36 36"
              >
                <path
                  fill="#0055A6"
                  d="m28.89 20.91l-5-2.91l4.87-2.86a3.11 3.11 0 0 0 1.14-1.08a3 3 0 0 0-4.09-4.15L21 12.76V7a3 3 0 0 0-6 0v5.76l-4.85-2.85a3 3 0 1 0-3 5.18l5 2.91l-4.95 2.86a3.11 3.11 0 0 0-1.14 1.08a3 3 0 0 0 4.09 4.14L15 23.24v5.66a3 3 0 0 0 2 2.94A3 3 0 0 0 21 29v-5.76l4.85 2.85a3 3 0 1 0 3-5.18Z"
                  className="clr-i-solid clr-i-solid-path-1"
                />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
            </div>
          ) : (
            ""
          )}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="w-full">{year}</p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          <p className="w-full">{rector}</p>
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {details}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {edit}
        </td>
      </tr>
    </div>
  );
};

export default CSetYear;
