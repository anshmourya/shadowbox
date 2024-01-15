'use client'
import { Client, Account, ID } from 'appwrite'
import useUser from './useUser'
import { toast } from 'sonner'

export const useAccount = () => {
  const { addUser } = useUser()
  const client = new Client()
  const account = new Account(client)

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_KEY)

  const createSession = async (name, password) => {
    try {
      await account.createEmailSession(name.concat('@gmail.com'), password)
      return true
    } catch (error) {
      console.error(error)
      if (error.code === 401) {
        toast.error(
          'Invalid credentials. Please check the username and password.',
        )
      } else if (error.code === 429) {
        toast.error(
          'Too Many Requests has been received, please try again later.',
        )
      } else if (error.code === 500) {
        toast.error('server issue, refresh the page and try again.')
      }
      return false
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
      // add user to database after creating the account
      // TODO: even though the data is stored in the database it still returns the error. fix this.
      await addUser(accountCreation.$id, { name: userData.name })
      return true
    } catch (error) {
      if (error.code === 401) {
        toast.error(
          'Invalid credentials. Please check the username and password.',
        )
      } else if (error.code === 429) {
        toast.error(
          'Too Many Requests has been received, please try again later.',
        )
      } else if (error.code === 500) {
        toast.error('server issue, refresh the page and try again.')
      } else if (error.code === 409) {
        toast.error(
          ' A user with the same id, username, already exists in this project.',
        )
      }
      return false
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
      await account.deleteSession('current')
      toast.success('you have been logged out.')
      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return { createAccount, createSession, isLogged, getCurrentUser, logout }
}
