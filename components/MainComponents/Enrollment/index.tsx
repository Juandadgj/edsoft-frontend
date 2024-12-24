import React, { useEffect } from "react";
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
import { SearchStudent } from "./SearchStudent";
import useSchoolYear from "@/hooks/useSchoolYear";
import Link from "next/link";

const cardsEnrollment = [
  {
    id: 1,
    icon: <PersonAddAltIcon color="success" fontSize="inherit" />,
    title: "Ingreso de nuevos estudiantes",
    component: <NewStudent />,
  },
  {
    id: 3,
    icon: <Diversity3Icon color="success" fontSize="inherit" />,
    title: "Mostrar estudiantes por curso",
    component: <StudentsPerCourse />,
  },
  {
    id: 4,
    icon: <EscalatorWarningIcon color="error" fontSize="inherit" />,
    title: "Buscar estudiantes habilitados",
    component: <SearchStudent />,
  },
  {
    id: 5,
    icon: <HailIcon color="success" fontSize="inherit" />,
    title: "Matricular estudiantes por cursos del año anterior",
    component: <StudentsLastYear />,
  },
];

export const Enrollment = () => {
  const { year } = useSchoolYear();
  const router = useRouter();
  const { opcion } = router.query;
  const opcionelegida = cardsEnrollment.find(
    (card) => card.id === Number(opcion)
  );

  useEffect(() => {
    const { opcion, groups, ...rest } = router.query; // Elimina 'opcion' de la URL
    if (opcion && groups) {
      router.replace({
        pathname: router.pathname,
        query: rest,
      });
    }
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      {opcion ? (
        ""
      ) : (
        <div className="pb-6">
          <strong className="text-xl text-black ps-8">
            Gestiones de Estudiantes {year}
          </strong>
        </div>
      )}
      {opcion ? (
        <div className="h-full w-full">{opcionelegida?.component}</div>
      ) : (
        <div className="grid grid-cols-3 place-content-start gap-5 max-w-4xl">
          {cardsEnrollment.map((item, i) => (
            <Link
              href={`${router.asPath}&opcion=${item.id}`}
              className="card bg-base-100  px-5 py-5"
              key={i}
            >
              <figure>
                <div className="text-4xl">{item.icon}</div>
              </figure>
              <div className="card-body justify-center items-center py-0">
                <div className="card-title text-center text-base">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
