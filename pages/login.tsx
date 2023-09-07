import Logo from '../public/assets/logo@2x.png';
import LogoInst from '../public/assets/institucionLogo@2x.png';
import BackArrow from '../public/assets/backArrow.png';
import { useLoginLazyQuery } from '../generated/graphql';
import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
//import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

function Login() {
  //const location = useLocation();
  //const { state }:any = location;
    const router = useRouter()
  //const navigate = useNavigate();
  const [user, setUser] = useState({
    password: '',
    user: '',
    id_institution: 1059,
  });

  const [getUser, { data }] = useLoginLazyQuery();

  useEffect(() => {
    if (data) {
      console.log(data.signin);
      const {
        signin: { token },
      } = data;
      console.log(token);
      if (token) {
        sessionStorage.setItem('userToken', token);
      }
      router.push('/dashboard');
    }
  }, [data, router]);

  const ContainerLogin = styled('div')(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    width: '33%',
    height: '75%',
    padding: '0.75rem',
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    marginTop: '4rem',
    borderRadius: '25px',
    [theme.breakpoints.down('lg')]: {
      width: '40%',
    },
    [theme.breakpoints.down('md')]: {
      width: '63.3%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      paddingTop: '6rem',
      borderRadius: '0px',
    },
  }));
  const WrapperLogin = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#EFEFEF',
    position: 'relative',
  }));
  const WrapperNavLink = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'flex',
    padding: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingLeft: '1rem',
      justifyContent: 'space-between',
    },
  }));
  const ImgBack = styled('img')(({ theme }) => ({
    width: '60px',
    height: '70px',

    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
    },
  }));
  const NameInstitution = styled('strong')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      fontSize: '17px',
    },
  }));
  return (
    <WrapperLogin>
      <WrapperNavLink>
        <Link
          href={'/instituciones'}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            src={BackArrow}
            alt="Back Arrow"
            className="d-inline-block align-middle mx-0 my-0"
          />
        </Link>
        <Link href={'/instituciones'} style={{ textDecoration: 'none', color: '#000000' }}>
          <div className="d-flex align-items-center">
            <Image
              src={Logo}
              alt="Logo EdSoft"
              className="d-inline-block w-16 h-16 align-text-middle my-3"
              style={{ marginRight: '0px', marginLeft: '1rem' }}
              width={20}
              height={20}
            />
            <h3 className="align-middle mx-2 display-4 fw-bold">EdSoft</h3>
          </div>
        </Link>
      </WrapperNavLink>

      <ContainerLogin className="mx-auto align-text-middle row  shadow-sm">
        <Image
          src={LogoInst}
          alt="Logo institucion"
          className="d-inline-block h-25 w-30 align-text-middle mx-auto mt-5"
          width={20}
          height={20}
        />
        <p className="text-black fs-3 mx-auto text-center ">
          <span className="text-black bold mx-auto align-text-middle pb-4 font-size:large">
            <NameInstitution>{"Name"}</NameInstitution>
          </span>
          <br />
          <span className="text-gray4  font-size:small mx-auto align-middle pt-5 fs-4">
            <small>Inicia sesión</small>
          </span>
        </p>
        <form>
          <div className="form-group">
            <input
              className="bg-gray2 rounded-4 border-0 py-2 ps-6 fs-4 mb-4 col-lg-9 mx-auto form-control"
              type="text"
              placeholder="Usuario"
              aria-label="User"
              value={user.user}
              name="user"
              onChange={({ target }) => setUser({ ...user, [target.name]: target.value })}
            />
            <input
              className="bg-gray2 rounded-4 border-0 pe-20 py-2 ps-6 fs-4  mb-4 col-lg-9 mx-auto form-control"
              type="password"
              placeholder="Contraseña"
              aria-label="Password"
              value={user.password}
              name="password"
              onChange={({ target }) => setUser({ ...user, [target.name]: target.value })}
            />
          </div>
        </form>
        <span className="text-blue2 col-lg-10 bl-4 ml-lg-5 my-3">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;¿Olvidaste tu contraseña?</p>
        </span>
        <button
          type="button"
          className="btn bg-blue2  btn-primary rounded-5 pl-4 ml-4 mx-auto col-lg-9 h-15 mb-5 "
          onClick={e => {
            e.preventDefault();
            getUser({ variables: user });
          }}>
          <h4 className="text-white pt-2">Iniciar Sesion</h4>
        </button>
      </ContainerLogin>
    </WrapperLogin>
  );
}

export default Login;
