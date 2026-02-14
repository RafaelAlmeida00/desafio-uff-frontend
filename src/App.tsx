import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/layout/Header'
import { AppRoutes } from '@/routes'
import { cn } from '@/lib/utils'

function App() {
  return (
    <BrowserRouter>
      <div className={cn('min-h-screen flex flex-col bg-background')}>
        <Header />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
          <AppRoutes />
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App