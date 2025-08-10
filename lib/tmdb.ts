import { TMDBMovie, TMDBWatchProviders } from '@/types'

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export class TMDBClient {
  private static async makeRequest(endpoint: string): Promise<any> {
    const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=pt-BR`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    
    return response.json()
  }

  static async searchMovie(query: string): Promise<TMDBMovie[]> {
    const data = await this.makeRequest(`/search/movie?query=${encodeURIComponent(query)}`)
    return data.results || []
  }

  static async searchTV(query: string): Promise<TMDBMovie[]> {
    const data = await this.makeRequest(`/search/tv?query=${encodeURIComponent(query)}`)
    return data.results || []
  }

  static async getMovieDetails(movieId: number): Promise<TMDBMovie> {
    return this.makeRequest(`/movie/${movieId}`)
  }

  static async getTVDetails(tvId: number): Promise<TMDBMovie> {
    return this.makeRequest(`/tv/${tvId}`)
  }

  static async getWatchProviders(movieId: number, mediaType: 'movie' | 'tv'): Promise<TMDBWatchProviders> {
    return this.makeRequest(`/${mediaType}/${movieId}/watch/providers`)
  }

  static getPosterUrl(posterPath: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
    if (!posterPath) return ''
    return `https://image.tmdb.org/t/p/${size}${posterPath}`
  }

  static getProviderLogoUrl(logoPath: string): string {
    if (!logoPath) return ''
    return `https://image.tmdb.org/t/p/original${logoPath}`
  }
}
