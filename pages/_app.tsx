import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Login from "./login"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../config/firebase'
import Loading from "../components/Loading"
import { useEffect } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'


function MyApp({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading, _error] = useAuthState(auth)

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, 'users', loggedInUser?.email as string),
          {
            email: loggedInUser?.email,  // luu du lieu nguoi dung
            lastSeen: serverTimestamp(), //Time
            photoURL: loggedInUser?.photoURL //imageEmail
          },
          { merge: true } //chi update khi no thay doi
        )
      } catch (error) {
        console.log('setting info in database', error)
      }
    }

    if (loggedInUser) {
      setUserInDb()
    }
  }, [loggedInUser])


  if (loading) return <Loading></Loading>

  if (!loggedInUser) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
