'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import type { ActionState, BackupFile } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

const parseText = (value: FormDataEntryValue | null): string | null => {
  if (!value) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get('revalidatePath')) || DEFAULT_REVALIDATE_PATH;

/**
 * Obtiene la lista de copias de seguridad
 * TODO: Implementar cuando el backend esté listo
 */
export async function getBackupsListAction(): Promise<ActionState> {
  try {
    // TODO: Implementar llamada al backend cuando esté disponible
    // const backups = await serverApi.get('/settings/backups');

    return {
      success: true,
      message: 'Funcionalidad pendiente de implementación en el backend',
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener copias de seguridad',
    };
  }
}

/**
 * Crea una nueva copia de seguridad
 * TODO: Implementar cuando el backend esté listo
 */
export async function createBackupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    // TODO: Implementar llamada al backend cuando esté disponible
    // const result = await serverApi.post('/settings/backups');

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Copia de seguridad creada exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'No se pudo crear la copia de seguridad. Por favor, asegúrese de que dispone de privilegios de escritura.',
    };
  }
}

/**
 * Descarga una copia de seguridad
 * TODO: Implementar cuando el backend esté listo
 */
export async function downloadBackupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const backupId = parseText(formData.get('backupId'));

    if (!backupId) {
      throw new Error('ID de backup no especificado.');
    }

    // TODO: Implementar descarga cuando el backend esté disponible
    // const downloadUrl = await serverApi.get(`/settings/backups/${backupId}/download`);

    return {
      success: true,
      message: 'Descarga iniciada (pendiente implementación backend)',
      data: { backupId },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al descargar la copia de seguridad',
    };
  }
}

/**
 * Restaura una copia de seguridad
 * TODO: Implementar cuando el backend esté listo
 */
export async function restoreBackupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const backupId = parseText(formData.get('backupId'));

    if (!backupId) {
      throw new Error('ID de backup no especificado.');
    }

    // TODO: Implementar restauración cuando el backend esté disponible
    // await serverApi.post(`/settings/backups/${backupId}/restore`);

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Copia de seguridad restaurada exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al restaurar la copia de seguridad',
    };
  }
}

/**
 * Elimina una copia de seguridad
 * TODO: Implementar cuando el backend esté listo
 */
export async function deleteBackupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const backupId = parseText(formData.get('backupId'));

    if (!backupId) {
      throw new Error('ID de backup no especificado.');
    }

    // TODO: Implementar eliminación cuando el backend esté disponible
    // await serverApi.delete(`/settings/backups/${backupId}`);

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Copia de seguridad eliminada exitosamente (pendiente implementación backend)',
      data: { backupId },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar la copia de seguridad',
    };
  }
}
