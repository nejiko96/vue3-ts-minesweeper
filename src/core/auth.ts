import {
  GoogleAuthProvider,
  UserCredential,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from '@firebase/auth'
import { doc, getDoc, setDoc } from '@firebase/firestore'
import { inject, InjectionKey, provide, Ref, watchEffect } from 'vue'
import { auth, db } from './firebase/client'

export type UserType = {
  id: string
  name: string | null
  email: string | null
  photoURL: string | null
}

export type UserRefType = Ref<UserType | null | undefined>

const userKey: InjectionKey<UserRefType> = Symbol('user')

export const provideUser: (user: UserRefType) => void = (user) => {
  provide(userKey, user)
}

export const injectUser: () => UserRefType | undefined = () => inject(userKey)

export const watchUser: (user: UserRefType) => void = (user) => {
  watchEffect((onCleanUp) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const ref = doc(db, `users/${firebaseUser.uid}`)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          const appUser = snap.data() as UserType
          user.value = appUser
        } else {
          const appUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            email: firebaseUser.email,
          }
          setDoc(ref, appUser).then(() => {
            user.value = appUser
          })
        }
      } else {
        user.value = null
      }
    })
    onCleanUp(unsubscribe)
  })
}

export const login: () => Promise<UserCredential> = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export const logout: () => Promise<void> = () => signOut(auth)
