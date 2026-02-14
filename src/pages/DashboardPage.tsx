import { useState } from 'react'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { TaskFilter, type FilterType } from '@/components/tasks/TaskFilter'
import { useTasks } from '@/hooks/useTasks'
import { Loader2 } from 'lucide-react'

export function DashboardPage() {
  const [filter, setFilter] = useState<FilterType>('todas')
  const statusParam = filter === 'todas' ? undefined : filter
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks(statusParam)

  const handleToggle = async (id: number) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    await updateTask(id, { status: task.status === 'concluida' ? 'pendente' : 'concluida' })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Minhas Tarefas</h2>
        <p className="text-muted-foreground">Gerencie suas atividades diárias.</p>
      </div>

      <TaskForm onSubmit={createTask} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <TaskFilter active={filter} onChange={setFilter} />
        </div>

        {loading && <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {error && <div className="text-destructive text-center py-4">{error}</div>}
        {!loading && !error && <TaskList tasks={tasks} onToggle={handleToggle} onDelete={deleteTask} />}
      </div>
    </div>
  )
}