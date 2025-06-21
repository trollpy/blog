import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts';
import PostList from '../components/posts/PostList';

const Dashboard = () => {
  const { posts, loading, error } = usePosts({ author: true });
  
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
                Dashboard
              </h1>
              <p className="text-stone-600">
                Manage your articles and track your writing progress
              </p>
            </div>
            <Link
              to="/posts/new"
              className="px-6 py-3 bg-stone-900 text-white font-medium rounded-sm hover:bg-stone-800 transition-colors duration-200"
            >
              Create Article
            </Link>
          </div>
          
          <div className="bg-white rounded-sm shadow-sm p-8">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              Your Articles
            </h2>
            <PostList posts={posts} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;