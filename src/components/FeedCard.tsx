import type { FeedCard as FeedCardProps } from "@/types/api";
import { formatInstagramDate } from "@/utils/dataFormatter";
import {
	Bookmark,
	EllipsisVertical,
	Heart,
	MessageCircle,
	Send,
} from "lucide-react";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
	photo: FeedCardProps;
}

const FeedCard = ({ photo }: Props) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [showComments, setShowComments] = useState(false);

	const handleLike = () => {
		setIsLiked(!isLiked);
	};

	const handleSave = () => {
		setIsSaved(!isSaved);
	};

	const formatLikes = (count: number) => {
		if (count >= 1000) {
			return `${(count / 1000).toFixed(1)}k`;
		}
		return count.toLocaleString();
	};

	return (
		<div className="font-inter md:border-b-1 border-neutral-800 pb-3">
			{/* Header */}
			<div className="flex items-center justify-between max-md:p-3 md:py-3">
				<div className="flex items-center space-x-3">
					<img
						src={photo.user.profile_image.medium}
						alt={photo.alt_description}
						className="w-7 h-7 rounded-full object-cover"
					/>
					<div className="flex items-center space-x-1">
						<span className="font-semibold text-sm">{photo.user.username}</span>
						<span className="text-gray-300 text-sm">
							• {formatInstagramDate(photo.created_at)} •
						</span>
					</div>
					<button className="rounded-md text-sm text-blue-500 font-semibold cursor-pointer hover:text-neutral-200 transition-colors">
						Follow
					</button>
				</div>
				<button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
					<EllipsisVertical className="w-5 h-5 text-gray-600" />
				</button>
			</div>

			{/* Image */}
			<div className="relative bg-neutral-600">
				<img
					src={photo.urls.raw}
					alt="Post content"
					className="w-full object-cover"
					onDoubleClick={handleLike}
					loading="lazy"
					style={{ aspectRatio: `${photo.width}/${photo.height}` }}
				/>
			</div>

			{/* Actions */}
			<div className="flex items-center justify-between max-md:p-3 md:py-3">
				<div className="flex items-center space-x-4">
					<button
						onClick={handleLike}
						className={`cursor-pointer transition-colors ${
							isLiked ? "text-red-500" : ""
						}`}
					>
						<Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
					</button>
					<button
						onClick={() => setShowComments(!showComments)}
						className="cursor-pointer"
					>
						<MessageCircle className="w-6 h-6" />
					</button>
					<button className="cursor-pointer">
						<Send className="w-6 h-6" />
					</button>
				</div>
				<button
					onClick={handleSave}
					className="cursor-pointer transition-colors"
				>
					<Bookmark className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
				</button>
			</div>

			{/* Likes */}
			<div className="max-md:px-3 md:py-1">
				<span className="font-semibold text-sm">
					{formatLikes(photo.likes)} likes
				</span>
			</div>

			{/* Caption */}
			{photo.description && (
				<div className="max-md:px-3 md:py-1">
					<div className="space-x-2 text-sm text-pretty">
						<span className="font-bold">{photo.user.username}</span>
						<span className="w-full text-neutral-200">{photo.description}</span>
					</div>
				</div>
			)}

			{/* Comments */}
			<div className="max-md:px-3 md:py-1">
				<button
					onClick={() => setShowComments(!showComments)}
					className="text-sm text-neutral-400 cursor-pointer hover:underline transition-colors"
				>
					View all comments
				</button>
			</div>
		</div>
	);
};

export const FeedCardSkeleton = () => {
	return (
		<Skeleton className="rounded-none bg-black">
			{/* Header skeleton */}
			<div className="flex items-center space-x-3 max-md:p-3 md:py-3">
				<div className="w-[32px] aspect-square bg-neutral-600 rounded-full flex-shrink-0"></div>
				<div className="flex-1 space-y-2">
					<div className="h-3 bg-neutral-600 rounded-md w-24"></div>
					<div className="h-3 bg-neutral-600 rounded-md w-16"></div>
				</div>
				<div className="w-16 h-8 bg-neutral-600 rounded-md"></div>
			</div>

			{/* Image skeleton */}
			<div className="min-h-[560px] w-full bg-neutral-600 relative">
				<div className="absolute inset-0 bg-neutral-600"></div>
			</div>

			{/* Actions skeleton */}
			<div className="space-y-3 max-md:p-3 md:py-3">
				<div className="flex items-center justify-between">
					<div className="flex space-x-2">
						<div className="w-[27px] aspect-square bg-neutral-600 rounded"></div>
						<div className="w-[27px] aspect-square bg-neutral-600 rounded"></div>
						<div className="w-[27px] aspect-square bg-neutral-600 rounded"></div>
					</div>
					<div className="w-[27px] aspect-square bg-neutral-600 rounded"></div>
				</div>
				<div className="h-4 bg-neutral-600 rounded-md w-20"></div>
				<div className="h-3 bg-neutral-600 rounded-md w-32"></div>
			</div>
		</Skeleton>
	);
};

export default FeedCard;
