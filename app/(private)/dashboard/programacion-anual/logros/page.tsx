import { AchievementList } from '@/app/components/features/dashboard/programacion-anual/achievements';
import serverApi from '@/app/lib/api/server-api';
import { Achievement, Course, Group, ScholarYear } from '@/app/types';

interface LogrosPageProps {
  searchParams: Promise<{ group?: string; subject?: string; period?: string }>;
}

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

async function getCourses(params?: { group: number }): Promise<Course[]> {
  try {
    if (params) {
      const { group } = params;
      return await serverApi.get<Course[]>(`/courses?id_group=${group}`);
    }
    return [];
  } catch (error) {
    console.error('No fue posible obtener las asignaturas', error);
    return [];
  }
}

export async function getAchievements(params?: { subject: number; period: number }): Promise<Achievement[]> {
  try {
    if (params) {
      console.log(params)
      const { subject, period } = params;
      return await serverApi.get<Achievement[]>(`/achievements?id_course=${subject}&period=${period}`);
    }
    return [];
  } catch (error) {
    console.error('No fue posible obtener los logros', error);
    return [];
  }
}

export default async function LogrosPage({ searchParams }: LogrosPageProps) {
  const { group, subject, period } = await searchParams;
  const selectedYear = await getSelectedYear();
  const yearId = selectedYear?.id_year ?? new Date().getFullYear();

  const [groups, courses, achievements] = await Promise.all([
    getGroups(yearId),
    group ? getCourses({ group: Number(group) }) : Promise.resolve([]),
    subject && period ? getAchievements({ subject: Number(subject), period: Number(period) }) : Promise.resolve([]),
  ]);

  return (
    <AchievementList
      achievements={achievements}
      courses={courses}
      groups={groups}
      selectedYear={yearId}
    />
  );
}
