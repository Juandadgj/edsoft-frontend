import { QualificationForm } from '@/app/components/features/dashboard/proceso-anual/calificacion';

export default async function CalificacionPage() {
  // TODO: Obtener datos reales del servidor
  const yearId = 1; // Obtener del contexto o API
  const yearName = '2026'; // Obtener del contexto o API
  const groups: Array<{ id: number; name: string }> = [];

  return (
    <QualificationForm
      yearId={yearId}
      yearName={yearName}
      groups={groups}
    />
  );
}
