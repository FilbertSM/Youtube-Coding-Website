import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import GuideCard from '../components/GuideCard';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { sampleGuides, Guide } from '../data/sampleGuides';

const Index = () => {
  const [guides, setGuides] = useState<Guide[]>(sampleGuides);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>(sampleGuides);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredGuides(guides);
    } else {
      const filtered = guides.filter(guide =>
        guide.title.toLowerCase().includes(query.toLowerCase()) ||
        guide.content.toLowerCase().includes(query.toLowerCase()) ||
        guide.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredGuides(filtered);
    }
  };

  // Handle guide card click
  const handleGuideClick = (guide: Guide) => {
    // For now, just log the guide - in a real app this would navigate to detail page
    console.log('Selected guide:', guide);
    // You could implement a modal or navigate to a detail page here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="container px-4 py-16">
        {/* Search Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect 
              <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
                Coding Guide
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Search through our comprehensive collection of coding tutorials and programming guides
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </section>

        {/* Featured Guides Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Guides'}
            </h3>
            {!searchQuery && (
              <Button variant="outline">
                View All Guides
              </Button>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-48 rounded-t-lg mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* Guides Grid */}
          {!isLoading && (
            <>
              {filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide) => (
                    <GuideCard
                      key={guide.id}
                      {...guide}
                      onClick={() => handleGuideClick(guide)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No guides found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or browse all guides
                  </p>
                  <Button variant="outline" onClick={() => handleSearch('')}>
                    Clear Search
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'MongoDB'].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-16 text-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 bg-gradient-card rounded-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Share Your Knowledge?</h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Create your own coding guide and help thousands of developers learn and grow
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Create Your Guide
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;