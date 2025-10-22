'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, loading, clearSession } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && !user) {
      // Only redirect if not on auth pages
      if (!pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
        router.push('/login')
      }
    }
  }, [user, loading, pathname, router, mounted])

  // Handle OAuth errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error && event.error.message && event.error.message.includes('oauth_client_id')) {
        console.error('OAuth error detected, clearing session...')
        clearSession()
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [clearSession])

  // Always render children on server and during initial mount to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  // Show loading while checking auth (only after mount)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Always show login/signup pages
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return <>{children}</>
  }

  // If user is authenticated, show the app
  if (user) {
    return <>{children}</>
  }

  // If not authenticated and not on auth pages, show loading (redirect will happen in useEffect)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  )
}
