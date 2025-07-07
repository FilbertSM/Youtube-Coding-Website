import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useGuides } from '@/hooks/useGuides';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CreateGuide() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createGuide } = useGuides();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authors: '',
    duration: '',
    tags: '',
    thumbnail: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    const guideData = {
      title: formData.title,
      content: formData.content,
      authors: formData.authors.split(',').map(author => author.trim()),
      duration: formData.duration || null,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      thumbnail: formData.thumbnail || null,
      views: 0,
      likes: 0
    };

    const { data, error } = await createGuide(guideData, user.id);
    
    if (!error && data) {
      navigate(`/guide/${data.id}`);
    }
    
    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gradient-primary">
                Create New Guide
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter guide title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    placeholder="Write your guide content..."
                    className="min-h-32"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authors">Authors *</Label>
                  <Input
                    id="authors"
                    value={formData.authors}
                    onChange={(e) => handleChange('authors', e.target.value)}
                    placeholder="Enter authors (comma-separated)"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="e.g., 45 min"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleChange('tags', e.target.value)}
                    placeholder="Enter tags (comma-separated)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => handleChange('thumbnail', e.target.value)}
                    placeholder="Enter thumbnail image URL"
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={loading || !formData.title || !formData.content || !formData.authors}
                    variant="youtube"
                    className="flex-1"
                  >
                    {loading ? 'Creating...' : 'Create Guide'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}