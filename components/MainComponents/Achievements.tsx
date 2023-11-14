import { useMemo } from "react";
import { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import {
  useCoursesLazyQuery,
  useGroupsQuery,
  useAchievementsLazyQuery,
  useDeleteAchievementMutation,
  useUpdateAchievementMutation,
  useCreateAchievementMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import Table from "../Table";
import edit from "../../public/assets/01editar.png";
import { styled } from "@material-ui/styles";
import {
  FilterAchievementInput,
  Achievement,
  DeleteAchievementDocument,
  UpdateAbsenceInput,
  UpdateAchievementDocument,
} from "../../generated/graphql";
import DynamicModal from "../DynamicModal";
import Image from "next/image";
import Swal from "sweetalert2";

const columsCourses = [
  {
    Header: "Asignatura",
    accessor: "name",
  },
  {
    Header: "Profesor",
    accessor: "teacher",
  },
  {
    Header: "1 Per.",
    accessor: "perido",
  },
  {
    Header: "2 Per.",
    accessor: "perido",
  },
  {
    Header: "3 Per.",
    accessor: "perido",
  },
  {
    Header: "4 Per.",
    accessor: "perido",
  },
];

const columnsGroup = [
  {
    Header: "Curso",
    accessor: "name",
  },
  {
    Header: "Profesor del Grupo",
    accessor: "group_teacher",
  },
  { Header: "Asignaturas", accessor: "subjects" },
];

const CssTextField = styled(TextField)({
  fontFamily: ["Scada", "sans-serif"].join(","),
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

function Achievements() {
  const [CreateAchievement] = useCreateAchievementMutation();
  const [DeleteAchievement] = useDeleteAchievementMutation();
  const [UpdateAchievement] = useUpdateAchievementMutation();
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();
  const { g, a, per } = router.query;
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);
  const [
    getAchievements,
    { data: achievements, loading: loadingAchievements, error },
  ] = useAchievementsLazyQuery();
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses, refetch },
  ] = useCoursesLazyQuery();

  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: { filterGroupInput: { id_year: 2017 } },
  });
  const handlerSelectedCourse = (id: number | undefined) => {
    router.push(`/dashboard/programacion-anual?componente=logros&g=${id}`);
  };
  // Form to manage inputs values
  const [formValues, setFormValues] = useState<any>({
    name: "",
    id_course: "",
    term: ""
  });
  // Obj to manage every input error
  const [errors, setErrors] = useState<any>({
    name: "",
    id_course: a,
    term: per
  });
  
  // Here we validate if every item is filled and if it is we return true
  const validationEvent = () => {
    if (formValues.name) {
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

  // We are using formvalues for add and update, so once the user finishes a proccess, it's necessary to clean this state
  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }

    for (const i in formValues) {
      if (i === "id_achievement") {
        setFormValues((val: any) => ({ ...val, [i]: undefined }));
      } else if (i === "type_id") {
        setFormValues((val: any) => ({ ...val, [i]: 1 }));
      } else {
        setFormValues((val: any) => ({ ...val, [i]: "" }));
      }
    }
  };

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
          label="Curso"
          name="id_course"
          color="success"
          value={formValues.id_course}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.id_course]: target.value })
          }
          helperText={errors.id_course}
        />
      ),
    },
    {
      html: (
        <CssTextField
          required
          label="Periodo"
          name="term"
          color="success"
          value={formValues.term}
          onChange={({ target }: any) =>
            setFormValues({ ...formValues, [target.term]: target.value })
          }
          helperText={errors.term}
        />
      ),
    },
  ];

  const processedAchievements = (data: any) => {
    if (!data?.achievements) return [];
    return data.achievements.map((achievements: any, index: any) => ({
      id_achievement: achievements?.id_achievement ?? "",
      description: achievements?.description ?? "",
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            // We set the values selected to our inputs
            setFormValues((t: any) => ({
              ...t,
              id_course: achievements?.id_course,
              term: achievements?.period,
              name: achievements?.name,
            }));
            setOpen(true);
          }}
        >
          <Image src={edit} alt="" width={50} height={50} />
        </button>
      ),
      indicator: (
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="text-center"
          >
            <path
              fill="#0055A6"
              d="M14 22v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5H14Zm7.5-6.575l-.925-.925l.925.925Zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025v.95ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v3h-2V9h-5V4H6v16h6v2H6Zm7-10Zm6.025 4.975l-.475-.45l.925.925l-.45-.475Z"
            />
          </svg>
        </div>
      ),
      borrar: (
        <button
          className="border-0 flex justify-center items-center"
          onClick={() =>
            Swal.fire({
              title: "¿Estás seguro?",
              text: "No podrás revertir esta acción!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#0055a6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Eliminar",
            }).then((result) => {
              if (result.isConfirmed && achievements?.id_achievements) {
                DeleteAchievement({
                  variables: { idAchievement: achievements?.id_achievements },
                }).then((res) => {
                  if (res.data?.deleteAchievement) {
                    Swal.fire({
                      title: "Eliminado",
                      text: "Docente Eliminado!",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    refetch();
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Ha habido un error...",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
              }
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <path
              fill="#e11d48"
              d="M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12ZM94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Zm48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Z"
            />
          </svg>
        </button>
      ),
    }));
  };

  const processedGroups = useMemo(() => {
    if (!groups?.groups) return [];
    return groups?.groups.map((group, index) => ({
      name: `${group?.level}-${group?.sublevel}` ?? "",
      group_teacher: group?.representative ?? "",
      asignaturas: group?.coursesCount,
      click: () => handlerSelectedCourse(group?.id_group),
    }));
  }, [groups]);

  const processedCourses = (data: any) => {
    if (!data) return [];
    return data.map((courses: any, index: any) => ({
      id_course: courses?.id_course,
      id_group: courses?.id_group,
      name: `${courses?.name}` ?? "",
      teacher: `${courses?.teacher.name}` ?? "-",
      periodo1: "-",
      periodo2: "-",
      periodo3: "-",
      periodo4: "-",
      route: 'programacion-anual?componente=logros'
    }));
  };

  useEffect(() => {
    if (a && per) {
      getAchievements({
        variables: {
          filterAchievementInput: { id_course: Number(a), period: Number(per) },
        },
      }).then((res) => {
        const { data } = res;
        setSelectedAchievements(processedAchievements(data));
      });
    }
  }, [router]);

  useEffect(() => {
    if (g) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(g) } },
      }).then((res) => {
        const { data } = res;
        setSelectedCourses(processedCourses(data?.courses));
      });
    }
  }, [router]);

  const handlerCreateAchievement = async () => {
    return await CreateAchievement({
      variables: { createAchievementInput: formValues },
    });
  };

  const handlerUpdateAchievement = async (form: any) => {
    return await UpdateAchievement({
      variables: { updateAchievementInput: formValues },
    });
  };

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      <Grid container>
        <Grid item xs={6}>
          <strong className="text-2xl text-black ps-8 pb-4">
            Logros por curso para el año {year}
          </strong>
        </Grid>
        {a && per && (
          <Grid item xs={6} className="text-end pr-6">
            <button
              type="button"
              className="btn bg-blue3 btn-primary w-[16rem] mb-0 pb-0 !h-2 rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
              onClick={() => {
                setTypeAdd(true);
                setFormValues((t: any) => ({
                  ...t,
                  id_course: a,
                  term: per,
                }))
                setOpen(true);
              }}
            >
              <h4 className="text-white">+ Nuevo Logro</h4>
            </button>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full"
      >
        {!g && (
          <Grid item xs={12} className="h-full">
            {loadingGroups ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : groups?.groups ? (
              <div className="d-flex border-white py-4 h-full">
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
        )}
        {g && !a && !per && (
          <Grid item xs={12} className="text-black h-full">
            {loadingCourses ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : courses?.courses ? (
              <div className=" border-white py-4 h-full">
                <Table
                  column={columsCourses}
                  data={selectedCourses}
                  type={"courses"}
                />
              </div>
            ) : (
              errorCourses && <h3>Ocurrio un error: {errorCourses?.message}</h3>
            )}
          </Grid>
        )}
        {a && per && (
          <Grid item xs={12} className="text-black h-full">
            {loadingAchievements ? (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-lg bg-blue3"></span>
              </div>
            ) : achievements?.achievements ? (
              <div className="overflow-x-auto h-full">
                <table className="table">
                  <thead>
                    <tr className="border-none text-lg font-semibold text-blue3">
                      <th>Descripcion</th>
                      <th>Editar</th>
                      <th>Agregar indicador</th>
                      <th className="text-[#e11d48]">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAchievements.map((a: any, i: number) => (
                      <tr key={a.id_achievement} className="border-none">
                        <th>{a?.description}</th>
                        <th>{a?.editar}</th>
                        <th>{a?.indicator}</th>
                        <th className="flex justify-center">{a?.borrar}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h3>Ocurrio un error</h3>
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
        addSuccessMsg={"Logro Creado!"}
        updateSuccessMsg={"Logro Actualizado!"}
        formValues={formValues}
        addMutation={handlerCreateAchievement}
        updateMutation={handlerUpdateAchievement}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default Achievements;
