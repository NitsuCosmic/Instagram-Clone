import { baseUrl } from '@/config/endpoints';
import { accessKey } from '@/config/env';
import type { Post } from '@/types/api';
import { useCallback, useEffect, useRef, useState } from 'react';

const useUserPosts = (currentPage = 1, username: string | undefined) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Use ref instead of state to avoid recreating fetchUserPosts
  const lastFetchedPageRef = useRef(0);

  const PER_PAGE = 30;

  const fetchUserPosts = useCallback(async (page: number, isLoadingMore = false) => {
    if (!username) return;

    // Use ref value instead of state
    if (page <= lastFetchedPageRef.current && page > 1) return;
    
    if (isLoadingMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      const response = await fetch(
        `${baseUrl}users/${username}/photos?page=${page}&per_page=${PER_PAGE}&order_by=latest`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data: Post[] = await response.json();

      setHasMore(data.length === PER_PAGE);

      if (page === 1) {
        setPosts(data);
      } else {
        setPosts(prevPosts => [...prevPosts, ...data]);
      }

      // Update ref instead of state
      lastFetchedPageRef.current = page;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      console.error('Error fetching user posts:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [username]); // Remove lastFetchedPage dependency

  const handleRetry = useCallback(() => {
    // Reset state and fetch from page 1
    setPosts([]);
    setError(null);
    setHasMore(true);
    lastFetchedPageRef.current = 0; // Reset ref
    fetchUserPosts(1, false);
  }, [fetchUserPosts]);

  const resetPosts = useCallback(() => {
    setPosts([]);
    setError(null);
    setHasMore(true);
    lastFetchedPageRef.current = 0; // Reset ref
  }, []);

  // Effect for initial load and username changes
  useEffect(() => {
    resetPosts();
    fetchUserPosts(1, false);
  }, [username, fetchUserPosts, resetPosts]);

  // Effect for page changes (infinite scroll)
  useEffect(() => {
    if (currentPage > 1 && currentPage > lastFetchedPageRef.current) {
      fetchUserPosts(currentPage, true);
    }
  }, [currentPage, fetchUserPosts]); // Remove lastFetchedPage dependency

  return {
    posts,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    handleRetry,
  };
};

export default useUserPosts;