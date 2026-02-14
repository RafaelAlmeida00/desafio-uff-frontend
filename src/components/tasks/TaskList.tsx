import { motion, AnimatePresence } from 'framer-motion'
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
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10"
      >
        <Inbox className="h-12 w-12 mb-4 opacity-20" />
        <p className="text-lg font-medium">Nenhuma tarefa encontrada</p>
        <p className="text-sm">Crie uma nova tarefa para começar.</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}