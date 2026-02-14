import { Link } from 'react-router-dom'
import { LoginForm } from '@/components/auth/LoginForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <CardDescription>Entre com seu e-mail e senha para acessar</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Não tem conta? <Link to="/signup" className="text-primary hover:underline">Cadastre-se</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}