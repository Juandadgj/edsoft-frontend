import DynamicTable from '../DynamicTable';
import { useMemo } from 'react';
import { useGetAchievementsQuery } from '../../generated/graphql';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  {
    Header: 'Periodo',
    accessor: 'period',
  },
  {
    Header: 'Descripcion',
    accessor: 'description',
  },
];

function Achievements() {
  const today = new Date();
  const year = today.getFullYear();
  const [active, setActive] = useState(false);
  const { data, loading, error } = useGetAchievementsQuery();
  console.log(data, error);

  useEffect(() => {
    setActive(true);
  }, []);

  const processedAchievements = useMemo(() => {
    if (!data?.achievements) return [];
    return data.achievements.map((achievements, index) => ({
      period: achievements?.period ?? '',
      description: achievements?.description ?? '',
    }));
  }, [data]);

  return (
    <div className="rounded-tl-[40px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container>
        <Grid item xs={12}>
          <strong className="text-2xl text-black ms-20">Logros por cursos para el año {year}</strong>
        </Grid>
      </Grid>
      <Grid
        container
        className="mx-auto bg-white border-2 shadow-2xl rounded-[2rem] p-5">
        <Grid item xs={12}>
          <form role="search">
            <Grid container>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={1} className="text-end pt-4">
                    <SearchIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <input
                      className="w-full bg-gray2 text-black rounded-[2rem] border-0 p-3"
                      type="search"
                      placeholder="Buscar Docente"
                      aria-label="Search"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} className="text-end">
                <select
                  className={`bg-gray2 text-gray3 rounded-[2rem] border-0 p-3 fs-5 w-[70%] opacity${
                    active ? 'active' : ''
                  } transitionDown ${active ? 'active' : ''}`}>
                  <option>Filtrar por</option>
                  <option>Nombre</option>
                  <option>Apellido</option>
                </select>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <h3>Loading</h3>
          ) : data?.achievements ? (
            <div className="d-flex border-white py-4" style={{ height: '32rem' }}>
              <DynamicTable columns={columns} data={processedAchievements} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Achievements;
