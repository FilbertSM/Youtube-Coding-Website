import { useState } from 'react';
import { createGuide } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CreateGuide = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authors, setAuthors] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createGuide({
      title,
      content,
      authors: authors.split(',').map(a => a.trim()),
      tags: tags.split(',').map(t => t.trim()),
      comments: []
    });
    setLoading(false);
    navigate('/cards');
  };

  return (
    <div className="container py-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="w-full border rounded p-2" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required rows={6} />
        <input className="w-full border rounded p-2" placeholder="Authors (comma separated)" value={authors} onChange={e => setAuthors(e.target.value)} required />
        <input className="w-full border rounded p-2" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
      </form>
    </div>
  );
};

export default CreateGuide;
