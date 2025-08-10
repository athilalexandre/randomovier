'use client'

import { useAuth } from '@/hooks/useAuth'
import { LoginScreen } from '@/components/LoginScreen'
import { GroupSelection } from '@/components/GroupSelection'
import { Dashboard } from '@/components/Dashboard'
import { FirebaseTest } from '@/components/FirebaseTest'

export default function Home() {
  const { user, loading, error } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Erro de Configuração
            </h2>
            <p className="text-gray-600 mb-4">
              {error}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <p className="text-sm text-gray-600 mb-2">Para resolver:</p>
              <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                <li>Crie um arquivo <code className="bg-gray-200 px-1 rounded">.env.local</code> na raiz do projeto</li>
                <li>Adicione suas credenciais do Firebase</li>
                <li>Reinicie o servidor de desenvolvimento</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Temporary: Show Firebase test component
  return (
    <div className="min-h-screen bg-gray-50">
      <FirebaseTest />
      
      {!user ? (
        <LoginScreen />
      ) : (
        <div>
          {user.groupId ? (
            <Dashboard />
          ) : (
            <GroupSelection />
          )}
        </div>
      )}
    </div>
  )
}
