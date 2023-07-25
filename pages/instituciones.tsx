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
    <div className="w-full bg-gray1 h-90" style={{minHeight: '100vh', padding: '10px', paddingTop: '0px'}}>
      <Nav actualPage="Instituciones" withNavigation />
      <div className={`${(windowSize.width ?? 0) >= 1200 ? 'mt-16' : 'mt-4'}`}>
        <WrapperList className="lg:mx-24 sm:mx-10 bg-white shadow-2xl rounded-[2rem]">
          <div className="flex font-bold text-black text-xl	">
            <h4>
              Lista de instituciones Educativas
            </h4>
          </div>
          <form className="flex justify-between my-4" role="search">
            <div
              className={`w-full opacity ${active ? 'active text-black' : ''} transitionRight ${
                active ? 'active' : ''
              } flex flex-row relative items-center `}
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
                className="bg-gray2 rounded-[2rem] border-0 fs-5 my-2 w-full"
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
