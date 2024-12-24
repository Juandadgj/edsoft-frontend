import React from "react";

export const ContainerComponents = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full overflow-hidden h-full">
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[10px] h-full py-4 px-2">
        {children}
      </div>
    </div>
  );
};
