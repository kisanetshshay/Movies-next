import { useState } from 'react';
import { Heart, Play, Star } from 'lucide-react';
import { Movie, TVShow, getImageUrl } from '@/utils/fetchMovies';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';

interface MovieCardProps {
  item: Movie | TVShow;
  onFavoriteToggle?: (item: Movie | TVShow) => void;
  isFavorite?: boolean;
  onPlay?: (item: Movie | TVShow) => void;
}

export function MovieCard({ item, onFavoriteToggle, isFavorite = false, onPlay }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const title = 'title' in item ? item.title : item.name;
  const date = 'release_date' in item ? item.release_date : item.first_air_date;
  const year = date ? new Date(date).getFullYear() : '';

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <Card className="movie-card-hover bg-movie-light/10 border-gray-700/50 overflow-hidden group relative">
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageError ? (
          <img
            src={getImageUrl(item.poster_path)}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-sm text-center px-4">No Image Available</span>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}

        {}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="sm"
            className="movie-gradient text-white border-0"
            onClick={() => onPlay?.(item)}
          >
            <Play className="w-4 h-4 mr-2" />
            Play
          </Button>
        </div>

        {}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white"
          onClick={() => onFavoriteToggle?.(item)}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>

        {}
        {item.vote_average > 0 && (
          <Badge className="absolute top-2 left-2 bg-black/70 text-yellow-400 border-0">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {item.vote_average.toFixed(1)}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{year}</span>
          {'title' in item ? (
            <Badge variant="secondary" className="text-xs px-2 py-0">Movie</Badge>
          ) : (
            <Badge variant="secondary" className="text-xs px-2 py-0">TV Show</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
