'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import type { ActionState, LogoBannerSettings } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

const parseText = (value: FormDataEntryValue | null): string | null => {
  if (!value) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get('revalidatePath')) || DEFAULT_REVALIDATE_PATH;

/**
 * Obtiene la configuración actual de logo y banner
 * TODO: Implementar cuando el backend esté listo
 */
export async function getLogoBannerSettingsAction(): Promise<ActionState> {
  try {
    // TODO: Implementar llamada al backend cuando esté disponible
    // const settings = await serverApi.get('/settings/logo-banner');

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
 * Actualiza el logo de la institución
 * TODO: Implementar cuando el backend esté listo
 */
export async function updateLogoAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const logoFile = formData.get('logo') as File | null;

    if (!logoFile || logoFile.size === 0) {
      throw new Error('Debe seleccionar un archivo de imagen.');
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(logoFile.type)) {
      throw new Error('El archivo debe ser una imagen (JPEG, PNG, GIF o WebP).');
    }

    // Validar tamaño (max 5MB)
    if (logoFile.size > 5 * 1024 * 1024) {
      throw new Error('El archivo no debe superar los 5MB.');
    }

    // TODO: Implementar subida al backend cuando esté disponible
    // const formDataToSend = new FormData();
    // formDataToSend.append('logo', logoFile);
    // const result = await serverApi.post('/settings/logo', formDataToSend);

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Logo actualizado exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar el logo',
    };
  }
}

/**
 * Elimina el logo de la institución
 * TODO: Implementar cuando el backend esté listo
 */
export async function removeLogoAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.delete('/settings/logo');

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Logo eliminado exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar el logo',
    };
  }
}

/**
 * Actualiza el texto del banner
 * TODO: Implementar cuando el backend esté listo
 */
export async function updateBannerAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const bannerText = parseText(formData.get('bannerText'));

    if (!bannerText) {
      throw new Error('El texto del banner no puede estar vacío.');
    }

    if (bannerText.length > 500) {
      throw new Error('El texto del banner no puede superar los 500 caracteres.');
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.put('/settings/banner', { text: bannerText });

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Banner actualizado exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar el banner',
    };
  }
}
