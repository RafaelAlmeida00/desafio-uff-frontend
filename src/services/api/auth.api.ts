import { apiClient } from './client'
import type { HateoasResponse } from '@/types/api.types'
import type { User, LoginInput, SignupInput } from '@/types/auth.types'

export const authApi = {
  signup: async (data: SignupInput) => {
    const res = await apiClient.post<HateoasResponse<User>>(
      '/api/auth/signup',
      data
    )
    return res.data.data
  },

  login: async (data: LoginInput) => {
    const res = await apiClient.post<HateoasResponse<User>>(
      '/api/auth/login',
      data
    )
    return res.data.data
  },

  logout: async () => {
    await apiClient.post('/api/auth/logout')
  },

  me: async () => {
    const res = await apiClient.get<HateoasResponse<User>>('/api/auth/me')
    return res.data.data
  }
}
