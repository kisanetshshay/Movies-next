import { useState, useEffect } from 'react';
import { Play, Plus, Info, Star } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Movie, TVShow, getBackdropUrl } from '@/utils/fetchMovies';

interface HeroSectionProps {
  featuredItem?: Movie | TVShow | null;
  onPlay?: (item: Movie | TVShow) => void;
  onAddToList?: (item: Movie | TVShow) => void;
  onMoreInfo?: (item: Movie | TVShow) => void;
}

export function HeroSection({ featuredItem, onPlay, onAddToList, onMoreInfo }: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [featuredItem]);

  if (!featuredItem) {
    return (
      <div className="relative h-[70vh] bg-movie-darker flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-movie-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading featured content...</p>
        </div>
      </div>
    );
  }

  const title = 'title' in featuredItem ? featuredItem.title : featuredItem.name;
  const date = 'release_date' in featuredItem ? featuredItem.release_date : featuredItem.first_air_date;
  const year = date ? new Date(date).getFullYear() : '';

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {}
      <div className="absolute inset-0">
        <img
          src={getBackdropUrl(featuredItem.backdrop_path, 'w1280')}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-900" />
        )}
      </div>

      {}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-movie-darker via-transparent to-transparent" />

      {}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            {}
            <div className="flex items-center gap-3 mb-4">
              <Badge className="movie-gradient text-white border-0 px-3 py-1 text-sm font-medium">
                {'title' in featuredItem ? 'Movie' : 'TV Show'}
              </Badge>
              {featuredItem.vote_average > 0 && (
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{featuredItem.vote_average.toFixed(1)}</span>
                </div>
              )}
              {year && (
                <span className="text-gray-300 text-sm">{year}</span>
              )}
            </div>

            {}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>

            {}
            <p className="text-gray-300 text-lg mb-8 leading-relaxed line-clamp-3">
              {featuredItem.overview}
            </p>

            {}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="movie-gradient text-white border-0 px-8 py-3 text-lg font-semibold hover-scale-105 transition-transform duration-200"
                onClick={() => onPlay?.(featuredItem)}
              >
                <Play className="w-5 h-5 mr-2" />
                Play Now
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white bg-black/50 hover:bg-black/70 px-8 py-3 text-lg font-semibold backdrop-blur-sm"
                onClick={() => onAddToList?.(featuredItem)}
              >
                <Plus className="w-5 h-5 mr-2" />
                My List
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
                onClick={() => onMoreInfo?.(featuredItem)}
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-movie-darker to-transparent" />
    </div>
  );
}