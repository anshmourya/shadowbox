import { Client, Databases } from 'appwrite'

const useUser = () => {
  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID
  const userCollection = process.env.NEXT_PUBLIC_USER_ID

  const client = new Client()
  const databases = new Databases(client)
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_KEY)

  const addUser = async (userId, userData) => {
    try {
      await databases.createDocument(
        databaseId,
        userCollection,
        userId,
        userData,
      )
      return true
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const getUerDetail = async (userId) => {
    try {
      return await databases.getDocument(databaseId, userCollection, userId)
    } catch (error) {
      console.error(error)
      throw new Error("Couldn't get user details from database.")
    }
  }
  return { addUser, getUerDetail }
}

export default useUser
