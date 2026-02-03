import { StudentList } from "@/app/components/features/dashboard/student/student-list";
import serverApi from "@/app/lib/api/server-api";
import { Student } from "@/app/types";

interface StudentPageProps {
  params: Promise<{
    id: string;
  }>;
}
const getStundent = async (id: number) => {
  try {
    const student = await serverApi.get<Student>(`/students/${id}`);
    return student;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function StudentPage({ params }: StudentPageProps) {
  const { id } = await params;
  const student = await getStundent(Number(id));
  if (!student) {
    return <div>No se encontró el estudiante</div>;
  }
  console.log(student.groups ? student.groups[0]?.courses ? student.groups[0]?.courses[0] : null : null);
  return <StudentList student={student} />;
}
