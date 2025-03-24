import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          console.log('Removing cookie:', name, options);
          // Next.js expects an array of cookie names to delete
          request.cookies.delete(name);
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.delete({
            name,
            ...options
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Auth routes are public
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return response
  }

  // Public routes
  if (['/login', '/register', '/'].includes(request.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return response
  }

  // Protected routes
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 