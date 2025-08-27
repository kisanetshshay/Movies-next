
export interface MediaItem {
    id: number
    title?: string
    name?: string
    poster_path: string | null
    overview: string
    release_date?: string
    first_air_date?: string
    media_type?: 'movie' | 'tv'
    onPlay?: (item: MediaItem) => void 
  }