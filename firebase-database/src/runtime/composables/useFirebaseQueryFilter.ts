
import * as database from 'firebase/database'
import { useRuntimeConfig } from '#app'
import { FirebaseDatabaseQuery } from '../server/services/FirebaseDatabaseQuery'

export const useFirebaseQueryFilter = async <T>(
  database: database.Database,
  haystack: string,
  needle: string): Promise<T> => {
    
  const pages: T = (await new FirebaseDatabaseQuery(database)
    .CreateSnapshot(useRuntimeConfig().FIREBASE_CONFIG.DATABASE.PATH))
    .Get()
    .Filter(haystack, needle)
    .ToJson<T>()

  return pages as T
}