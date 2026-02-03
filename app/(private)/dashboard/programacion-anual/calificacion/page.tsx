import { QualificationTypeList } from '@/app/components/features/dashboard/programacion-anual/qualification-type';
import serverApi from '@/app/lib/api/server-api';
import { TypeQualification } from '@/app/types';

async function getQualificationTypes(): Promise<TypeQualification[]> {
  try {
    return await serverApi.get<TypeQualification[]>('/type-qualifications');
  } catch (error) {
    console.error('No fue posible obtener los tipos de calificación', error);
    return [];
  }
}

export default async function CalificacionPage() {
  const typeQualifications = await getQualificationTypes();

  return (
    <QualificationTypeList typeQualifications={typeQualifications} />
  );
}
