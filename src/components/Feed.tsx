import usePhotos from "@/hooks/usePhotos";
import ErrorState from "./ErrorState";
import FeedCard, { FeedCardSkeleton } from "./FeedCard";

const Feed = () => {
	const { photos, isLoading, error } = usePhotos();

	const handleRetry = () => {};

	// Loading skeleton component
	const LoadingSkeleton = () => (
		<div className="max-w-[470px] w-screen">
			{[...Array(3)].map((_, index) => (
				<FeedCardSkeleton key={index} />
			))}
		</div>
	);

	// Error component

	// Main loading state
	if (isLoading && photos.length === 0) {
		return (
			<div>
				{/* Loading header */}
				<LoadingSkeleton />
			</div>
		);
	}

	// Error state
	if (error && photos.length === 0) {
		return (
			<div className="max-w-[470px] mx-auto px-4">
				<ErrorState
					error={error.toString()}
					onRetry={handleRetry}
					isLoading={isLoading}
				/>
			</div>
		);
	}

	// Success state with photos
	return (
		<div className="max-w-[470px]">
			{/* Photos feed */}
			<div>
				{photos.map((photo) => (
					<FeedCard key={photo.id} photo={photo} />
				))}
			</div>

			{/* Bottom loading indicator for refresh */}
			{isLoading && photos.length > 0 && (
				<div className="flex justify-center py-4">
					<div className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
						<div className="w-3 h-3 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mr-2"></div>
						Refreshing...
					</div>
				</div>
			)}

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
	);
};

export default Feed;
