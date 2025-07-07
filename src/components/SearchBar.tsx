import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search coding guides...", className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    setIsVisible(false);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Mobile Search Toggle */}
      <div className="sm:hidden">
        {!isVisible ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsVisible(true)}
            className="w-full"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Guides
          </Button>
        ) : (
          <div className="relative animate-scale-in">
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Search */}
      <div className="hidden sm:block relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base border-2 focus:border-primary transition-colors"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Indicator */}
      {query && (
        <div className="mt-2 text-sm text-muted-foreground text-center animate-fade-in">
          Searching for: <span className="font-medium text-foreground">"{query}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;