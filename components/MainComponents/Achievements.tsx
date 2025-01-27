import { useMemo } from "react";
import { useEffect, useState } from "react";
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
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import { Input } from "../Input";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "../ContainerComponents";
import CustomModal from "../CustomModal";
import { AchievementsForm } from "./forms/AchievementsForm";
import TableComponent from "../Table";

const columnsGroup = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profesor del Grupo",
    dataIndex: "group_teacher",
    key: "group_teacher",
  },
  {
    title: "Asignaturas",
    dataIndex: "courses_count",
    key: "courses_count",
  },
  { title: "Ver", dataIndex: "select", key: "select" },
];

const columnsAchievements = [
  {
    title: "Descripcion",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Editar",
    dataIndex: "editar",
    key: "editar",
  },
  {
    title: "Agregar indicador",
    dataIndex: "agregar_indicador",
    key: "agregar_indicador",
  },
  {
    title: "Eliminar",
    dataIndex: "borrar",
    key: "borrar",
  },
];

function Achievements() {
  const [achivement, setAchivement] = useState<any>({
    description: "",
    id_course: 0,
    period: 0,
  });
  const [DeleteAchievement] = useDeleteAchievementMutation();
  const { year } = useSchoolYear();
  const router = useRouter();
  const { g, a, per } = router.query;
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [
    getAchievements,
    { data: achievements, loading: loadingAchievements, error, refetch },
  ] = useAchievementsLazyQuery();
  const [
    getCourses,
    { data: courses, loading: loadingCourses, error: errorCourses },
  ] = useCoursesLazyQuery();

  const { data: groups, loading: loadingGroups } = useGroupsQuery({
    variables: {filterGroupInput: {id_year: year}},
  });
  const handlerSelectedCourse = (id: number | undefined) => {
    router.push(`/dashboard/programacion-anual?componente=logros&g=${id}`);
  };
  const handlerSelectedAchievement = (
    id: number | undefined,
    per: number | undefined,
    route: any,
    id_group: any
  ) => {
    router.push(`/dashboard/${route}&g=${id_group}&a=${id}&per=${per}`);
  };
  const processedAchievements = (data: any) => {
    if (!data?.achievements) return [];
    return data.achievements.map((achievements: any, index: any) => ({
      id_achievement: achievements?.id_achievement ?? "",
      description: achievements?.description ?? "",
      editar: (
        <button
          className="border-0"
          onClick={() => {
            setAchivement((t: any) => ({
              ...t,
              description: achievements?.description,
              id_course: achievements?.id_course,
              period: achievements?.period,
              id_achievement: achievements?.id_achievement,
            }));
            setOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 36 36"
          >
            <path
              fill="#0055A6"
              d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z"
              className="clr-i-outline clr-i-outline-path-1"
            />
            <path
              fill="#0055A6"
              d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.69 1.69 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z"
              className="clr-i-outline clr-i-outline-path-2"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
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
              if (result.isConfirmed && achievements?.id_achievement) {
                DeleteAchievement({
                  variables: { idAchievement: achievements?.id_achievement },
                }).then((res) => {
                  if (res.data?.deleteAchievement) {
                    Swal.fire({
                      title: "Eliminado",
                      text: "Logro Eliminado!",
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
      name: `${group?.level}-${group?.sublevel}`,
      group_teacher: group?.representative ?? "",
      courses_count: group?.coursesCount,
      select: (
        <button onClick={() => handlerSelectedCourse(group?.id_group)}>
          Seleccionar curso
        </button>
      ),
    }));
  }, [groups]);

  const processedCourses = (data: any) => {
    if (!data) return [];
    return data.map((courses: any, index: any) => ({
      id_course: courses?.id_course,
      id_group: courses?.id_group,
      name: courses?.name ?? "",
      teacher: courses?.teacher.name ?? "-",
      periodo1: "-",
      periodo2: "-",
      periodo3: "-",
      periodo4: "-",
      route: "programacion-anual?componente=logros",
    }));
  };
  const columsCourses = [
    {
      title: "Asignatura",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Profesor",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "1 Per.",
      dataIndex: "periodo1",
      key: "periodo1",
      render: (text: any, record: any) => (
        <button
          onClick={() =>
            handlerSelectedAchievement(
              record?.id_course,
              1,
              record?.route,
              record?.id_group
            )
          }
        >
          -
        </button>
      ),
    },
    {
      title: "2 Per.",
      dataIndex: "periodo2",
      key: "periodo2",
      render: (text: any, record: any) => (
        <button
          onClick={() =>
            handlerSelectedAchievement(
              record?.id_course,
              2,
              record?.route,
              record?.id_group
            )
          }
        >
          -
        </button>
      ),
    },
    {
      title: "3 Per.",
      dataIndex: "periodo3",
      key: "periodo3",
      render: (text: any, record: any) => (
        <button
          onClick={() =>
            handlerSelectedAchievement(
              record?.id_course,
              3,
              record?.route,
              record?.id_group
            )
          }
        >
          -
        </button>
      ),
    },
    {
      title: "4 Per.",
      dataIndex: "periodo4",
      key: "periodo4",
      render: (text: any, record: any) => (
        <button
          onClick={() =>
            handlerSelectedAchievement(
              record?.id_course,
              4,
              record?.route,
              record?.id_group
            )
          }
        >
          -
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (g) {
      getCourses({
        variables: { filterCourseInput: { id_group: Number(g) } },
      }).then((res) => {
        const { data } = res;
        setSelectedCourses(processedCourses(data?.courses));
      });
    }
    if (a && per) {
      getAchievements({
        variables: {
          filterAchievementInput: { id_course: Number(a), period: Number(per) },
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (achievements) {
      setSelectedAchievements(processedAchievements(achievements));
    }
  }, [achievements]);

  const handlerCloseModal = () => {
    refetch();
    setOpen(false);
    setAchivement({
      ...achivement,
      description: "",
    });
  };
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8 pb-4">
            Logros por curso para el año {year}
          </strong>
        </h3>
        <div className="text-end pr-6">
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={() => {
              setAchivement({
                description: "",
                id_course: a,
                period: per,
              });
              setOpen(true);
            }}
          >
            <h4 className="text-white">+ Nueva Área</h4>
          </button>
        </div>
      </div>
      {!g && (
        <div className="h-full">
          {loadingGroups ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : groups?.groups ? (
            <div className="d-flex border-white py-4 h-full">
              <TableComponent column={columnsGroup} data={processedGroups} />
            </div>
          ) : (
            <h3>¡Ocurrio un error!</h3>
          )}
        </div>
      )}
      {g && !a && !per && (
        <div className="text-black h-full">
          {loadingCourses ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
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
        </div>
      )}
      {a && per && (
        <div className="text-black h-full">
          {loadingAchievements ? (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          ) : achievements?.achievements ? (
            <div>
              <TableComponent
                column={columnsAchievements}
                data={selectedAchievements}
              />
            </div>
          ) : (
            <h3>Ocurrio un error</h3>
          )}
        </div>
      )}
      <CustomModal
        open={open}
        title={achivement.id_achivement ? "Editar logro" : "Crear logro"}
      >
        <AchievementsForm
          achievement={achivement}
          setAchievement={setAchivement}
          onClose={handlerCloseModal}
        />
      </CustomModal>
    </ContainerComponents>
  );
}

export default Achievements;
