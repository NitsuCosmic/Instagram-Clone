import { baseUrl } from '@/config/endpoints';
import { accessKey } from '@/config/env';
import type { Post } from '@/types/api';
import { useCallback, useEffect, useState } from 'react';

const usePhotos = (pageNumber = 1, imgPerPage = 10) => {
  const [photos, setPhotos] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | string | null>(null);

	const getPhotos = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(`${baseUrl}photos?page=${pageNumber}&per_page=${imgPerPage}`, {
				headers: {
					Authorization: `Client-ID ${accessKey}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data: Post[] = await response.json();
			console.log(data);
			setPhotos(data);
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "An unexpected error occurred while fetching photos";
			setError(errorMessage);
			console.error("Error fetching photos:", err);
		} finally {
			setIsLoading(false);
		}
	}, [pageNumber, imgPerPage])
	
	useEffect(() => {
		getPhotos();
	}, [getPhotos]);

		const handleRetry = () => {
		getPhotos()
	}

  return { photos, isLoading, error, handleRetry }
}

export default usePhotos