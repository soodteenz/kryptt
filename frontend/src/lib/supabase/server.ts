import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { CookieOptions } from '@supabase/ssr'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const createClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          try {
            const cookieStore = await cookies()
            const cookie = cookieStore.get(name)
            return cookie?.value
          } catch {
            return undefined
          }
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            const cookieStore = await cookies()
            cookieStore.set({
              name,
              value,
              ...options
            })
          } catch {
            // Handle cookie setting error silently
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            const cookieStore = await cookies()
            cookieStore.delete({
              name,
              ...options
            } as ResponseCookie)
          } catch {
            // Handle cookie removal error silently
          }
        },
      },
    }
  )
} 