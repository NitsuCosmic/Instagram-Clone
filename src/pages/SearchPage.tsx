import SearchBar from "@/components/SearchBar";
import UserResult from "@/components/UserResult";
import useUsers from "@/hooks/useUsers";
import { Loader2, Search, X } from "lucide-react";

const SearchPage = () => {
	const {
		users,
		searchedUsers,
		query,
		loading,
		error,
		hasSearched,
		onSearch,
		onQueryChange,
		onClear,
		saveUsersOnStorage,
		removeStoredUser,
	} = useUsers();

	return (
		<div className="max-w-[930px] mx-auto pb-[58px] overflow-hidden">
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
							<UserResult
								key={user.id}
								user={user}
								onClick={saveUsersOnStorage}
							/>
						))}
					</div>
				</div>
			)}

			{!loading && users.length === 0 && searchedUsers.length > 0 && (
				<div className="mt-4">
					<h3 className="mx-2 font-semibold">Recent</h3>
					<div className="space-y-2">
						{searchedUsers.map((user) => (
							<div key={user.id} className="flex justify-between">
								<UserResult user={user} />
								<button
									className="mr-2"
									onClick={() => removeStoredUser(user.id)}
								>
									<X size={16} />
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchPage;
