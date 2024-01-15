'use client'
import { useRouter } from 'next/navigation' // Import from next/router instead of next/navigation
import { useAccount } from '@/hooks/useAccount'
import PageLoader from '../loader/PageLoader'
import { useQuery } from '@tanstack/react-query'

const PrivatePage = (Component) => {
  return function PrivatePageComponent(props) {
    const router = useRouter()
    const { isLogged } = useAccount()

    const {
      data: user,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['loggedInStatus'],
      queryFn: isLogged,
      cacheTime: Infinity,
      retry: (failureCount, error) => {
        if (error.code === 401) {
          return 0
        }
      },
    })

    if (isLoading) return <PageLoader />

    if (isError) {
      router.push('/signin')
      throw error
    }

    if (!user) router.push('/signin')
    return <Component {...props} />
  }
}

export default PrivatePage
