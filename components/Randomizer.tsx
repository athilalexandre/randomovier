'use client'

import { Shuffle, Film, Tv, Zap } from 'lucide-react'

interface RandomizerProps {
  onRandomize: () => void
  unwatchedCount: number
}

export function Randomizer({ onRandomize, unwatchedCount }: RandomizerProps) {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Shuffle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Sortear um Título!
          </h2>
          <p className="text-lg md:text-xl text-primary-100">
            Deixe o destino escolher seu próximo entretenimento
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={onRandomize}
            disabled={unwatchedCount === 0}
            className="bg-white text-primary-600 hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed text-2xl md:text-3xl font-bold py-6 px-12 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {unwatchedCount === 0 ? 'Lista vazia!' : '🎲 SORTEAR! 🎲'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-primary-100">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5" />
            <span className="text-sm">Filmes</span>
          </div>
          <div className="flex items-center gap-2">
            <Tv className="h-5 w-5" />
            <span className="text-sm">Séries</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span className="text-sm">Animes</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-primary-100">
            <span className="font-semibold">{unwatchedCount}</span> títulos disponíveis para sorteio
          </p>
        </div>
      </div>
    </div>
  )
}
