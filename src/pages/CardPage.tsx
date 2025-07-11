import { useEffect, useState } from 'react';
import { fetchGuides } from '../utils/api';
import GuideCard from '../components/GuideCard';
import { useNavigate } from 'react-router-dom';

const CardPage = () => {
  const [guides, setGuides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await fetchGuides(page);
      setGuides(prev => page === 1 ? data : [...prev, ...data]);
      setHasMore(data.length === 12);
      setIsLoading(false);
    };
    load();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !isLoading && hasMore
      ) {
        setPage(p => p + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLoading, hasMore]);

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">All Coding Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map(guide => (
          <GuideCard key={guide._id} {...guide} onClick={() => navigate(`/cards/${guide._id}`)} />
        ))}
      </div>
      {isLoading && <div className="text-center py-8">Loading...</div>}
    </div>
  );
};

export default CardPage;
