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

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: 30,
    right: 13,
  },
}));

export const SchoolAvatar = ({textComponent, manage, homeAvatar}: any) => {
  const classes = useStyles();
  
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
    <Box sx={{ flexGrow: 0 }} className={ homeAvatar ? classes.container : ''}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={LogoInst} sx={{ width: 80, height: 80 }} />
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

              <div className='d-flex p-2 text-left'>
                <img className='icon w-6' id="SchoolHome" onClick={manage} src={house} alt="Inicio" />
                <button onClick={manage} id="SchoolHome" className="dropdown-item" type="button">
                  Inicio
                </button>
              </div>

              <div className='d-flex p-2 text-left'>
                <img className='icon' onClick={manage} id="Settings" src={settings} alt="Configuración" />
                <button onClick={manage} id="Settings" className="dropdown-item" type="button">
                  Cambiar Contraseña
                </button>
              </div>

              <a className="text-decoration-none text-body" href="/instituciones">
              <div className='d-flex p-2 text-left'>
                <img className='icon w-6 gray3' src={logout} alt="settings-icon"/>
                <button onClick={manage} className="dropdown-item" type="button">
                  Cerrar Sesión
                </button>
              </div>
              </a>
            </Menu>
          </Box>
  )
}
