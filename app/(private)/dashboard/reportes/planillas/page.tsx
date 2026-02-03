import {
  SpreadsheetList,
  SpreadsheetReport,
  SPREADSHEET_OPTIONS,
} from "@/app/components/features/dashboard/reportes/planillas";
import serverApi from "@/app/lib/api/server-api";
import { Course, Group, ScholarYear } from "@/app/types";

interface PlanillasPageProps {
  searchParams: Promise<{ opcion?: string, group?: string, subject?: string }>;
}

async function getSelectedYear(): Promise<ScholarYear | null> {
  try {
    return await serverApi.get<ScholarYear>("/scholar-years/selected");
  } catch {
    return null;
  }
}

async function getGroups(yearId: number): Promise<Group[]> {
  try {
    return await serverApi.get<Group[]>(`/groups?id_year=${yearId}`);
  } catch (error) {
    console.error("No fue posible obtener los grupos", error);
    return [];
  }
}

async function getCourses(): Promise<Course[]> {
  try {
    return await serverApi.get<Course[]>("/courses");
  } catch (error) {
    console.error("No fue posible obtener las asignaturas", error);
    return [];
  }
}

export default async function PlanillasPage({
  searchParams,
}: PlanillasPageProps) {
  const selectedYear = await getSelectedYear();
  const yearId = selectedYear?.id_year ?? new Date().getFullYear();

  const params = await searchParams;
  const optionId = params.opcion ? Number(params.opcion) : null;

  // TODO: Obtener datos reales del servidor
  const periods: Array<{ id: number; name: string }> = [];
  const [groups, subjects] = await Promise.all([
    getGroups(yearId),
    getCourses(),
  ]);
  if (optionId) {
    return (
      <SpreadsheetReport
        optionId={optionId}
        groups={groups}
        subjects={subjects}
        periods={periods}
      />
    );
  }

  return <SpreadsheetList />;
}
