'use client'

import { useState, useEffect } from 'react'
import { User as FirebaseUser, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { User } from '@/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Verificar se o usuário já existe no Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        
        if (userDoc.exists()) {
          setUser(userDoc.data() as User)
        } else {
          // Criar novo usuário no Firestore
          const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
          }
          
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser)
          setUser(newUser)
        }
      } else {
        setUser(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw error
    }
  }

  const updateUserGroup = async (groupId: string) => {
    if (!user) return
    
    const updatedUser = { ...user, groupId }
    await setDoc(doc(db, 'users', user.uid), updatedUser)
    setUser(updatedUser)
  }

  return {
    user,
    loading,
    signInWithGoogle,
    logout,
    updateUserGroup,
  }
}
