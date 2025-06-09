import { baseUrl } from '@/config/endpoints';
import { accessKey } from '@/config/env';
import type { FeedCard as FeedCardProps } from '@/types/api';
import { useEffect, useState } from 'react';

const usePhotos = (imgPerPage = 10) => {
  const [photos, setPhotos] = useState<FeedCardProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | string | null>("Error");

	const getPhotos = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(`${baseUrl}photos?page=1&per_page=${imgPerPage}`, {
				headers: {
					Authorization: `Client-ID ${accessKey}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data: FeedCardProps[] = await response.json();
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
	};
	
	useEffect(() => {
		getPhotos();
	}, []);

		const handleRetry = () => {
		getPhotos()
	}

  return { photos, isLoading, error, handleRetry }
}

export default usePhotos