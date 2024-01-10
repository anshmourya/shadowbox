'use client'
import React, { useEffect } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { useAccount } from '@/hooks/useAccount'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useAuth from '@/context/Auth'
import { useQueryClient } from '@tanstack/react-query'
const Logout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { logout } = useAccount()
  const { user } = useAuth()
  const logoutuser = async () => {
    const sessionEnd = await logout()
    if (sessionEnd) {
      await queryClient.resetQueries(['user'])
      queryClient.removeQueries(['user'])
      router.push('/signin')
    } else {
      toast.error('something went wrong...')
    }
  }

  return (
    user && (
      <li
        className="flex items-center gap-2 cursor-pointer"
        onClick={logoutuser}
      >
        <IoIosLogOut />
        Logout
      </li>
    )
  )
}

export default Logout
