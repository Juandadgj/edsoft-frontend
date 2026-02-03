'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import type { ActionState, Course, Achievement, StudentQualification, QualificationUpdate } from './constants';
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

/**
 * Obtiene los cursos de un grupo
 */
export async function getCoursesAction(groupId: number): Promise<ActionState> {
  try {
    const response = await serverApi.get(`/courses?id_group=${groupId}`) as { data: unknown };
    
    return {
      success: true,
      message: 'Cursos obtenidos exitosamente',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener los cursos',
    };
  }
}

/**
 * Obtiene los logros de un curso por periodo
 */
export async function getAchievementsAction(
  courseId: number, 
  period: number
): Promise<ActionState> {
  try {
    const response = await serverApi.get(`/achievements?id_course=${courseId}&period=${period}`) as { data: unknown };
    
    return {
      success: true,
      message: 'Logros obtenidos exitosamente',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener los logros',
    };
  }
}

/**
 * Obtiene las calificaciones de estudiantes para un curso y periodo
 */
export async function getQualificationsAction(
  courseId: number, 
  period: number
): Promise<ActionState> {
  try {
    const response = await serverApi.get(`/achievements/qualifications?id_course=${courseId}&period=${period}`) as { data: unknown };
    
    return {
      success: true,
      message: 'Calificaciones obtenidas exitosamente',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener las calificaciones',
    };
  }
}

/**
 * Actualiza las calificaciones de estudiantes
 */
export async function updateQualificationsAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const qualificationsJson = parseText(formData.get('qualifications'));
    
    if (!qualificationsJson) {
      throw new Error('No hay calificaciones para actualizar.');
    }

    const qualifications: QualificationUpdate[] = JSON.parse(qualificationsJson);

    if (qualifications.length === 0) {
      throw new Error('No hay calificaciones para actualizar.');
    }

    // Validar que todas las calificaciones tengan valores válidos
    for (const q of qualifications) {
      if (q.score < 0 || q.score > 5) {
        throw new Error('Las calificaciones deben estar entre 0 y 5.');
      }
    }

    const response = await serverApi.put('/achievements/qualifications', {
      qualifications,
    }) as { data: unknown };

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Calificaciones actualizadas exitosamente',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar las calificaciones',
    };
  }
}
