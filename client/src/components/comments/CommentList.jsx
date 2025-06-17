import { format } from 'date-fns';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment._id} className="border-b border-gray-200 pb-4">
          <div className="flex items-start space-x-3">
            <img
              src={`/uploads/${comment.user.avatar}`}
              alt={comment.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium">{comment.user.name}</p>
                <span className="text-gray-500 text-sm">
                  {format(new Date(comment.createdAt), 'MMMM d, yyyy')}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;