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
        <div className="container mx-auto px-2 py-2">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-4 leading-tight">
              On The Blog
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-4">
              Thoughts, insights, and stories from the world of development. 
              Exploring code, chaos, and everything in between.
            </p>
            <PostSearch onSearch={handleSearch} />
          </div>
        </div>
      </section>
      
{/* Featured Post */}
{featuredPost && (
  <section
    className="relative bg-cover bg-center bg-no-repeat py-24 overflow-hidden"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200&auto=format&fit=crop&q=80')`,
    }}
  >
    {/* Overlay for contrast */}
    <div className="absolute inset-0 bg-black/40 z-0" />

    {/* Content Wrapper */}
    <div className="relative z-10 container mx-auto px-6">
      <div className="max-w-4xl mx-auto rounded-3xl bg-white/30 backdrop-blur-md shadow-2xl p-10 border border-white/40">

        {/* Label */}
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-white bg-black/30 px-3 py-1 rounded-full">
            Featured Article
          </span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-6 leading-tight">
          {featuredPost.title}
        </h2>

        {/* Meta Info */}
        <div className="text-center text-sm text-white/80 mb-6 space-x-2">
          <span>
            {new Date(featuredPost.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>•</span>
          <span>{featuredPost.category?.name}</span>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-white text-center leading-relaxed mb-8">
          {featuredPost.excerpt}
        </p>

        {/* Read More */}
        <div className="text-center">
          <a
            href={`/posts/${featuredPost.slug || featuredPost._id}`}
            className="inline-block bg-white text-stone-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-stone-200 transition duration-300"
          >
            Read Full Article →
          </a>
        </div>
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