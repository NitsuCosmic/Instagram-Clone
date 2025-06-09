import GridItem from "@/components/GridItem";
import usePhotos from "@/hooks/usePhotos";
import { Search } from "lucide-react";

const ExplorePage = () => {
	const { photos, isLoading, error, handleRetry } = usePhotos(30);

	return (
		<div className="max-w-[930px] mx-auto">
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
				<section className="grid gap-1 grid-cols-3">
					{photos.map((photo) => (
						<GridItem key={photo.id} photo={photo} />
					))}
				</section>
			)}
		</div>
	);
};

export default ExplorePage;
