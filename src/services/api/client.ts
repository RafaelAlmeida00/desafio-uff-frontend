import axios from 'axios'

const browserDefaultBaseUrl =
  typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : 'http://localhost:3000'

const baseURL = import.meta.env.VITE_API_URL || browserDefaultBaseUrl

export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config.url.includes('/api/auth')
    ) {
      window.dispatchEvent(new CustomEvent('sessionExpired'))
    }
    return Promise.reject(error)
  },
)
