import { Button } from '@/components/ui/button'

export type FilterType = 'todas' | 'pendente' | 'concluida'

interface TaskFilterProps {
  active: FilterType
  onChange: (filter: FilterType) => void
}

export function TaskFilter({ active, onChange }: TaskFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'todas', label: 'Todas' },
    { value: 'pendente', label: 'Pendentes' },
    { value: 'concluida', label: 'Concluídas' },
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
      {filters.map(filter => (
        <Button
          key={filter.value}
          variant={active === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(filter.value)}
          className="whitespace-nowrap"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}