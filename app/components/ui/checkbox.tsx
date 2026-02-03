import React from "react";

export const Checkbox = ({ checked, onChange, name, label }: any) => {
  return (
    <div className="flex justify-start items-center gap-3">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="checkbox checkbox-sm bg-gray-500 checked:border-main-blue checked:bg-main-blue checked:text-white"
      />
      <label className="label cursor-pointer">
        <span className="label-text text-foreground text-sm">{label}</span>
      </label>
    </div>
  );
};
