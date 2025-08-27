import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { MovieCard } from './movie-card';
import { Movie, TVShow } from '@/utils/fetchMovies';

interface MovieSectionProps {
  title: string;
  items: (Movie | TVShow)[];
  loading?: boolean;
  error?: string | null;
  onFavoriteToggle?: (item: Movie | TVShow) => void;
  isFavorite?: (id: number) => boolean;
  onPlay?: (item: Movie | TVShow) => void;
}

export function MovieSection({ 
  title, 
  items, 
  loading = false, 
  error = null, 
  onFavoriteToggle, 
  isFavorite, 
  onPlay 
}: MovieSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
          <div className="flex space-x-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
          <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 text-center">
            <p className="text-gray-400">No content available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          
          {}
          <div className="hidden md:flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scroll('left')}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scroll('right')}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-48">
                <MovieCard
                  item={item}
                  onFavoriteToggle={onFavoriteToggle}
                  isFavorite={isFavorite?.(item.id)}
                  onPlay={onPlay}
                />
              </div>
            ))}
          </div>

          {}
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-movie-darker to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-movie-darker to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
