'use strict'

import { FirebaseApp, initializeApp, getApp, deleteApp } from 'firebase/app'
import { FirebaseApplicationCache } from '../services/FirebaseApplicationCache'
import { ICacheOptions } from '../interfaces/ICache'

const CACHE_ARGS: ICacheOptions<FirebaseApp> = {
  lru: {
    max: 100,
    ttl: 1_000 * 60 * 5,
    allowStale: true,
    updateAgeOnGet: true,
    dispose: (value: any) => {
      deleteApp(value)
    }
  },
  cache: {
    key: '',
    request: {
      name: initializeApp,
      args: { }
    }
  }
}

export class FirebaseUserAccount {
  private _app: FirebaseApp | undefined
  private _config: any

  constructor(config: any) {
    this._config = config
    CACHE_ARGS.cache.request.args = this._config.USER_CONFIG
  }

  Initialise(key: string): FirebaseApp {
    CACHE_ARGS.cache.key = key

    if (key) {
      this._app = <FirebaseApp>FirebaseApplicationCache.instance
        .Initialise<FirebaseApp>(CACHE_ARGS)
        .GetOrCacheFromResult<FirebaseApp>(CACHE_ARGS)
    } else {
      try {
        this._app = initializeApp(CACHE_ARGS.cache.request.args)
      } catch {
        this._app = getApp()
      }
    }

    return this._app
  }
}

export default FirebaseUserAccount