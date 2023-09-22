import { TextField } from "@material-ui/core";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

function Settings() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="h-full w-full rounded-tl-[40px] overflow-hidden bg-gray1 p-14">
      <Grid container className="mb-6">
        <Grid item xs={12}>
          <h1
            className={`text-black fs-2 text-2xl font-bold ms-20 animate-fade-down`}
          >
            Cambiar Contraseña
          </h1>
        </Grid>
      </Grid>
      <Grid
        container
        className="bg-white border-gray4 rounded-[2rem] p-5 shadow-2xl"
        rowSpacing={3}
      >
        <Grid item xs={6} className="pe-10">
          <h1
            className={`text-black text-center text-lg font-medium animate-fade-left `}
          >
            Contraseña actual
          </h1>
        </Grid>
        <Grid item xs={6} className="text-center pe-10">
          <input className="text-black bg-white border rounded-[0.5rem] border-gray4 ps-6 fs-5 w-[70%]" />
        </Grid>

        <Grid item xs={6} className="pe-10">
          <h2
            className={`text-black text-center text-lg font-medium animate-fade-left`}
          >
            Nueva Contraseña
          </h2>
        </Grid>
        <Grid item xs={6} className="text-center pe-10">
          <input className="text-black bg-white border rounded-[0.5rem] border-gray4 ps-6 fs-5 w-[70%]" />
        </Grid>
        <Grid item xs={6} className="pe-10">
          <h3
            className={`text-black text-lg text-center font-medium animate-fade-left `}
          >
            Confirme Contraseña
          </h3>
        </Grid>
        <Grid item xs={6} className="text-center pe-10">
          <input className="text-black bg-white border rounded-[0.5rem] border-gray4 ps-6 fs-5 w-[70%]" />
        </Grid>
        <Grid item xs={12} className="flex justify-center items-center">
          <button
            type="button"
            className={`btn bg-blue3 btn-primary w-[80%] rounded-4 hover:bg-[#0b5ed7] animate-fade-up`}
          >
            <h4 className="text-white">Guardar</h4>
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Settings;
