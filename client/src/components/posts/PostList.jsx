import { Link } from 'react-router-dom';
import PostCard from './PostCard';

const PostList = ({ posts, loading, error, onRetry }) => {
  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error loading posts: {error}</p>
        {onRetry && <button onClick={onRetry}>Retry</button>}
      </div>
    );
  }

  if (posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <Link to={`/posts/${post._id}`} key={post._id}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
};

export default PostList;