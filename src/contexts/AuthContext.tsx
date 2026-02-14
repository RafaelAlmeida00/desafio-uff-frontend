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
    try {
      const { token, user } = await authApi.login({ email, senha }) as any
      tokenStorage.set(token)
      setUser(user)
      toast({ title: 'Login realizado com sucesso' })
    } catch (e: unknown) {
      const msg = e && typeof e === 'object' && 'response' in e
        ? (e as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Erro ao realizar login'
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: String(msg)
      })
      throw e
    }
  }, [toast])

  const logout = useCallback(() => {
    tokenStorage.remove()
    setUser(null)
    toast({ title: 'Logout realizado' })
  }, [toast])

  const signup = useCallback(async (data: SignupInput) => {
    try {
      const newUser = await authApi.signup(data)
      setUser(newUser as User)
      toast({ title: 'Cadastro realizado com sucesso' })
    } catch (e: unknown) {
      const msg = e && typeof e === 'object' && 'response' in e
        ? (e as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Erro ao realizar cadastro'
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: String(msg)
      })
      throw e
    }
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