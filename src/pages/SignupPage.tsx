import { Link } from 'react-router-dom'
import { SignupForm } from '@/components/auth/SignupForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Cadastro</CardTitle>
          <CardDescription>Crie sua conta para gerenciar tarefas</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Já tem conta? <Link to="/login" className="text-primary hover:underline">Entrar</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}