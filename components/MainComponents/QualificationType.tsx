import DynamicTable from '../DynamicTable';
import { useMemo } from 'react';
import {
  useCreateQualificationTypeMutation,
  useDeleteQualificationTypeMutation,
  useGetQualificationQuery,
  useUpdateQualificationTypeMutation,
} from '../../generated/graphql';
import { useEffect, useState } from 'react';
import edit from '../../public/assets/01editar.png';
import { Grid, TextField } from '@mui/material';
import { styled } from '@material-ui/styles';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import DynamicModal from '../DynamicModal';
import delet from '../../public/assets/01eliminar.png';

const columns = [
  {
    Header: 'Nombre Calificacion',
    accessor: 'qualificationName',
  },
  {
    Header: 'Floor',
    accessor: 'floor',
  },
  {
    Header: 'Ceiling',
    accessor: 'ceiling',
  },
  {
    Header: 'Año',
    accessor: 'year',
  },
  {
    Header: 'Notas',
    accessor: 'notes',
  },
  {
    Header: 'Editar',
    accessor: 'edit',
  },
  {
    Header: 'Borrar',
    accessor: 'delete',
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

function QualificationType() {
  const [DeleteQualificationType] = useDeleteQualificationTypeMutation();
  const [AddQualificationType] = useCreateQualificationTypeMutation();
  const [useUpdateQualificationType] = useUpdateQualificationTypeMutation();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);

  const { data, loading, error, refetch } = useGetQualificationQuery();

  // Form to manage inputs values
  const [formValues, setFormValues] = useState<any>({
    ceiling_score: '',
    floor_score: '',
    name: '',
    year: '',
  });

  // Obj to manage every input error
  const [errors, setErrors] = useState<any>({
    ceiling_score: '',
    floor_score: '',
    id_type_qual: '',
    name: '',
    year: '',
  });

  useEffect(() => {
    setActive(true);
  }, []);

  // Here we validate if every item is filled and if it is we return true
  const validationEvent = () => {
    if (formValues.ceiling_score && formValues.floor_score && formValues.name && formValues.year) {
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

  // Me are using formvalues for add and update, so once the user finishes a proccess it is necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: '' }));
    }

    for (const i in formValues) {
      setFormValues((val: any) => ({ ...val, [i]: '' }));
    }
  };

  const arrayInputs: Array<any> = [
    {
      html: (
        <CssTextField
          required
          label="Nombre Calificacion"
          name="name"
          color="success"
          type="text"
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
          label="Floor"
          name="floor_score"
          color="success"
          type="number"
          value={formValues.floor_score}
          onChange={({ target }: any) => {
            const val = parseFloat(target.value);
            setFormValues({ ...formValues, [target.name]: val });
          }}
          helperText={errors.floor_score}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Ceiling"
          name="ceiling_score"
          color="success"
          type={'number'}
          value={formValues.ceiling_score}
          onChange={({ target }: any) => {
            const val = parseFloat(target.value);
            setFormValues({ ...formValues, [target.name]: val });
          }}
          helperText={errors.ceiling_score}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          id="outlined-basic"
          label="Año"
          name="year"
          color="success"
          type={'number'}
          value={formValues.year}
          onChange={({ target }: any) => {
            const val = parseInt(target.value);
            setFormValues({ ...formValues, [target.name]: val });
          }}
          helperText={errors.year}
        />
      ),
    },
  ];

  const porcessedQualificationType = useMemo(() => {
    if (!data?.typeQualifications) return [];
    return data.typeQualifications.map((quty, index) => ({
      qualificationName: quty?.name ?? '',
      floor: quty?.floor_score ?? '',
      ceiling: quty?.ceiling_score ?? '',
      year: quty?.year ?? '',
      notes: <button className="border-0 ">imagen notitas</button>,
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            // We set the values selected to our inputs
            setFormValues((t: any) => ({
              ...t,
              id_type_qual: quty?.id_type_qual,
              ceiling_score: quty?.ceiling_score,
              floor_score: quty?.floor_score,
              name: quty?.name,
              year: quty?.year,
            }));
            setOpen(true);
          }}>
          <img className={`h-13 w-15`} src={edit} alt="" />
        </button>
      ),
      delete: (
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
              if (result.isConfirmed && quty?.id_type_qual) {
                DeleteQualificationType({
                  variables: { idQualificationType: quty?.id_type_qual },
                }).then(res => {
                  if (res.data?.deleteTypeQualification) {
                    Swal.fire({
                      title: 'Eliminado',
                      text: 'Tipo Calificacion Eliminada!',
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
          <img className={`h-8 w-10`} src={delet} alt="" />
        </button>
      ),
    }));
  }, [data, DeleteQualificationType]);

  return (
    <div className="btl w-100 vh-100 overflow-hidden bg-gray1 p-15">
      <Grid container>
        <Grid item xs={6}>
          <strong className="fs-4 ms-20">Tipo de Calificación</strong>
        </Grid>
        <Grid item xs={6} className="text-ali-end pr-6">
          <button
            type="button"
            className="btn bg-blue3 btn-primary w-64 mb-0 pb-0 h-10 btl btr "
            onClick={() => {
              setTypeAdd(true);
              setOpen(true);
            }}>
            <h4 className="text-white fs-5">+ Nueva Calificacion</h4>
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
                      placeholder="Buscar Nota"
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
          ) : data?.typeQualifications ? (
            <div className="d-flex border-white py-4" style={{ height: '32rem' }}>
              <DynamicTable columns={columns} data={porcessedQualificationType} />
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
        addSuccessMsg={'Calificacion Creada!'}
        updateSuccessMsg={'Calificacion Actualizada!'}
        formValues={formValues}
        addMutation={AddQualificationType}
        updateMutation={useUpdateQualificationType}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default QualificationType;
