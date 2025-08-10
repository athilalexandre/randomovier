export interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
  groupId?: string
}

export interface Group {
  id: string
  groupName: string
  inviteCode: string
  members: string[]
  ownerId: string
  createdAt: Date
}

export interface Media {
  id: string
  title: string
  type: 'Filme' | 'Série' | 'Anime' | 'Desenho'
  addedBy: string
  groupId: string
  watched: boolean
  tmdbId?: number
  addedAt: Date
}

export interface TMDBMovie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

export interface TMDBProvider {
  provider_id: number
  provider_name: string
  logo_path: string
}

export interface TMDBWatchProviders {
  results: {
    BR?: {
      flatrate?: TMDBProvider[]
      rent?: TMDBProvider[]
      buy?: TMDBProvider[]
    }
  }
}

export interface RandomResult {
  media: Media
  tmdbData?: TMDBMovie
  streamingProviders?: TMDBProvider[]
}
