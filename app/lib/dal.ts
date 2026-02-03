import 'server-only'
 
import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from './session/session'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  return { token: session?.token, role: session?.role }
})