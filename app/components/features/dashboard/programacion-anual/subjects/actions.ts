'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import { Course, CreateCourseDTO, UpdateCourseDTO } from '@/app/types';
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

// Acción unificada que decide si crear o actualizar basado en id_course
export async function saveSubjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = parseNumber(formData.get('id_course'));
  if (id && id > 0) {
    return updateSubjectAction(prevState, formData);
  }
  return createSubjectAction(prevState, formData);
}

export async function createSubjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const name = parseText(formData.get('name'));
    const idGroup = parseNumber(formData.get('id_group'));
    const idArea = parseNumber(formData.get('id_area'));
    const idTeacher = parseNumber(formData.get('id_teacher'));
    const hour = parseNumber(formData.get('hour'));
    const percentage = parseNumber(formData.get('percentage'));
    const average = parseText(formData.get('average'));

    if (!name || !idGroup || !idArea || !idTeacher || hour === null) {
      throw new Error('Complete todos los campos obligatorios.');
    }

    const payload: CreateCourseDTO = {
      name,
      id_group: idGroup,
      id_area: idArea,
      id_teacher: idTeacher,
      hour,
      percentage: percentage ?? undefined,
      average: average ?? undefined,
    };

    const course = await serverApi.post<Course>('/courses', payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Asignatura creada correctamente',
      data: course,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear la asignatura',
    };
  }
}

export async function updateSubjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_course'));
    const name = parseText(formData.get('name'));
    const idGroup = parseNumber(formData.get('id_group'));
    const idArea = parseNumber(formData.get('id_area'));
    const idTeacher = parseNumber(formData.get('id_teacher'));
    const hour = parseNumber(formData.get('hour'));
    const percentage = parseNumber(formData.get('percentage'));
    const average = parseText(formData.get('average'));

    if (!id) {
      throw new Error('No se pudo identificar la asignatura.');
    }

    if (!name || hour === null) {
      throw new Error('Complete todos los campos obligatorios.');
    }

    const payload: UpdateCourseDTO = {
      id_course: id,
      name,
      id_group: idGroup ?? undefined,
      id_area: idArea ?? undefined,
      id_teacher: idTeacher ?? undefined,
      hour,
      percentage: percentage ?? undefined,
      average: average ?? undefined,
    };

    const course = await serverApi.put<Course>(`/courses`, payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Asignatura actualizada correctamente',
      data: course,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar la asignatura',
    };
  }
}

export async function deleteSubjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_course'));

    if (!id) {
      throw new Error('No se pudo determinar la asignatura a eliminar.');
    }

    await serverApi.delete(`/courses/${id}`);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Asignatura eliminada correctamente',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar la asignatura',
    };
  }
}
