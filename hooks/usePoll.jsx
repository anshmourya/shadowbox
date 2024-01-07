import { Client, Databases, ID, Query } from 'appwrite'
import useAuth from '@/context/Auth'
import { toast } from 'sonner'
const usePoll = () => {
  const { user } = useAuth()
  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID
  const pollCollection = process.env.NEXT_PUBLIC_POLL_ID
  const optionCollection = process.env.NEXT_PUBLIC_OPTION_ID

  const client = new Client()
  const databases = new Databases(client)
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_KEY)

  const createPoll = async (pollData) => {
    try {
      const newPoll = await databases.createDocument(
        databaseId,
        pollCollection,
        ID.unique(),
        {
          user: user.$id,
          ...pollData,
        },
      )
      toast.success('new poll created successfully')
      console.log(newPoll)
      return newPoll
    } catch (error) {
      console.error(error)
    }
  }

  const getPolls = async () => {
    try {
      const polls = await databases.listDocuments(databaseId, pollCollection, [
        Query.equal('userId', user.$id),
      ])
      console.log(polls)
      return polls
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const updatePoll = async (pollData, pollId) => {
    try {
      const response = await databases.updateDocument(
        databaseId,
        pollCollection,
        pollId,
        pollData,
      )
      console.log(response)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const deletePoll = async (pollId) => {
    try {
      const response = await databases.deleteDocument(
        databaseId,
        pollCollection,
        pollId,
      )
      console.log(response)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return { createPoll, getPolls, deletePoll, updatePoll }
}

export default usePoll