'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MovieSection } from '@/components/ui/movie-section'
import { MovieHeader } from '@/components/ui/movie-header'
import { useSearchMovies, useSearchTVShows, useFavorites } from '@/hooks/useFetchMovies'
import { useRouter } from 'next/navigation'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const { data: movieResults, loading: movieLoading, searchMovies } = useSearchMovies()
  const { data: tvResults, loading: tvLoading, searchTVShows } = useSearchTVShows()
  const { toggleFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      performSearch(q)
    }
  }, [searchParams])

  const performSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      searchMovies(searchQuery)
      searchTVShows(searchQuery)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      performSearch(query.trim())
    }
  }

  const handleHeaderSearch = (searchQuery: string) => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handlePlay = (item: any) => {
    console.log('Playing:', 'title' in item ? item.title : item.name)
  }

  const handleFavoritesClick = () => {
    router.push('/favorites')
  }

  const handleAuthClick = () => {
    
  }

  const totalResults = (movieResults?.results?.length || 0) + (tvResults?.results?.length || 0)
  const isLoading = movieLoading || tvLoading

  return (
    <div className="min-h-screen bg-movie-darker">
      <MovieHeader
        onSearch={handleHeaderSearch}
        onAuthClick={handleAuthClick}
        onFavoritesClick={handleFavoritesClick}
      />
      
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Search</h1>
          
          {}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for movies and TV shows..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-20 py-3 text-lg bg-movie-light/10 border-gray-700/50 text-white placeholder-gray-400 focus:border-movie-primary"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 movie-gradient text-white"
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>

          {}
          {query && (
            <div className="mb-6">
              <p className="text-gray-400">
                {totalResults > 0 ? (
                  `Found ${totalResults} results for "${query}"`
                ) : isLoading ? (
                  `Searching for "${query}"...`
                ) : (
                  `No results found for "${query}"`
                )}
              </p>
            </div>
          )}

          {}
          {movieResults?.results && movieResults.results.length > 0 && (
            <MovieSection
              title="Movies"
              items={movieResults.results}
              loading={movieLoading}
              onFavoriteToggle={toggleFavorite}
              isFavorite={isFavorite}
              onPlay={handlePlay}
            />
          )}

          {}
          {tvResults?.results && tvResults.results.length > 0 && (
            <MovieSection
              title="TV Shows"
              items={tvResults.results}
              loading={tvLoading}
              onFavoriteToggle={toggleFavorite}
              isFavorite={isFavorite}
              onPlay={handlePlay}
            />
          )}

          {}
          {query && !isLoading && totalResults === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg">
                <p>No results found for "{query}"</p>
                <p className="mt-2">Try searching with different keywords.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}