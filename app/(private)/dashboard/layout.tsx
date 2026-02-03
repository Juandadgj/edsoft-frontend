import React from "react";
import { getSelectedYear } from "@/app/components/features/dashboard/programacion-anual/set-year";
import { getScholarYears } from "./programacion-anual/establecer-ano/page";
import ClientLayout from "@/app/components/shared/client-layout";

// Forzar renderizado dinámico porque usamos cookies para autenticación
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [year, years] = await Promise.all([
    getSelectedYear(),
    getScholarYears()
  ])
  return (
    <>
      <ClientLayout year={year} years={years}>{children}</ClientLayout>
    </>
  );
}
