'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface AddMediaFormProps {
  onSubmit: (title: string, type: string) => void
  onCancel: () => void
}

export function AddMediaForm({ onSubmit, onCancel }: AddMediaFormProps) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<'Filme' | 'Série' | 'Anime' | 'Desenho'>('Filme')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onSubmit(title.trim(), type)
    setTitle('')
    setType('Filme')
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary-600" />
          Adicionar Novo Item
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Interestelar, One Piece, Breaking Bad..."
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="input-field"
          >
            <option value="Filme">Filme</option>
            <option value="Série">Série</option>
            <option value="Anime">Anime</option>
            <option value="Desenho">Desenho</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Adicionar à Lista
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
