import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  user: { id: number; nome: string; email: string } | null
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  signup: (data: { nome: string; email: string; senha: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null)

  const login = async (_email: string, _senha: string) => {
    // Mock login
    setUser({ id: 1, nome: 'Usuário Teste', email: 'user@email.com' })
  }

  const logout = () => setUser(null)

  const signup = async (_data: { nome: string; email: string; senha: string }) => {
    // Mock signup
    setUser({ id: 1, nome: 'Usuário Teste', email: 'user@email.com' })
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      signup,
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