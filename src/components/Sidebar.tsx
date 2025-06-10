import {
	Compass,
	Film,
	Heart,
	House,
	Menu,
	Plus,
	Search,
	Send,
	User,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import InstaLogo from "./InstaLogo";

// Navigation items configuration
const desktopNavItems = [
	{ path: "/", icon: House, label: "Home", isLink: true },
	{ path: "#", icon: Search, label: "Search", isLink: false, action: "search" },
	{ path: "/explore", icon: Compass, label: "Explore", isLink: true },
	{ path: "/reels", icon: Film, label: "Reels", isLink: true },
	{
		path: "#",
		icon: Send,
		label: "Messages",
		isLink: false,
		action: "messages",
	},
	{
		path: "#",
		icon: Heart,
		label: "Notifications",
		isLink: false,
		action: "notifications",
	},
	{ path: "#", icon: Plus, label: "Create", isLink: false, action: "create" },
	{
		path: "/profile",
		icon: User,
		label: "Profile",
		isLink: true,
		isProfile: true,
	},
];

const mobileNavItems = [
	{ path: "/", icon: House },
	{ path: "/explore", icon: Search },
	{ path: "/reels", icon: Film },
	{ path: "/messages", icon: Send },
	{ path: "/profile", icon: User, isProfile: true },
];

const Sidebar = () => {
	const [activeAction, setActiveAction] = useState<string | null>(null);

	const handleAction = (action: string) => {
		setActiveAction(activeAction === action ? null : action);
		// Here you would typically trigger modals, sidebars, etc.
		console.log(`${action} clicked`);
	};

	const NavItem = ({
		item,
		isMobile = false,
	}: {
		item: (typeof desktopNavItems)[0];
		isMobile?: boolean;
	}) => {
		const baseClasses = isMobile
			? "p-2 rounded-lg transition-colors hover:bg-neutral-800 active:scale-95 transition-transform"
			: "flex xl:gap-4 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-neutral-900 active:scale-[0.98]";

		const content = (
			<>
				{item.isProfile ? (
					<div className="w-[26px] h-[26px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
						<div className="w-[22px] h-[22px] rounded-full bg-neutral-700" />
					</div>
				) : (
					<>
						<item.icon size={26} strokeWidth={1.5} />
					</>
				)}
				{!isMobile && (
					<span className="font-normal max-xl:w-0 max-xl:opacity-0 transition-all">
						{item.label}
					</span>
				)}
			</>
		);

		if (item.isLink) {
			return (
				<NavLink
					to={item.path}
					className={({ isActive }) =>
						`${baseClasses} ${isActive ? "font-bold" : ""}`
					}
				>
					{content}
				</NavLink>
			);
		}

		return (
			<button
				onClick={() => item.action && handleAction(item.action)}
				className={`${baseClasses} w-full text-left`}
				aria-label={item.label}
			>
				{content}
			</button>
		);
	};

	return (
		<aside className="md:min-w-[245px]">
			{/* Desktop Sidebar */}
			<section className="hidden md:block border-r border-neutral-800 fixed top-0 left-0 h-screen px-3 py-10 bg-black z-40 transition-all min-w-[245px]">
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="px-3 mb-8">
						<NavLink to="/" className="block">
							<div className="hidden xl:block">
								<InstaLogo />
							</div>
							<div className="xl:hidden">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#ffffff"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-instagram-icon lucide-instagram"
								>
									<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
								</svg>
							</div>
						</NavLink>
					</div>

					{/* Navigation */}
					<nav className="flex-1">
						<ul className="space-y-1">
							{desktopNavItems.map((item, index) => (
								<li key={index}>
									<NavItem item={item} />
								</li>
							))}
						</ul>
					</nav>

					{/* Footer/Settings could go here */}
					<div className="mt-auto">
						<button className="flex xl:gap-4 px-3 py-3 rounded-lg cursor-pointer transition-colors hover:bg-neutral-900 w-full text-left">
							<Menu size={26} />
							<span className="max-xl:w-0 max-xl:opacity-0 transition-all">
								More
							</span>
						</button>
					</div>
				</div>
			</section>

			{/* Mobile Bottom Navigation */}
			<section className="fixed bottom-0 left-0 w-full border-t border-neutral-700 bg-black md:hidden z-50">
				<nav className="px-4 py-2">
					<ul className="flex items-center justify-around">
						{mobileNavItems.map((item, index) => (
							<li key={index}>
								<NavLink
									to={item.path}
									className={({ isActive }) =>
										`block p-2 rounded-lg transition-colors ${
											isActive
												? "text-white"
												: "text-neutral-400 hover:text-white"
										}`
									}
								>
									{item.isProfile ? (
										<div className="w-[26px] h-[26px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
											<div className="w-[22px] h-[22px] rounded-full bg-neutral-700" />
										</div>
									) : (
										<item.icon size={26} strokeWidth={1.5} />
									)}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</section>
		</aside>
	);
};

export default Sidebar;
