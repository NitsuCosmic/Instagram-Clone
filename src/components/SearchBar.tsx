import { Search, X } from "lucide-react";
import { useEffect, useRef, type FormEvent } from "react";

interface Props {
	query: string;
	onQueryChange: (query: string) => void;
	onSearch: (query: string) => void;
	onClear: () => void;
	debounceMs: number;
	disabled?: boolean;
}

const SearchBar = ({
	query,
	onQueryChange,
	onSearch,
	onClear,
	debounceMs = 300,
	disabled = false,
}: Props) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const debounceRef = useRef<NodeJS.Timeout | null>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	const handleInputChange = (value: string) => {
		onQueryChange(value);

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			onSearch(value);
		}, debounceMs);
	};

	const handleClear = () => {
		onClear();

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		inputRef.current?.focus();
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className="p-2 select-none">
			<form
				onSubmit={handleSubmit}
				className="flex items-center gap-3 px-3 py-1.25 rounded-lg bg-[#363636] relative"
			>
				<Search size={20} />
				<input
					ref={inputRef}
					type="text"
					placeholder={"Search"}
					className="outline-none w-full"
					value={query}
					onChange={(e) => handleInputChange(e.target.value)}
					disabled={disabled}
				/>
				{query ? (
					<button>
						<X onClick={handleClear} />
					</button>
				) : null}
			</form>
		</div>
	);
};

export default SearchBar;
