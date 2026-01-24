import React, { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  errorText?: string | undefined | null;
}

export const Input = ({
  name,
  value,
  onChange,
  errorText,
  type,
  placeholder,
  label,
}: IInput) => {
  return (
    <div className={`form-control w-full relative ${errorText ? `border-red-500 after:absolute after:left-0 after:-bottom-4 after:content-['Campo_requerido!'] after:ml-0.5 after:text-red-500 after:text-xs after:italic` : ''} `}>
      {label && (
        <div className="label text-foreground p-1">
          <label className="">{label}</label>
        </div>
      )}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md pl-3.5 w-full h-9 bg-transparent text-sm text-black focus:outline-none ${errorText ? `border-red-500 focus:border-red-500 hover:border-red-500` : 'focus:border-main-blue hover:border-main-blue '}  transition duration-300 appearance-none`}
        onChange={onChange}
      />
      {/* {errorText && (
        <div className="label p-1 animate-fade-right">
          <label className="text-xs text-red-500 italic ">{errorText}</label>
        </div>
      )} */}
    </div>
  );
};
