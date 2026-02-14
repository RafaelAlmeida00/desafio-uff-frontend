import { apiClient } from './client'
import type { HateoasResponse } from '@/types/api.types'
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task.types'

export const tasksApi = {
  list: async (status?: string) => {
    const res = await apiClient.get<HateoasResponse<Task[]>>('/api/tasks', {
      params: status ? { status } : undefined,
    })
    return res.data.data
  },

  create: async (data: CreateTaskInput) => {
    const res = await apiClient.post<HateoasResponse<Task>>('/api/tasks', data)
    return res.data.data
  },

  update: async (id: number, data: UpdateTaskInput) => {
    const res = await apiClient.put<HateoasResponse<Task>>(`/api/tasks/${id}`, data)
    return res.data.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/api/tasks/${id}`)
  },
}