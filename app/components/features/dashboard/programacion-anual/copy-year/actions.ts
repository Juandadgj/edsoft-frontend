'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

const resolveRevalidatePath = (formData: FormData) =>
  (formData.get('revalidatePath') as string | null)?.trim() || DEFAULT_REVALIDATE_PATH;

const revalidateTargets = (path: string) => {
  revalidatePath(path);
  revalidatePath('/dashboard/programacion-anual/asignaturas');
  revalidatePath('/dashboard/programacion-anual/logros');
};

export interface CopyYearOptions {
  copySubjects: boolean;
  copyRecommendations: boolean;
  copyAchievements: boolean;
  copyIndicators: boolean;
}

export async function copyYearAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const copySubjects = formData.get('copySubjects') === 'on';
    const copyRecommendations = formData.get('copyRecommendations') === 'on';
    const copyAchievements = formData.get('copyAchievements') === 'on';
    const copyIndicators = formData.get('copyIndicators') === 'on';

    if (!copySubjects && !copyRecommendations && !copyAchievements && !copyIndicators) {
      throw new Error('Seleccione al menos una opción para copiar.');
    }

    const payload: CopyYearOptions = {
      copySubjects,
      copyRecommendations,
      copyAchievements,
      copyIndicators,
    };

    await serverApi.post('/scholar-years/copy', payload);
    revalidateTargets(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Configuración del año anterior copiada correctamente',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al copiar la configuración',
    };
  }
}
