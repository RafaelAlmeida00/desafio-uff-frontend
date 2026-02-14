export interface Task {
  id: number
  titulo: string
  descricao: string | null
  status: 'pendente' | 'concluida'
  createdAt: string
  updatedAt: string
}

export interface CreateTaskInput {
  titulo: string
  descricao?: string | null
}

export interface UpdateTaskInput {
  titulo?: string
  descricao?: string | null
  status?: 'pendente' | 'concluida'
}