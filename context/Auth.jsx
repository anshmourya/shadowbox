'use client'
import { useAccount } from '@/hooks/useAccount'
import { createContext, useState, useEffect, useContext } from 'react'

export const Auth = createContext()

export const AuthProvider = ({ children }) => {
  const { getCurrentUser } = useAccount()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [])

  return <Auth.Provider value={{ user, setUser }}>{children}</Auth.Provider>
}

const useAuth = () => useContext(Auth)

export default useAuth
