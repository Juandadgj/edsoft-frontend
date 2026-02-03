'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import type { ActionState, IndicatorReportType } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

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
  parseText(formData.get('revalidatePath')) || DEFAULT_REVALIDATE_PATH;

/**
 * Genera un reporte de indicadores según el tipo especificado
 * TODO: Implementar cuando el backend esté listo
 */
export async function generateIndicatorReportAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const reportType = parseText(formData.get('reportType')) as IndicatorReportType;
    const groupId = parseNumber(formData.get('groupId'));
    const periodId = parseNumber(formData.get('periodId'));
    const yearId = parseNumber(formData.get('yearId'));

    if (!reportType) {
      throw new Error('Debe seleccionar un tipo de indicador.');
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // const report = await serverApi.get('/reports/indicators', {
    //   params: {
    //     type: reportType,
    //     groupId,
    //     periodId,
    //     yearId,
    //   },
    // });

    return {
      success: true,
      message: 'Funcionalidad de indicadores pendiente de implementación en el backend',
      data: { reportType, groupId, periodId, yearId },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al generar el indicador',
    };
  }
}

/**
 * Obtiene datos de estudiantes por curso
 * TODO: Implementar cuando el backend esté listo
 */
export async function getStudentsPerCourseAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const yearId = parseNumber(formData.get('yearId'));

    // TODO: Implementar llamada al backend cuando esté disponible
    // const data = await serverApi.get('/reports/indicators/students-per-course', {
    //   params: { yearId },
    // });

    return {
      success: true,
      message: 'Funcionalidad pendiente de implementación en el backend',
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener datos',
    };
  }
}

/**
 * Obtiene datos de notas por curso
 * TODO: Implementar cuando el backend esté listo
 */
export async function getGradesPerCourseAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const yearId = parseNumber(formData.get('yearId'));
    const periodId = parseNumber(formData.get('periodId'));

    // TODO: Implementar llamada al backend cuando esté disponible
    // const data = await serverApi.get('/reports/indicators/grades-per-course', {
    //   params: { yearId, periodId },
    // });

    return {
      success: true,
      message: 'Funcionalidad pendiente de implementación en el backend',
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener datos',
    };
  }
}
