'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSidebar } from '@/components/ui/sidebar'

export function SignOutButton() {
  const { open, animate } = useSidebar()
  
  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/' // Redirect to landing page after sign out
  }

  return (
    <Button 
      onClick={handleSignOut} 
      variant="ghost" 
      size="sm"
      className="text-white/70 hover:text-yellow-400 hover:bg-transparent flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm whitespace-pre"
      >
        Sign Out
      </motion.span>
    </Button>
  )
} 