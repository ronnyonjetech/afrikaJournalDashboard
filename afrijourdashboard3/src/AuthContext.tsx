import { createContext, useState, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { BASE_URL } from './config'
interface AuthContextType {
  user: any
  loginUser: (email: string, password: string) => Promise<void>
  logoutUser: () => void
  registerUser: (
    email: string,
    user_name: string,
    password: string
  ) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  // updateTokensIfNeeded: () => void
  refreshToken: () => Promise<any>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authTokens, setAuthTokens] = useState<any>(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens')!)
      : null
  )
  const [user, setUser] = useState<any>(() =>
    localStorage.getItem('authTokens')
      ? jwtDecode(localStorage.getItem('authTokens')!)
      : null
  )
  const [loading, setLoading] = useState(true)

  const refreshToken = async (): Promise<{
    access: string
    refresh: string
  } | null> => {
    const storedTokens = localStorage.getItem('authTokens')

    if (!storedTokens) {
      console.error('No tokens found in localStorage')
      return null
    }

    const parsedTokens = JSON.parse(storedTokens)
    const refresh = parsedTokens?.refresh

    if (!refresh) {
      console.error('No refresh token found in stored tokens')
      return null
    }

    try {
      const response = await fetch(
        'https://backend.afrikajournals.org/api/token/refresh',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Old tokens:', storedTokens)
        console.log('✅ New tokens:', data)

        localStorage.setItem('authTokens', JSON.stringify(data)) // Optional: update stored tokens
        return data
      } else {
        const errorData = await response.json()
        console.error('❌ Failed to refresh token:', errorData)
        return null
      }
    } catch (error) {
      console.error('❌ Error refreshing token:', error)
      return null
    }
  }

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log(loading)
      // console.log(authTokens)
      if (response.ok) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        window.location.href = '/upload' // Redirect to upload page
      } else {
        alert('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const registerUser = async (
    email: string,
    user_name: string,
    password: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, user_name, password }),
      })

      if (response.ok) {
        window.location.href = '/sign-in' // Redirect to sign-in on successful registration
      } else {
        alert('Registration failed.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/reset_password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        alert('Check your email for the password reset link.')
      } else {
        alert('Password reset failed.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    window.location.href = '/sign-in' // Redirect to sign-in on logout
  }

  const contextData: AuthContextType = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    refreshToken,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  )
}
