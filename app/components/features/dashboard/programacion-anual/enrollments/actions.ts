"use server";

import { revalidatePath } from "next/cache";
import serverApi from "@/app/lib/api/server-api";
import {
  Enrollment,
  CreateEnrollmentDTO,
  UpdateEnrollmentDTO,
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  FilterStudentDTO,
} from "@/app/types";
import type { ActionState, StudentActionState } from "./constants";
import { DEFAULT_REVALIDATE_PATH } from "./constants";

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
  parseText(formData.get("revalidatePath")) || DEFAULT_REVALIDATE_PATH;

export async function createEnrollmentAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const idStudent = parseNumber(formData.get("id_student"));
    const idGroup = parseNumber(formData.get("id_group"));
    const year = parseNumber(formData.get("year"));
    const status = parseText(formData.get("status")) ?? "active";

    if (!idStudent || !idGroup) {
      throw new Error("Seleccione un estudiante y un grupo.");
    }

    const payload: CreateEnrollmentDTO = {
      id_student: idStudent,
      id_group: idGroup,
      year: year ?? undefined,
      status,
    };

    const enrollment = await serverApi.post<Enrollment>(
      "/enrollments",
      payload,
    );
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: "Matrícula creada correctamente",
      data: enrollment,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al crear la matrícula",
    };
  }
}

export async function updateEnrollmentAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get("id_enrollment"));
    const status = parseText(formData.get("status"));
    const reasonDesertion = parseText(formData.get("reason_desertion"));
    const dateDesertion = parseText(formData.get("date_desertion"));

    if (!id) {
      throw new Error("No se pudo identificar la matrícula.");
    }

    const payload: UpdateEnrollmentDTO = {
      id_enrollment: id,
      status: status ?? undefined,
      reason_desertion: reasonDesertion ?? undefined,
      date_desertion: dateDesertion ?? undefined,
    };

    const enrollment = await serverApi.put<Enrollment>(
      `/enrollments/${id}`,
      payload,
    );
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: "Matrícula actualizada correctamente",
      data: enrollment,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al actualizar la matrícula",
    };
  }
}

export async function removeEnrollmentAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const id = parseNumber(formData.get("id_enrollment"));

    if (!id) {
      throw new Error("No se pudo determinar la matrícula a eliminar.");
    }

    await serverApi.delete(`/enrollments/${id}`);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: "Matrícula eliminada correctamente",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al eliminar la matrícula",
    };
  }
}

// ==================== STUDENT ACTIONS ====================

