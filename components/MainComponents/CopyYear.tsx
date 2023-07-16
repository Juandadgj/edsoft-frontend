import useWindowSize from '../../hooks/useWindowSize';
//import { useLoginMutation } from '../generated/graphql';
import { useEffect, useState } from 'react';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Grid from '@mui/material/Grid';

function CopyYear() {
  const windowSize = useWindowSize();
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="btl w-100 vh-100 overflow-hidden bg-gray1 p-15">
      <Grid container className="ps-8 pb-4">
        <Grid item xs={12}>
          <strong className="fs-4">Copiar Año Anterior</strong>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={2}
        className="col-lg-11 col-md-10 mx-auto bg-white rounded border border-2 shadow rounded-5 p-5">
        <Grid item xs={12}>
          <h1
            className={`text-black fs-4 mx-auto  text-ali-cent opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Asignaturas
            <FormControlLabel className="ms-48 ps-5" control={<Switch defaultChecked />} label="" />
          </h1>
          <h1
            className={`text-black fs-4 mx-auto  text-ali-cent opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Recomendaciones
            <FormControlLabel className="ms-36 ps-2" control={<Switch defaultChecked />} label="" />
          </h1>
          <h1
            className={`text-black fs-4 mx-auto  text-ali-cent opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Logros{' '}
            <FormControlLabel
              className="ms-45 ps-21"
              control={<Switch defaultChecked />}
              label=""
            />
          </h1>
          <h1
            className={`text-black fs-4 mx-auto  text-ali-cent opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Indicadores de Logros
            <FormControlLabel className="ms-27" control={<Switch defaultChecked />} label="" />
          </h1>
        </Grid>
        <Grid item xs={12} className="text-ali-cent">
          <button
            type="button"
            className={`btn bg-blue3 btn-primary w-20p rounded-5 opacity${
              active ? 'active' : ''
            } transitionUp ${active ? 'active' : ''}`}>
            <h4 className="text-white pt-2">Generar Copia</h4>
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CopyYear;
