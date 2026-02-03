'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import { Area, CreateAreaDTO, UpdateAreaDTO } from '@/app/types';
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

// Acción unificada que decide si crear o actualizar basado en id_area
export async function saveAreaAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = parseNumber(formData.get('id_area'));
  if (id && id > 0) {
    return updateAreaAction(prevState, formData);
  }
  return createAreaAction(prevState, formData);
}

export async function createAreaAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const name = parseText(formData.get('name'));
    const status = parseText(formData.get('status')) ?? 'active';

    if (!name) {
      throw new Error('El nombre del área es obligatorio.');
    }

    const payload: CreateAreaDTO = { name, status };
    const area = await serverApi.post<Area>('/areas', payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Área creada correctamente',
      data: area,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear el área',
    };
  }
}

export async function updateAreaAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_area'));
    const name = parseText(formData.get('name'));
    const status = parseText(formData.get('status'));
    console.log(status)
    if (!id) {
      throw new Error('No se pudo identificar el área.');
    }

    if (!name) {
      throw new Error('El nombre del área es obligatorio.');
    }

    const payload: UpdateAreaDTO = { id_area: id, name, status };
    const area = await serverApi.put<Area>(`/areas`, payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Área actualizada correctamente',
      data: area,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar el área',
    };
  }
}

export async function deleteAreaAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_area'));

    if (!id) {
      throw new Error('No se pudo determinar el área a eliminar.');
    }

    await serverApi.delete(`/areas/${id}`);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Área eliminada correctamente',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar el área',
    };
  }
}
