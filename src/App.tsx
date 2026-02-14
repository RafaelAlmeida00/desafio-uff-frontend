import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/layout/Header'
import { cn } from '@/lib/utils'

function App() {
  return (
    <div className={cn('min-h-screen flex flex-col bg-background')}>
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <p className="text-muted-foreground">Conteúdo principal da aplicação...</p>
      </main>
      <Toaster />
    </div>
  )
}

export default App