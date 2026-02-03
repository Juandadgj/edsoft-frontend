'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import { Group, CreateGroupDTO, UpdateGroupDTO } from '@/app/types';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

const parseNumber = (value: FormDataEntryValue | null): number | null => {
  if (value === null) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  (formData.get('revalidatePath') as string | null)?.trim() || DEFAULT_REVALIDATE_PATH;

// Acción unificada que decide si crear o actualizar basado en id_group
export async function saveGroupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = parseNumber(formData.get('id_group'));
  if (id && id > 0) {
    return updateGroupAction(prevState, formData);
  }
  return createGroupAction(prevState, formData);
}

export async function createGroupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const idYear = parseNumber(formData.get('id_year'));
    const level = parseNumber(formData.get('level'));
    const sublevel = (formData.get('sublevel') as string | null)?.trim();
    const representative = (formData.get('representative') as string | null)?.trim();
    const workingTime = (formData.get('working_time') as string | null)?.trim();

    if (idYear === null) {
      throw new Error('Debe seleccionar un año escolar antes de crear grupos.');
    }

    if (level === null || !sublevel || !representative) {
      throw new Error('Complete todos los campos obligatorios del formulario.');
    }

    const payload: CreateGroupDTO = {
      id_year: idYear,
      level,
      sublevel,
      representative,
      working_time: workingTime || null,
    };

    const group = await serverApi.post<Group>('/groups', payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Grupo creado exitosamente',
      data: group,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error al crear el grupo',
    };
  }
}

export async function updateGroupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_group'));
    const idYear = parseNumber(formData.get('id_year'));
    const level = parseNumber(formData.get('level'));
    const sublevel = (formData.get('sublevel') as string | null)?.trim();
    const representative = (formData.get('representative') as string | null)?.trim();
    const workingTime = (formData.get('working_time') as string | null)?.trim();

    if (!id) {
      throw new Error('No se pudo determinar el grupo seleccionado.');
    }

    const payload: UpdateGroupDTO = {
      id_group: id,
      representative: representative || null,
      working_time: workingTime || null,
    };

    const group = await serverApi.put<Group>('/groups', payload);
    revalidatePath(DEFAULT_REVALIDATE_PATH);

    return {
      success: true,
      message: 'Grupo actualizado exitosamente',
      data: group,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error al actualizar el grupo',
    };
  }
}

export async function deleteGroupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get('id_group'));

    if (!id) {
      throw new Error('No se pudo determinar el grupo que desea eliminar.');
    }

    await serverApi.delete(`/groups/${id}`);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: 'Grupo eliminado exitosamente',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error al eliminar el grupo',
    };
  }
}
