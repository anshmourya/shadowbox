'use client'
import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from '@/hooks/useAccount'

export const Auth = createContext()

export const AuthProvider = ({ children }) => {
  const { getCurrentUser } = useAccount()
  const a = 'dddd'
  const {
    isLoading,
    error,
    data: user,
    refetch: fetchUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <Auth.Provider value={{ isLoading, error, user, fetchUser, a }}>
      {children}
    </Auth.Provider>
  )
}

const useAuth = () => useContext(Auth)

export default useAuth
