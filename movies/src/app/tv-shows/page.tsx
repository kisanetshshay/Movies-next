'use client'

import { MovieSection } from '@/components/ui/movie-section'
import { MovieHeader } from '@/components/ui/movie-header'
import { useLatestTVShows, useFavorites } from '@/hooks/useFetchMovies'
import { useRouter } from 'next/navigation'

export default function TVShowsPage() {
  const router = useRouter()
  const { data: latestTVData, loading: latestTVLoading, error: latestTVError } = useLatestTVShows()
  const { toggleFavorite, isFavorite } = useFavorites()

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const handlePlay = (item: any) => {
    console.log('Playing:', 'title' in item ? item.title : item.name)
  }

  const handleFavoritesClick = () => {
    router.push('/favorites')
  }

  const handleAuthClick = () => {
    // This will be handled in the MovieHeader component
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
          <h1 className="text-4xl font-bold text-white mb-8">TV Shows</h1>
          
          <MovieSection
            title="Latest TV Shows"
            items={latestTVData?.results || []}
            loading={latestTVLoading}
            error={latestTVError}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
            onPlay={handlePlay}
          />
        </div>
      </main>
    </div>
  )
}
