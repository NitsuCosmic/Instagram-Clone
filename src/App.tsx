import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

const App = () => {
	return (
		<div className="min-h-dvh bg-black text-[#F5F5F5]">
			<div className="flex">
				<Sidebar />
				<main className="flex-1">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default App;
