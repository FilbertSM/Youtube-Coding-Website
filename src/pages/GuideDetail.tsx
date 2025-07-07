import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useGuides, Guide } from '@/hooks/useGuides';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GuideDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { guides, addComment, deleteGuide } = useGuides();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const foundGuide = guides.find(g => g.id === id);
    if (foundGuide) {
      setGuide(foundGuide);
    }
  }, [guides, id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !guide || !newComment.trim()) return;

    setLoading(true);
    await addComment(guide.id, newComment, user.user_metadata?.username || user.email!, user.id);
    setNewComment('');
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!guide) return;
    await deleteGuide(guide.id);
    navigate('/');
  };

  const canEdit = user && guide && guide.created_by === user.id;

  if (!guide) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Guide not found</h2>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-card-hover">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <CardTitle className="text-3xl font-bold text-gradient-primary">
                  {guide.title}
                </CardTitle>
                {canEdit && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/edit/${guide.id}`)}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your guide.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {guide.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {guide.authors.join(', ')}</span>
                {guide.duration && <span>{guide.duration}</span>}
                <span>{guide.views} views</span>
                <span>{guide.likes} likes</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="prose max-w-none mb-8">
                <p className="text-foreground leading-relaxed">{guide.content}</p>
              </div>
              
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-4">Comments ({guide.comments.length})</h3>
                
                {user && (
                  <form onSubmit={handleAddComment} className="mb-6">
                    <Textarea
                      placeholder="Add your comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2"
                    />
                    <Button type="submit" disabled={loading || !newComment.trim()}>
                      {loading ? 'Adding...' : 'Add Comment'}
                    </Button>
                  </form>
                )}
                
                <div className="space-y-4">
                  {guide.comments.map((comment) => (
                    <Card key={comment.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{comment.user_name}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-foreground">{comment.comment}</p>
                    </Card>
                  ))}
                  
                  {guide.comments.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}