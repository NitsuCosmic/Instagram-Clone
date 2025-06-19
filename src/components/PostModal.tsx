import type { Post } from "@/types/api";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";

interface Props {
	post: Post;
	onClose: () => void;
	onPrev: () => void;
	onNext: () => void;
	hasPrev: boolean;
	hasNext: boolean;
}

const PostModal = ({
	post,
	onClose,
	onPrev,
	onNext,
	hasPrev,
	hasNext,
}: Props) => {
	return createPortal(
		<div className="fixed inset-0 z-50 bg-black/80 h-dvh flex justify-center items-center p-8 overflow-hidden">
			<div className="relative bg-neutral-900 flex flex-col md:flex-row max-h-[90vh]">
				<img
					src={post.urls.full}
					alt={post.alt_description}
					className="max-h-[90vh]"
				/>

				<div></div>

				{/* Botones de navegación */}
				<div className="fixed w-full inset-0">
					{hasPrev && (
						<button
							onClick={onPrev}
							className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
						>
							<ChevronLeft size={32} />
						</button>
					)}
					{hasNext && (
						<button
							onClick={onNext}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
						>
							<ChevronRight size={32} />
						</button>
					)}
				</div>
				{/* Botón de cerrar */}
				<button onClick={onClose} className="fixed top-4 right-4 text-white">
					<X size={24} />
				</button>
			</div>
		</div>,
		document.body
	);
};

export default PostModal;
