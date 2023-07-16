// import { FC } from 'react';
// import Logo2 from '../public/assets/logo@2x.png';
import SettingsIcon from '@mui/icons-material/Settings';
import Groups2Icon from '@mui/icons-material/Groups2';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import RouteIcon from '@mui/icons-material/Route';
import AssessmentIcon from '@mui/icons-material/Assessment';

// import Logo from '../public/assets/logo@2x.png';
import { useEffect, useState } from 'react';
// import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { SchoolLogo } from './SchoolLogo';

const SideBar = ({ manage, logo }: any) => {
  const [active, setActive] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Settings');
  const [textComponent, setTextComponent] = useState('Configuración');

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <Box height={`calc(100vh - ${logo ? `0px` : `96px`})`}>
      <ul className="nav bg-blue3 col-auto col-md-0 w-20 h-100 min-height-200 ps-1 flex-column justify-content-evenly flex-nowrap">
        
          {logo ? <div className="logo-side shadow-none ms-2 text-white fs-4 dropdown dropend d-grid"> <SchoolLogo sideBar={true}/> </div> : null}

        <li className="nav-item mt-3 text-white fs-4 dropdown dropend d-grid">
          <button
            className="button bg-blue3"
            type="button"
            data-bs-toggle="dropdown"
            data-toggle="tooltip"
            data-placement="left"
            title="Funcionarios"
            aria-expanded="true">
            <div
              className={`opacity${active ? 'active' : ''} transitionRight ${
                active ? 'active' : ''
              }`}>
              <Groups2Icon className="h-12 w-11" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="dropdown-menu ms-1">
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Docentes
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Secretaries" onClick={manage}>
                Secretarios
              </button>
            </li>
          </ul>
        </li>

        <li className="nav-item mt-3 text-white fs-4 dropdown dropend d-grid">
          <button
            className="button bg-blue3"
            type="button"
            data-bs-toggle="dropdown"
            data-toggle="tooltip"
            data-placement="left"
            title="Progreso Anual"
            aria-expanded="true">
            <div
              className={`opacity${active ? 'active' : ''} transitionRight ${
                active ? 'active' : ''
              }`}>
              <ContentPasteIcon className="h-12 w-11" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="dropdown-menu ms-1">
            <li>
              <button className="dropdown-item" id="QualificationType" onClick={manage}>
                Tipo De Calificación
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="SetYear" onClick={manage}>
                Establecer año
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="CopyYear" onClick={manage}>
                Copiar Año Anterior
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="CreateCourses" onClick={manage}>
                Crear Cursos
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Areas" onClick={manage}>
                Áreas
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Subjects" onClick={manage}>
                Asignaturas
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Achievements" onClick={manage}>
                Logros
              </button>
            </li>
          </ul>
        </li>

        <li className="nav-item mt-3 text-white fs-4 dropdown dropend d-grid">
          <button
            className="button bg-blue3"
            type="button"
            data-bs-toggle="dropdown"
            data-toggle="tooltip"
            data-placement="left"
            title="P. Académico"
            aria-expanded="true">
            <div
              className={`opacity${active ? 'active' : ''} transitionRight ${
                active ? 'active' : ''
              }`}>
              <RouteIcon className="h-12 w-11" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="dropdown-menu ms-1">
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Calificación
              </button>
            </li>
          </ul>
        </li>

        <li className="nav-item mt-3 mb-10 text-white fs-4 dropdown dropend d-grid">
          <button
            className="button bg-blue3"
            type="button"
            data-toggle="tooltip"
            data-placement="left"
            title="Reportes"
            data-bs-toggle="dropdown"
            aria-expanded="true">
            <div
              className={`opacity${active ? 'active' : ''} transitionRight ${
                active ? 'active' : ''
              }`}>
              <AssessmentIcon className="h-12 w-11" sx={{ fontSize: 30 }} />
            </div>
          </button>
          <ul className="dropdown-menu ms-1">
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Indicadores
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Planillas
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Listados
              </button>
            </li>
            <li>
              <button className="dropdown-item" id="Teachers" onClick={manage}>
                Entregables
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </Box>
  );
};

export default SideBar;
