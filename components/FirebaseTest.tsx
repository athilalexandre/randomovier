'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'

export function FirebaseTest() {
  const [status, setStatus] = useState<string>('Checking...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('FirebaseTest: Checking Firebase initialization...')
    console.log('auth:', auth)
    console.log('db:', db)
    console.log('Environment variables:')
    console.log('API_KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Present' : '❌ Missing')
    console.log('AUTH_DOMAIN:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Present' : '❌ Missing')
    console.log('PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Present' : '❌ Missing')

    if (!auth || !db) {
      setStatus('❌ Firebase not initialized')
      setError('Firebase services are undefined')
    } else {
      setStatus('✅ Firebase initialized successfully')
      
      // Test authentication
      if (auth) {
        console.log('Auth service available')
        // Test if we can access auth methods
        try {
          const currentUser = auth.currentUser
          console.log('Current user:', currentUser)
        } catch (err) {
          console.error('Error accessing auth:', err)
          setError(`Auth error: ${err}`)
        }
      }
      
      // Test Firestore
      if (db) {
        console.log('Firestore service available')
      }
    }
  }, [])

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">Firebase Status Check</h3>
      <div className="space-y-2">
        <p><strong>Status:</strong> {status}</p>
        {error && (
          <p className="text-red-600"><strong>Error:</strong> {error}</p>
        )}
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-700">
            <strong>Debug Info:</strong>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Check browser console for detailed logs
          </p>
        </div>
      </div>
    </div>
  )
}
