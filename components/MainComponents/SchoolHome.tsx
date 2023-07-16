import React from 'react'
import background from '../../public/assets/background@2x.png'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export const SchoolHome = ({textComponent, manage}: any) => {
  return (
    <div
      className="bg-image d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
      }}>

      <h1 className="text-white mb-10 display-1 fs-30 fw-bold">Bienvenido</h1>
      <h6 className="text-muted mb-8">La mejor forma de gestionar su colegio</h6>

      <div className="d-block position-absolute end-0 mr-7">
        <div className="btn bticon text-white mb-2">
          <a href="#!" role="button">
            <WhatsAppIcon color="success" />
          </a>
        </div>
        <div>
          <a className="btn bticon text-white rounded-circle" href="#!" role="button">
            <MailOutlineIcon color="error" />
          </a>
        </div>
      </div>
    </div>
  );
}
