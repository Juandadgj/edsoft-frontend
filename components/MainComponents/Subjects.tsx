import { useMemo } from "react";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useCreateCourseMutation,
  useTeachersQuery,
} from "../../generated/graphql";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "../Table";
import { useRouter } from "next/router";
import DynamicModal from "../DynamicModal";
import Image from "next/image";
import edit from "../../public/assets/01editar.png";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const columnsGroup = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  {
    Header: "Asignaturas",
    accessor: "courses",
  },
];

const columnsSubjects = [
  {
    Header: "Asignatura",
    accessor: "name",
  },
  {
    Header: "Area",
    accessor: "area",
  },
  {
    Header: "Profesor",
    accessor: "professor",
  },
  {
    Header: "IHC",
    accesor: "ihc",
  },
  {
    Header: "Valor %",
    accesor: "percentage",
  },
  {
    Header: "Promediar",
    accesor: "ihc",
  },
  {
    Header: "Editar",
    accessor: "edit",
  },
  {
    Header: "Borrar",
    accessor: "delete",
  },
];

function Subjects() {
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();
  const { c } = router.query;
  const [selectedGroup, setSelectedGroup] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);
  const [AddCourse] = useCreateCourseMutation();
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses, refetch },
  ] = useCoursesLazyQuery();
  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2017 } },
  });
  const { data: teachers } = useTeachersQuery();
  const handlerSelectedCourse = (id: number | undefined) => {
    router.push(`/dashboard/programacion-anual?componente=asignatura&c=${id}`);
  };

  const [formValues, setFormValues] = useState<any>({
    id_group: c,
    name: "",
    id_area: 0,
    teacher: "",
    hour: 0,
    percentage: 0,
    average: "",
  });

  const [errors, setErrors] = useState<any>({
    name: "",
    id_area: "",
    id_teacher: "",
    average: "",
    percentage: "",
    hour: "",
  });

  const options = [];
  for (let i = 1; i <= 24; i++) {
    options.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  const optionsPercentage = [];
  for (let i = 1; i <= 100; i++) {
    optionsPercentage.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  const arrayInputs: any[] = [
    {
      html: (
        <div className="text-black">
          <input
            type="text"
            value={formValues.name}
            id=""
            name="name"
            placeholder="Nombre de la asignatura"
            className="input border-gray5 w-full h-12 bg-transparent text-sm"
            onChange={({ target }: any) =>
              setFormValues({ ...formValues, [target.name]: target.value })
            }
          />
          <div>
            <label className="label-text-alt text-[red]">{errors.name}</label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <FormControl fullWidth>
            <InputLabel id="average">Profesor</InputLabel>
            <Select
              labelId="average"
              id="demo-simple-select"
              name="teacher"
              value={formValues.teacher}
              label="Profesor"
              onChange={({ target }: any) =>
                setFormValues({ ...formValues, [target.name]: target.value })
              }
            >
              {
                teachers?.teachers.map(({name, id_teacher}:any)=>(
                  <MenuItem key={id_teacher} value={name}>{name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.teacher}
            </label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="form-control text-black">
          <FormControl fullWidth>
            <InputLabel id="average">Promediar</InputLabel>
            <Select
              labelId="average"
              id="demo-simple-select"
              name="average"
              value={formValues.average}
              label="Promediar"
              onChange={({ target }: any) =>
                setFormValues({ ...formValues, [target.name]: target.value })
              }
            >
              <MenuItem value={"Si"}> Si</MenuItem>
              <MenuItem value={"No"}> No</MenuItem>
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.average}
            </label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div className="from-control text-black">
          <FormControl fullWidth>
            <InputLabel id="average">Promediar</InputLabel>
            <Select
              labelId="average"
              id="demo-simple-select"
              name="average"
              value={formValues.average}
              label="Promediar"
              onChange={({ target }: any) =>
                setFormValues({ ...formValues, [target.name]: target.value })
              }
            >
              <MenuItem value={"Si"}> Si</MenuItem>
              <MenuItem value={"No"}> No</MenuItem>
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.average}
            </label>
          </div>
        </div>
      ),
    },
    {
      html: (
        <div>
          <FormControl fullWidth>
            <InputLabel id="hour">IHC</InputLabel>
            <Select
              labelId="hour"
              id="demo-simple-select"
              name="hour"
              value={formValues.hour}
              label="ihc"
              onChange={({ target }: any) =>
                setFormValues({ ...formValues, [target.name]: target.value })
              }
            >
              {options}
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">{errors.hour}</label>
          </div>
        </div>
      ),
    },
    ,
    {
      html: (
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Valor %</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="percentage"
              value={formValues.percentage}
              label="Valor %"
              onChange={({ target }: any) =>
                setFormValues({ ...formValues, [target.name]: target.value })
              }
            >
              {optionsPercentage}
            </Select>
          </FormControl>
          <div>
            <label className="label-text-alt text-[red]">
              {errors.percentage}
            </label>
          </div>
        </div>
      ),
    },
  ];
  const validationEvent = () => {
    if (
      formValues.name &&
      formValues.id_teacher &&
      formValues.average &&
      formValues.percentage &&
      formValues.hour
    ) {
      return true;
    } else {
      for (const item in formValues) {
        if (!formValues[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };

  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }

    for (const i in formValues) {
      if (i === "id_teacher") {
        setFormValues((val: any) => ({ ...val, [i]: undefined }));
      } else if (i === "type_id") {
        setFormValues((val: any) => ({ ...val, [i]: 1 }));
      } else {
        setFormValues((val: any) => ({ ...val, [i]: "" }));
      }
    }
  };

  const processedSubjects = (data: any) => {
    return data.map((courses: any, index: number) => ({
      name: courses?.name ?? "",
      area: courses.id_area ?? "",
      teacher: courses?.teacher.name ?? "-",
      hour: courses?.hour ?? "",
      percentage: courses.percentage,
      average: courses.average,
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            // We set the values selected to our inputs
            setFormValues((t: any) => ({
              ...t,
              name: courses.name,
              id_area: courses.id_area,
              teacher: courses?.teacher.name,
              hour: courses.hour,
              percentage: courses.percentage,
              average: courses.average,
              id_group: courses?.id_group,
            }));
            setOpen(true);
          }}
        >
          <Image className={``} src={edit} alt="" width={50} height={50} />
        </button>
      ),
      borrar: "",
    }));
  };

  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups.groups.map((group, index) => ({
      id:group?.id_group,
      name: `${group?.level}-${group?.sublevel}` ?? "",
      group_teacher: group?.representative ?? "",
      asignaturas: group?.coursesCount,
      click: () => handlerSelectedCourse(group?.id_group),
    }));
  }, [groups]);

  useEffect(() => {
    if (c) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(c) } },
      }).then((res) => {
        const { data } = res;
        setSelectedGroup(processedSubjects(data?.courses));
      });
    }
  }, [router]);

  const handlerCreateCourse = async () => {
    return await AddCourse({ variables: { createCourseInput: formValues } });
  };

  const handlerUpdateCourse = async (form: any) => {
    return await AddCourse({ variables: { createCourseInput: formValues } });
  };
  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <div className="flex justify-between">
        <Grid item xs={12}>
          <strong className="text-2xl text-black ps-8">
            Asignaturas creadas para el año {year}
          </strong>
        </Grid>
        {c && (
          <Grid item xs={6} className="text-end pr-6">
            <button
              type="button"
              className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-2 rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
              onClick={() => {
                setTypeAdd(true);
                setOpen(true);
              }}
            >
              <h4 className="text-white">+ Nueva asignatura</h4>
            </button>
          </Grid>
        )}
      </div>
      <Grid
        container
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        {!c ? (
          <Grid item xs={12} className="h-full">
            {loadingGroups ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : groups?.groups ? (
              <div className=" border-white py-4 h-full">
                <Table
                  column={columnsGroup}
                  data={processedGroups}
                  type={"groups"}
                />
              </div>
            ) : (
              <h3>¡Ocurrio un error!</h3>
            )}
          </Grid>
        ) : (
          <Grid item xs={12} className="text-black h-full">
            {loadingCourses ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : courses?.courses ? (
              <div className=" border-white py-4 h-full">
                <Table
                  column={columnsSubjects}
                  data={selectedGroup}
                  type={"subject"}
                />
              </div>
            ) : (
              errorCourses && <h3>Ocurrio un error: {errorCourses?.message}</h3>
            )}
          </Grid>
        )}
      </Grid>
      {/* Modal */}
      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Docente Creado!"}
        updateSuccessMsg={"Docente Actualizado!"}
        formValues={formValues}
        addMutation={handlerCreateCourse}
        updateMutation={handlerUpdateCourse}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default Subjects;
