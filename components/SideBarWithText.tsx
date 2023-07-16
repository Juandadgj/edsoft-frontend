import React, { FC, ReactNode } from 'react';
import Logo from '../public/assets/logo@2x.png';
import { useEffect, useState } from 'react';
import icon1 from '../public/assets/1icon.jpg';
import icon2 from '../public/assets/2icon.jpg';
import icon3 from '../public/assets/3icon.jpg';
import icon4 from '../public/assets/4icon.jpg';
import icon5 from '../public/assets/5icon.jpg';
import { useLocation, useNavigate } from 'react-router-dom';

interface SideBarWithTextProps {
  location: String;
  sublocation: String;
  children: ReactNode;
}

type DropdownsTipos = 'Funcionario' | 'ProgAcademico' | 'ProgAnual' | 'Reportes';

const SideBarWithText: FC<SideBarWithTextProps> = ({ children, location, sublocation }) => {
  const navigationLocation = useLocation();
  const [dropdownAbierto, setDropdownAbierto] = useState<DropdownsTipos | null>(
    navigationLocation.state?.fromDropdown ?? null
  );

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="vw-100 vh-100">
      <div className={`d-flex flex-row w-100 h-24 bg-blue3 p-2 `}>
        <div className="w-20p">
          <a className="navbar-brand d-flex align-items-center mx-3 col-xlg-5 w" href="/bienvenido">
            <img
              src={Logo}
              alt="Logo EdSoft"
              className="d-inline-block w-18 h-18 align-text-middle m-3"
            />
            <h3 className="align-middle mx-2 fs-1 fw-bold">EduSucre</h3>
          </a>
        </div>
        <div
          className={`d-flex justify-content-center flex-column ms-20 opacity${
            active ? 'active' : ''
          } transitionLeft ${active ? 'active' : ''}`}>
          <p className="pt-4">
            Institución Educativa San Marcos &nbsp; {'>'} &nbsp; {location} &nbsp; {'>'} &nbsp;{' '}
            {sublocation}
          </p>
        </div>
      </div>
      <div
        className="d-flex"
        style={{
          height: 'calc(100% - 6rem)',
        }}>
        <div className={`w-20p bg-blue3`}>
          <div
            className={`d-flex align-items-center justify-content-center flex-column opacity${
              active && !navigationLocation.state?.noreset ? 'active' : ''
            } transitionRight  ${active ? 'active' : ''} `}>
            <div className="mb-2 ms-2 me-20 text-white mt-25">
              <a className="fs-5 p-0 m-0 text-white text-decoration-none" href="/configuracion">
                <img src={icon1} className="h-18 w-13 m-0 p-0" alt="" />
                Configuración
              </a>
            </div>
            <div>
              <div
                className="text-white rounded-start mt-8"
                onClick={() => {
                  setDropdownAbierto('Funcionario');
                }}>
                <div className="text-white fs-5 rounded-start">
                  <img src={icon2} className="w-15 h-14" alt="" />

                  <button className="text-white menu-trigger border-transparent btn-primary-outline">
                    Funcionarios
                  </button>

                  {dropdownAbierto === 'Funcionario' && (
                    <>
                      <DropdownItem
                        text={'Docentes'}
                        href={'/docentes'}
                        dropdownAbierto={dropdownAbierto}
                      />
                      <DropdownItem
                        text={'Secretarios'}
                        href={'/secretarios'}
                        dropdownAbierto={dropdownAbierto}
                      />
                    </>
                  )}
                </div>
              </div>

              <div
                className="text-white rounded-start mt-12"
                onClick={() => {
                  setDropdownAbierto('ProgAnual');
                }}>
                <div className="text-white rounded-start fs-5">
                  <img src={icon3} className="w-15 h-14" alt="" />

                  <button className="text-white menu-trigger border-transparent btn-primary-outline pb-0">
                    Progreso Anual
                  </button>
                  {dropdownAbierto === 'ProgAnual' && (
                    <>
                      <DropdownItem
                        text={'Tipo de Calificación'}
                        href={'/tipocalificacion'}
                        dropdownAbierto={dropdownAbierto}
                      />
                      <DropdownItem
                        text={'Establecer Año'}
                        href={'/establecerano'}
                        dropdownAbierto={dropdownAbierto}
                      />
                      <DropdownItem
                        text={'Copiar Año Anterior'}
                        href={'/copyyear'}
                        dropdownAbierto={dropdownAbierto}
                      />
                      <DropdownItem
                        text={'Cursos'}
                        href={'/cursos'}
                        dropdownAbierto={dropdownAbierto}
                      />
                      <DropdownItem
                        text={'Areas'}
                        href={'/areas'}
                        dropdownAbierto={dropdownAbierto}
                      />
                      <DropdownItem
                        text={'Asignaturas'}
                        href={'/asignaturas'}
                        dropdownAbierto={dropdownAbierto}
                      />
                      <DropdownItem
                        text={'Logros'}
                        href={'/logros'}
                        dropdownAbierto={dropdownAbierto}
                      />
                    </>
                  )}
                </div>
              </div>

              <div
                className="text-white rounded-start mt-12"
                onClick={() => {
                  setDropdownAbierto('ProgAcademico');
                }}>
                <div className="text-white rounded-start fs-5">
                  <img src={icon4} className="w-14 h-14 me-1" alt="" />

                  <button className="text-white menu-trigger border-transparent btn-primary-outline">
                    Progreso Académico
                  </button>

                  {dropdownAbierto === 'ProgAcademico' && (
                    <>
                      <DropdownItem
                        text={'Calificación'}
                        href={'/docentes'}
                        dropdownAbierto={dropdownAbierto}
                      />
                    </>
                  )}
                </div>
              </div>

              <div
                className="text-white rounded-start mt-12 fs-5"
                onClick={() => {
                  setDropdownAbierto('Reportes');
                }}>
                <img src={icon5} className="w-14 h-14 me-1" alt="" />

                <button className="text-white menu-trigger border-transparent btn-primary-outline">
                  Reportes
                </button>

                {dropdownAbierto === 'Reportes' && (
                  <>
                    <DropdownItem
                      text={'Indicadores'}
                      href={'/docentes'}
                      dropdownAbierto={dropdownAbierto}
                    />
                    <DropdownItem
                      text={'Planillas'}
                      href={'/docentes'}
                      dropdownAbierto={dropdownAbierto}
                    />
                    <DropdownItem
                      text={'Listados'}
                      href={'/docentes'}
                      dropdownAbierto={dropdownAbierto}
                    />
                    <DropdownItem
                      text={'Entregables'}
                      href={'/docentes'}
                      dropdownAbierto={dropdownAbierto}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-80p bg-blue3">{children}</div>
      </div>
    </div>
  );
};

function DropdownItem(props: {
  href: string | undefined;
  text: React.ReactNode;
  dropdownAbierto: DropdownsTipos;
  // fromDropdown: string | null
}) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div
      className={`ms-5 ps-8 opacity${active ? 'active' : ''} transitionDown ${
        active ? 'active' : ''
      }`}>
      <button
        className="btn bg-transparent text-white rounded-3 fs-5 pt-0 pb-0 mt-1 mb-1 aclarado"
        onClick={() => {
          if (props.href)
            navigate(props.href, {
              state: { noreset: true, fromDropdown: props.dropdownAbierto /*props.fromDropdown*/ },
            });
        }}>
        {props.text}
      </button>
    </div>
  );
}

export default SideBarWithText;
