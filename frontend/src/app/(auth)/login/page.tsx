'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#FFD700',
                }
              }
            }
          }}
          theme="dark"
          showLinks={true}
          providers={[]}
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
          onlyThirdPartyProviders={false}
        />
      </div>
    </div>
  )
} 