import { BestStudentsForm } from '@/app/components/features/dashboard/ajustes/mejores-estudiantes';

export default function BestStudentsPage() {
  // TODO: Obtener periodos del servidor
  const periods: Array<{ id: number; name: string }> = [];

  return <BestStudentsForm periods={periods} />;
}
