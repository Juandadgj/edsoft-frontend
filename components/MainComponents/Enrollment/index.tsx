import React from "react";
import Grid from "@mui/material/Grid";
import Card from "../../Card";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import HailIcon from "@mui/icons-material/Hail";
import NewStudent from "./NewStudent";
import { useRouter } from "next/router";
import { NotRegistered } from "./NotRegistered";
import { StudentsPerCourse } from "./StudentsPerCourse";
import { StudentsLastYear } from "./StudentLastYear";

const cardsEnrollment = [
  {
    id: 1,
    icon: <PersonAddAltIcon color="success" fontSize="inherit" />,
    title: "Ingreso de nuevos estudiantes",
    component: <NewStudent/>
  },
  {
    id: 2,
    icon: <PersonOffIcon color="error" fontSize="inherit" />,
    title: "Estudiantes no matriculados en el año actual",
    component: <NotRegistered/>
  },
  {
    id: 3,
    icon: <Diversity3Icon color="success" fontSize="inherit" />,
    title: "Mostrar estudiantes por curso",
    component: <StudentsPerCourse/>
  },
  {
    id: 4,
    icon: <EscalatorWarningIcon color="error" fontSize="inherit" />,
    title: "Buscar estudiantes habilitados",
    component: <NewStudent/>

  },
  {
    id: 5,
    icon: <HailIcon color="success" fontSize="inherit" />,
    title: "Matricular estudiantes por cursos del año anterior",
    component: <StudentsLastYear/>
  },
];

export const Enrollment = () => {
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();
  useEffect(() => {
    console.log(router.query)
  }, [router])
  const { opcion } = router.query;
  const opcionelegida = cardsEnrollment.find(card => card.id === Number(opcion))
  
  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-14">
      {opcion ? '' : (
      <Grid container className="pb-6">
        <Grid item xs={12}>
          <strong className="text-2xl text-black ps-8">
            Gestiones de Estudiantes {year}
          </strong>
        </Grid>
      </Grid>
      )}
      {opcion ? (
        <>
        {/* <h1 className="text-black text-xl">{opcionelegida?.title}</h1> */}
        {opcionelegida?.component}
        </>
      ) : (
        <div className="flex flex-wrap ps-8 justify-start gap-6">
          {cardsEnrollment.map((item, i) => (
            <div key={i} className="w-1/4 p-4">
              <Card type={"enrollment"} item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
