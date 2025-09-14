import { useAuth } from 'hooks/useAuth'
import { Navigate } from 'react-router'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    )
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
