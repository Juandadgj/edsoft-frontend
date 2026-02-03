import { AreaList } from '@/app/components/features/dashboard/programacion-anual/areas';
import serverApi from '@/app/lib/api/server-api';
import { Area } from '@/app/types';

async function getAreas(): Promise<Area[]> {
  try {
    return await serverApi.get<Area[]>('/areas');
  } catch (error) {
    console.error('No fue posible obtener las áreas', error);
    return [];
  }
}

export default async function AreasPage() {
  const areas = await getAreas();
  console.log(areas)
  return <AreaList areas={areas} />;
}
