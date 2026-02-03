import { SetYearList } from '@/app/components/features/dashboard/programacion-anual/set-year';
import serverApi from '@/app/lib/api/server-api';
import { ScholarYear } from '@/app/types';

export async function getScholarYears(): Promise<ScholarYear[]> {
  try {
    return await serverApi.get<ScholarYear[]>('/scholar-years');
  } catch (error) {
    console.error('No fue posible obtener el listado de años escolares', error);
    return [];
  }
}

async function getSelectedYear(): Promise<ScholarYear | null> {
  try {
    return await serverApi.get<ScholarYear>('/scholar-years/selected');
  } catch (error) {
    console.warn('No hay un año escolar seleccionado actualmente');
    return null;
  }
}

export default async function EstablecerAnoPage() {
  const [scholarYears, selectedYear] = await Promise.all([
    getScholarYears(),
    getSelectedYear(),
  ]);

  return (
    <SetYearList
      scholarYears={scholarYears}
      selectedYearId={selectedYear?.id_year ?? null}
    />
  );
}
