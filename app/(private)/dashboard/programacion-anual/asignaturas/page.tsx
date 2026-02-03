import { SubjectList } from '@/app/components/features/dashboard/programacion-anual/subjects';
import serverApi from '@/app/lib/api/server-api';
import { Course, Group, Area, Teacher, ScholarYear } from '@/app/types';

async function getSelectedYear(): Promise<ScholarYear | null> {
  try {
    return await serverApi.get<ScholarYear>('/scholar-years/selected');
  } catch {
    return null;
  }
}

async function getGroups(yearId: number): Promise<Group[]> {
  try {
    return await serverApi.get<Group[]>(`/groups?id_year=${yearId}`);
  } catch (error) {
    console.error('No fue posible obtener los grupos', error);
    return [];
  }
}

async function getCourses(): Promise<Course[]> {
  try {
    return await serverApi.get<Course[]>('/courses');
  } catch (error) {
    console.error('No fue posible obtener las asignaturas', error);
    return [];
  }
}

async function getAreas(): Promise<Area[]> {
  try {
    return await serverApi.get<Area[]>('/areas');
  } catch (error) {
    console.error('No fue posible obtener las áreas', error);
    return [];
  }
}

async function getTeachers(): Promise<Teacher[]> {
  try {
    return await serverApi.get<Teacher[]>('/teachers');
  } catch (error) {
    console.error('No fue posible obtener los profesores', error);
    return [];
  }
}

export default async function AsignaturasPage() {
  const selectedYear = await getSelectedYear();
  const yearId = selectedYear?.id_year ?? new Date().getFullYear();

  const [groups, subjects, areas, teachers] = await Promise.all([
    getGroups(yearId),
    getCourses(),
    getAreas(),
    getTeachers(),
  ]);

  return (
    <SubjectList
      subjects={subjects}
      groups={groups}
      areas={areas}
      teachers={teachers}
      selectedYear={yearId}
    />
  );
}
