import DynamicTable from '../components/DynamicTable';
import Nav from '../components/Nav';
import useWindowSize from '../hooks/useWindowSize';
import { useMemo } from 'react';
import { useGetInstitutionsQuery } from '../generated/graphql';
import SearchIcon from '@mui/icons-material/Search';
import { idText } from 'typescript';
import { useEffect, useState } from 'react';
import lupa from '../public/assets/1lupa.png';
import {  styled } from '@mui/material';
import Image from 'next/image';

const columns = [
  {
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    Header: 'Dirección',
    accessor: 'address',
  },
];

function Institutions() {
  const [active, setActive] = useState(false);
  const { data, loading, error } = useGetInstitutionsQuery();

  useEffect(() => {
    setActive(true);
    sessionStorage.removeItem('userToken');
  }, []);

  const processedInstitutions = useMemo(() => {
    if (!data?.institutions) return [];
    return data.institutions.map((institution, index) => ({
      //id: institution?.id_institution ?? index,
      name: institution?.name ?? '',
      address: institution?.direction ?? '',
    }));
  }, [data]);
  const windowSize = useWindowSize();

  const WrapperList = styled('div')(({ theme }) => ({
    padding: '4rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
      paddingTop: '2rem',
      backgroundColor: 'red'
    },
  }));

  return (
    <div className="w-100 bg-gray1 h-90" style={{minHeight: '100vh', padding: '10px', paddingTop: '0px'}}>
      <Nav actualPage="Instituciones" withNavigation />
      <div className={`${(windowSize.width ?? 0) >= 1200 ? 'mt-16' : ''}`}>
        <WrapperList className=" col-md-10 mx-auto bg-white border border-2 shadow rounded-5">
          <div className="d-flex  fw-bold">
            <h4>
              <strong>Lista de instituciones Educativas</strong>
            </h4>
          </div>
          <form className="d-flex justify-content-between my-4" role="search">
            <div
              className={`col-12 opacity${active ? 'active' : ''} transitionRight ${
                active ? 'active' : ''
              } d-flex flex-row position-relative `}
              style={{ alignItems: 'center' }}>
              <Image
                src={lupa}
                alt=""
                className=""
                style={{ width: '38px', height: '34px', position: 'absolute', left: '20px' }}
                width={50}
                height={50}
              />
              {/* <SearchIcon className="h-20 w-10 position absolute" /> */}
              <input
                className="bg-gray2 rounded-5 border-0 fs-5 my-2 w-100"
                type="search"
                placeholder="Buscar institución"
                aria-label="Search"
                style={{ padding: '1rem', paddingLeft: '4rem' }}
              />
            </div>
          </form>
          {error && <div>¡Ocurrio un error!</div>}
          {data?.institutions && !loading && (
          
                <DynamicTable columns={columns} data={processedInstitutions} />
            
          )}
        </WrapperList>
      </div>
    </div>
  );
}

export default Institutions;
