import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useUserPosts from "@/hooks/useUserPosts";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import GridItem from "./GridItem";

const ProfilePostsGrid = () => {
	const [page, setPage] = useState(1);
	// Set up intersection observer for the trigger element
	const [triggerRef, isIntersecting] = useIntersectionObserver({
		threshold: 0.1, // Trigger when 10% of the element is visible
		rootMargin: "150px", // Start loading 150px before the element comes into view
	});

	const { username } = useParams();
	const { posts, isLoading, isLoadingMore, error, handleRetry, hasMore } =
		useUserPosts(page, username);
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
		<>
			{isLoading && page === 1 && (
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

			{!isLoading && !error && posts && posts.length > 0 && (
				<>
					<section className="grid gap-1 grid-cols-3">
						{posts.map((post) => (
							<GridItem key={post.id} photo={post} />
						))}
					</section>

					{/* SÓLO mostramos el sentinel cuando no estamos cargando más y todavía hay más posts */}
					{hasMore && !isLoadingMore && (
						<div ref={triggerRef} className="h-4" aria-hidden="true" />
					)}

					{/* Loader de más contenido */}
					{isLoadingMore && (
						<div className="flex justify-center text-white items-center py-12">
							<LoaderCircle size={26} className="animate-spin" />
						</div>
					)}

					{/* Fin de los posts */}
					{!hasMore && posts.length > 0 && (
						<div className="flex justify-center items-center py-8">
							<p className="text-neutral-400 text-sm">No more posts to load</p>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default ProfilePostsGrid;
