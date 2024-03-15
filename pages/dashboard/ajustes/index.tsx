import Layaout from "@/components/Layaout";
import { Grid } from "@mui/material";
import React, { useState } from "react";

function Settings() {
  const [active, setActive] = useState(false);

  return (
    <Layaout textpage="Ajustes">
      <div className="rounded-tl-[20px] w-full h-full overflow-hidden bg-gray1 p-10 pb-3">
        <div className="h-[6%]">
          <div>
            <h1
              className={`text-xl text-black ps-8 transition animate-fade-down`}
            >
              Cambiar Contraseña
            </h1>
          </div>
        </div>
        <div className="bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5">
          <div className=" w-full flex justify-center">
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <div className="w-full flex flex-col justify-center items-center">
                <h1
                  className={`text-black animate-fade-right text-sm`}
                >
                  Contraseña actual
                </h1>
                <input className="input h-9 bg-white rounded border rounded-3 border-gray4 text-xs text-black w-full max-w-md animate-fade-left" />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <h1 className={`text-black animate-fade-right text-sm`}>
                  Nueva Contraseña
                </h1>
                <input className="input h-9 bg-white rounded border rounded-3 border-gray4 text-xs text-black w-full max-w-md animate-fade-left" />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className={`text-black animate-fade-right text-sm`}>
                  Confirme Contraseña
                </h1>
                <input className="input h-9 bg-white rounded border rounded-3 border-gray4 text-xs text-black w-full max-w-md animate-fade-left" />
              </div>
              <div className="w-full flex justify-center animate-fade-up">
                <button
                  type="button"
                  className={`btn btn-sm border-none text-white bg-[#0b5ed7] hover:bg-[#0b5ed7] text-xs`}
                >
                  <p className="text-white">Guardar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layaout>
  );
}

export default Settings;
