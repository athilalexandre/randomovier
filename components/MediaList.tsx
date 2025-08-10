'use client'

import { Media } from '@/types'
import { Film, Tv, Zap, Monitor, Check, Trash2, Eye, EyeOff } from 'lucide-react'

interface MediaListProps {
  mediaList: Media[]
  loading: boolean
  onToggleWatched: (mediaId: string, watched: boolean) => void
  onRemove: (mediaId: string) => void
  currentUserId?: string
}

export function MediaList({ mediaList, loading, onToggleWatched, onRemove, currentUserId }: MediaListProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Filme':
        return <Film className="h-5 w-5 text-blue-600" />
      case 'Série':
        return <Tv className="h-5 w-5 text-green-600" />
      case 'Anime':
        return <Zap className="h-5 w-5 text-purple-600" />
      case 'Desenho':
        return <Monitor className="h-5 w-5 text-orange-600" />
      default:
        return <Film className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Filme':
        return 'bg-blue-100 text-blue-800'
      case 'Série':
        return 'bg-green-100 text-green-800'
      case 'Anime':
        return 'bg-purple-100 text-purple-800'
      case 'Desenho':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (mediaList.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Film className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Lista vazia</h3>
        <p className="text-gray-500">
          Adicione filmes, séries, animes ou desenhos para começar!
        </p>
      </div>
    )
  }

  const unwatchedMedia = mediaList.filter(media => !media.watched)
  const watchedMedia = mediaList.filter(media => media.watched)

  return (
    <div className="space-y-6">
      {/* Títulos não assistidos */}
      {unwatchedMedia.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-600" />
            Para Assistir ({unwatchedMedia.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {unwatchedMedia.map((media) => (
              <MediaCard
                key={media.id}
                media={media}
                onToggleWatched={onToggleWatched}
                onRemove={onRemove}
                currentUserId={currentUserId}
                getTypeIcon={getTypeIcon}
                getTypeColor={getTypeColor}
              />
            ))}
          </div>
        </div>
      )}

      {/* Títulos assistidos */}
      {watchedMedia.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <EyeOff className="h-5 w-5 text-gray-600" />
            Já Assistidos ({watchedMedia.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {watchedMedia.map((media) => (
              <MediaCard
                key={media.id}
                media={media}
                onToggleWatched={onToggleWatched}
                onRemove={onRemove}
                currentUserId={currentUserId}
                getTypeIcon={getTypeIcon}
                getTypeColor={getTypeColor}
                isWatched
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface MediaCardProps {
  media: Media
  onToggleWatched: (mediaId: string, watched: boolean) => void
  onRemove: (mediaId: string) => void
  currentUserId?: string
  getTypeIcon: (type: string) => React.ReactNode
  getTypeColor: (type: string) => string
  isWatched?: boolean
}

function MediaCard({ 
  media, 
  onToggleWatched, 
  onRemove, 
  currentUserId, 
  getTypeIcon, 
  getTypeColor,
  isWatched = false 
}: MediaCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 p-4 transition-all duration-200 hover:shadow-lg ${
      isWatched ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getTypeIcon(media.type)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(media.type)}`}>
            {media.type}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleWatched(media.id, !isWatched)}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title={isWatched ? 'Marcar como não assistido' : 'Marcar como assistido'}
          >
            {isWatched ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
          
          {currentUserId === media.addedBy && (
            <button
              onClick={() => onRemove(media.id)}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
              title="Remover item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {media.title}
      </h4>

      <div className="text-sm text-gray-500">
        <p>Adicionado por: {media.addedBy}</p>
        <p>Data: {media.addedAt.toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  )
}
