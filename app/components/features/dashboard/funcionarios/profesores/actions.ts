'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import { Teacher, CreateTeacherDTO, UpdateTeacherDTO } from '@/app/types';

export type ActionState = {
  success: boolean;
  message: string;
  data?: Teacher;
};

// Acción unificada que decide si crear o actualizar basado en id_teacher
export async function saveTeacherAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = Number(formData.get('id_teacher'));
  if (id && id > 0) {
    return updateTeacherAction(prevState, formData);
  }
  return createTeacherAction(prevState, formData);
}

export async function createTeacherAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const input: CreateTeacherDTO = {
      name: formData.get('name') as string,
      last_name: formData.get('last_name') as string,
      identification: formData.get('identification') as string,
      type_id: Number(formData.get('type_id')) || 1,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || null,
      degree: (formData.get('degree') as string) || null,
      direction: (formData.get('direction') as string) || null,
    };

    const teacher = await serverApi.post<Teacher>('/teachers', input);
    
    revalidatePath('/dashboard/funcionarios/profesores');
    
    return { success: true, message: 'Docente creado exitosamente', data: teacher };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error al crear docente' 
    };
  }
}

export async function updateTeacherAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = Number(formData.get('id_teacher'));
    
    const input: UpdateTeacherDTO = {
      id_teacher: id,
      name: (formData.get('name') as string) || null,
      last_name: (formData.get('last_name') as string) || null,
      identification: (formData.get('identification') as string) || null,
      type_id: Number(formData.get('type_id')) || null,
      phone: (formData.get('phone') as string) || null,
      email: (formData.get('email') as string) || null,
      degree: (formData.get('degree') as string) || null,
      direction: (formData.get('direction') as string) || null,
    };

    const teacher = await serverApi.put<Teacher>(`/teachers`, input);
    
    revalidatePath('/dashboard/funcionarios/profesores');
    
    return { success: true, message: 'Docente actualizado exitosamente', data: teacher };
  } catch (error) {
    console.log(error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error al actualizar docente' 
    };
  }
}

export async function deleteTeacherAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = Number(formData.get('id_teacher'));
    
    await serverApi.delete(`/teachers/${id}`);
    
    revalidatePath('/dashboard/funcionarios/profesores');
    
    return { success: true, message: 'Docente eliminado exitosamente' };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error al eliminar docente' 
    };
  }
}
