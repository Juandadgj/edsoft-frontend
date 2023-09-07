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
    <div className="rounded-tl-[40px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container className="ps-8 pb-4">
        <Grid item xs={12}>
          <strong className="text-2xl text-black ms-20">Copiar Año Anterior</strong>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={2}
        className="mx-auto bg-white border-2 shadow-2xl rounded-[2rem] p-5 flex justify-center flex-col">
        <Grid item xs={12} className='!flex !flex-col !justify-center !items-center mx-auto'>
          <h1
            className={` flex justify-between gap-10 w-full items-center text-black opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Asignaturas
            <FormControlLabel className="" control={<Switch defaultChecked />} label="" />
          </h1>
          <h1
            className={`flex justify-between gap-10 w-full items-center text-black opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Recomendaciones
            <FormControlLabel className="" control={<Switch defaultChecked />} label="" />
          </h1>
          <h1
            className={`flex justify-between gap-10 w-full items-center text-black opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Logros
            <FormControlLabel
              className="ms-45 ps-21"
              control={<Switch defaultChecked />}
              label=""
            />
          </h1>
          <h1
            className={`flex justify-between gap-10 items-center w-full text-black opacity${
              active ? 'active' : ''
            } transitionLeft ${active ? 'active' : ''}`}>
            Indicadores de Logros
            <FormControlLabel className="ms-27" control={<Switch defaultChecked />} label="" />
          </h1>
        </Grid>
        <Grid item xs={12} className="text-center">
          <button
            type="button"
            className={`btn bg-[#0a58ca] btn-primary w-[20%] border rounded-[24px]  hover:bg-[#0a58ca] opacity${
              active ? 'active' : ''
            } transitionUp ${active ? 'active' : ''}`}>
            <h4 className="text-white">Generar Copia</h4>
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CopyYear;
