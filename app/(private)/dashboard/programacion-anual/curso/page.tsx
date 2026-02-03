import { GroupsList } from '@/app/components/features/dashboard/programacion-anual/groups';
import serverApi from '@/app/lib/api/server-api';
import { Group, Teacher } from '@/app/types';

interface ScholarYearResponse {
  id_year: number;
}

async function getSelectedYear(): Promise<ScholarYearResponse | null> {
  try {
    return await serverApi.get<ScholarYearResponse>('/scholar-years/selected');
  } catch (error) {
    console.error('No fue posible obtener el año escolar seleccionado', error);
    return null;
  }
}

export async function getGroups(yearId?: number | null): Promise<Group[]> {
  try {
    const params = yearId ? { id_year: yearId } : undefined;
    return await serverApi.get<Group[]>('/groups', params);
  } catch (error) {
    console.error('No fue posible obtener los grupos', error);
    return [];
  }
}

async function getTeachers(): Promise<Teacher[]> {
  try {
    return await serverApi.get<Teacher[]>('/teachers');
  } catch (error) {
    console.error('No fue posible obtener los docentes', error);
    return [];
  }
}

export default async function CrearCursoPage() {
  const selectedYear = await getSelectedYear();
  const [groups, teachers] = await Promise.all([
    getGroups(selectedYear?.id_year),
    getTeachers(),
  ]);
  console.log(groups)
  console.log(teachers)
  return (
    <GroupsList
      groups={groups}
      teachers={teachers}
      selectedYearId={selectedYear?.id_year ?? null}
    />
  );
}
