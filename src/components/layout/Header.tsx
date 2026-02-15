import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { LogOut, Moon, Sun, User as UserIcon, AlertCircle } from 'lucide-react'
import { Modal } from '@/components/ui/modal'

export function Header() {
  const { isAuthenticated, logout, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false)
    await logout()
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Plataforma de Tarefas
          </h1>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema" className="rounded-full">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {isAuthenticated && (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border/50">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-[150px]">{user?.nome || 'Usuário'}</span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLogoutModal(true)}
                  aria-label="Sair"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} title="Confirmar Saída">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Tem certeza que deseja sair?</h3>
            <p className="text-sm text-muted-foreground">
              Você precisará fazer login novamente para acessar suas tarefas.
            </p>
          </div>
          <div className="flex gap-3 w-full mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowLogoutModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleLogoutConfirm}>
              Sair agora
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}