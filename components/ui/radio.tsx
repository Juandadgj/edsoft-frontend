import React from "react";

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  error?: string;
  required?: boolean;
}

export const Radio: React.FC<RadioProps> = ({
  name,
  label,
  error,
  required,
  ...props
}) => {
  return (
    <div className="flex justify-start items-center gap-3">
      <input
        type="radio"
        name={name}
        className="radio border border-main-blue checked:bg-white checked:text-main-blue"
        {...props}
      />
      <label className="label cursor-pointer">
        <span className="label-text text-black text-sm">{label}</span>
      </label>
    </div>
  );
};
