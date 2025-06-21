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
  
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);
  
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              On The Blog
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              Thoughts, insights, and stories from the world of development. 
              Exploring code, chaos, and everything in between.
            </p>
            <PostSearch onSearch={handleSearch} />
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      {featuredPost && (
        <section className="bg-white border-b border-stone-200">
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-sm font-medium text-stone-500 tracking-widest uppercase mb-4 block">
                  Featured Article
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-xl text-stone-600 leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-stone-500">
                  <span>{new Date(featuredPost.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <span>•</span>
                  <span>{featuredPost.category?.name}</span>
                </div>
              </div>
              
              {featuredPost.featuredImage && (
                <div className="aspect-[16/9] mb-8 overflow-hidden rounded-sm">
                  <img
                    src={`/uploads/${featuredPost.featuredImage}`}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      
      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <PostList posts={regularPosts} loading={loading} error={error} onRetry={fetchPosts} />
        </div>
      </section>
    </div>
  );
};

export default Home;