'use strict'

import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import firebaseAdmin from 'firebase-admin'
import { getAuth, signInWithCustomToken, UserCredential } from 'firebase/auth'
import { IUser } from '../interfaces/IUser'

export class FirebaseUser {
  private _firebaseUserRecord: UserRecord | undefined
  private _user: IUser | undefined
  private _firebaseUserCredential: UserCredential | undefined

  constructor(user: IUser) {
    this._user = user
  }

  async _Initialise(): Promise<UserRecord> {
    try {
      this._firebaseUserRecord = await firebaseAdmin.auth().getUser(this._user?.email as string)
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this._firebaseUserRecord = await firebaseAdmin
          .auth()
          .createUser(
            {
              providerToLink: this._user?.sub,
              displayName: this._user?.given_name,
              emailVerified: this._user?.email_verified,
              uid: this._user?.email,
              email: this._user?.email,
              phoneNumber: this._user?.phone_number,
              photoURL: this._user?.picture
            }
          )
      }
    } finally {
      return this._firebaseUserRecord as UserRecord
    }
  }

  async _CreateCustomToken(): Promise<string> {
    return await firebaseAdmin
      .auth()
      .createCustomToken(this._user?.email as string, { admin: true })
  }

  async GetCredential(): Promise<UserCredential> {
    await this._Initialise()
    this._firebaseUserCredential = await signInWithCustomToken(getAuth(), await this._CreateCustomToken())
    return this._firebaseUserCredential
  }
}

export default FirebaseUser