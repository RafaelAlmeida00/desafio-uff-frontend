import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Página não encontrada</h2>
      <p className="text-muted-foreground max-w-md">A página que você está procurando não existe ou foi movida.</p>
      <Button asChild className="mt-4">
        <Link to="/">Voltar ao início</Link>
      </Button>
    </div>
  )
}