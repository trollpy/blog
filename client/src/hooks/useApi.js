import { useState, useEffect } from 'react';
import api from '../services/api';

const useApi = (url, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (method = 'get', payload = null, customUrl = null) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      const requestUrl = customUrl || url;

      switch (method.toLowerCase()) {
        case 'get':
          response = await api.get(requestUrl);
          break;
        case 'post':
          response = await api.post(requestUrl, payload);
          break;
        case 'put':
          response = await api.put(requestUrl, payload);
          break;
        case 'delete':
          response = await api.delete(requestUrl);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setData(response.data.data || response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url && initialData === null) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error, fetchData };
};

export default useApi;