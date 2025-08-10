'use client'

import { RandomResult } from '@/types'
import { X, Play, Star, Calendar, Film, Tv, Zap, Monitor } from 'lucide-react'

interface RandomResultModalProps {
  result: RandomResult
  onClose: () => void
}

export function RandomResultModal({ result, onClose }: RandomResultModalProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Filme':
        return <Film className="h-6 w-6 text-blue-600" />
      case 'Série':
        return <Tv className="h-6 w-6 text-green-600" />
      case 'Anime':
        return <Zap className="h-6 w-6 text-purple-600" />
      case 'Desenho':
        return <Monitor className="h-6 w-6 text-orange-600" />
      default:
        return <Film className="h-6 w-6 text-gray-600" />
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">🎉 Sorteio Realizado!</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Result Card */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              {/* Type Badge */}
              <div className="flex items-center gap-2">
                {getTypeIcon(result.media.type)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(result.media.type)}`}>
                  {result.media.type}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
              {result.media.title}
            </h3>

            {/* TMDB Data if available */}
            {result.tmdbData && (
              <div className="mt-4 space-y-3">
                {result.tmdbData.overview && (
                  <p className="text-gray-700 leading-relaxed">
                    {result.tmdbData.overview}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {result.tmdbData.release_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(result.tmdbData.release_date).getFullYear()}</span>
                    </div>
                  )}
                  
                  {result.tmdbData.vote_average && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{result.tmdbData.vote_average.toFixed(1)}/10</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Streaming Providers */}
          {result.streamingProviders && result.streamingProviders.length > 0 ? (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Play className="h-5 w-5 text-green-600" />
                Onde Assistir
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {result.streamingProviders.map((provider) => (
                  <div
                    key={provider.provider_id}
                    className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                      {provider.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-xs text-gray-500">{provider.provider_name}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-700 font-medium">
                      {provider.provider_name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">
                Informações de streaming não disponíveis no momento.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Tente novamente mais tarde ou pesquise manualmente.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn-primary"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                // Aqui você pode implementar a funcionalidade de marcar como assistido
                onClose()
              }}
              className="flex-1 btn-secondary"
            >
              Marcar como Assistido
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
