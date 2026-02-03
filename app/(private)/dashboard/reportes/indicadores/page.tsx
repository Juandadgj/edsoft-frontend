import { IndicatorsList, IndicatorReport } from '@/app/components/features/dashboard/reportes/indicadores';
import { getGroups } from '../../programacion-anual/curso/page';
import { getSelectedYear } from '@/app/components/features/dashboard/programacion-anual/set-year';

interface IndicadoresPageProps {
  searchParams: Promise<{ opcion?: string }>;
}

export default async function IndicadoresPage({ searchParams }: IndicadoresPageProps) {
  const params = await searchParams;
  const optionId = params.opcion ? Number(params.opcion) : null;
  const selectedYear = await getSelectedYear();
  const yearId = selectedYear?.id_year ?? new Date().getFullYear();
  // TODO: Obtener datos reales del servidor
  const groups = await getGroups(yearId);
  const periods: Array<{ id: number; name: string }> = [];
  const years: Array<{ id: number; name: string }> = [];

  if (optionId) {
    return (
      <IndicatorReport
        optionId={optionId}
        groups={groups}
        periods={periods}
        years={years}
      />
    );
  }

  return <IndicatorsList />;
}
