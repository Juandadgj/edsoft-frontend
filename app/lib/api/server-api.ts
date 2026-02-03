import 'server-only';

import { api, apiRequest, RequestOptions } from './api-client';
import { verifySession } from '../dal';

export type { RequestOptions, ApiError } from './api-client';

/**
 * Cliente API autenticado para Server Components
 * Obtiene automáticamente el token de la sesión
 */
export async function serverApiRequest<T>(
  endpoint: string,
  options: Omit<RequestOptions, 'token'> = {}
): Promise<T> {
  const session = await verifySession();
  
  return apiRequest<T>(endpoint, {
    ...options,
    token: session.token as string || undefined,
  });
}

/**
 * API autenticada para Server Components
 * Métodos de conveniencia con token automático
 */
export const serverApi = {
  get: async <T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
    options?: Omit<RequestOptions, 'method' | 'params' | 'body' | 'token'>
  ) => {
    const session = await verifySession();
    return api.get<T>(endpoint, params, { ...options, token: session.token as string || undefined });
  },

  post: async <T>(
    endpoint: string, 
    body: unknown,
    params?: Record<string, string | number | boolean | undefined>,
    options?: Omit<RequestOptions, 'method' | 'body' | 'token'>
  ) => {
    const session = await verifySession();
    return api.post<T>(endpoint, body, params, { ...options, token: session.token as string || undefined });
  },

  put: async <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, 'method' | 'body' | 'token'>
  ) => {
    const session = await verifySession();
    return api.put<T>(endpoint, body, { ...options, token: session.token as string || undefined });
  },

  patch: async <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, 'method' | 'body' | 'token'>
  ) => {
    const session = await verifySession();
    return api.patch<T>(endpoint, body, { ...options, token: session.token as string || undefined });
  },

  delete: async <T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body' | 'token'>
  ) => {
    const session = await verifySession();
    return api.delete<T>(endpoint, { ...options, token: session.token as string || undefined });
  },
};

export default serverApi;
