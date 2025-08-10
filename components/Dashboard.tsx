'use client'

import { useState } from 'react'
import { useAuthContext } from './AuthProvider'
import { useMedia } from '@/hooks/useMedia'
import { Header } from './Header'
import { Randomizer } from './Randomizer'
import { MediaList } from './MediaList'
import { AddMediaForm } from './AddMediaForm'
import { RandomResultModal } from './RandomResultModal'
import { RandomResult } from '@/types'

export function Dashboard() {
  const { user } = useAuthContext()
  const { mediaList, loading, addMedia, toggleWatched, removeMedia, getRandomMedia } = useMedia(user?.groupId || '')
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [randomResult, setRandomResult] = useState<RandomResult | null>(null)
  const [showRandomModal, setShowRandomModal] = useState(false)

  const handleRandomize = async () => {
    const randomMedia = getRandomMedia()
    
    if (!randomMedia) {
      alert('Não há títulos não assistidos na lista!')
      return
    }

    // Aqui você pode integrar com a API do TMDb para buscar metadados
    // Por enquanto, vamos usar apenas os dados básicos
    const result: RandomResult = {
      media: randomMedia,
    }

    setRandomResult(result)
    setShowRandomModal(true)
  }

  const handleAddMedia = async (title: string, type: string) => {
    if (!user) return
    
    try {
      await addMedia(title, type as any, user.uid)
      setShowAddForm(false)
    } catch (error) {
      console.error('Erro ao adicionar mídia:', error)
      alert('Erro ao adicionar mídia. Tente novamente.')
    }
  }

  const handleToggleWatched = async (mediaId: string, watched: boolean) => {
    try {
      await toggleWatched(mediaId, watched)
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status. Tente novamente.')
    }
  }

  const handleRemoveMedia = async (mediaId: string) => {
    if (!confirm('Tem certeza que deseja remover este item?')) return
    
    try {
      await removeMedia(mediaId)
    } catch (error) {
      console.error('Erro ao remover mídia:', error)
      alert('Erro ao remover mídia. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Randomizer Section */}
        <div className="mb-12">
          <Randomizer 
            onRandomize={handleRandomize}
            unwatchedCount={mediaList.filter(m => !m.watched).length}
          />
        </div>

        {/* Add Media Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Lista de Mídia</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary"
            >
              {showAddForm ? 'Cancelar' : 'Adicionar Item'}
            </button>
          </div>
          
          {showAddForm && (
            <AddMediaForm 
              onSubmit={handleAddMedia}
              onCancel={() => setShowAddForm(false)}
            />
          )}
        </div>

        {/* Media List */}
        <MediaList
          mediaList={mediaList}
          loading={loading}
          onToggleWatched={handleToggleWatched}
          onRemove={handleRemoveMedia}
          currentUserId={user?.uid}
        />
      </main>

      {/* Random Result Modal */}
      {showRandomModal && randomResult && (
        <RandomResultModal
          result={randomResult}
          onClose={() => {
            setShowRandomModal(false)
            setRandomResult(null)
          }}
        />
      )}
    </div>
  )
}
