/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/services/api/auth.api'
import type { User, SignupInput } from '@/types/auth.types'
import { useToast } from '@/hooks/use-toast'
import { LoadingModal } from '@/components/ui/loading-modal'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isInitializing: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => Promise<void>
  signup: (data: SignupInput) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const { toast } = useToast()
  const navigate = useNavigate()

  const isAuthenticated = !!user

  const verifyAuth = useCallback(async () => {
    try {
      const user = await authApi.me()
      setUser(user)
    } catch (error) {
      setUser(null)
    } finally {
      setIsInitializing(false)
    }
  }, [])

  useEffect(() => {
    verifyAuth()
  }, [verifyAuth])

  const login = useCallback(
    async (email: string, senha: string) => {
      try {
        await authApi.login({ email, senha })
        await verifyAuth() // Re-verifica a sessão para garantir que o cookie foi pego
        toast({ title: 'Login realizado com sucesso' })
        navigate('/')
      } catch (e: unknown) {
        setUser(null) // Limpa o usuário em caso de falha no login
        const msg =
          e && typeof e === 'object' && 'response' in e
            ? (e as { response?: { data?: { message?: string } } }).response?.data
                ?.message
            : 'Erro ao realizar login'
        toast({
          variant: 'destructive',
          title: 'Erro no login',
          description: String(msg),
        })
        throw e
      }
    },
    [toast, navigate, verifyAuth],
  )

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Erro ao fazer logout', error)
    } finally {
      setUser(null)
      toast({ title: 'Logout realizado' })
      navigate('/login', { replace: true })
    }
  }, [toast, navigate])

  const signup = useCallback(
    async (data: SignupInput) => {
      try {
        await authApi.signup(data)
        await verifyAuth() // Verifica a sessão após o cadastro
        toast({ title: 'Cadastro realizado com sucesso' })
        navigate('/')
      } catch (e: unknown) {
        setUser(null)
        const msg =
          e && typeof e === 'object' && 'response' in e
            ? (e as { response?: { data?: { message?: string } } }).response?.data
                ?.message
            : 'Erro ao realizar cadastro'
        toast({
          variant: 'destructive',
          title: 'Erro no cadastro',
          description: String(msg),
        })
        throw e
      }
    },
    [toast, navigate, verifyAuth],
  )

  useEffect(() => {
    const handleSessionExpired = () => {
      logout()
    }

    window.addEventListener('sessionExpired', handleSessionExpired)

    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired)
    }
  }, [logout])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isInitializing,
        login,
        logout,
        signup,
      }}
    >
      {isInitializing ? (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background p-4">
          <LoadingModal open={true} context="auth" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}