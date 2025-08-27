import { NextRequest, NextResponse } from 'next/server'

const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzVlZTIyMWQ4YmIzMTYzNTBmMTc2NGM3ZjA0OGQ3NSIsIm5iZiI6MTc1NTk3MjM1Ni4zNDgsInN1YiI6IjY4YWEwMzA0NDZhOWM4OTNlZDZjZGZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G55fg1g3E-ADF9qBebvMb8ufcdwSh2niuPoZ5eo8szs'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'

    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?page=${page}&sort_by=release_date.desc`,
      {
        headers: {
          'Authorization': `Bearer ${TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching latest movies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch latest movies' },
      { status: 500 }
    )
  }
}
