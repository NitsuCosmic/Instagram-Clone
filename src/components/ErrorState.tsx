import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";

interface Props {
	error: string;
	onRetry: () => void;
	isLoading: boolean;
}

const ErrorState = ({ error, onRetry, isLoading }: Props) => (
	<div className=" p-6">
		<div className="text-center">
			{/* Error icon */}
			<div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
				{error.includes("network") || error.includes("fetch") ? (
					<WifiOff className="w-8 h-8 text-red-500" />
				) : (
					<AlertCircle className="w-8 h-8 text-red-500" />
				)}
			</div>

			{/* Error message */}
			<h3 className="text-lg font-semibold mb-2">
				{error.includes("network") || error.includes("fetch")
					? "Connection Problem"
					: "Something went wrong"}
			</h3>

			<p className="text-gray-300 text-sm mb-4 max-w-sm mx-auto">
				{error.includes("network") || error.includes("fetch")
					? "Please check your internet connection and try again."
					: error.includes("401") || error.includes("403")
					? "Authentication failed. Please check your API key."
					: error.includes("429")
					? "Too many requests. Please wait a moment before trying again."
					: "We encountered an error while loading your photos. Please try again."}
			</p>

			{/* Retry button */}
			<button
				onClick={onRetry}
				disabled={isLoading}
				className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
			>
				<RefreshCw
					className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
				/>
				{isLoading ? "Retrying..." : "Try Again"}
			</button>

			{/* Additional help text */}
			<p className="text-xs text-gray-300 mt-4">
				Still having trouble? Check your internet connection or contact support.
			</p>
		</div>
	</div>
);

export default ErrorState;
