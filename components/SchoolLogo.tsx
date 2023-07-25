import React from 'react'
import Logo from '../public/assets/logo@2x.png';
import Image from 'next/image';

export const SchoolLogo = ({ sideBar, manage }: any) => {
  return (
    
    <Image
      onClick={manage}
      src={Logo}
      alt="Inicio"
      className={`inline-block pe-auto align-text-middle ${
        sideBar ? `mt-1 mr-1 mb-1 ms-3 w-14 h-14` : `m-3 w-16 h-16`
      } ${{
        display: { xs: 'none', sm: 'flex' },
        mr: 1,
      }}`}
      
    />
  );
}
