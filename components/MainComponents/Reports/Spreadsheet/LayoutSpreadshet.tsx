import React from "react";

interface ILayaoutSpreadsheet {
  children: React.ReactNode;
  title: string;
}

const LayoutSpreadshet = ({ children, title }: ILayaoutSpreadsheet) => {
  return (
    <div className="h-full">
      <div className="h-[6%]">
        <div className="pb-4">
          <strong className="text-xl text-black ps-8">{title}</strong>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        {children}
      </div>
    </div>
  );
};

export default LayoutSpreadshet;
