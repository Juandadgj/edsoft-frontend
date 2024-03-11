import { Grid } from "@mui/material";
import React from "react";

export const SearchStudent = () => {
  return (
    <div className="h-full">
      <div className="h-[6%]">
        <div>
          <strong className="text-xl text-black ps-8">
            Busqueda de Estudiantes
          </strong>
        </div>
      </div>
      <Grid
        container
        className="bg-white border-none border-2 shadow-2xl rounded-[2rem] h-[94%]"
      >
        <div className="flex justify-center w-full p-8 h-full">
          <div className="w-full max-w-3xl border h-40 shadow-gray5 shadow-2xl rounded-[10px] border-none bg-gray1 p-10">
            <h1 className="text-black text-sm">
              Ingrese identificacion-Codigo del estudiante o parte del nombre o
              apellido para la busqueda del estudiante.
            </h1>
            <div className="flex justify-center items-center w-full gap-2">
              <input
                className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm text-black"
                type="text"
                name=""
                id=""
              />
              <button className="btn btn-sm h-10 border-none text-white text-xs bg-[#0b5ed7] hover:bg-[#0b5ed7]">
                Buscar Estudiante
              </button>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};
