// Tipos para cambio de contraseña
export type ActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/ajustes/contrasena';

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Requisitos de contraseña
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: false,
};

export const PASSWORD_REQUIREMENT_LABELS = [
  { id: 'minLength', label: 'Mínimo 8 caracteres' },
  { id: 'uppercase', label: 'Al menos una letra mayúscula' },
  { id: 'lowercase', label: 'Al menos una letra minúscula' },
  { id: 'number', label: 'Al menos un número' },
];
