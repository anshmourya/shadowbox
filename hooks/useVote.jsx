import useAuth from '@/context/Auth'
import { Client, Databases, ID } from 'appwrite'
const useVote = () => {
  const { user } = useAuth()
  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID
  const voteCollection = process.env.NEXT_PUBLIC_VOTES_ID
  const client = new Client()
  const databases = new Databases(client)
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_KEY)

  const addVote = async (vote) => {
    console.log({
      ...vote,
      user: user.$id,
    })
    try {
    const newVote = await databases.createDocument(
      databaseId,
      voteCollection,
      ID.unique(),
      {
        ...vote,
        user: user.$id,
      },
    )
    console.log(newVote)
      return newVote
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const removeVote = async (voteId) => {
    try {
      const deleteVote = await databases.deleteDocument(
        databaseId,
        voteCollection,
        voteId,
      )
      return deleteVote
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return { addVote, removeVote }
}

export default useVote
