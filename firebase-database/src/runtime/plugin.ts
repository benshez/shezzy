import { FirebaseDatabaseQuery } from '../runtime/server/services/FirebaseDatabaseQuery';
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { FirebaseDatabase } from '../runtime/server/services/FirebaseDatabase'
import { IUser } from '../runtime/server/interfaces/IUser'
import { IPage } from '../runtime/server/interfaces/IPage'
import { useState } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const user: IUser = useState('user').value as IUser

  const config = useRuntimeConfig().FIREBASE_CONFIG

  //console.log(user)
  // const database = (await new FirebaseDatabase(config, user)
  //   .Initialise())
  //   .GetDatabase()

  // const pages: Object = (await new FirebaseDatabaseQuery(database)
  //   .CreateSnapshot(useRuntimeConfig().FIREBASE_CONFIG.DATABASE.PATH))
  //   .Get()
  //   //.Filter(config.DATABASE.SURVEY_FILTER.KEY, config.DATABASE.SURVEY_FILTER.VALUE)
  //   .ToJson<Array<IPage>>()

  //   nuxtApp.vueApp.provide('pages', pages)
  //   nuxtApp.provide('pages', pages)
})
