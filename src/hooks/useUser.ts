import { baseUrl } from '@/config/endpoints';
import { accessKey } from '@/config/env';
import type { User } from '@/types/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | string | null>(null);

	const { username } = useParams();

	const getUser = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`${baseUrl}users/${username}`, {
				headers: {
					Authorization: `Client-ID ${accessKey}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data: User = await response.json();
			console.log(data);
			setUser(data);
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
		getUser();
	}, []);

	const handleRetry = () => {
		getUser();
	};

  return {
    user, isLoading, error, handleRetry
  }
}

export default useUser