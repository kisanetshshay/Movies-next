'use client'

import { MovieSection } from '@/components/ui/movie-section'
import { MovieHeader } from '@/components/ui/movie-header'
import { useTrendingMovies, useFavorites } from '@/hooks/useFetchMovies'
import { useRouter } from 'next/navigation'
import { MediaItem } from '@/types' 

export default function TrendingPage() {
  const router = useRouter()
  const { data: trendingData, loading: trendingLoading, error: trendingError } = useTrendingMovies('week')
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
          <h1 className="text-4xl font-bold text-white mb-8">Trending Now</h1>
          
          <MovieSection
            title="Trending This Week"
            items={trendingData?.results || []}
            loading={trendingLoading}
            error={trendingError}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
            onPlay={handlePlay}
          />
        </div>
      </main>
    </div>
  )
}