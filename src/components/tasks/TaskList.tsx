import { TaskItem } from './TaskItem'
import type { Task } from '@/types/task.types'
import { Inbox } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10">
        <Inbox className="h-12 w-12 mb-4 opacity-20" />
        <p className="text-lg font-medium">Nenhuma tarefa encontrada</p>
        <p className="text-sm">Crie uma nova tarefa para começar.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}