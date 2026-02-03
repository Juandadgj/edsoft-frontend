import { EnrollmentMain } from "@/app/components/features/dashboard/programacion-anual/enrollments/enrollment-main";
import serverApi from "@/app/lib/api/server-api";
import { Group, Student, ScholarYear } from "@/app/types";

interface MatriculasPageProps {
  searchParams: Promise<{ opcion?: string; group?: string }>;
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

async function getStudents({
  groupId,
}: {
  groupId: number;
}): Promise<Student[]> {
  try {
    return await serverApi.get<Student[]>(`/students/group/${groupId}`);
  } catch (error) {
    console.error("No fue posible obtener los estudiantes", error);
    return [];
  }
}

export default async function MatriculasPage({
  searchParams,
}: MatriculasPageProps) {
  const selectedYear = await getSelectedYear();
  const yearId = selectedYear?.id_year ?? new Date().getFullYear();
  const params = await searchParams;
  const groupId = params.group ? Number(params.group) : null;
  console.log(yearId, "year groups" )
  const [groups, students] = await Promise.all([
    getGroups(yearId),
    groupId ? getStudents({ groupId: groupId }) : Promise.resolve([]),
  ]);
  console.log(students, "students")
  return (
    <EnrollmentMain groups={groups} students={students} selectedYear={yearId} />
  );
}
