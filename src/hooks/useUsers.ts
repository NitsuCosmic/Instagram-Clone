import { baseUrl } from "@/config/endpoints";
import { accessKey } from "@/config/env";
import type { User } from "@/types/api";
import { useCallback, useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
	const [searchedUsers, setSearchedUsers] = useState<User[]>(() => {
		const stored = localStorage.getItem("storedUsers");
		return stored ? JSON.parse(stored) : [];
	});
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

	const saveUsersOnStorage = (user: User) => {
		const updatedUsers =
			searchedUsers.length === 0 ? [user] : [user, ...searchedUsers];

		setSearchedUsers(updatedUsers);
		localStorage.setItem("storedUsers", JSON.stringify(updatedUsers));
	};

	const removeStoredUser = (id: string) => {
		const filteredUsers = searchedUsers.filter((user) => user.id !== id);
		setSearchedUsers(filteredUsers);
	};

	useEffect(() => {
		localStorage.setItem("storedUsers", JSON.stringify(searchedUsers));
	}, [searchedUsers]);

  return {
    users, searchedUsers, query, loading, error, hasSearched, onSearch, onQueryChange, onClear, saveUsersOnStorage, removeStoredUser
  }
}


export default useUsers