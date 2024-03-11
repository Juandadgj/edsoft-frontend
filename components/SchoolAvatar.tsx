import React from 'react'
import logout from '../public/assets/logout.svg';
import settings from '../public/assets/settings.svg';
import house from '../public/assets/house-fill.svg';
import LogoInst from '../public/assets/institucionLogo@2x.png';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import Link from 'next/link';

export const SchoolAvatar = ({textComponent, manage, homeAvatar}: any) => {  
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    console.log('holaaa click');
    setAnchorElUser(null);
  };


  return (
    <Box sx={{ flexGrow: 0 }} className={ homeAvatar ? 'absolute mr-5 right-0 top-10' : 'absolute right-2 top-2'}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={"/assets/institucionLogo@2x.png"} sx={{ width: 80, height: 80 }} />
            </IconButton>
            <Menu
              sx={{ mt: '10px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              onClick={handleCloseUserMenu}>

              <div className='flex p-2 text-left gap-2'>
                <Image className='icon w-4' id="SchoolHome" onClick={manage} src={house} alt="Inicio" />
                <button onClick={manage} id="SchoolHome" className="dropdown-item" type="button">
                  Inicio
                </button>
              </div>

              <div className='flex p-2 text-left gap-2'>
                <Image className='icon w-4' onClick={manage} id="Settings" src={settings} alt="Configuración" />
                <button onClick={manage} id="Settings" className="dropdown-item" type="button">
                  Cambiar Contraseña
                </button>
              </div>

              <Link className="text-decoration-none text-body" href="/instituciones">
              <div className='flex p-2 text-left gap-2'>
                <Image className='icon w-4 gray3' src={logout} alt="settings-icon"/>
                <button onClick={manage} className="dropdown-item" type="button">
                  Cerrar Sesión
                </button>
              </div>
              </Link>
            </Menu>
          </Box>
  )
}
