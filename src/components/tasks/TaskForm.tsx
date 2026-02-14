import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createTaskSchema, type CreateTaskInput } from '@/schemas/task.schema'
import { Plus } from 'lucide-react'

interface TaskFormProps {
  onSubmit: (data: CreateTaskInput) => Promise<unknown>
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  })

  const handle = async (data: CreateTaskInput) => {
    await onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handle)} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end bg-card p-4 rounded-lg border shadow-sm">
      <div className="flex-1 w-full space-y-2">
        <Label htmlFor="titulo" className="sr-only">Título</Label>
        <Input
          id="titulo"
          placeholder="O que precisa ser feito?"
          {...register('titulo')}
          className={errors.titulo ? "border-destructive" : ""}
        />
        {errors.titulo && <p className="text-destructive text-xs">{errors.titulo.message}</p>}
      </div>
      
      <div className="flex-1 w-full space-y-2">
         <Label htmlFor="descricao" className="sr-only">Descrição (opcional)</Label>
         <Input
          id="descricao"
          placeholder="Descrição (opcional)"
          {...register('descricao')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? <span className="animate-pulse">...</span> : <><Plus className="mr-2 h-4 w-4" /> Adicionar</>}
      </Button>
    </form>
  )
}