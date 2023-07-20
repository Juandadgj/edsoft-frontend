import Ellipse from '../components/Ellipse';
import Nav from '../components/Nav';
import InicioImagen from '../public/assets/interactive-dashboard-tablet.png';
import React, { useEffect, useState } from 'react';
import { Grid, styled } from '@mui/material';
import Image from 'next/image';

function Home() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    sessionStorage.removeItem('userToken');
  }, []);

  const HomeStyled = styled('div')(({ theme }) => ({
    backgroundColor: '#EFEFEF',
    overflow: 'hidden',
    height: '100vh',
  }));

  const Title = styled('div')(({ theme }) => ({
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '50px',
    },
  }));

  const TextContainer = styled('div')(({ theme }) => ({
    padding: '2rem',
    [theme.breakpoints.up('md')]: {
      borderRight: 'solid',
      borderColor: '#8d8d8d',
    },
  }));
  const Welcome = styled('div')(({ theme }) => ({
    paddingTop: '3rem',
    paddingLeft: '4rem',
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      paddingTop: '4rem',
      paddingRight: '4rem',
    },
  }));
  const HomeWrapper = styled('div')(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4rem',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      paddingTop: '0px',
    },
  }));
  const Elipse1 = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: '-200px',
    right: '200px',
    [theme.breakpoints.down(1270)]: {
      bottom: '-250px',
    },
    [theme.breakpoints.down(1170)]: {
      bottom: '-260px',
      right: '-120px',
    },
    [theme.breakpoints.down('md')]: {
      bottom: '-280px',
      right: '-220px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }));
  const Elipse2 = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: '15rem',
    right: '20px',
    [theme.breakpoints.down(1270)]: {
      display: 'none',
    },
  }));

  return (
    <>
      <HomeStyled>
        <Nav actualPage="Inicio" withNavigation />
        <Grid container className="h-full block relative">
          <Welcome className="my-2 animate__animated animate__slideInLeft ">
            <h5 className="text-gray3 text-xl ml-8 flex">
              <Ellipse className="mr-5" width={40} height={40} />
              ¡Bienvenido!
            </h5>
          </Welcome>
          <HomeWrapper>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={6} className="">
              <TextContainer className="animate__animated animate__slideInLeft">
                <h2
                  className={`font-bold text-5xl mb-6 opacity${
                    active ? 'active' : ''
                  } transitionUp ${active ? 'active' : ''}`}>
                  <Title>
                    <span className={'text-main-blue'}>Crea | </span>
                    <span className="text-gray3">
                      gestiona
                      <br /> y publica calificaciones
                    </span>
                  </Title>
                </h2>

                <p
                  className={`text-gray3 text-3xl ms-2 opacity${
                    active ? 'active' : ''
                  } transitionRight ${active ? 'active' : ''}`}>
                  Acceder a <span className="text-black">toda</span> la información institucional,
                  académica, administrativa, financiera y cultural de la Institución educativa sobre
                  asignaturas, horarios de clases, datos generales de la institución como{' '}
                  <span className="text-black">eventos, talleres, jornadas pedagógicas, etc.</span>
                </p>
              </TextContainer>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={5}
              xl={6}
              className="animate__animated animate__slideInRight p-15"
              style={{ maxHeight: 'calc(100vh - 93px)' }}>
              <Image
                src={InicioImagen}
                alt="Interactive Tablet"
                style={{ height: '100%', width: '100%' }}
                width={100}
                height={100}
              />
            </Grid>{' '}
          </HomeWrapper>
          <div style={{ position: 'absolute', top: '10rem', right: '20px' }}>
            <Ellipse className="mr-5" width={60} height={60} />
          </div>
          <Elipse1>
            <Ellipse className="mr-5" width={500} height={500} />
          </Elipse1>
          <Elipse2>
            <Ellipse className="mr-5" width={130} height={130} />
          </Elipse2>
          <div style={{ position: 'absolute', bottom: '10rem', right: '50rem' }}>
            <Ellipse className="mr-5" width={60} height={60} />
          </div>
        </Grid>
      </HomeStyled>
    </>
  );
}

export default Home;
