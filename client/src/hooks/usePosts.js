import { useState, useEffect } from 'react';
import api from '../services/api';

const usePosts = (initialFilters = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState(initialFilters);

  const fetchPosts = async (customFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const combinedFilters = { ...filters, ...customFilters };
      const query = new URLSearchParams(combinedFilters).toString();
      const res = await api.get(`/api/posts?${query}`);
      setPosts(res.data.data);
      setPagination(res.data.pagination || {});
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async postData => {
    try {
      const res = await api.post('/api/posts', postData);
      setPosts(prev => [res.data.data, ...prev]);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const res = await api.put(`/api/posts/${id}`, postData);
      setPosts(prev =>
        prev.map(post => (post._id === id ? res.data.data : post))
      );
      return res.data.data;
    } catch (err) {
      throw err;
    }
  };

  const deletePost = async id => {
    try {
      await api.delete(`/api/posts/${id}`);
      setPosts(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const uploadImage = async (id, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const res = await api.put(`/api/posts/${id}/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPosts(prev =>
        prev.map(post =>
          post._id === id ? { ...post, featuredImage: res.data.data } : post
        )
      );
      return res.data.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  return {
    posts,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    uploadImage
  };
};

export default usePosts;