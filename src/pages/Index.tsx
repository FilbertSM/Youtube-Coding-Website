import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import GuideCard from "../components/GuideCard";
import Footer from "../components/Footer";
import { useState } from "react";
import { sampleGuides } from "../data/sampleGuides";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [guides, setGuides] = useState(sampleGuides);

  // Filter guides based on search query
  const filteredGuides = searchQuery
    ? guides.filter((guide) =>
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (guide.tags && guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : guides;

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredGuides.length > 0 ? (
              filteredGuides.map((guide) => (
                <GuideCard key={guide.id} {...guide} />
              ))
            ) : (
              <div className="text-center py-12 col-span-full">
                <p className="text-muted-foreground text-lg">
                  No guides found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;