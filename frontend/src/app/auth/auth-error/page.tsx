'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthError() {
  const router = useRouter()

  useEffect(() => {
    // Log the error occurrence
    console.error('Authentication error occurred')
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-4 text-lg">There was a problem authenticating your account.</p>
        <div className="mt-8 space-x-4">
          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
          >
            Return to Login
          </Link>
          <button
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
} 