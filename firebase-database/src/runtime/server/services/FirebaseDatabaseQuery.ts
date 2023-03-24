import { Database, ref, child, get, DataSnapshot } from 'firebase/database'
import filter from 'lodash/filter'
import { IPage } from '../interfaces/IPage'

export class FirebaseDatabaseQuery {
  private _database: Database | undefined
  private _response: Array<IPage> = []
  private _snapshot: DataSnapshot | undefined

  constructor(database: Database) {
    this._database = database
  }

  async CreateSnapshot(path: string): Promise<this> {
    if (this._database) {
      const dbRef = ref(this._database)
      this._snapshot = await get(child(dbRef, path))
    }

    return this
  }

  Get(): this {
    if (this._snapshot?.exists()) {
      this._response = this._snapshot.val()
    }

    return this
  }

  Filter(haystack: string, needle: string): this {
    this._response = filter(this._response, [haystack, needle])

    return this
  }

  ToJson<T>(): T {
    return this._response as T
  }
}