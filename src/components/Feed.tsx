import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import usePhotos from "@/hooks/usePhotos";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ErrorState from "./ErrorState";
import FeedCard, { FeedCardSkeleton } from "./FeedCard";

const Feed = () => {
	const [page, setPage] = useState(1);
	const [triggerRef, isIntersecting] = useIntersectionObserver({
		threshold: 0.1, // Trigger when 10% of the element is visible
		rootMargin: "150px", // Start loading 150px before the element comes into view
	});
	const { photos, isLoading, isLoadingMore, hasMore, error, handleRetry } =
		usePhotos(page);

	const hasRequestedRef = useRef(false);

	useEffect(() => {
		if (
			isIntersecting &&
			!isLoading &&
			!isLoadingMore &&
			hasMore &&
			!error &&
			!hasRequestedRef.current
		) {
			hasRequestedRef.current = true;
			setPage((prevPage) => prevPage + 1);
		}
	}, [isIntersecting, isLoading, isLoadingMore, hasMore, error]);

	// Reset flag when page is updated
	useEffect(() => {
		hasRequestedRef.current = false;
	}, [page]);

	// Loading skeleton component
	const LoadingSkeleton = () => (
		<div className="max-w-[470px] w-screen">
			{[...Array(3)].map((_, index) => (
				<FeedCardSkeleton key={index} />
			))}
		</div>
	);

	return (
		<>
			{isLoading && page === 1 && (
				<div>
					{/* Loading header */}
					<LoadingSkeleton />
				</div>
			)}

			{!isLoading && error && (
				<div className="max-w-[470px] mx-auto px-4">
					<ErrorState
						error={error.toString()}
						onRetry={handleRetry}
						isLoading={isLoading}
					/>
				</div>
			)}

			{!isLoading && !error && photos && photos.length > 0 && (
				<>
					<div className="max-w-[470px]">
						{/* Photos feed */}
						<div className="mb-[58px]">
							{photos.map((photo) => (
								<FeedCard key={photo.id} photo={photo} />
							))}

							{hasMore && !isLoadingMore && (
								<div ref={triggerRef} className="h-10" aria-hidden="true" />
							)}

							{isLoadingMore && (
								<div className="flex justify-center text-white items-center py-4">
									<LoaderCircle size={26} className="animate-spin" />
								</div>
							)}
						</div>

						{/* Empty state (just in case) */}
						{!isLoading && photos.length === 0 && !error && (
							<div className="text-center py-12">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl">📷</span>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									No photos yet
								</h3>
								<p className="text-gray-600 text-sm mb-4">
									We couldn't find any photos to show you right now.
								</p>
								<button
									onClick={handleRetry}
									className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
								>
									Refresh Feed
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Feed;
