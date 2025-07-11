import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import GuideCard from "../components/GuideCard";
import Footer from "../components/Footer";
import { useGuides } from "@/hooks/useGuides";
import { useState, useEffect } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { guides, loading, fetchGuides } = useGuides();
  
  // Fetch guides with search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchGuides(searchQuery);
    }, 300); // Debounce search
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search guides by title or tags..."
          />
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
          
          {!loading && guides.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No guides found matching "{searchQuery}"
              </p>
            </div>
          )}
          
          {!loading && guides.length === 0 && !searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No guides available yet. Be the first to create one!
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;