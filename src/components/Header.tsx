import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-xl">YT</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                YouTube Coding Guide
              </h1>
              <p className="text-xs text-muted-foreground">Learn. Code. Create.</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
            Home
          </a>
          <a href="/guides" className="text-foreground hover:text-primary transition-colors font-medium">
            Guides
          </a>
          <a href="/create" className="text-foreground hover:text-primary transition-colors font-medium">
            Create
          </a>
        </nav>

        {/* Search and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur animate-slide-up">
          <nav className="container py-4 px-4 space-y-4">
            <a href="/" className="block text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="/cards" className="block text-foreground hover:text-primary transition-colors font-medium">
              Guides
            </a>
            <a href="/create" className="block text-foreground hover:text-primary transition-colors font-medium">
              Create
            </a>
            <div className="pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search Guides
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;