import DynamicTable from '../components/DynamicTable';
import { useMemo } from 'react';
import {
  useDeleteTeacherMutation,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useGetTeachersQuery,
} from '../generated/graphql';
import { useEffect, useState } from 'react';
import edit from '../public/assets/01editar.png';
import delet from '../public/assets/01eliminar.png';
import { Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DynamicModal from '../components/DynamicModal';
import { styled } from '@material-ui/styles';
import Swal from 'sweetalert2';
import Image from 'next/image';

const columns = [
  {
    Header: 'Apellido',
    accessor: 'lastName',
  },
  {
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    Header: 'Título',
    accessor: 'degree',
  },
  {
    Header: 'Editar',
    accessor: 'editar',
  },
  {
    Header: 'Borrar',
    accessor: 'borrar',
  },
];

const CssTextField = styled(TextField)({
  fontFamily: ['Scada', 'sans-serif'].join(','),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'blue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

function Teachers() {
  const [DeleteDocente] = useDeleteTeacherMutation();
  const [AddTeacher] = useCreateTeacherMutation();
  const [UpdateTeacher] = useUpdateTeacherMutation();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);

  // Form to manage inputs values
  const [formValues, setFormValues] = useState<any>({
    name: '',
    last_name: '',
    type_id: 1,
    identification: '',
    direction: '',
    phone: '',
    email: '',
    degree: '',
  });

  // Obj to manage every input error
  const [errors, setErrors] = useState<any>({
    name: '',
    last_name: '',
    identification: '',
    direction: '',
    phone: '',
    email: '',
    degree: '',
  });

  const { data, loading, refetch } = useGetTeachersQuery({
    fetchPolicy: 'network-only',
    variables: { type_id: 1 },
  });

  // Here we validate if every item is filled and if it is we return true
  const validationEvent = () => {
    if (
      formValues.name &&
      formValues.last_name &&
      formValues.identification &&
      formValues.direction &&
      formValues.phone &&
      formValues.email &&
      formValues.degree
    ) {
      return true;
    } else {
      for (const item in formValues) {
        if (!formValues[item]) {
          setErrors((err: any) => ({ ...err, [item]: 'Campo Requerido!' }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: '' }));
        }
      }
      return false;
    }
  };

  // We are using formvalues for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: '' }));
    }

    for (const i in formValues) {
      if (i === 'id_teacher') {
        setFormValues((val: any) => ({ ...val, [i]: undefined }));
      } else if (i === 'type_id') {
        setFormValues((val: any) => ({ ...val, [i]: 1 }));
      } else {
        setFormValues((val: any) => ({ ...val, [i]: '' }));
      }
    }
  };

  useEffect(() => {
    setActive(true);
  }, []);

  const arrayInputs: Array<any> = [
    {
      html: (
        <CssTextField
          required
          label="Nombre"
          name="name"
          color="success"
          value={formValues.name}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.name}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Apellidos"
          name="last_name"
          color="success"
          value={formValues.last_name}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.last_name}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Identificacion"
          name="identification"
          color="success"
          value={formValues.identification}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.identification}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Direccion"
          name="direction"
          color="success"
          value={formValues.direction}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.direction}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Telefono"
          name="phone"
          color="success"
          value={formValues.phone}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.phone}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Email"
          type="email"
          name="email"
          color="success"
          value={formValues.email}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.email}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Titulo"
          name="degree"
          color="success"
          value={formValues.degree}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.name]: target.value })
          }
          helperText={errors.degree}
        />
      ),
    },
  ];

  const processedTeachers = useMemo(() => {
    if (!data?.teachers) return [];

    return data.teachers.map((teacher, index) => ({
      name: teacher?.name ?? '',
      lastName: teacher?.last_name ?? '',
      degree: teacher?.degree ?? '',
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            // We set the values selected to our inputs
            setFormValues((t: any) => ({
              ...t,
              id_teacher: teacher?.id_teacher,
              name: teacher?.name,
              last_name: teacher?.last_name,
              identification: teacher?.identification,
              direction: teacher?.direction,
              phone: teacher?.phone,
              email: teacher?.email,
              degree: teacher?.degree,
            }));
            setOpen(true);
          }}>
          <Image className={`h-13 w-15`} src={edit} alt="" width={20} height={20} />
        </button>
      ),
      borrar: (
        <button
          className="border-0"
          onClick={() =>
            Swal.fire({
              title: '¿Estás seguro?',
              text: 'No podrás revertir esta acción!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0055a6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Eliminar',
            }).then(result => {
              // If there is an id selected we delete that teacher
              if (result.isConfirmed && teacher?.id_teacher) {
                DeleteDocente({
                  variables: { idDocente: teacher.id_teacher },
                }).then(res => {
                  if (res.data?.deleteTeacher) {
                    Swal.fire({
                      title: 'Eliminado',
                      text: 'Docente Eliminado!',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    refetch();
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Ha habido un error...',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
              }
            })
          }>
          <Image className={`h-8 w-10`} src={delet} alt="" />
        </button>
      ),
    }));
  }, [data, DeleteDocente]);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container>
        <Grid item xs={6}>
          <strong className="fs-4 ms-2">Lista de Docentes</strong>
        </Grid>
        <Grid item xs={6} className="text-ali-end pr-6">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-2 rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setTypeAdd(true);
              setOpen(true);
            }}>
            <h4 className="text-white fs-5">+ Nuevo Docente</h4>
          </button>
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
          ) : data?.teachers ? (
            <div className="d-flex border-white py-4" style={{ height: '32rem' }}>
              <DynamicTable columns={columns} data={processedTeachers} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </Grid>
      </Grid>

      {/* Modal */}
      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={'Docente Creado!'}
        updateSuccessMsg={'Docente Actualizado!'}
        formValues={formValues}
        addMutation={AddTeacher}
        updateMutation={UpdateTeacher}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default Teachers;
