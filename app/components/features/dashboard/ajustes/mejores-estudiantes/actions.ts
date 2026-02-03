'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import type { ActionState, BestStudentsSettings, BestStudent } from './constants';
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
 * Obtiene la lista de mejores estudiantes
 * TODO: Implementar cuando el backend esté listo
 */
export async function getBestStudentsAction(): Promise<ActionState> {
  try {
    // TODO: Implementar llamada al backend cuando esté disponible
    // const students = await serverApi.get('/settings/best-students');

    return {
      success: true,
      message: 'Funcionalidad pendiente de implementación en el backend',
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener mejores estudiantes',
    };
  }
}

/**
 * Obtiene la configuración de mejores estudiantes
 * TODO: Implementar cuando el backend esté listo
 */
export async function getBestStudentsSettingsAction(): Promise<ActionState> {
  try {
    // TODO: Implementar llamada al backend cuando esté disponible
    // const settings = await serverApi.get('/settings/best-students/config');

    return {
      success: true,
      message: 'Funcionalidad pendiente de implementación en el backend',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener configuración',
    };
  }
}

/**
 * Actualiza la configuración de mejores estudiantes
 * TODO: Implementar cuando el backend esté listo
 */
export async function updateBestStudentsSettingsAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const showInPortal = formData.get('showInPortal') === 'true';
    const maxStudents = parseNumber(formData.get('maxStudents'));
    const minimumAverage = parseNumber(formData.get('minimumAverage'));

    if (!maxStudents || maxStudents < 1 || maxStudents > 50) {
      throw new Error('El número máximo de estudiantes debe ser entre 1 y 50.');
    }

    if (!minimumAverage || minimumAverage < 0 || minimumAverage > 5) {
      throw new Error('El promedio mínimo debe ser entre 0 y 5.');
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.put('/settings/best-students/config', {
    //   showInPortal,
    //   maxStudents,
    //   minimumAverage,
    // });

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Configuración actualizada exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar configuración',
    };
  }
}

/**
 * Recalcula los mejores estudiantes
 * TODO: Implementar cuando el backend esté listo
 */
export async function recalculateBestStudentsAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const periodId = parseNumber(formData.get('periodId'));

    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.post('/settings/best-students/recalculate', { periodId });

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Mejores estudiantes recalculados exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al recalcular',
    };
  }
}
