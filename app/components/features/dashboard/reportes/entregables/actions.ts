"use server";

import { revalidatePath } from "next/cache";
import serverApi from "@/app/lib/api/server-api";
import type { ActionState, DeliverableReportType } from "./constants";
import { DEFAULT_REVALIDATE_PATH } from "./constants";
import { report } from "process";
import { FieldValue } from "@/app/components/shared/render-field/types";
import { sign } from "crypto";

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
 * Genera un reporte de entregable según el tipo especificado
 * TODO: Implementar cuando el backend esté listo
 */
export async function generateDeliverableReportAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const reportType = parseText(
      formData.get("reportType"),
    ) as DeliverableReportType;
    const groupId = parseNumber(formData.get("groupId"));
    const studentId = parseNumber(formData.get("studentId"));
    const periodId = parseNumber(formData.get("periodId"));
    const yearId = parseNumber(formData.get("yearId"));

    if (!reportType) {
      throw new Error("Debe seleccionar un tipo de entregable.");
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // const report = await serverApi.post('/reports/deliverable', {
    //   type: reportType,
    //   groupId,
    //   studentId,
    //   periodId,
    //   yearId,
    // });

    return {
      success: true,
      message:
        "Funcionalidad de entregables pendiente de implementación en el backend",
      data: { report_content: "" },
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al generar el entregable",
    };
  }
}
export async function generateDeriverableByOptionsAction(
  prevState: ActionState,
  formData: {
    reportType: string;
    groupId: number;
    studentId?: number;
    periodId?: number;
    report_options?: Record<string, FieldValue | any>;
  },
): Promise<ActionState> {
  try {
    const { reportType, groupId, studentId, periodId, report_options } = formData;

    // Debug profundo de signatur

    const report = await serverApi.post<{ report_content: string }>(
      `/exports/deliverables/${reportType}`,
      report_options,
      {
        id_group: groupId,
        id_student: studentId,
        id_period: periodId,
      },
    );
    return { 
      success: true,
      message:
        "Funcionalidad de entregables pendiente de implementación en el backend",
      data: { report_content: report.report_content },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al generar el reporte",
    };
  }
}

/**
 * Genera certificado de estudiante
 * TODO: Implementar cuando el backend esté listo
 */
export async function generateStudentCertificateAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const studentId = parseNumber(formData.get("studentId"));
    const yearId = parseNumber(formData.get("yearId"));

    if (!studentId) {
      throw new Error("Debe seleccionar un estudiante.");
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // const certificate = await serverApi.post('/reports/certificate', {
    //   studentId,
    //   yearId,
    // });

    return {
      success: true,
      message:
        "Funcionalidad de certificados pendiente de implementación en el backend",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al generar el certificado",
    };
  }
}

/**
 * Genera carnet estudiantil
 * TODO: Implementar cuando el backend esté listo
 */
export async function generateStudentIdCardAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const studentId = parseNumber(formData.get("studentId"));

    if (!studentId) {
      throw new Error("Debe seleccionar un estudiante.");
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // const card = await serverApi.post('/reports/id-card', {
    //   studentId,
    // });

    return {
      success: true,
      message:
        "Funcionalidad de carnet pendiente de implementación en el backend",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al generar el carnet",
    };
  }
}

/**
 * Exporta un entregable a PDF
 * TODO: Implementar cuando el backend esté listo
 */
export async function exportDeliverablePdfAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const reportType = parseText(formData.get("reportType"));
    const reportId = parseNumber(formData.get("reportId"));

    if (!reportType) {
      throw new Error("Debe especificar el tipo de entregable.");
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // const result = await serverApi.post('/reports/export-pdf', {
    //   type: reportType,
    //   reportId,
    // });

    return {
      success: true,
      message:
        "Funcionalidad de exportación PDF pendiente de implementación en el backend",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al exportar PDF",
    };
  }
}
