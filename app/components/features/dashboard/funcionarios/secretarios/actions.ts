"use server";

import { revalidatePath } from "next/cache";
import serverApi from "@/app/lib/api/server-api";
import { Teacher, CreateTeacherDTO, UpdateTeacherDTO } from "@/app/types";

export type SecretaryActionState = {
  success: boolean;
  message: string;
  data?: Teacher;
};

const SECRETARY_PATH = "/dashboard/funcionarios/secretarios";
const SECRETARY_TYPE_ID = 2;

const ensureSecretaryPayload = <T extends Partial<CreateTeacherDTO | UpdateTeacherDTO>>(payload: T): T => {
  return {
    type_id: SECRETARY_TYPE_ID,
    ...payload,
  } as T;
};

// Acción unificada que decide si crear o actualizar basado en id_teacher
export async function saveSecretaryAction(
  prevState: SecretaryActionState,
  formData: FormData
): Promise<SecretaryActionState> {
  const id = Number(formData.get('id_teacher'));
  if (id && id > 0) {
    return updateSecretaryAction(prevState, formData);
  }
  return createSecretaryAction(prevState, formData);
}

export async function createSecretaryAction(
  _prevState: SecretaryActionState,
  formData: FormData
): Promise<SecretaryActionState> {
  try {
    const input: CreateTeacherDTO = ensureSecretaryPayload({
      name: formData.get("name") as string,
      last_name: formData.get("last_name") as string,
      identification: formData.get("identification") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || null,
      degree: (formData.get("degree") as string) || null,
      direction: (formData.get("direction") as string) || null,
      type_id: SECRETARY_TYPE_ID,
    });

    const secretary = await serverApi.post<Teacher>("/teachers", input);

    revalidatePath(SECRETARY_PATH);
    return { success: true, message: "Secretario creado", data: secretary };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al crear secretario",
    };
  }
}

export async function updateSecretaryAction(
  _prevState: SecretaryActionState,
  formData: FormData
): Promise<SecretaryActionState> {
  try {
    const id = Number(formData.get("id_teacher"));

    const input: UpdateTeacherDTO = ensureSecretaryPayload({
      id_teacher: id,
      name: (formData.get("name") as string) || null,
      last_name: (formData.get("last_name") as string) || null,
      identification: (formData.get("identification") as string) || null,
      phone: (formData.get("phone") as string) || null,
      email: (formData.get("email") as string) || null,
      degree: (formData.get("degree") as string) || null,
      direction: (formData.get("direction") as string) || null,
      type_id: SECRETARY_TYPE_ID,
    });

    const secretary = await serverApi.put<Teacher>(`/teachers/${id}`, input);

    revalidatePath(SECRETARY_PATH);
    return { success: true, message: "Secretario actualizado", data: secretary };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al actualizar secretario",
    };
  }
}

export async function deleteSecretaryAction(
  _prevState: SecretaryActionState,
  formData: FormData
): Promise<SecretaryActionState> {
  try {
    const id = Number(formData.get("id_teacher"));

    await serverApi.delete(`/teachers/${id}`);

    revalidatePath(SECRETARY_PATH);
    return { success: true, message: "Secretario eliminado" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al eliminar secretario",
    };
  }
}
