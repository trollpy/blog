import useApi from '../hooks/useApi';
import usePosts from '../hooks/usePosts';
import PostForm from '../components/posts/PostForm';

const CreatePost = () => {
  const { createPost } = usePosts();
  const { data: categories } = useApi('/api/categories');

  const handleSubmit = async postData => {
    try {
      await createPost(postData);
      // Redirect to dashboard or post detail
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} categories={categories} />
    </div>
  );
};

export default CreatePost;