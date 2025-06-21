import { Link } from 'react-router-dom';
import PostCard from './PostCard';

const PostList = ({ posts, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading articles...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-stone-600 mb-4">Error loading posts: {error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-colors duration-200"
          >
            Retry
          </button>
        )}
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-stone-600">No articles found.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Magazine-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={post._id} className={`${
            index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
          }`}>
            <PostCard 
              post={post} 
              variant={index === 0 ? 'large' : 'default'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;