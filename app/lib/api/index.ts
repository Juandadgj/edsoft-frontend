/**
 * Exportaciones centralizadas del módulo API
 * 
 * Uso en Server Components:
 * ```typescript
 * import { serverApi } from '@/app/lib/api';
 * 
 * async function MyServerComponent() {
 *   const users = await serverApi.get<User[]>('/users');
 *   return <div>{users.map(u => u.name)}</div>;
 * }
 * ```
 * 
 * Uso en Client Components:
 * ```typescript
 * 'use client';
 * import { useQuery, useMutation } from '@/app/lib/api';
 * 
 * function MyClientComponent() {
 *   const { data, loading } = useQuery<User[]>('/users');
 *   const [createUser] = useMutation<User, CreateUserInput>('/users', 'POST');
 *   // ...
 * }
 * ```
 */

// Cliente base (funciona en ambos contextos)
export { api, apiRequest } from './api-client';
export type { RequestOptions, ApiError } from './api-client';

// Hooks para Client Components
