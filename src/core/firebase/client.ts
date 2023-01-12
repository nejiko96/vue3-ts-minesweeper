// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CLIENT_CONFIG)

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig)
}

// const analytics = getAnalytics(app)

export const storage = getStorage()
export const auth = getAuth()
export const functions = getFunctions()
export const db = getFirestore()
