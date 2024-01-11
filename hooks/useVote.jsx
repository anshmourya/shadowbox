import useAuth from '@/context/Auth'
import { Client, Databases, ID, Query } from 'appwrite'
import { useQueryClient } from '@tanstack/react-query'
const useVote = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID
  const voteCollection = process.env.NEXT_PUBLIC_VOTES_ID
  const client = new Client()
  const databases = new Databases(client)
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_KEY)

  const addVote = async (vote) => {
    try {
      const VoteExist = queryClient
        .getQueryData(['current votes'])
        .some((poll) => poll === vote.poll)

      //delete if any poll exist for the current user
      if (!VoteExist) {
        await databases.createDocument(
          databaseId,
          voteCollection,
          ID.unique(),
          {
            ...vote,
            user: user.$id,
          },
        )
        return true
      } else {
        console.warn('vote already added')
        return false
      }
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

  const getCurrentUserVotes = async () => {
    try {
      const currentUservotes = await databases.listDocuments(
        databaseId,
        voteCollection,

        [Query.equal('user', [user.$id])],
      )

      return currentUservotes.documents.reduce((poll, vote) => {
        poll.push(vote.poll.$id)
        return poll
      }, [])
    } catch (error) {
      console.error(error)
      throw new error('cant get user votes, something went wrong...')
    }
  }
  return { addVote, removeVote, getCurrentUserVotes }
}

export default useVote
