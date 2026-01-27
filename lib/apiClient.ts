/**
 * Cliente HTTP para API RESTful
 * Reemplaza Apollo Client para las operaciones de red
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

/**
 * Obtiene el token de autenticación del sessionStorage
 */
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('userToken');
  }
  return null;
};

/**
 * Construye la URL con query params
 */
const buildUrl = (endpoint: string, params?: Record<string, string | number | boolean | undefined>): string => {
  const url = new URL(`${API_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

/**
 * Cliente HTTP base para llamadas a la API
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, params, headers = {} } = options;
  console.log("API Request:", {  params });
  const token = getAuthToken();
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: token } : {}),
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const url = buildUrl(endpoint, params);
  
  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
  }

  // Algunos endpoints pueden retornar vacío (204)
  const text = await response.text();
  console.log(text);
  return text ? JSON.parse(text) : "" as T;
}

/**
 * Métodos de conveniencia para operaciones CRUD
 */
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>, body?: unknown) =>
    apiRequest<T>(endpoint, { method: 'GET', params, body }),

  post: <T>(endpoint: string, body: unknown, params?: Record<string, string | number | boolean | undefined>) =>
    apiRequest<T>(endpoint, { method: 'POST', body, params }),

  put: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, { method: 'PUT', body }),

  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};

export default api;
