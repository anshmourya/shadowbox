'use client'
import { Client, Account, ID } from 'appwrite'
import useUser from './useUser'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useAccount = () => {
  const router = useRouter()
  const { addUser } = useUser()
  const client = new Client()
  const account = new Account(client)

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_KEY)

  const createSession = async (name, password) => {
    try {
      const sessionCreation = await account.createEmailSession(
        name.concat('@gmail.com'),
        password,
      )
      return sessionCreation
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const createAccount = async (userData) => {
    try {
      const accountCreation = await account.create(
        ID.unique(),
        userData.name.concat('@gmail.com'), //make name a account to keep user to give his email address.
        userData.password,
        userData.name,
      )
      //add user to database after creating the account
      if (accountCreation) {
        await addUser(accountCreation.$id, { name: userData.name })
        toast.success('account created successfully')
        router.push('/signin')
      }
      return accountCreation
    } catch (error) {
      router.push('/signin')
      console.error(error)
      throw error
    }
  }
  const getCurrentUser = async () => {
    try {
      const user = await account.get()
      return user
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const isLogged = async () => {
    try {
      const data = await getCurrentUser()
      return Boolean(data)
    } catch (error) {
      return false
    }
  }
  const logout = async () => {
    try {
      const deleteSession = await account.deleteSession('current')
      toast.success('you have been logged out.')
      console.log(deleteSession)
      return deleteSession
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return { createAccount, createSession, isLogged, getCurrentUser, logout }
}
