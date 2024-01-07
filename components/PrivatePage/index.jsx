import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from '@/hooks/useAccount'
import PageLoader from '../loader/PageLoader'

const PrivatePage = (Component) => {
  const { isLogged } = useAccount()

  return function PrivatePageComponent(props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await isLogged()
          setUser(userData)
          if (!userData) {
            router.push('/signin')
          }
        } catch (error) {
          setError(error)
          router.push('/signin')
        } finally {
          setIsLoading(false)
        }
      }

      fetchUser()
    }, [router])

    if (isLoading) {
      return <PageLoader />
    }

    if (error) {
      return <div>Error: {error.message}</div>
    }

    if (!user) {
      return null
    }

    return <Component {...props} />
  }
}

export default PrivatePage
