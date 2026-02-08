import { cn } from "@/app/lib/cn";
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
  ...props
}: IInput) => {
  return (
    <div
      className={`form-control relative ${errorText ? `border-red-500 after:absolute after:left-0 after:-bottom-4 after:content-['Campo_requerido!'] after:ml-0.5 after:text-red-500 after:text-xs after:italic` : ""} `}
    >
      {label && (
        <div className="label text-gray-300 p-1">
          <label className="text-xs">{label}</label>
        </div>
      )}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={cn(
          "border border-gray-300 rounded-md pl-3.5 w-full h-9 bg-transparent text-sm text-foreground focus:outline-none  transition duration-300 appearance-none focus:border-main-blue hover:border-main-blue",
          props.className,
        )}
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
