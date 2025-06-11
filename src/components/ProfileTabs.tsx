import type { Tab } from "@/pages/ProfilePage";
import { Contact, Film, Grid } from "lucide-react";

interface Props {
	tab: Tab;
	changeTab: (tab: Tab) => void;
}

const ProfileTabs = ({ tab, changeTab }: Props) => {
	return (
		<div className="border-t-[1px] border-neutral-700">
			<ul className="flex md:justify-center items-center md:gap-14">
				<li
					className={`flex justify-center max-md:w-full ${
						tab === "posts" ? "border-t-1 border-white" : ""
					}`}
				>
					<button
						onClick={() => changeTab("posts")}
						className="flex items-center gap-1 py-4 cursor-pointer"
					>
						<Grid className="w-[32px] md:w-[16px] aspect-square" />
						<span className="font-semibold text-xs max-md:hidden">POSTS</span>
					</button>
				</li>
				<li
					className={`flex justify-center max-md:w-full ${
						tab === "reels" ? "border-t-1 border-white" : ""
					}`}
				>
					<button
						onClick={() => changeTab("reels")}
						className="flex items-center gap-1 py-4 cursor-pointer"
					>
						<Film className="w-[32px] md:w-[16px] aspect-square" />
						<span className="font-semibold text-xs max-md:hidden">REELS</span>
					</button>
				</li>
				<li
					className={`flex justify-center max-md:w-full ${
						tab === "tagged" ? "border-t-1 border-white" : ""
					}`}
				>
					<button
						onClick={() => changeTab("tagged")}
						className="flex items-center gap-1 py-4 cursor-pointer"
					>
						<Contact className="w-[32px] md:w-[16px] aspect-square" />
						<span className="font-semibold text-xs max-md:hidden">TAGGED</span>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default ProfileTabs;
