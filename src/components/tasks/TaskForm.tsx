import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createTaskSchema, type CreateTaskInput } from '@/schemas/task.schema'
import { Plus, Sparkles } from 'lucide-react'

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-card rounded-xl border shadow-sm overflow-hidden"
    >
      <div className="p-4 border-b bg-muted/30">
        <h3 className="font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Nova Tarefa
        </h3>
      </div>
      
      <form onSubmit={handleSubmit(handle)} className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="titulo">Título</Label>
          <Input
            id="titulo"
            placeholder="Ex: Finalizar relatório mensal..."
            {...register('titulo')}
            className={errors.titulo ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.titulo && <p className="text-destructive text-xs">{errors.titulo.message}</p>}
        </div>
        
        <div className="space-y-2">
           <Label htmlFor="descricao">Descrição <span className="text-muted-foreground text-xs font-normal">(opcional)</span></Label>
           <Textarea
            id="descricao"
            placeholder="Adicione detalhes, prazos ou observações importantes..."
            {...register('descricao')}
            className="resize-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all">
            {isSubmitting ? (
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> Criando...</span>
            ) : (
              <><Plus className="mr-2 h-4 w-4" /> Criar Tarefa</>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}