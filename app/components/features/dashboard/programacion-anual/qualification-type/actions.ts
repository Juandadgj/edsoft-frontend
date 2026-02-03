'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import {
  TypeQualification,
  CreateTypeQualificationDTO,
  UpdateTypeQualificationDTO,
} from '@/app/types';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

const parseNumber = (value: FormDataEntryValue | null): number | null => {
  if (value === null) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const parseText = (value: FormDataEntryValue | null): string | null => {
  if (!value) {
    return null;
  }

  const text = String(value).trim();
  return text.length ? text : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get('revalidatePath')) || DEFAULT_REVALIDATE_PATH;

// Acción unificada que decide si crear o actualizar basado en id_type_qual
export async function saveQualificationTypeAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = parseNumber(formData.get('id_type_qual'));
  if (id && id > 0) {
    return updateQualificationTypeAction(prevState, formData);
  }
  return createQualificationTypeAction(prevState, formData);
}

export async function createQualificationTypeAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const name = parseText(formData.get('name'));
    const floor = parseNumber(formData.get('floor_score'));
    const ceiling = parseNumber(formData.get('ceiling_score'));
    const year = parseNumber(formData.get('year'));

    if (!name || floor === null || ceiling === null) {
      throw new Error('Complete los campos obligatorios.');
    }

    const payload: CreateTypeQualificationDTO = {
      name,
      floor_score: floor,
      ceiling_score: ceiling,
      year: year ?? null,
    };

    const typeQualification = await serverApi.post<TypeQualification>(
      '/type-qualifications',
      payload
    );

    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Tipo de calificación creado correctamente',
      data: typeQualification,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error al crear el tipo de calificación',
    };
  }
}

export async function updateQualificationTypeAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_type_qual'));
    const name = parseText(formData.get('name'));
    const floor = parseNumber(formData.get('floor_score'));
    const ceiling = parseNumber(formData.get('ceiling_score'));
    const year = parseNumber(formData.get('year'));

    if (!id) {
      throw new Error('No se pudo identificar el tipo de calificación.');
    }

    if (!name || floor === null || ceiling === null) {
      throw new Error('Complete los campos obligatorios.');
    }

    const payload: UpdateTypeQualificationDTO = {
      id_type_qual: id,
      name,
      floor_score: floor,
      ceiling_score: ceiling,
      year: year ?? null,
    };

    const typeQualification = await serverApi.put<TypeQualification>(
      `/type-qualifications`,
      payload
    );

    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Tipo de calificación actualizado',
      data: typeQualification,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error al actualizar el tipo de calificación',
    };
  }
}

export async function deleteQualificationTypeAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_type_qual'));

    if (!id) {
      throw new Error('No se pudo determinar el registro a eliminar.');
    }

    await serverApi.delete(`/type-qualifications/${id}`);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Tipo de calificación eliminado',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error al eliminar el tipo de calificación',
    };
  }
}
