import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGuideById, updateGuide } from '../utils/api';
import { Button } from '@/components/ui/button';

const EditGuide = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authors, setAuthors] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchGuideById(id);
      setTitle(data.title);
      setContent(data.content);
      setAuthors(data.authors?.join(', ') || '');
      setTags(data.tags?.join(', ') || '');
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateGuide(id!, {
      title,
      content,
      authors: authors.split(',').map(a => a.trim()),
      tags: tags.split(',').map(t => t.trim())
    });
    setLoading(false);
    navigate(`/cards/${id}`);
  };

  return (
    <div className="container py-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="w-full border rounded p-2" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required rows={6} />
        <input className="w-full border rounded p-2" placeholder="Authors (comma separated)" value={authors} onChange={e => setAuthors(e.target.value)} required />
        <input className="w-full border rounded p-2" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </form>
    </div>
  );
};

export default EditGuide;
