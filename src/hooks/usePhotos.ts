import { baseUrl } from '@/config/endpoints';
import { accessKey } from '@/config/env';
import type { Post } from '@/types/api';
import { useCallback, useEffect, useRef, useState } from 'react';

const usePhotos = (currentPage = 1, perPage = 10) => {
  const [photos, setPhotos] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);

  const lastFetchedPageRef = useRef(0);

  // Helper function to deduplicate photos by id
  const deduplicatePhotos = useCallback((existingPhotos: Post[], newPhotos: Post[]) => {
    const existingIds = new Set(existingPhotos.map(photo => photo.id));
    const uniqueNewPhotos = newPhotos.filter(photo => !existingIds.has(photo.id));
    return [...existingPhotos, ...uniqueNewPhotos];
  }, []);

  const getPhotos = useCallback(async (page: number, isLoadingMore = false) => {
    // 🛑 Prevent refetching same page again
    if (page <= lastFetchedPageRef.current && page > 1) return;

    if (isLoadingMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await fetch(`${baseUrl}photos?page=${page}&per_page=${perPage}`, {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data: Post[] = await response.json();

      setHasMore(data.length === perPage);

      if (page === 1) {
        setPhotos(data);
      } else {
        setPhotos((prevPhotos) => deduplicatePhotos(prevPhotos, data));
      }

      lastFetchedPageRef.current = page;

    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      console.error('Error fetching photos:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [deduplicatePhotos]);

  const handleRetry = useCallback(() => {
    setPhotos([]);
    setError(null);
    setHasMore(true);
    lastFetchedPageRef.current = 0;
    getPhotos(1, false);
  }, [getPhotos]);

  const resetPhotos = useCallback(() => {
    setPhotos([]);
    setError(null);
    setHasMore(true);
    lastFetchedPageRef.current = 0;
  }, []);

  // 🔁 Load first page only once
  useEffect(() => {
    if (currentPage === 1) {
      resetPhotos();
      getPhotos(1);
    }
  }, [getPhotos, resetPhotos]);

  // 🔁 Load more on scroll
  useEffect(() => {
    if (currentPage > 1 && currentPage > lastFetchedPageRef.current) {
      getPhotos(currentPage, true);
    }
  }, [currentPage, getPhotos]);

  return { photos, isLoading, isLoadingMore, hasMore, error, handleRetry };
};

export default usePhotos;