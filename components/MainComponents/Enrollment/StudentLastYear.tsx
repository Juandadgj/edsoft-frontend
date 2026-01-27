import React from "react";
import useSchoolYear from "@/hooks/useSchoolYear";
import { ContainerComponents } from "@/components/ContainerComponents";
import { CourseComponent } from "../CourseComponent";

export const StudentsLastYear = () => {
  const { year } = useSchoolYear();
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <div>
          <strong className="text-black text-xl ps-8">
            Elija el curso para ingresar estudiantes para el {year}
          </strong>
        </div>
      </div>
      <CourseComponent isCreate={false} showSubjects={true} />
    </ContainerComponents>
  );
};
