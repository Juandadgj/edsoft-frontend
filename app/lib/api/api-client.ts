/**
 * Cliente HTTP para API RESTful usando Axios
 * Funciona en Server Components y Client Components
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  headers?: Record<string, string>;
  /** Token de autenticación (para server-side) */
  token?: string;
  /** Tags para revalidación de cache en Server Components */
  tags?: string[];
  /** Tiempo de revalidación en segundos */
  revalidate?: number | false;
}

export interface ApiError extends Error {
  status: number;
  statusText: string;
  data?: unknown;
}

/**
 * Crea una instancia de axios configurada
 */
const createAxiosInstance = (token?: string): AxiosInstance => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: token } : {}),
    },
    validateStatus: () => true, // No lanzar error automáticamente por códigos de error HTTP
  });
};

/**
 * Crea un error de API con información detallada
 */
const createApiError = (
  message: string,
  status: number,
  statusText: string,
  data?: unknown
): ApiError => {
  const error = new Error(message) as ApiError;
  error.status = status;
  error.statusText = statusText;
  error.data = data;
  return error;
};

/**
 * Cliente HTTP base para llamadas a la API usando Axios
 * Funciona tanto en Server como Client Components
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    data,
    params,
    headers = {},
    token,
    tags,
    revalidate,
  } = options;

  const axiosInstance = createAxiosInstance(token);
  
  const config: AxiosRequestConfig = {
    method: method as any,
    url: endpoint,
    headers,
    params: params ? Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    ) : undefined,
    data: data
  };

  // Agregar data para métodos que lo soportan
  // if (data && method !== 'GET') {
  //   config.data = data;
  // }

  // Nota: tags y revalidate son opciones específicas de Next.js Server Components
  // No se aplican directamente en axios, pero se podrían usar en una capa superior si es necesario
  // Por ahora solo se registran para compatibilidad de API

  try {
    const response = await axiosInstance.request<T>(config);
    if (!response.status || response.status < 200 || response.status >= 300) {
      const errorData = response.data || {};
      throw createApiError(
        typeof errorData === 'object' && 'message' in errorData
          ? (errorData as any).message
          : `Error ${response.status}: ${response.statusText}`,
        response.status || 500,
        response.statusText || 'Unknown Error',
        errorData
      );
    }

    // Retornar data o string vacío si no hay contenido
    return response.data || ("" as T);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const statusText = error.response?.statusText || 'Unknown Error';
      const data = error.response?.data;
      throw createApiError(
        typeof data === 'object' && data !== null && 'message' in data
          ? (data as any).message
          : error.message,
        status,
        statusText,
        data
      );
    }
    throw error;
  }
}

/**
 * Métodos de conveniencia para operaciones CRUD
 */
export const api = {
  get: <T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
    options?: Omit<RequestOptions, 'method' | 'params' | 'data'>
  ) => apiRequest<T>(endpoint, { method: 'GET', params, ...options }),

  post: <T>(
    endpoint: string,
    data: unknown,
    params?: Record<string, string | number | boolean | undefined>,
    options?: Omit<RequestOptions, 'method' | 'data'>
  ) => apiRequest<T>(endpoint, { method: 'POST', data, params, ...options }),

  put: <T>(
    endpoint: string,
    data: unknown,
    options?: Omit<RequestOptions, 'method' | 'data'>
  ) => apiRequest<T>(endpoint, { method: 'PUT', data, ...options }),

  patch: <T>(
    endpoint: string,
    data: unknown,
    options?: Omit<RequestOptions, 'method' | 'data'>
  ) => apiRequest<T>(endpoint, { method: 'PATCH', data, ...options }),

  delete: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'data'>
  ) => apiRequest<T>(endpoint, { method: 'DELETE', ...options }),
};

export default api;
