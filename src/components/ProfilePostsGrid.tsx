import useUserPosts from "@/hooks/useUserPosts";
import { useParams } from "react-router";
import GridItem from "./GridItem";

const ProfilePostsGrid = () => {
	const { username } = useParams();
	const { posts, isLoading, error, handleRetry } = useUserPosts(username);

	return (
		<>
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

			{!isLoading && !error && posts && (
				<section className="grid gap-1 grid-cols-3">
					{posts.map((post) => (
						<GridItem key={post.id} photo={post} />
					))}
				</section>
			)}
		</>
	);
};

export default ProfilePostsGrid;
