import React from "react";

export const ContainerComponents = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full">
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[10px] h-full px-2 py-4">
        <div
          className="h-full w-full px-5"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#25429e #F3F4F6",
            scrollbarGutter: "20px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
