'use client'

import { useAuth } from '@/hooks/useAuth'
import { LoginScreen } from '@/components/LoginScreen'
import { GroupSelection } from '@/components/GroupSelection'
import { Dashboard } from '@/components/Dashboard'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.groupId ? (
        <Dashboard />
      ) : (
        <GroupSelection />
      )}
    </div>
  )
}
