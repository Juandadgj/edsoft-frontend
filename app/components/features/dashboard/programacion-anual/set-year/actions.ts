"use server";

import { revalidatePath } from "next/cache";
import serverApi from "@/app/lib/api/server-api";
import {
  ScholarYear,
  CreateScholarYearDTO,
  UpdateScholarYearDTO,
} from "@/app/types";
import type { ActionState } from "./constants";
import { DEFAULT_REVALIDATE_PATH, EXTRA_REVALIDATIONS } from "./constants";

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get("revalidatePath")) || DEFAULT_REVALIDATE_PATH;

const revalidateTargets = (path: string) => {
  revalidatePath(path);
  EXTRA_REVALIDATIONS.forEach((target) => revalidatePath(target));
};

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

// Acción unificada que decide si crear o actualizar basado en mode
export async function saveScholarYearAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const mode = formData.get("mode");
  if (mode === "edit") {
    return updateScholarYearAction(prevState, formData);
  }
  return createScholarYearAction(prevState, formData);
}

export async function createScholarYearAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const idYear = parseNumber(formData.get("id_year"));
    const rector = parseText(formData.get("rector"));
    const secretary = parseText(formData.get("secretary"));
    const comment = parseText(formData.get("comment"));

    if (!idYear || !rector || !secretary) {
      throw new Error("Complete todos los campos obligatorios.");
    }

    const payload: CreateScholarYearDTO = {
      id_year: idYear,
      rector,
      secretary,
      comment: comment ?? null,
    };

    const scholarYear = await serverApi.post<ScholarYear>(
      "/scholar-years",
      payload,
    );
    revalidateTargets(resolveRevalidatePath(formData));

    return {
      success: true,
      message: "Año académico creado correctamente",
      data: scholarYear,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al crear el año académico",
    };
  }
}

export async function updateScholarYearAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const idYear = parseNumber(formData.get("id_year"));
    const rector = parseText(formData.get("rector"));
    const secretary = parseText(formData.get("secretary"));
    const comment = parseText(formData.get("comment"));

    if (!idYear) {
      throw new Error("No se pudo identificar el año seleccionado.");
    }

    const payload: UpdateScholarYearDTO = {
      id_year: idYear,
      rector,
      secretary,
      comment: comment ?? null,
    };

    const scholarYear = await serverApi.put<ScholarYear>(
      "/scholar-years",
      payload,
    );
    revalidateTargets(resolveRevalidatePath(formData));

    return {
      success: true,
      message: "Año académico actualizado correctamente",
      data: scholarYear,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al actualizar el año académico",
    };
  }
}

export async function getSelectedYear(): Promise<ScholarYear | null> {
  try {
    return await serverApi.get<ScholarYear>("/scholar-years/selected");
  } catch {
    return null;
  }
}

export async function selectScholarYearAction(
  year: number,
): Promise<ScholarYear | undefined | null> {
  const idYear = year;

  if (!idYear) {
    throw new Error("No se pudo determinar el año a seleccionar.");
  }
  try {
    const year = await serverApi.put<ScholarYear>(`/scholar-years/${idYear}/select`, {});
    revalidatePath(DEFAULT_REVALIDATE_PATH);
    return year
  } catch (error) {
    console.log(error);
    return null
  }
}
