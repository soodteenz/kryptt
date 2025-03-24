"use client";

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/')
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    )
  }

  return children
} 