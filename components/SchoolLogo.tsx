import React from 'react'
import Logo from '../public/assets/logo@2x.png';

export const SchoolLogo = ({ sideBar, manage }: any) => {
  return (
    
    <img
      onClick={manage}
      src={Logo}
      alt="Inicio"
      className={`d-inline-block pe-auto align-text-middle ${
        sideBar ? `mt-1 mr-1 mb-1 ms-3 w-15 h-15` : `m-3 w-18 h-18`
      } ${{
        display: { xs: 'none', sm: 'flex' },
        mr: 1,
      }}`}
    />
  );
}
