'use strict'

import firebaseAdmin from 'firebase-admin'
import { FirebaseApplicationCache } from '../services/FirebaseApplicationCache'
import { ICacheOptions } from '../interfaces/ICache'

const CACHE_ARGS: ICacheOptions<firebaseAdmin.app.App> = {
  lru: {
    max: 100,
    ttl: 1_000 * 60 * 5,
    allowStale: true,
    updateAgeOnGet: true
  },
  cache: {
    key: '',
    request: {
      name: firebaseAdmin.initializeApp,
      args: {
        credential: null,
        databaseURL: null
      }
    }
  }
}


export class FirebaseServiceAccount {
  private _app: firebaseAdmin.app.App | undefined
  private _config: any

  constructor(config: any) {
    this._config = config
    CACHE_ARGS.cache.request.args = {
      credential: firebaseAdmin.credential.cert(this._config.SERVICE_ACCOUNT),
      databaseURL: this._config.USER_CONFIG.databaseURL
    }
  }

  Initialise(key?: string): firebaseAdmin.app.App {
    CACHE_ARGS.cache.key = key || ''

    if (key) {
      this._app = FirebaseApplicationCache.instance
        .Initialise<firebaseAdmin.app.App>(CACHE_ARGS)
        .GetOrCacheFromResult<firebaseAdmin.app.App>(CACHE_ARGS)
    } else {
      try {
        this._app = firebaseAdmin.initializeApp(CACHE_ARGS.cache.request.args)
      } catch {
        this._app = firebaseAdmin.app()
      }
    }

    return this._app as firebaseAdmin.app.App
  }
}

export default FirebaseServiceAccount