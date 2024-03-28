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
    <div className="form-control">
      {label && (
        <div className="label text-gray5 p-1">
          <label className="text-xs">{label}</label>
        </div>
      )}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`input border-gray5 w-full h-12 bg-transparent text-sm text-black ${errorText ? 'border-red-500' : 'focus:outline-none focus:border-main-blue hover:border-main-blue '}  transition duration-300 appearance-none`}
        onChange={onChange}
      />
      {errorText && (
        <div className="label p-1 animate-fade-right">
          <label className="text-xs text-red-500 italic ">{errorText}</label>
        </div>
      )}
    </div>
  );
};
