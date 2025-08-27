'use client';

import { useState } from 'react';
import { Search, Heart, User, Film } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MovieHeaderProps {
  onSearch?: (query: string) => void;
  onAuthClick?: () => void;
  isAuthenticated?: boolean;
  onFavoritesClick?: () => void;
}

export function MovieHeader({
  onSearch,
  onAuthClick,
  isAuthenticated = false,
  onFavoritesClick,
}: MovieHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
    }
  };

  const isActivePath = (path: string) => pathname === path;

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Movies', path: '/movies' },
    { label: 'TV Shows', path: '/tv-shows' },
    { label: 'Trending', path: '/trending' },
  ];

  return (
    <header className="bg-movie-darker/95 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-row items-center justify-between space-x-4">
          {}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Film className="w-8 h-8 text-movie-primary" />
            <span className="text-2xl font-bold movie-gradient bg-clip-text text-transparent">
              Moovie
            </span>
          </Link>

          {}
          <nav className="flex flex-row items-center space-x-4 md:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-movie-primary ${
                  isActivePath(item.path) ? 'text-movie-primary' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {}
          <form onSubmit={handleSearch} className="flex-shrink-0 relative">
  <div className="relative pointer-events-auto">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    <Input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-10 pr-4 py-2 w-32 sm:w-48 md:w-64 bg-movie-light/10 border-gray-700/50 text-white placeholder-gray-400 focus:border-movie-primary focus:ring-1 focus:ring-movie-primary"
    />
  </div>
</form>

          {}
          <div className="flex flex-row items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onFavoritesClick}
              className="text-gray-300 hover:text-movie-secondary"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAuthClick}
              className="text-gray-300 hover:text-movie-primary"
            >
              <User className="w-5 h-5 mr-2" />
              {isAuthenticated ? 'Profile' : 'Sign In'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}