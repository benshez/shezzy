
import * as database from 'firebase/database'
import { useRuntimeConfig } from '#app'
import { FirebaseDatabaseQuery } from '../server/services/FirebaseDatabaseQuery'

export const useFirebaseQuery = async <T>(database: database.Database): Promise<T> => {
  const pages: T = (await new FirebaseDatabaseQuery(database)
    .CreateSnapshot(useRuntimeConfig().FIREBASE_CONFIG.DATABASE.PATH))
    .Get()
    .ToJson<T>()

  return pages as T
}