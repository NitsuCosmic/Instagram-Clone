import GridItem from "@/components/GridItem";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import usePhotos from "@/hooks/usePhotos";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ExplorePage = () => {
	const [page, setPage] = useState(1);
	const [triggerRef, isIntersecting] = useIntersectionObserver({
		threshold: 0.1, // Trigger when 10% of the element is visible
		rootMargin: "300px", // Start loading 150px before the element comes into view
	});
	const { photos, isLoading, isLoadingMore, hasMore, error, handleRetry } =
		usePhotos(page, 30);

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

	return (
		<div className="max-w-[930px] mx-auto pb-[58px]">
			<div className="p-2 md:hidden select-none">
				<div className="flex items-center gap-3 px-3 py-1.25 rounded-lg bg-[#363636]">
					<Search size={20} />
					<p className="text-neutral-400">Search</p>
				</div>
			</div>

			{isLoading && (
				<section className="grid gap-1 grid-cols-3">
					{[...Array(21)].map((_, index) => (
						<div
							key={index}
							className="aspect-square bg-neutral-600 animate-pulse"
						/>
					))}
				</section>
			)}

			{!isLoading && error && (
				<div className="flex justify-center items-center w-full min-h-[400px]">
					<div className="space-y-4 text-center">
						<h4>An error occurred!</h4>
						<p className="text-neutral-400">{error.toString()}</p>
						<button
							onClick={handleRetry}
							className="bg-blue-500 px-3 py-1 rounded-lg"
						>
							Try again
						</button>
					</div>
				</div>
			)}

			{!isLoading && !error && photos && (
				<>
					<section className="grid gap-1 grid-cols-3">
						{photos.map((photo) => (
							<GridItem key={photo.id} photo={photo} />
						))}
					</section>
					{hasMore && !isLoadingMore && (
						<div ref={triggerRef} className="h-0" aria-hidden="true" />
					)}

					{isLoadingMore && (
						<div className="flex justify-center text-white items-center py-12">
							<LoaderCircle size={26} className="animate-spin" />
						</div>
					)}

					{!hasMore && photos.length > 0 && (
						<div className="flex justify-center items-center py-8">
							<p className="text-neutral-400 text-sm">No more posts to load</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ExplorePage;
