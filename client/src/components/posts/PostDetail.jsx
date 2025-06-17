import { format } from 'date-fns';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';

const PostDetail = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.featuredImage && (
        <img
          src={`/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <span>
            By {post.author?.name} • {format(new Date(post.createdAt), 'MMMM d, yyyy')}
          </span>
          <span>•</span>
          <span>{post.category?.name}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <CommentList comments={post.comments} />
        <CommentForm postId={post._id} />
      </div>
    </div>
  );
};

export default PostDetail;