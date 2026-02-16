export interface User {
  id: number
  nome: string
  email: string
  createdAt?: string
  updatedAt?: string
}

export interface LoginInput {
  email: string
  senha: string
}

export interface SignupInput {
  nome: string
  email: string
  senha: string
}

