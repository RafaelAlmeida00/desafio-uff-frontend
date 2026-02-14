import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signupSchema, type SignupInput } from '@/schemas/auth.schema'
import { useAuth } from '@/contexts/AuthContext'

export function SignupForm() {
  const { signup } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupInput) => {
    await signup(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" {...register('nome')} />
        {errors.nome && <p className="text-destructive text-sm mt-1">{errors.nome.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="senha">Senha</Label>
        <Input id="senha" type="password" {...register('senha')} />
        {errors.senha && <p className="text-destructive text-sm mt-1">{errors.senha.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </form>
  )
}