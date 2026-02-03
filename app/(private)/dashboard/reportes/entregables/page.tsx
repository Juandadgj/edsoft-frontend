import { getSelectedYear } from "@/app/components/features/dashboard/programacion-anual/set-year";
import {
  DeliverablesList,
  DeliverableReport,
} from "@/app/components/features/dashboard/reportes/entregables";
import serverApi from "@/app/lib/api/server-api";
import { Group, ScholarYear, Student } from "@/app/types";

interface EntregablesPageProps {
  searchParams: Promise<{ opcion?: string; group?: string; year?: string }>;
}

async function getScholarYears(): Promise<ScholarYear[]> {
  try {
    return await serverApi.get<ScholarYear[]>("/scholar-years");
  } catch (error) {
    console.error("No fue posible obtener el listado de años escolares", error);
    return [];
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

async function getStudents(groupId: number): Promise<Student[]> {
  try {
    return await serverApi.get<Student[]>(`/students/group/${groupId}`);
  } catch (error) {
    console.log(error)
    console.error("No fue posible obtener los estudiantes", error);
    return [];
  }
}

export default async function EntregablesPage({
  searchParams,
}: EntregablesPageProps) {
  const selectedYear = await getSelectedYear();
  const params = await searchParams;
  const optionId = params.opcion ? Number(params.opcion) : null;
  const yearIdParam = params.year ? Number(params.year) : null;
  const yearId = yearIdParam ?? selectedYear?.id_year ?? new Date().getFullYear();
  const groupId = params.group ? Number(params.group) : null;
  
  const [students, groups, years] = await Promise.all([
    groupId ? getStudents(groupId) : Promise.resolve([]),
    getGroups(yearId),
    getScholarYears(),
  ]);
  const periods: Array<{ id: number; name: string }> = [];
  if (optionId) {
    return (
      <DeliverableReport
        optionId={optionId}
        groups={groups}
        students={students}
        periods={periods}
        years={years}
      />
    );
  }

  return <DeliverablesList />;
}
