import { baseUrl } from '@/config/endpoints';
import { accessKey } from '@/config/env';
import type { Post } from '@/types/api';
import { useEffect, useState } from 'react';

const useUserPosts = (username: string | undefined) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserPosts = async () => {
    if (!username) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${baseUrl}users/${username}/photos?per_page=30&order_by=latest`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setPosts(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        console.error('Error fetching user posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    fetchUserPosts();
  };

  useEffect(() => {
    fetchUserPosts();
  }, [username]);

  return {
    posts,
    isLoading,
    error,
    handleRetry,
  };
};

export default useUserPosts;