'use client'

import { useAuthContext } from './AuthProvider'
import { LogOut, User, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { user, logout } = useAuthContext()
  const [copiedCode, setCopiedCode] = useState('')

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const copyInviteCode = async () => {
    // Aqui você pode implementar a lógica para copiar o código de convite
    // Por enquanto, vamos usar um código de exemplo
    const inviteCode = 'ABC123'
    try {
      await navigator.clipboard.writeText(inviteCode)
      setCopiedCode(inviteCode)
      setTimeout(() => setCopiedCode(''), 2000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary-600">Randomovier</h1>
            
            {/* Código de convite */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Código:</span>
              <code className="font-mono text-sm bg-white px-2 py-1 rounded border">
                ABC123
              </code>
              <button
                onClick={copyInviteCode}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Copiar código"
              >
                {copiedCode === 'ABC123' ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* User info */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full"
                />
              )}
            </div>

            {/* Mobile user info */}
            <div className="md:hidden flex items-center gap-2">
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm font-medium text-gray-900">{user?.displayName}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Mobile invite code */}
        <div className="md:hidden mt-3 flex items-center justify-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <span className="text-sm text-gray-600">Código de convite:</span>
          <code className="font-mono text-sm bg-white px-2 py-1 rounded border">
            ABC123
          </code>
          <button
            onClick={copyInviteCode}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="Copiar código"
          >
            {copiedCode === 'ABC123' ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
