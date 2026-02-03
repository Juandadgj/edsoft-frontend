// Tipos para copias de seguridad
export type ActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/ajustes/copia-seguridad';

export type BackupStatus = 'success' | 'error' | 'pending';

export interface BackupFile {
  id: string;
  name: string;
  date: string;
  size: string;
  status: BackupStatus;
}