// Helper para construir el payload del estudiante desde FormData
const buildStudentPayloadFromFormData = (
  formData: FormData,
): Partial<CreateStudentDTO> => ({
  // Información básica
  name: parseText(formData.get("name")) ?? undefined,
  last_name: parseText(formData.get("last_name")) ?? undefined,
  identification: parseText(formData.get("identification")) ?? undefined,
  type_id: parseText(formData.get("type_id")) ?? undefined,
  phone: parseText(formData.get("phone")) ?? undefined,
  sex: parseText(formData.get("sex")) ?? undefined,
  email: parseText(formData.get("email")) ?? undefined,
  birthday: parseText(formData.get("birthday")) ?? undefined,
  direction: parseText(formData.get("direction")) ?? undefined,
  status: parseText(formData.get("status")) ?? undefined,
  expedition_place: parseText(formData.get("expedition_place")) ?? undefined,
  birth_place: parseText(formData.get("birth_place")) ?? undefined,
  photo: parseText(formData.get("photo")) ?? undefined,
  code: parseText(formData.get("code")) ?? undefined,
  neighborhood: parseText(formData.get("neighborhood")) ?? undefined,
  zone: parseText(formData.get("zone")) ?? undefined,
  stratum: parseText(formData.get("stratum")) ?? undefined,
  sisben: parseText(formData.get("sisben")) ?? undefined,
  // Información de salud
  health_system: parseText(formData.get("health_system")) ?? undefined,
  blood_type: parseText(formData.get("blood_type")) ?? undefined,
  eps: parseText(formData.get("eps")) ?? undefined,
  exceptional_capacity:
    parseText(formData.get("exceptional_capacity")) ?? undefined,
  body_type: parseText(formData.get("body_type")) ?? undefined,
  illness: parseText(formData.get("illness")) ?? undefined,
  // Información del acudiente
  guardian: parseText(formData.get("guardian")) ?? undefined,
  guardian_identification:
    parseText(formData.get("guardian_identification")) ?? undefined,
  guardian_address: parseText(formData.get("guardian_address")) ?? undefined,
  guardian_mobile: parseText(formData.get("guardian_mobile")) ?? undefined,
  guardian_birthdate:
    parseText(formData.get("guardian_birthdate")) ?? undefined,
  // Información de la madre
  mother: parseText(formData.get("mother")) ?? undefined,
  mother_identification:
    parseText(formData.get("mother_identification")) ?? undefined,
  mother_address: parseText(formData.get("mother_address")) ?? undefined,
  mother_mobile: parseText(formData.get("mother_mobile")) ?? undefined,
  mother_birthdate: parseText(formData.get("mother_birthdate")) ?? undefined,
  mother_study: parseText(formData.get("mother_study")) ?? undefined,
  mother_profession: parseText(formData.get("mother_profession")) ?? undefined,
  // Información del padre
  father: parseText(formData.get("father")) ?? undefined,
  father_identification:
    parseText(formData.get("father_identification")) ?? undefined,
  father_address: parseText(formData.get("father_address")) ?? undefined,
  father_mobile: parseText(formData.get("father_mobile")) ?? undefined,
  father_birthdate: parseText(formData.get("father_birthdate")) ?? undefined,
  father_study: parseText(formData.get("father_study")) ?? undefined,
  father_profession: parseText(formData.get("father_profession")) ?? undefined,
  // Otro parentesco
  other_relationship:
    parseText(formData.get("other_relationship")) ?? undefined,
  other_fullname: parseText(formData.get("other_fullname")) ?? undefined,
  other_identification:
    parseText(formData.get("other_identification")) ?? undefined,
  other_address: parseText(formData.get("other_address")) ?? undefined,
  other_mobile: parseText(formData.get("other_mobile")) ?? undefined,
  other_birthdate: parseText(formData.get("other_birthdate")) ?? undefined,
  // Población víctima del conflicto
  dependent_children_beneficiary:
    parseText(formData.get("dependent_children_beneficiary")) ?? undefined,
  student_mother_head_of_family:
    parseText(formData.get("student_mother_head_of_family")) ?? undefined,
  veteran_hero_beneficiary:
    parseText(formData.get("veteran_hero_beneficiary")) ?? undefined,
  hero_nation_beneficiary:
    parseText(formData.get("hero_nation_beneficiary")) ?? undefined,
  // Situación de desplazamiento
  expulsion_department:
    parseText(formData.get("expulsion_department")) ?? undefined,
  expulsion_municipality:
    parseText(formData.get("expulsion_municipality")) ?? undefined,
  // Procedencia académica
  previous_state: parseText(formData.get("previous_state")) ?? undefined,
  previous_study_validity:
    parseText(formData.get("previous_study_validity")) ?? undefined,
  previous_educational_institution:
    parseText(formData.get("previous_educational_institution")) ?? undefined,
  previous_grade: parseText(formData.get("previous_grade")) ?? undefined,
  previous_year: parseText(formData.get("previous_year")) ?? undefined,
  previous_city: parseText(formData.get("previous_city")) ?? undefined,
  // Etnias
  afrodescendant: parseText(formData.get("afrodescendant")) ?? undefined,
  negritudes: parseText(formData.get("negritudes")) ?? undefined,
  rom: parseText(formData.get("rom")) ?? undefined,
  zenu: parseText(formData.get("zenu")) ?? undefined,
  // Discapacidades
  physical_disability:
    parseText(formData.get("physical_disability")) ?? undefined,
  hearing_disability:
    parseText(formData.get("hearing_disability")) ?? undefined,
  visual_disability: parseText(formData.get("visual_disability")) ?? undefined,
  deafblindness: parseText(formData.get("deafblindness")) ?? undefined,
  intellectual_disability:
    parseText(formData.get("intellectual_disability")) ?? undefined,
  psychosocial_disability:
    parseText(formData.get("psychosocial_disability")) ?? undefined,
  multiple_disability:
    parseText(formData.get("multiple_disability")) ?? undefined,
  // Talentos excepcionales
  technology_talent: parseText(formData.get("technology_talent")) ?? undefined,
  leadership_talent: parseText(formData.get("leadership_talent")) ?? undefined,
  natural_sciences_talent:
    parseText(formData.get("natural_sciences_talent")) ?? undefined,
  arts_talent: parseText(formData.get("arts_talent")) ?? undefined,
  physical_activity_talent:
    parseText(formData.get("physical_activity_talent")) ?? undefined,
  social_sciences_talent:
    parseText(formData.get("social_sciences_talent")) ?? undefined,
  // SIMPADE
  temporary_abandonment:
    parseText(formData.get("temporary_abandonment")) ?? undefined,
  repeating_current_year:
    parseText(formData.get("repeating_current_year")) ?? undefined,
  disciplinary_records:
    parseText(formData.get("disciplinary_records")) ?? undefined,
  average_attendance_last_year:
    parseText(formData.get("average_attendance_last_year")) ?? undefined,
});

