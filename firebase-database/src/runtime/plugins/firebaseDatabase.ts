import { FirebaseDatabaseQuery } from '../server/services/FirebaseDatabaseQuery';
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { FirebaseDatabase } from '../server/services/FirebaseDatabase'
import { IUser } from '../server/interfaces/IUser'

export default defineNuxtPlugin(async (nuxtApp) => {
  const user: IUser = {
    name: "Sheryl",
    given_name: "Sheryl",
    email: "benshez@gmail.com",
    picture: "",
    email_verified: true,
    sub: "benshez@gmail.com",
  }
  const config = useRuntimeConfig().FIREBASE_CONFIG

  const database = (await new FirebaseDatabase(config, user)
    .Initialise())
    .GetDatabase()
    
  const pages: string = (await new FirebaseDatabaseQuery(database)
    .CreateSnapshot(useRuntimeConfig().FIREBASE_CONFIG.DATABASE.PATH))
    .Get()
    //.Filter(config.DATABASE.SURVEY_FILTER.KEY, config.DATABASE.SURVEY_FILTER.VALUE)
    .ToJson()
  //console.log(pages)
})
