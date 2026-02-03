'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import { Achievement, CreateAchievementDTO, UpdateAchievementDTO } from '@/app/types';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

const parseNumber = (value: FormDataEntryValue | null): number | null => {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const parseText = (value: FormDataEntryValue | null): string | null => {
  if (!value) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get('revalidatePath')) || DEFAULT_REVALIDATE_PATH;

// Acción unificada que decide si crear o actualizar basado en id_achievement
export async function saveAchievementAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = parseNumber(formData.get('id_achievement'));
  
  if (id) {
    return updateAchievementAction(prevState, formData);
  }
  return createAchievementAction(prevState, formData);
}

export async function createAchievementAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    console.log("create");
    const description = parseText(formData.get('description'));
    const idCourse = parseNumber(formData.get('id_course'));
    const period = parseNumber(formData.get('period'));

    if (!description || !idCourse || !period) {
      throw new Error('Complete todos los campos obligatorios.');
    }

    const payload: CreateAchievementDTO = {
      description,
      id_course: idCourse,
      period,
    };

    const achievement = await serverApi.post<Achievement>('/achievements', payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Logro creado correctamente',
      data: achievement,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear el logro',
    };
  }
}

export async function updateAchievementAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_achievement'));
    const description = parseText(formData.get('description'));
    const idCourse = parseNumber(formData.get('id_course'));
    const period = parseNumber(formData.get('period'));
    console.log("update", id);

    if (!id) {
      throw new Error('No se pudo identificar el logro.');
    }
    if (!description) {
      throw new Error('La descripción es obligatoria.');
    }

    const payload: UpdateAchievementDTO = {
      id_achievement: id,
      description,
      id_course: idCourse ?? undefined,
      period: period ?? undefined,
    };

    const achievement = await serverApi.put<Achievement>(`/achievements`, payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Logro actualizado correctamente',
      data: achievement,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar el logro',
    };
  }
}

export async function deleteAchievementAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_achievement'));

    if (!id) {
      throw new Error('No se pudo determinar el logro a eliminar.');
    }

    await serverApi.delete(`/achievements/${id}`);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Logro eliminado correctamente',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar el logro',
    };
  }
}
