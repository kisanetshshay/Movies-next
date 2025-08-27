'use client'

import { MovieSection } from '@/components/ui/movie-section'
import { MovieHeader } from '@/components/ui/movie-header'
import { usePopularMovies, useFavorites } from '@/hooks/useFetchMovies'
import { useRouter } from 'next/navigation'
import { MediaItem } from '@/types' 

export default function MoviesPage() {
  const router = useRouter()
  const { data: popularMoviesData, loading, error } = usePopularMovies()
  const { toggleFavorite, isFavorite } = useFavorites()

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const handlePlay = (item: MediaItem) => {
    const title = 'title' in item ? item.title : item.name
    console.log('Playing:', title || 'Unknown Title')
  }

  const handleFavoritesClick = () => {
    router.push('/favorites')
  }

  const handleAuthClick = () => {
    
  }

  return (
    <div className="min-h-screen bg-movie-darker">
      <MovieHeader
        onSearch={handleSearch}
        onAuthClick={handleAuthClick}
        onFavoritesClick={handleFavoritesClick}
      />
      
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Movies</h1>
          
          <MovieSection
            title="Popular Movies"
            items={popularMoviesData?.results || []}
            loading={loading}
            error={error}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
            onPlay={handlePlay}
          />
        </div>
      </main>
    </div>
  )
}