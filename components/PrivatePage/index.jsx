import { useRouter } from 'next/navigation'
import { useAccount } from '@/hooks/useAccount'
import PageLoader from '../loader/PageLoader'
import { useQuery } from '@tanstack/react-query'
const PrivatePage = (Component) => {
  const { isLogged } = useAccount()

  return function PrivatePageComponent(props) {
    const router = useRouter()
    const {
      data: user,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['loggedInStatus'],
      queryFn: isLogged,
      staleTime: Infinity,
      cacheTime: 0,
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
