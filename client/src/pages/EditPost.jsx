import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import usePosts from '../hooks/usePosts';
import PostForm from '../components/posts/PostForm';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const EditPost = () => {
  const { id } = useParams();
  const { data: post, loading, error } = useApi(`/api/posts/${id}`);
  const { data: categories } = useApi('/api/categories');
  const { updatePost } = usePosts();

  const handleSubmit = async postData => {
    try {
      await updatePost(id, postData);
      // Redirect to post detail or dashboard
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      {post && (
        <PostForm
          post={post}
          onSubmit={handleSubmit}
          categories={categories}
        />
      )}
    </div>
  );
};

export default EditPost;