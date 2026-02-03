import { getSelectedYear } from "@/app/components/features/dashboard/programacion-anual/set-year";
import {
  ListingsList,
  ListingReport,
} from "@/app/components/features/dashboard/reportes/listados";
import { getGroups } from "../../programacion-anual/curso/page";

interface ListadosPageProps {
  searchParams: Promise<{ opcion?: string }>;
}

export default async function ListadosPage({
  searchParams,
}: ListadosPageProps) {
  const params = await searchParams;
  const selectedYear = await getSelectedYear();

  const yearId = selectedYear?.id_year ?? new Date().getFullYear();
  const optionId = params.opcion ? Number(params.opcion) : null;

  // TODO: Obtener datos reales del servidor
  const areas: Array<{ id: number; name: string }> = [];
  const years: Array<{ id: number; name: string }> = [];
  const groups = await getGroups(yearId);

  if (optionId) {
    return (
      <ListingReport
        optionId={optionId}
        groups={groups}
        areas={areas}
        years={years}
      />
    );
  }

  return <ListingsList />;
}
