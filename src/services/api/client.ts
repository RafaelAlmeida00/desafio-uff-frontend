import axios from 'axios'
import { tokenStorage } from '@/services/storage/tokenStorage'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      tokenStorage.remove()
      // Redirecionamento será tratado pelo AuthContext ou Router, 
      // mas aqui garantimos a limpeza do token inválido.
    }
    return Promise.reject(err)
  }
)