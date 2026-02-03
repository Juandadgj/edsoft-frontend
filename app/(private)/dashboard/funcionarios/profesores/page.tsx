import { TeachersList } from '@/app/components/features/dashboard/funcionarios/profesores';
import serverApi from '@/app/lib/api/server-api';
import { Teacher } from '@/app/types';

async function TeachersPage() {
  const teachers = await serverApi.get<Teacher[]>('/teachers');

  return <TeachersList teachers={teachers} />;
}

export default TeachersPage