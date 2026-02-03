'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import type { ActionState, SettingsSection, SettingItem } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

const parseText = (value: FormDataEntryValue | null): string | null => {
  if (!value) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get('revalidatePath')) || DEFAULT_REVALIDATE_PATH;

/**
 * Obtiene la configuración actual de datos predeterminados
 * TODO: Implementar cuando el backend esté listo
 */
export async function getDefaultDataSettingsAction(): Promise<ActionState> {
  try {
    // TODO: Implementar llamada al backend cuando esté disponible
    // const settings = await serverApi.get('/settings/default-data');

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
 * Actualiza una configuración individual
 * TODO: Implementar cuando el backend esté listo
 */
export async function updateSettingItemAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const sectionId = parseText(formData.get('sectionId'));
    const itemId = parseText(formData.get('itemId'));
    const checked = formData.get('checked') === 'true';

    if (!sectionId || !itemId) {
      throw new Error('Faltan datos requeridos.');
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.put('/settings/default-data/item', {
    //   sectionId,
    //   itemId,
    //   checked,
    // });

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Configuración actualizada (pendiente implementación backend)',
      data: { sectionId, itemId, checked },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar configuración',
    };
  }
}

/**
 * Actualiza múltiples configuraciones de una sección
 * TODO: Implementar cuando el backend esté listo
 */
export async function updateSettingsSectionAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const sectionId = parseText(formData.get('sectionId'));
    const itemsJson = parseText(formData.get('items'));

    if (!sectionId || !itemsJson) {
      throw new Error('Faltan datos requeridos.');
    }

    const items: SettingItem[] = JSON.parse(itemsJson);

    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.put('/settings/default-data/section', {
    //   sectionId,
    //   items,
    // });

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Sección actualizada exitosamente (pendiente implementación backend)',
      data: { sectionId, itemsCount: items.length },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar sección',
    };
  }
}

/**
 * Guarda todas las configuraciones
 * TODO: Implementar cuando el backend esté listo
 */
export async function saveAllSettingsAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const sectionsJson = parseText(formData.get('sections'));

    if (!sectionsJson) {
      throw new Error('No hay configuraciones para guardar.');
    }

    const sections: SettingsSection[] = JSON.parse(sectionsJson);

    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.put('/settings/default-data', { sections });

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Todas las configuraciones guardadas exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al guardar configuraciones',
    };
  }
}

/**
 * Reinicia las encuestas de la plataforma
 * TODO: Implementar cuando el backend esté listo
 */
export async function resetSurveyVotesAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.post('/settings/reset-survey-votes');

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Votaciones reiniciadas exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al reiniciar votaciones',
    };
  }
}
