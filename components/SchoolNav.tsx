import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
// import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon } from '@material-ui/core';
import { SchoolAvatar } from './SchoolAvatar';
import { SchoolLogo } from './SchoolLogo';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: 96,
  },
}));
export const SchoolNav = ({textComponent, manage}: any) => {
  
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

  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" sx={{backgroundColor: '#0055A6'}} >
      <Container className='ps-0' maxWidth="xl">
        <Toolbar disableGutters>

          <SchoolLogo/>
          
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontFamily: 'Scada',
              fontWeight: 780,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            EdSoft
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton> 
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1,
              fontFamily: 'Scada',
              fontWeight: 780,
              letterSpacing: '.1rem',
              color: 'white',
              textDecoration: 'none',
            }}>
            EdSoft
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            <p className="pt-4 ps-10">
              Institución Educativa San Marcos {textComponent && `> ${textComponent}`}
            </p>
          </Box>

            <SchoolAvatar textComponent={textComponent} homeAvatar={false} manage={manage}/>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
