import DynamicTable from '../DynamicTable';
import { useMemo } from 'react';
import { useGetSubjectsQuery } from '../../generated/graphql';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';

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
    <div className="btl w-100 vh-100 overflow-hidden bg-gray1 p-15">
      <Grid container>
        <Grid item xs={12}>
          <strong className="fs-4 ms-20">Asignaturas creadas para el año {year}</strong>
        </Grid>
      </Grid>
      <Grid
        container
        className="col-lg-11 col-md-10 mx-auto bg-white rounded border border-2 shadow rounded-5 p-5">
        <Grid item xs={12}>
          <form role="search">
            <Grid container>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={1} className="text-ali-end pt-4">
                    <SearchIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <input
                      className=" w-100 bg-gray2 rounded-5 border-0 p-3 fs-5"
                      type="search"
                      placeholder="Buscar Docente"
                      aria-label="Search"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} className="text-ali-end">
                <select
                  className={`bg-gray2 text-gray3 rounded-5 border-0 p-3 fs-5 w-70p opacity${
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
          ) : data?.courses ? (
            <div className="d-flex border-white py-4" style={{ height: '32rem' }}>
              <DynamicTable columns={columns} data={processedSubjects} />
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
