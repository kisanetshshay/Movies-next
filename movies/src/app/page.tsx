'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/ui/hero-section'
import { MovieSection } from '@/components/ui/movie-section'
import { MovieHeader } from '@/components/ui/movie-header'
import { useTrendingMovies, useLatestMovies, useLatestTVShows, useFavorites } from '@/hooks/useFetchMovies'
import { Movie, TVShow } from '@/utils/fetchMovies'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, signIn, signUp, signOut } = useAuth()
  const [featuredItem, setFeaturedItem] = useState<Movie | TVShow | null>(null)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  
  const { data: trendingData, loading: trendingLoading } = useTrendingMovies()
  const { data: latestMoviesData, loading: latestMoviesLoading, error: latestMoviesError } = useLatestMovies()
  const { data: latestTVData, loading: latestTVLoading, error: latestTVError } = useLatestTVShows()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  
  useEffect(() => {
    if (trendingData?.results && trendingData.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, trendingData.results.length))
      setFeaturedItem(trendingData.results[randomIndex])
    }
  }, [trendingData])

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const handlePlay = (item: Movie | TVShow) => {
    console.log('Playing:', 'title' in item ? item.title : item.name)
  }

  const handleAddToList = (item: Movie | TVShow) => {
    toggleFavorite(item)
  }

  const handleMoreInfo = (item: Movie | TVShow) => {
    console.log('More info for:', 'title' in item ? item.title : item.name)
  }

  const handleFavoritesClick = () => {
    router.push('/favorites')
  }

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut()
    } else {
      setAuthDialogOpen(true)
    }
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signIn(email, password)
      setAuthDialogOpen(false)
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Failed to sign in')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    try {
      await signUp(email, password, name)
      setAuthDialogOpen(false)
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Failed to sign up')
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-movie-darker">
      <MovieHeader
        onSearch={handleSearch}
        onAuthClick={handleAuthClick}
        isAuthenticated={isAuthenticated}
        onFavoritesClick={handleFavoritesClick}
      />
      
      <main>
        {}
        <HeroSection
          featuredItem={featuredItem}
          onPlay={handlePlay}
          onAddToList={handleAddToList}
          onMoreInfo={handleMoreInfo}
        />

        {}
        <div className="space-y-8 pb-16">
          {}
          <MovieSection
            title="Trending Now"
            items={trendingData?.results || []}
            loading={trendingLoading}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
            onPlay={handlePlay}
          />

          {}
          <MovieSection
            title="Latest Movies"
            items={latestMoviesData?.results || []}
            loading={latestMoviesLoading}
            error={latestMoviesError}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
            onPlay={handlePlay}
          />

          {}
          <MovieSection
            title="Latest TV Shows"
            items={latestTVData?.results || []}
            loading={latestTVLoading}
            error={latestTVError}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
            onPlay={handlePlay}
          />

          {}
          {favorites.length > 0 && (
            <MovieSection
              title="My List"
              items={favorites}
              onFavoriteToggle={toggleFavorite}
              isFavorite={isFavorite}
              onPlay={handlePlay}
            />
          )}
        </div>
      </main>

      {}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="bg-movie-dark border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center movie-gradient bg-clip-text text-transparent">
              Welcome to Moovie
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-movie-light/10">
              <TabsTrigger value="signin" className="data-[state=active]:bg-movie-primary">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-movie-primary">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-movie-light/10 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="bg-movie-light/10 border-gray-700 text-white"
                  />
                </div>
                {authError && (
                  <p className="text-red-400 text-sm">{authError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full movie-gradient text-white"
                  disabled={authLoading}
                >
                  {authLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="bg-movie-light/10 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-movie-light/10 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    required
                    className="bg-movie-light/10 border-gray-700 text-white"
                  />
                </div>
                {authError && (
                  <p className="text-red-400 text-sm">{authError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full movie-gradient text-white"
                  disabled={authLoading}
                >
                  {authLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
