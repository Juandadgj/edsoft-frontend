import DynamicTable from '../DynamicTable';
import { useMemo } from 'react';
import { useGetSubjectsQuery } from '../../generated/graphql';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import Table from '../Table';

const columns = [
  {
    Header: 'Curso',
    accessor: 'subjectName',
  },
  {
    Header: ' Id del profesor',
    accessor: 'teacherId',
  },
  {
    Header: 'Asignaturas',
    accessor: 'subjects',
  },
];

function Subjects() {
  const today = new Date();
  const year = today.getFullYear();
  const [active, setActive] = useState(false);
  // COURSES
  // nombre profesor del grupo and any id
  const { data, loading } = useGetSubjectsQuery();
  console.log(data);

  useEffect(() => {
    setActive(true);
  }, []);
  const processedSubjects = useMemo(() => {
    // THIS VALUES ARE SUPOSSED TO BE CHANGED
    if (!data?.courses) return [];
    return data.courses.map((courses, index) => ({
      subjectName: courses?.name ?? '',
      teacherID: courses?.id_teacher ?? '-',
      subjects: courses?.hour ?? '',
    }));
  }, [data]);

  return (
    <div className="rounded-tl-[40px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container>
        <Grid item xs={12}>
          <strong className="text-2xl text-black ms-20">Asignaturas creadas para el año {year}</strong>
        </Grid>
      </Grid>
      <Grid
        container
        className="mx-auto bg-white border-2 shadow-2xl rounded-[2rem] p-5 h-full overflow-x-auto">
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
            <div className='w-full flex justify-center items-center'>
              <span className="loading loading-dots loading-lg bg-blue3"></span>
            </div>
          ) : data?.courses ? (
            <div className="d-flex border-white py-4" style={{ height: '32rem' }}>
              <Table column={columns} data={processedSubjects} type={'subject'}/>
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Subjects;
