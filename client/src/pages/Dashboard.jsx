import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts';
import PostList from '../components/posts/PostList';

const Dashboard = () => {
  const { posts, loading, error } = usePosts({ author: true });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/posts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Post
        </Link>
      </div>
      <PostList posts={posts} loading={loading} error={error} />
    </div>
  );
};

export default Dashboard;