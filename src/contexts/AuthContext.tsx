import { createContext, useContext, useState, useCallback } from 'react'
import { authApi } from '@/services/api/auth.api'
import { tokenStorage } from '@/services/storage/tokenStorage'
import type { User, SignupInput } from '@/types/auth.types'
import { useToast } from '@/hooks/use-toast'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  signup: (data: SignupInput) => Promise<void>
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  const login = useCallback(async (email: string, senha: string) => {
    const { token } = await authApi.login({ email, senha })
    tokenStorage.set(token)
    setUser({ id: 0, nome: '', email })
    toast({ title: 'Login realizado com sucesso' })
  }, [toast])

  const logout = useCallback(() => {
    tokenStorage.remove()
    setUser(null)
    toast({ title: 'Logout realizado' })
  }, [toast])

  const signup = useCallback(async (data: SignupInput) => {
    const newUser = await authApi.signup(data)
    setUser(newUser as User)
    toast({ title: 'Cadastro realizado com sucesso' })
  }, [toast])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!tokenStorage.get(),
      login,
      logout,
      signup,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}