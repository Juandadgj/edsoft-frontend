import React from 'react'
import useWindowSize from '../../hooks/useWindowSize';
//import { useLoginMutation } from '../generated/graphql';
import { useEffect, useState } from 'react';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '../Card';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import HailIcon from '@mui/icons-material/Hail';

const cardsEnrollment = [
  {
    icon: <PersonAddAltIcon color='success' fontSize='inherit'/>,
    title: 'Ingreso de nuevos estudiantes',
  },
  {
    icon: <PersonOffIcon color='error' fontSize='inherit'/>,
    title: 'Estudiantes no matriculados en el año actual'
  },
  {
    icon: <Diversity3Icon color='success' fontSize='inherit'/>,
    title: 'Mostrar estudiantes por curso'
  },
  {
    icon: <EscalatorWarningIcon color='error' fontSize='inherit'/>,
    title: 'Buscar estudiantes habilitados'
  },
  {
    icon: <HailIcon color='success' fontSize='inherit'/>,
    title: 'Matricular estudiantes por cursos del año anterior'
  },
]

export const Enrollment = () => {
  const today = new Date();
  const year = today.getFullYear();

  const windowSize = useWindowSize();
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container className="pb-6">
        <Grid item xs={12}>
          <strong className="text-2xl text-black ps-8">
            Gestiones de Estudiantes {year}
          </strong>
        </Grid>
      </Grid>
      <div className="flex ps-8 justify-center gap-20">
        {cardsEnrollment.map((item, i) => <Card key={i} type={'enrollment'} item={item} />)}
      </div>
    </div>
  );
}
