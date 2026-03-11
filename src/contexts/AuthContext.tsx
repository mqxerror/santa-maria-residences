import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'
import type { User, Session, SupabaseClient } from '@supabase/supabase-js'

// Lazy-load supabase to keep it out of the critical render path
const getSupabase = (() => {
  let promise: Promise<SupabaseClient> | null = null
  return () => {
    if (!promise) {
      promise = import('@/lib/supabase').then(m => m.supabase)
    }
    return promise
  }
})()

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const unsubRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let cancelled = false
    getSupabase().then(supabase => {
      if (cancelled) return
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (cancelled) return
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (cancelled) return
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      unsubRef.current = () => subscription.unsubscribe()
    })

    return () => {
      cancelled = true
      unsubRef.current?.()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const supabase = await getSupabase()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    const supabase = await getSupabase()
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
