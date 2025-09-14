import client from 'api/client'
import { createContext, ReactNode, useEffect, useState } from 'react'

type AuthContextType = {
  token: string | null
  userEmail: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setToken(token)

    const userEmail = localStorage.getItem('userEmail')
    if (userEmail) setUserEmail(userEmail)

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const res = await client.post('/users/login', { email, password })
    const { access_token, user_email } = res.data

    localStorage.setItem('token', access_token)
    localStorage.setItem('userEmail', user_email)
    setToken(access_token)
    setUserEmail(user_email)
  }

  const register = async (email: string, password: string) => {
    await client.post('/users/register', { email, password })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    setUserEmail(null)
    setToken(null)
  }

  const value: AuthContextType = {
    token,
    userEmail,
    loading,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
