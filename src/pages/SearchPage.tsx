import SearchBar from "@/components/SearchBar";
import UserResult from "@/components/UserResult";
import { baseUrl } from "@/config/endpoints";
import { accessKey } from "@/config/env";
import type { User } from "@/types/api";
import { Loader2, Search } from "lucide-react";
import { useCallback, useState } from "react";

const SearchPage = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [hasSearched, setHasSearched] = useState(false);

	const fetchUsers = async (searchQuery: string) => {
		const response = await fetch(
			`${baseUrl}/search/users?query=${encodeURIComponent(searchQuery)}`,
			{
				headers: {
					Authorization: `Client-ID ${accessKey}`,
					"Content-Type": "application/json",
				},
			}
		);
		if (!response.ok) {
			throw new Error("Failed to fetch users");
		}
		return response.json();
	};

	const onQueryChange = (value: string) => {
		setQuery(value);
	};

	const onSearch = useCallback(async (searchQuery: string) => {
		if (searchQuery.trim() === "") {
			setUsers([]);
			setHasSearched(false);
			setError(null);
			return;
		}

		setLoading(true);
		setError(null);
		setHasSearched(true);

		try {
			const searchResults = await fetchUsers(searchQuery);
			setUsers(searchResults.results);
			console.log(searchResults.results);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An error occurred while searching"
			);
			setUsers([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const onClear = () => {
		setQuery("");
		setError(null);
		setHasSearched(false);
		setLoading(false);
	};

	return (
		<div className="max-w-[930px] mx-auto pb-[58px]">
			<SearchBar
				query={query}
				onSearch={onSearch}
				onQueryChange={onQueryChange}
				onClear={onClear}
				debounceMs={400}
			/>

			{loading && (
				<div className="flex justify-center items-center py-8">
					<Loader2 className="animate-spin" />
				</div>
			)}

			{/* Error state */}
			{error && (
				<div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mx-2">
					<p className="font-semibold">Error</p>
					<p>{error}</p>
				</div>
			)}

			{/* No results state */}
			{hasSearched && !loading && !error && users.length === 0 && (
				<div className="text-center py-8 mx-2">
					<div className="text-gray-400 mb-2">
						<Search size={48} className="mx-auto mb-3" />
					</div>
					<p className="text-gray-600 font-medium">No users found</p>
					<p className="text-gray-500 text-sm">Try a different search term</p>
				</div>
			)}

			{/* Users list */}
			{users.length > 0 && (
				<div className="mt-4">
					<div className="space-y-2">
						{users.map((user) => (
							<UserResult key={user.id} user={user} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchPage;
