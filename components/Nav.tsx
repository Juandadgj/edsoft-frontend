import BigLogo from '../public/assets/logo@2x.png';
import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Link from 'next/link';

interface NavProps {
  actualPage: 'Inicio' | 'Instituciones' | 'Contact';
  withNavigation?: boolean;
}

function Nav(
  { actualPage, withNavigation }: NavProps = {
    actualPage: 'Inicio',
    withNavigation: true,
  }
) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setToggle(!toggle);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="navbar navbar-expand-xl bg-body-tertiary px-20 pt-0 w-100 max-h-96">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5 d-flex align-items-center" href="/">
          <Image
            src={BigLogo}
            alt="Logo EdSoft"
            className="d-inline-block w-16 h-16 align-text-top"
            width={100}
            height={100}
          />
          <h3
            className={`align-middle mx-2 display-4 fw-bold ${
              actualPage == 'Contact' ? 'text-white' : false
            }`}>
            EdSoft
          </h3>
        </Link>

        <div className="navbar-toggler border-0">
          <Button
            // className="btn dropdown-toggle border-0"
            // type="button"
            data-toggle="dropdown"
            aria-expanded="false"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick}>
            {open ? (
              <ClearIcon className="h-15 w-11" sx={{ fontSize: 40 }} />
            ) : (
              <MenuIcon className="h-15 w-11" sx={{ fontSize: 40 }} />
            )}
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <div className="p-3">
              <MenuItem sx={{ fontSize: 20 }}>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff"
                  href="/"
                  onClick={handleClose}>
                  Inicio
                </Link>
              </MenuItem>

              <MenuItem sx={{ fontSize: 20 }}>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff m-0"
                  href="/instituciones"
                  onClick={handleClose}>
                  Lista de Inst. Educativas
                </Link>
              </MenuItem>

              <MenuItem sx={{ fontSize: 20 }}>
                <Link
                  className="pt-2 pb-2 list-group-item list-group-item-action ff"
                  href="/contact"
                  onClick={handleClose}>
                  Contacto
                </Link>
              </MenuItem>
            </div>
          </Menu>
        </div>

        {withNavigation && (
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 fs-3 ">
              <li className="nav-item">
                <Link
                  className={`nav-link ${actualPage === 'Inicio' && 'active'} mx-5 ${
                    actualPage == 'Contact' ? 'text-white' : false
                  }`}
                  aria-current="page"
                  href="/">
                  <h3 style={{fontWeight: '400'}}>Inicio</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`max-h-96 nav-link ${
                    actualPage === 'Instituciones' && 'active'
                  } mx-5 ${actualPage == 'Contact' ? 'text-white' : false}`}
                  aria-current="page"
                  href="/instituciones"
                  style={{minWidth: '310px'}}>
                  <h3 style={{fontWeight: '400'}}>Lista de Inst. Educativas</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${actualPage === 'Contact' && 'active'} mx-5`}
                  aria-current="page"
                  href="/contact">
                  <h3 style={{fontWeight: '500'}}>Contacto</h3>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
