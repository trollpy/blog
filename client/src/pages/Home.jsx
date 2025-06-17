import { useEffect } from 'react';
import usePosts from '../hooks/usePosts';
import PostList from '../components/posts/PostList';
import PostSearch from '../components/posts/PostSearch';

const Home = () => {
  const { posts, loading, error, fetchPosts, filters, setFilters } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  const handleSearch = searchTerm => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <PostSearch onSearch={handleSearch} />
      <PostList posts={posts} loading={loading} error={error} onRetry={fetchPosts} />
    </div>
    
  );
};

export default Home;