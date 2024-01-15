import { useRouter } from 'next/navigation'
import { useAccount } from '@/hooks/useAccount'
import PageLoader from '../loader/PageLoader'
import { useQuery } from '@tanstack/react-query'
import useAuth from '@/context/Auth'
const PrivatePage = (Component) => {
  const { isLogged } = useAccount()

  return function PrivatePageComponent(props) {
    const { user: userdata } = useAuth()
    const router = useRouter()
    const {
      data: user,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['loggedInStatus'],
      queryFn: isLogged,
      cacheTime: Infinity,
      enabled: !!userdata,
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
