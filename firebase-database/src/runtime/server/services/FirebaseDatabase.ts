import * as firebase from 'firebase/app'
import * as database from 'firebase/database'
import firebaseAdmin from 'firebase-admin'
import { UserCredential } from 'firebase/auth'
import { IUser } from '../interfaces/IUser'
import { FirebaseServiceAccount } from '../services/FirebaseServiceAccount'
import { FirebaseUserAccount } from '../services/FirebaseUserAccount'
import { FirebaseUser } from '../services/FirebaseUser'

export class FirebaseDatabase {
  private _config: any
  private _adminApp: firebaseAdmin.app.App | undefined
  private _app: firebase.FirebaseApp | undefined
  private _user: IUser | undefined
  private _userCredential: UserCredential | undefined

  constructor(config: any, user: IUser) {
    this._config = config
    this._user = user
    if (!this._adminApp) this._adminApp = new FirebaseServiceAccount(this._config).Initialise()
    if (!this._app) this._app = new FirebaseUserAccount(this._config).Initialise(`${this._user.email}-firebase-app`)
  }

  async Initialise(): Promise<this> {
    if (!this._userCredential) this._userCredential = await new FirebaseUser(this._user as IUser).GetCredential()

    return this
  }

  GetDatabase(): database.Database {
    return database.getDatabase(this._app)
  }
}

export default FirebaseDatabase