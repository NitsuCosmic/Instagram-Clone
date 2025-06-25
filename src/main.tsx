import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import {
	ErrorPage,
	ExplorePage,
	HomePage,
	PhotoDetailPage,
	ProfilePage,
} from "./pages/index.ts";
import SearchPage from "./pages/SearchPage.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				{/* Main app wrapper */}
				<Route path="/" element={<App />}>
					{/* Home feed */}
					<Route index element={<HomePage />} />

					{/* Explore and search */}
					<Route path="explore" element={<ExplorePage />} />

					{/* Search accounts */}
					<Route path="search" element={<SearchPage />} />

					{/* Photo detail */}
					<Route path="photo/:photoId" element={<PhotoDetailPage />} />

					{/* User profiles - this should be last to avoid conflicts */}
					<Route path=":username" element={<ProfilePage />} />
				</Route>

				{/* 404 catch-all */}
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