export async function getStudentAction({
  id_student,
}: {
  id_student: number;
}): Promise<StudentActionState> {
  try {
    if (!id_student) {
      throw new Error("No se pudo identificar el estudiante.");
    }
    const student = await serverApi.get<Student>(`/students/${id_student}`);
    revalidatePath(DEFAULT_REVALIDATE_PATH);
    return {
      success: true,
      message: "Estudiante obtenido correctamente",
      data: student,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener el estudiante",
    };
  }
}

export async function createStudentAction(
  prevState: StudentActionState,
  formData: FormData,
): Promise<StudentActionState> {
  try {
    const basePayload = buildStudentPayloadFromFormData(formData);

    if (
      !basePayload.name ||
      !basePayload.last_name ||
      !basePayload.identification ||
      !basePayload.phone ||
      !basePayload.sex ||
      !basePayload.guardian
    ) {
      throw new Error(
        "Complete los campos obligatorios: nombre, apellido, identificación, teléfono, sexo y acudiente.",
      );
    }

    const payload: CreateStudentDTO = {
      ...basePayload,
      name: basePayload.name,
      last_name: basePayload.last_name,
      identification: basePayload.identification,
      type_id: basePayload.type_id ?? "RC",
      phone: basePayload.phone,
      sex: basePayload.sex,
      guardian: basePayload.guardian,
    };

    const student = await serverApi.post<Student>("/students", payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: "Estudiante creado correctamente",
      data: student,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al crear el estudiante",
    };
  }
}

export async function updateStudentAction(
  prevState: StudentActionState,
  formData: FormData,
): Promise<StudentActionState> {
  try {
    const id = parseNumber(formData.get("id_student"));

    if (!id) {
      throw new Error("No se pudo identificar el estudiante.");
    }

    const basePayload = buildStudentPayloadFromFormData(formData);
    const payload: UpdateStudentDTO = {
      id_student: id,
      ...basePayload,
    };

    const student = await serverApi.put<Student>(`/students/${id}`, payload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: "Estudiante actualizado correctamente",
      data: student,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al actualizar el estudiante",
    };
  }
}

export async function saveStudentAction(
  prevState: StudentActionState,
  formData: FormData,
): Promise<StudentActionState> {
  const id = parseNumber(formData.get("id_student"));
  if (id && id > 0) {
    return updateStudentAction(prevState, formData);
  }
  return createStudentAction(prevState, formData);
}

export async function searchStudentsAction(
  prevState: StudentActionState,
  formData: FormData,
): Promise<StudentActionState> {
  try {
    const name = parseText(formData.get("name"));
    const identification = parseText(formData.get("identification"));

    const params: Record<string, string> = {};
    if (name) params.name = name;
    if (identification) params.identification = identification;

    const students = await serverApi.get<Student[]>("/students", params);

    return {
      success: true,
      message: `Se encontraron ${students.length} estudiante(s)`,
      students,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al buscar estudiantes",
    };
  }
}

export async function createStudentWithEnrollmentAction(
  prevState: StudentActionState,
  formData: FormData,
): Promise<StudentActionState> {
  try {
    // First create the student
    const studentResult = await createStudentAction(prevState, formData);

    if (!studentResult.success || !studentResult.data?.id_student) {
      return studentResult;
    }

    // Then create the enrollment
    const idGroup = parseNumber(formData.get("id_group"));
    const year = parseNumber(formData.get("year"));

    if (!idGroup) {
      throw new Error("Seleccione un grupo para matricular al estudiante.");
    }

    const enrollmentPayload: CreateEnrollmentDTO = {
      id_student: studentResult.data.id_student,
      id_group: idGroup,
      year: year ?? new Date().getFullYear(),
      status: "active",
    };

    await serverApi.post<Enrollment>("/enrollments", enrollmentPayload);
    revalidatePath(resolveRevalidatePath(formData));

    return {
      success: true,
      message: "Estudiante creado y matriculado correctamente",
      data: studentResult.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al crear y matricular el estudiante",
    };
  }
}
