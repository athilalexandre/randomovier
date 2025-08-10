'use client'

import { useState } from 'react'
import { useAuthContext } from './AuthProvider'
import { useGroups } from '@/hooks/useGroups'
import { Users, Plus, UserPlus, Copy, Check } from 'lucide-react'

export function GroupSelection() {
  const { user, updateUserGroup } = useAuthContext()
  const { createGroup, joinGroup, loading } = useGroups()
  
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [copiedCode, setCopiedCode] = useState('')
  const [newGroupId, setNewGroupId] = useState('')

  const handleCreateGroup = async () => {
    if (!groupName.trim() || !user) return
    
    try {
      const groupId = await createGroup(groupName.trim(), user.uid)
      setNewGroupId(groupId)
      await updateUserGroup(groupId)
    } catch (error) {
      console.error('Erro ao criar grupo:', error)
      alert('Erro ao criar grupo. Tente novamente.')
    }
  }

  const handleJoinGroup = async () => {
    if (!inviteCode.trim() || !user) return
    
    try {
      const groupId = await joinGroup(inviteCode.trim().toUpperCase(), user.uid)
      await updateUserGroup(groupId)
    } catch (error) {
      console.error('Erro ao entrar no grupo:', error)
      alert('Erro ao entrar no grupo. Verifique o código de convite.')
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(text)
      setTimeout(() => setCopiedCode(''), 2000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  if (newGroupId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Grupo criado com sucesso!
            </h2>
            <p className="text-gray-600">
              Seu grupo &ldquo;{groupName}&rdquo; foi criado e você já está participando.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Código de convite:</p>
            <div className="flex items-center justify-between bg-white rounded border p-3">
              <code className="text-lg font-mono text-gray-900">{inviteCode}</code>
              <button
                onClick={() => copyToClipboard(inviteCode)}
                className="text-primary-600 hover:text-primary-700"
              >
                {copiedCode === inviteCode ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Compartilhe este código com seus amigos para que eles entrem no grupo
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full btn-primary"
          >
            Continuar para o Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-primary-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user?.displayName}!
          </h1>
          <p className="text-gray-600">
            Para começar, você precisa criar um grupo ou entrar em um existente
          </p>
        </div>

        <div className="space-y-4">
          {/* Criar Grupo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-100 p-2 rounded-lg">
                <Plus className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Criar um Grupo</h3>
            </div>
            
            {!showCreateForm ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full btn-primary"
              >
                Criar Novo Grupo
              </button>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome do grupo"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="input-field"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateGroup}
                    disabled={!groupName.trim() || loading}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Criando...' : 'Criar Grupo'}
                  </button>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Entrar em Grupo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <UserPlus className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Entrar em um Grupo</h3>
            </div>
            
            {!showJoinForm ? (
              <button
                onClick={() => setShowJoinForm(true)}
                className="w-full btn-secondary"
              >
                Entrar com Código
              </button>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Código de convite"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="input-field uppercase"
                  maxLength={6}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleJoinGroup}
                    disabled={!inviteCode.trim() || loading}
                    className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Entrando...' : 'Entrar no Grupo'}
                  </button>
                  <button
                    onClick={() => setShowJoinForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
