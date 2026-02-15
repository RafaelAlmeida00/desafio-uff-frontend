import { apiClient } from './client' // Ajuste o caminho conforme o seu projeto
import type { HateoasResponse } from '@/types/api.types'
import type { User, LoginInput, SignupInput, AuthResponse } from '@/types/auth.types'

export const authApi = {
  signup: async (data: SignupInput) => {
    const res = await apiClient.post<HateoasResponse<Omit<User, 'createdAt'>>>(
      '/api/auth/signup',
      data
    )
    return res.data.data
  },

  login: async (data: LoginInput) => {
    const res = await apiClient.post<HateoasResponse<AuthResponse>>(
      '/api/auth/login',
      data
    )
    return res.data.data
  },

  logout: async () => {
    await apiClient.post('/api/auth/logout') // Certifique-se de que essa rota existe no seu backend
  },

  me: async () => {
    const res = await apiClient.get<HateoasResponse<User>>('/api/auth/me') 
    return res.data.data
  }
}