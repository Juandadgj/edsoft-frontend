import { QualificationForm } from "@/app/components/features/dashboard/proceso-anual/calificacion";
import { getGroups } from "../../programacion-anual/curso/page";
import { getSelectedYear } from "@/app/components/features/dashboard/programacion-anual/set-year";
import serverApi from "@/app/lib/api/server-api";
import { Achievement, QualificationList } from "@/app/types";
import { getCourses } from "../../programacion-anual/asignaturas/page";
import { getAchievements } from "../../programacion-anual/logros/page";
import { getStudents } from "../../programacion-anual/matriculas/page";

interface QualificationPageProps {
  searchParams: Promise<{ group?: string; subject?: string; per?: string }>;
}

async function getStudentsQualifications({
  courseId,
  period,
}: {
  courseId?: number;
  period?: number;
}): Promise<QualificationList[]> {
  try {
    if (!courseId || !period) return [];
    const response = await serverApi.get<QualificationList[]>(
      "/achievements/qualifications",
      {
        course_id: courseId,
        period: period,
      },
    );
    return response;
  } catch (error) {
    console.error("No fue posible obtener las calificaciones", error);
    return [];
  }
}

export default async function CalificacionPage({
  searchParams,
}: QualificationPageProps) {
  const { group, subject, per } = await searchParams;
  const selectedYear = await getSelectedYear();
  const [groups, subjects, achievements, students, qualifications] =
    await Promise.all([
      getGroups(selectedYear?.id_year),
      group ? getCourses({ group: Number(group) }) : Promise.resolve([]),
      subject && per
        ? getAchievements({ subject: Number(subject), period: Number(per) })
        : Promise.resolve([]),
      per ? getStudents({ groupId: Number(group) }) : Promise.resolve([]),
      subject && per
        ? getStudentsQualifications({
            courseId: Number(subject),
            period: Number(per),
          })
        : Promise.resolve([]),
    ]);
  console.log(qualifications[0]);
  return (
    <QualificationForm
      groups={groups}
      courses={subjects}
      achievements={achievements}
      students={students}
      yearName={selectedYear?.id_year}
    />
  );
}
