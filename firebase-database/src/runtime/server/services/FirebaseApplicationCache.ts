'use strict'

import LRU from 'lru-cache'
import { ICacheOptions } from '../interfaces/ICache'

export class FirebaseApplicationCache {
  private static _instance = new FirebaseApplicationCache()
  private _appCache: LRU<string, any> | undefined

  constructor() { }

  Initialise<T>(options: ICacheOptions<T>): this {
    if (!this._appCache) {
      this._appCache = new LRU<string, T>(options.lru)
    }

    return this
  }

  Insert(
    key: string,
    value: any
  ): void {
    this._appCache?.set(key, value)
  }

  Get(key: string): any {
    return this._appCache?.get(key)
  }

  Delete(key: string): any {
    this._appCache?.delete(key)
  }

  GetOrCacheFromResult<T>(options: ICacheOptions<T>): any {
    let result = this.Get(options.cache.key)

    if (!result) {
      result = options.cache.request.name(options.cache.request.args)
      this.Insert(options.cache.key, result)
    }

    return result
  }

  static get instance() {
    return this._instance
  }

}

export default FirebaseApplicationCache.instance