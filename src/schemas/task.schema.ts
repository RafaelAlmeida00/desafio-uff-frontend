import { z } from 'zod'

export const createTaskSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório').max(200, 'Máximo de 200 caracteres'),
  descricao: z.string().max(1000, 'Máximo de 1000 caracteres').nullable().optional(),
})

export const updateTaskSchema = z.object({
  titulo: z.string().min(1).max(200).optional(),
  descricao: z.string().max(1000).nullable().optional(),
  status: z.enum(['pendente', 'concluida']).optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>