import { TextField } from '@material-ui/core';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

function Settings() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="btl overflow-hidden bg-gray1 p-15">
      <Grid container className="mb-6">
        <Grid item xs={12}>
          <h1
            className={`text-black fs-2 fw-bold ms-20 opacity${
              active ? 'active' : ''
            } transitionDown ${active ? 'active' : ''}`}>
            Cambiar Contraseña
          </h1>
        </Grid>
      </Grid>
      <Grid
        container
        className="col-lg-10 bg-white border-gray4 rounded-5 p-5 shadow"
        rowSpacing={3}>
        <Grid item xs={6} className="pe-10">
          <h1
            className={`text-black text-ali-cent fs-4 opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Contraseña actual
          </h1>
        </Grid>
        <Grid item xs={6} className="text-ali-cent pe-10">
          <input className="bg-white rounded border rounded-3 border-gray4 ps-6 fs-5 w-70p" />
        </Grid>

        <Grid item xs={6} className="pe-10">
          <h2
            className={`text-black text-ali-cent fs-4 opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Nueva Contraseña
          </h2>
        </Grid>
        <Grid item xs={6} className="text-ali-cent pe-10">
          <input className="bg-white rounded border rounded-3 border-gray4 ps-6 fs-5 w-70p" />
        </Grid>
        <Grid item xs={6} className="pe-10">
          <h3
            className={`text-black fs-4 text-ali-cent opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Confirme Contraseña
          </h3>
        </Grid>
        <Grid item xs={6} className="text-ali-cent pe-10">
          <input className="bg-white rounded border rounded-3 border-gray4 ps-6 fs-5 w-70p" />
        </Grid>
        <Grid item xs={12} className="text-ali-cent">
          <button
            type="button"
            className={`btn bg-blue3 btn-primary w-80p rounded-4 opacity${
              active ? 'active' : ''
            } transitionUp ${active ? 'active' : ''}`}>
            <h4 className="text-white pt-2">Guardar</h4>
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Settings;
