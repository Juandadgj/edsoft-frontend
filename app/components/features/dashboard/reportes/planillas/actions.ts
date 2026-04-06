"use server";

import { revalidatePath } from "next/cache";
import serverApi from "@/app/lib/api/server-api";
import type { ActionState, SpreadsheetReportType } from "./constants";
import { DEFAULT_REVALIDATE_PATH } from "./constants";
import { AxiosError } from "axios";

const parseText = (value: FormDataEntryValue | null): string | null => {
  if (!value) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

const parseNumber = (value?: FormDataEntryValue | null): number | null => {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get("revalidatePath")) || DEFAULT_REVALIDATE_PATH;

/**
 * Genera un reporte de planilla según el tipo especificado
 * TODO: Implementar cuando el backend esté listo
 */
export async function generateSpreadsheetReportAction(
  prevState: ActionState,
  formData: {
    reportType: string;
    groupId: number;
    subjectId?: number;
    periodId?: number;
    yearId?: number;
  },
): Promise<ActionState> {
  try {
    const reportType = formData.reportType as SpreadsheetReportType;
    const groupId = Number(formData.groupId);
    const subjectId = Number(formData.subjectId);
    const periodId = Number(formData.periodId);
    const yearId = Number(formData.yearId);
    console.log(formData);
    if (!reportType) {
      throw new Error("Debe seleccionar un tipo de reporte.");
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    const report = await serverApi.get<string>(
      `/exports/spreadsheets/${reportType}`,
      {
        id_group: groupId,
        id_course: subjectId,
        period: periodId,
      },
    );

    // Por ahora retornamos un mensaje de placeholder
    return {
      success: true,
      message: "Planilla generada",
      data: { report_content: report },
    };
  } catch (error) {
    console.log(error, "ERROR");
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al generar el reporte",
    };
  }
}

/**
 * Exporta una planilla a PDF o Excel
 * TODO: Implementar cuando el backend esté listo
 */
export async function exportSpreadsheetAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const reportType = parseText(formData.get("reportType"));
    const exportFormat = parseText(formData.get("format")) as
      | "pdf"
      | "excel"
      | null;

    if (!reportType || !exportFormat) {
      throw new Error(
        "Debe especificar el tipo de reporte y formato de exportación.",
      );
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // const result = await serverApi.post('/reports/export', {
    //   type: reportType,
    //   format: exportFormat,
    // });

    return {
      success: true,
      message:
        "Funcionalidad de exportación pendiente de implementación en el backend",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al exportar el reporte",
    };
  }
}
