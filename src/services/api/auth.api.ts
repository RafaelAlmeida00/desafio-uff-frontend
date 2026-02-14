import { apiClient } from './client'
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
}