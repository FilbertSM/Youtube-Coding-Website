import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGuideById, deleteGuide } from '../utils/api';
import { Button } from '@/components/ui/button';

const CardDetailPage = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchGuideById(id);
      setGuide(data);
      setLoading(false);
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      await deleteGuide(id!);
      navigate('/cards');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!guide) return <div className="text-center py-8">Guide not found.</div>;

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{guide.title}</h2>
      <div className="mb-4 text-muted-foreground">By: {guide.authors?.join(', ')}</div>
      <div className="mb-6 whitespace-pre-line">{guide.content}</div>
      <div className="flex gap-2 mb-6">
        <Button onClick={() => navigate(`/edit/${guide._id}`)} variant="outline">Edit</Button>
        <Button onClick={handleDelete} variant="destructive">Delete</Button>
        <Button onClick={() => navigate('/cards')}>Back</Button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Comments</h3>
        <ul className="space-y-2">
          {guide.comments?.map((c: any, i: number) => (
            <li key={i} className="border rounded p-2">
              <div className="font-bold">{c.user}</div>
              <div>{c.comment}</div>
              <div className="text-xs text-muted-foreground">{new Date(c.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardDetailPage;
