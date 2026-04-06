"use server";

import { revalidatePath } from "next/cache";
import serverApi from "@/app/lib/api/server-api";
import type { ActionState, ListingReportType } from "./constants";
import { DEFAULT_REVALIDATE_PATH } from "./constants";
import { AxiosError } from "axios";

const parseText = (value: FormDataEntryValue | null): string | null => {
  if (!value) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

const parseNumber = (value: FormDataEntryValue | null): number | null => {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get("revalidatePath")) || DEFAULT_REVALIDATE_PATH;

/**
 * Genera un listado según el tipo especificado
 * TODO: Implementar cuando el backend esté listo
 */
export async function generateListingReportAction(
  prevState: ActionState,
  formData: {
    reportType: string;
    groupId?: number;
    areaId?: number;
    yearId?: number;
    periodId?: number;
  },
): Promise<ActionState> {
  try {
    const { reportType, groupId, areaId, yearId } = formData;
    if (!reportType) {
      throw new Error("Debe seleccionar un tipo de listado.");
    }

    const report = await serverApi.post<{ html: string }>(
      `/exports/lists/${reportType}`,
      {
        group_id: groupId,
      },
      {}
    );
    return {
      success: true,
      message:
        "Funcionalidad de listados pendiente de implementación en el backend",
      data: { report_content: report.html },
    };
  } catch (error: any) {
    console.log(error, "Error en la generación del listado");

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al generar el listado",
    };
  }
}

/**
 * Exporta un listado a PDF
 * TODO: Implementar cuando el backend esté listo
 */
export async function exportListingPdfAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const reportType = parseText(
      formData.get("reportType"),
    ) as ListingReportType;
    const data = parseText(formData.get("data"));

    // TODO: Implementar exportación a PDF cuando esté disponible
    // const pdf = await serverApi.post('/reports/listings/export', {
    //   type: reportType,
    //   data: JSON.parse(data || '[]'),
    // });

    return {
      success: true,
      message: "Exportación de listados pendiente de implementación",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al exportar el listado",
    };
  }
}

/**
 * Exporta un listado a Excel
 * TODO: Implementar cuando el backend esté listo
 */
export async function exportListingExcelAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const reportType = parseText(
      formData.get("reportType"),
    ) as ListingReportType;
    const data = parseText(formData.get("data"));

    // TODO: Implementar exportación a Excel cuando esté disponible
    // const excel = await serverApi.post('/reports/listings/export-excel', {
    //   type: reportType,
    //   data: JSON.parse(data || '[]'),
    // });

    return {
      success: true,
      message: "Exportación a Excel pendiente de implementación",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al exportar el listado",
    };
  }
}
