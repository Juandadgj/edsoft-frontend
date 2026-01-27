/**
 * Hooks personalizados para manejo de estado con API REST
 * Reemplazan useQuery y useMutation de Apollo
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiRequest } from './apiClient';

interface UseQueryOptions<T> {
  /** Si es false, no ejecuta automáticamente la query */
  skip?: boolean;
  /** Variables/params para la query */
  variables?: Record<string, string | number | boolean | undefined>;
  /** Política de cache: 'cache-first' | 'network-only' */
  fetchPolicy?: 'cache-first' | 'network-only';
  /** Callback cuando completa exitosamente */
  onCompleted?: (data: T) => void;
  /** Callback cuando hay error */
  onError?: (error: Error) => void;
}

interface UseQueryResult<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  refetch: (variables?: Record<string, string | number | boolean | undefined>) => Promise<T | undefined>;
}

interface UseLazyQueryResult<T> extends UseQueryResult<T> {
  called: boolean;
}

interface UseMutationOptions<T> {
  onCompleted?: (data: T) => void;
  onError?: (error: Error) => void;
  fetchPolicy?: 'network-only';
}

interface UseMutationResult<T, V> {
  mutate: (options: { variables: V }) => Promise<T | undefined>;
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  reset: () => void;
}

/**
 * Hook para queries que se ejecutan automáticamente
 * Reemplaza useQuery de Apollo
 */
export function useQuery<T>(
  endpoint: string,
  options: UseQueryOptions<T> = {}
): UseQueryResult<T> {
  const { skip = false, variables, fetchPolicy = 'cache-first', onCompleted, onError } = options;
  
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(
    async (queryVariables?: Record<string, string | number | boolean | undefined>) => {
      if (!mountedRef.current) return;
      
      setLoading(true);
      setError(null);

      try {
        const result = await apiRequest<T>(endpoint, {
          method: 'GET',
          params: queryVariables || variables,
        });
        
        if (mountedRef.current) {
          setData(result);
          onCompleted?.(result);
        }
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        if (mountedRef.current) {
          setError(error);
          onError?.(error);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    [endpoint, variables, onCompleted, onError]
  );

  useEffect(() => {
    mountedRef.current = true;
    
    if (!skip) {
      fetchData();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [skip, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook para queries que se ejecutan manualmente (lazy)
 * Reemplaza useLazyQuery de Apollo
 */
export function useLazyQuery<T>(
  endpoint: string,
  options: UseQueryOptions<T> = {}
): [
  (variables?: Record<string, string | number | boolean | undefined>) => Promise<T | undefined>,
  UseLazyQueryResult<T>
] {
  const { variables, onCompleted, onError } = options;
  
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [called, setCalled] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (queryVariables?: Record<string, string | number | boolean | undefined>) => {
      setCalled(true);
      setLoading(true);
      setError(null);

      try {
        const result = await apiRequest<T>(endpoint, {
          method: 'GET',
          params: queryVariables || variables,
        });
        
        if (mountedRef.current) {
          setData(result);
          onCompleted?.(result);
        }
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        if (mountedRef.current) {
          setError(error);
          onError?.(error);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    [endpoint, variables, onCompleted, onError]
  );

  const refetch = useCallback(
    (vars?: Record<string, string | number | boolean | undefined>) => execute(vars),
    [execute]
  );

  return [
    execute,
    { data, loading, error, called, refetch },
  ];
}

/**
 * Hook para mutations (POST, PUT, DELETE)
 * Reemplaza useMutation de Apollo
 */
export function useMutation<T, V = Record<string, unknown>>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options: UseMutationOptions<T> = {}
): [
  (options: { variables: V }) => Promise<T | undefined>,
  UseMutationResult<T, V>
] {
  const { onCompleted, onError } = options;
  
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const mutate = useCallback(
    async (mutationOptions: { variables: V }) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiRequest<T>(endpoint, {
          method,
          body: mutationOptions.variables,
        });
        
        if (mountedRef.current) {
          setData(result);
          onCompleted?.(result);
        }
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        if (mountedRef.current) {
          setError(error);
          onError?.(error);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    [endpoint, method, onCompleted, onError]
  );

  const reset = useCallback(() => {
    setData(undefined);
    setError(null);
    setLoading(false);
  }, []);

  return [
    mutate,
    { mutate, data, loading, error, reset },
  ];
}

/**
 * Hook para DELETE con parámetro en URL
 */
export function useDeleteMutation<T>(
  baseEndpoint: string,
  options: UseMutationOptions<T> = {}
): [
  (id: number | string) => Promise<T | undefined>,
  { data: T | undefined; loading: boolean; error: Error | null }
] {
  const { onCompleted, onError } = options;
  
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const deleteFn = useCallback(
    async (id: number | string) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiRequest<T>(`${baseEndpoint}/${id}`, {
          method: 'DELETE',
        });
        
        if (mountedRef.current) {
          setData(result);
          onCompleted?.(result);
        }
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        if (mountedRef.current) {
          setError(error);
          onError?.(error);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    [baseEndpoint, onCompleted, onError]
  );

  return [deleteFn, { data, loading, error }];
}
