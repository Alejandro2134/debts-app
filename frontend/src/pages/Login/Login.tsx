import FormInput from 'components/FormInput/FormInput'
import { useAuth } from 'hooks/useAuth'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      navigate('/debts')
    } catch {
      setError('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center px-4 pt-20">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Iniciar sesión</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormInput
            label="Correo electrónico"
            type="email"
            name="email"
            placeholder="tu@correo.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Contraseña"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
