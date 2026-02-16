import { useState, useEffect, useCallback } from 'react'
import { tasksApi } from '@/services/api/tasks.api'
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task.types'
import { useToast } from '@/hooks/use-toast'

export function useTasks(statusFilter?: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const matchesCurrentFilter = useCallback(
    (task: Task) => !statusFilter || task.status === statusFilter,
    [statusFilter],
  )

  const fetchTasks = useCallback(
    async (status?: string) => {
      setLoading(true)
      setError(null)
      try {
        const data = await tasksApi.list(status ?? statusFilter)
        setTasks(data)
      } catch (e: unknown) {
        const msg =
          e && typeof e === 'object' && 'response' in e
            ? (e as { response?: { data?: { message?: string } } }).response?.data?.message
            : 'Erro ao carregar tarefas'
        setError(String(msg))
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: String(msg),
        })
      } finally {
        setLoading(false)
      }
    },
    [statusFilter, toast],
  )

  const createTask = useCallback(
    async (data: CreateTaskInput) => {
      try {
        const newTask = await tasksApi.create(data)
        setTasks(prev => (matchesCurrentFilter(newTask) ? [newTask, ...prev] : prev))
        toast({ title: 'Tarefa criada com sucesso' })
        return newTask
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Erro ao criar tarefa',
          description: 'Tente novamente mais tarde.',
        })
        throw e
      }
    },
    [matchesCurrentFilter, toast],
  )

  const updateTask = useCallback(
    async (id: number, data: UpdateTaskInput) => {
      try {
        const updated = await tasksApi.update(id, data)
        setTasks(prev => {
          const hasTask = prev.some(t => t.id === id)
          if (!matchesCurrentFilter(updated)) {
            return prev.filter(t => t.id !== id)
          }
          if (!hasTask) {
            return [updated, ...prev]
          }
          return prev.map(t => (t.id === id ? updated : t))
        })

        if (data.status) {
          toast({ title: data.status === 'concluida' ? 'Tarefa concluida' : 'Tarefa reaberta' })
        } else {
          toast({ title: 'Tarefa atualizada' })
        }
        return updated
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Erro ao atualizar tarefa',
          description: 'Nao foi possivel salvar as alteracoes.',
        })
        throw e
      }
    },
    [matchesCurrentFilter, toast],
  )

  const deleteTask = useCallback(
    async (id: number) => {
      try {
        await tasksApi.delete(id)
        setTasks(prev => prev.filter(t => t.id !== id))
        toast({ title: 'Tarefa removida' })
      } catch {
        toast({
          variant: 'destructive',
          title: 'Erro ao remover tarefa',
          description: 'Tente novamente.',
        })
      }
    },
    [toast],
  )

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }
}
