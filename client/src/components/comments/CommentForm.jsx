import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

const CommentForm = ({ postId }) => {
  const { isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    try {
      // Submit comment to API
      console.log('Submitting comment:', data);
      reset();
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <p className="text-center text-gray-500 py-4">
        Please <a href="/login" className="text-blue-600">login</a> to post a comment.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div>
        <label htmlFor="content" className="sr-only">
          Comment
        </label>
        <textarea
          id="content"
          rows={3}
          {...register('content', { required: 'Comment is required' })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Write a comment..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      <div className="mt-3">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;