'use client'

import { MovieSection } from '@/components/ui/movie-section'
import { MovieHeader } from '@/components/ui/movie-header'
import { useFavorites } from '@/hooks/useFetchMovies'
import { useRouter } from 'next/navigation'

export default function FavoritesPage() {
  const router = useRouter()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

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
          <h1 className="text-4xl font-bold text-white mb-8">My Favorites</h1>
          
          {favorites.length > 0 ? (
            <MovieSection
              title="Your Favorite Movies & Shows"
              items={favorites}
              onFavoriteToggle={toggleFavorite}
              isFavorite={isFavorite}
              onPlay={handlePlay}
            />
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg">
                <p>No favorites yet!</p>
                <p className="mt-2">Start adding movies and TV shows to your favorites list.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}