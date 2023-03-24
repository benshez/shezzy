import * as database from 'firebase/database'
import { useRuntimeConfig } from '#app'
import { FirebaseDatabase } from '../server/services/FirebaseDatabase'
import { IUser } from '../server/interfaces/IUser'

export const useFirebaseDatabase = async (user: IUser): Promise<database.Database> => {
  const config = useRuntimeConfig().FIREBASE_CONFIG

  const database = (await new FirebaseDatabase(config, user)
    .Initialise())
    .GetDatabase()
    
  return database
}
