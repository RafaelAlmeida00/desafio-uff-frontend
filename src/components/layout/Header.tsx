import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { LogOut, Moon, Sun } from 'lucide-react'

export function Header() {
  const { isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Plataforma de Tarefas</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {isAuthenticated && (
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Sair">
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}