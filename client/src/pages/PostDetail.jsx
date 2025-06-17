import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import PostDetail from '../components/posts/PostDetail';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const PostDetailPage = () => {
  const { id } = useParams();
  const { data: post, loading, error, fetchData } = useApi(`/api/posts/${id}`);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} onRetry={() => fetchData()} />;

  return post ? <PostDetail post={post} /> : null;
};

export default PostDetailPage;