import type { Post } from "@/types/api";
import { Heart } from "lucide-react";

interface Props {
	photo: Post;
	onClick?: () => void;
}

const GridItem = ({ photo, onClick }: Props) => {
	return (
		<div
			onClick={onClick}
			className="relative aspect-square overflow-hidden bg-neutral-600 cursor-pointer group"
		>
			<img
				src={photo.urls.small}
				alt={photo.alt_description}
				loading="lazy"
				className="w-full h-full object-cover object-center"
			/>
			<div className="absolute inset-0 flex justify-center items-center w-full h-full bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
				<div className="flex items-center gap-1 font-semibold">
					<Heart fill="#fff" />
					{photo.likes}
				</div>
			</div>
		</div>
	);
};

export default GridItem;
