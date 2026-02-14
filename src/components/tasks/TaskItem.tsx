import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Trash2, Undo2 } from 'lucide-react'
import type { Task } from '@/types/task.types'
import { cn } from '@/lib/utils'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isCompleted = task.status === 'concluida'

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", isCompleted && "opacity-70 bg-muted/50")}>
      <CardContent className="p-4 flex items-center gap-4">
        <Button
          variant={isCompleted ? "secondary" : "outline"}
          size="icon"
          className={cn("h-8 w-8 shrink-0 rounded-full", isCompleted && "bg-success/20 text-success hover:bg-success/30")}
          onClick={() => onToggle(task.id)}
          aria-label={isCompleted ? "Reabrir tarefa" : "Concluir tarefa"}
        >
          {isCompleted ? <Undo2 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn("font-medium truncate", isCompleted && "line-through text-muted-foreground")}>
              {task.titulo}
            </h3>
            <Badge variant={isCompleted ? "secondary" : "outline"} className="text-[10px] px-1.5 h-5">
              {task.status}
            </Badge>
          </div>
          {task.descricao && (
            <p className={cn("text-sm text-muted-foreground truncate", isCompleted && "line-through")}>
              {task.descricao}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(task.id)}
          aria-label="Excluir tarefa"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}