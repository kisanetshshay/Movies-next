'use client'

import { useState, useEffect } from 'react'

import {
  fetchLatestMovies,
  fetchLatestTVShows,
  fetchPopularMovies,
  fetchTrendingMovies,
  searchMovies,
  searchTVShows,
  fetchMovieDetails,
  Movie,
  TVShow,
  TMDBResponse,
} from '../utils/fetchMovies'



export interface MovieDetails extends Movie {
  belongs_to_collection: { id: number; name: string; poster_path: string | null } | null
  budget: number
  genres: { id: number; name: string }[]
  homepage: string
  imdb_id: string
  production_companies: { id: number; logo_path: string | null; name: string; origin_country: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
  revenue: number
  runtime: number
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[]
  status: string
  tagline: string
}


interface UseMoviesState<T> {
  data: T | null
  loading: boolean
  error: string | null
}


export const useLatestMovies = (page = 1) => {
  const [state, setState] = useState<UseMoviesState<TMDBResponse<Movie>>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const data = await fetchLatestMovies(page)
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch latest movies',
        })
      }
    }
    loadMovies()
  }, [page])

  return state
}

export const useLatestTVShows = (page = 1) => {
  const [state, setState] = useState<UseMoviesState<TMDBResponse<TVShow>>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const loadTVShows = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const data = await fetchLatestTVShows(page)
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch latest TV shows',
        })
      }
    }
    loadTVShows()
  }, [page])

  return state
}

export const usePopularMovies = (page = 1) => {
  const [state, setState] = useState<UseMoviesState<TMDBResponse<Movie>>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const data = await fetchPopularMovies(page)
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch popular movies',
        })
      }
    }
    loadMovies()
  }, [page])

  return state
}

export const useTrendingMovies = (timeWindow: 'day' | 'week' = 'week') => {
  const [state, setState] = useState<UseMoviesState<TMDBResponse<Movie>>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const data = await fetchTrendingMovies(timeWindow)
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch trending movies',
        })
      }
    }
    loadMovies()
  }, [timeWindow])

  return state
}

export const useSearchMovies = () => {
  const [state, setState] = useState<UseMoviesState<TMDBResponse<Movie>>>({
    data: null,
    loading: false,
    error: null,
  })

  const searchMoviesQuery = async (query: string, page = 1) => {
    if (!query.trim()) {
      setState({ data: null, loading: false, error: null })
      return
    }
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const data = await searchMovies(query, page)
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to search movies',
      })
    }
  }

  return { ...state, searchMovies: searchMoviesQuery }
}

export const useSearchTVShows = () => {
  const [state, setState] = useState<UseMoviesState<TMDBResponse<TVShow>>>({
    data: null,
    loading: false,
    error: null,
  })

  const searchTVShowsQuery = async (query: string, page = 1) => {
    if (!query.trim()) {
      setState({ data: null, loading: false, error: null })
      return
    }
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const data = await searchTVShows(query, page)
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to search TV shows',
      })
    }
  }

  return { ...state, searchTVShows: searchTVShowsQuery }
}

export const useMovieDetails = (movieId: number | null) => {
  const [state, setState] = useState<UseMoviesState<MovieDetails>>({
    data: null,
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!movieId) {
      setState({ data: null, loading: false, error: null })
      return
    }

    const loadMovieDetails = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const data = await fetchMovieDetails(movieId)
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch movie details',
        })
      }
    }

    loadMovieDetails()
  }, [movieId])

  return state
}


export const useFavorites = () => {
  const [favorites, setFavorites] = useState<(Movie | TVShow)[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('moovie-favorites')
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error)
      }
    }
  }, [])

  const addToFavorites = (item: Movie | TVShow) => {
    const newFavorites = [...favorites, item]
    setFavorites(newFavorites)
    localStorage.setItem('moovie-favorites', JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (id: number) => {
    const newFavorites = favorites.filter(item => item.id !== id)
    setFavorites(newFavorites)
    localStorage.setItem('moovie-favorites', JSON.stringify(newFavorites))
  }

  const isFavorite = (id: number) => {
    return favorites.some(item => item.id === id)
  }

  const toggleFavorite = (item: Movie | TVShow) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id)
    } else {
      addToFavorites(item)
    }
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  }
}