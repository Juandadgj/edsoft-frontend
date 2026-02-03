'use server';

import { revalidatePath } from 'next/cache';
import serverApi from '@/app/lib/api/server-api';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH, PASSWORD_REQUIREMENTS } from './constants';

const parseText = (value: FormDataEntryValue | null): string | null => {
  if (!value) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

const resolveRevalidatePath = (formData: FormData) =>
  parseText(formData.get('revalidatePath')) || DEFAULT_REVALIDATE_PATH;

/**
 * Valida que la contraseña cumpla con los requisitos
 */
function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`La contraseña debe tener al menos ${PASSWORD_REQUIREMENTS.minLength} caracteres.`);
  }

  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula.');
  }

  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula.');
  }

  if (PASSWORD_REQUIREMENTS.requireNumber && !/\d/.test(password)) {
    errors.push('La contraseña debe contener al menos un número.');
  }

  if (PASSWORD_REQUIREMENTS.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('La contraseña debe contener al menos un carácter especial.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Cambia la contraseña del usuario
 * TODO: Implementar cuando el backend esté listo
 */
export async function changePasswordAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const currentPassword = parseText(formData.get('currentPassword'));
    const newPassword = parseText(formData.get('newPassword'));
    const confirmPassword = parseText(formData.get('confirmPassword'));

    // Validaciones básicas
    if (!currentPassword) {
      throw new Error('Debe ingresar su contraseña actual.');
    }

    if (!newPassword) {
      throw new Error('Debe ingresar una nueva contraseña.');
    }

    if (!confirmPassword) {
      throw new Error('Debe confirmar la nueva contraseña.');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden.');
    }

    if (currentPassword === newPassword) {
      throw new Error('La nueva contraseña debe ser diferente a la actual.');
    }

    // Validar requisitos de contraseña
    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      throw new Error(validation.errors.join(' '));
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.put('/auth/change-password', {
    //   currentPassword,
    //   newPassword,
    // });

    const path = resolveRevalidatePath(formData);
    revalidatePath(path);

    return {
      success: true,
      message: 'Contraseña cambiada exitosamente (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al cambiar la contraseña',
    };
  }
}

/**
 * Solicita restablecimiento de contraseña
 * TODO: Implementar cuando el backend esté listo
 */
export async function requestPasswordResetAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = parseText(formData.get('email'));

    if (!email) {
      throw new Error('Debe ingresar un correo electrónico.');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('El formato del correo electrónico no es válido.');
    }

    // TODO: Implementar llamada al backend cuando esté disponible
    // await serverApi.post('/auth/request-password-reset', { email });

    return {
      success: true,
      message: 'Se ha enviado un correo con instrucciones para restablecer tu contraseña (pendiente implementación backend)',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al solicitar restablecimiento',
    };
  }
}
