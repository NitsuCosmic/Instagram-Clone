import type { Tab } from "@/pages/ProfilePage";
import { Contact, Film, Grid } from "lucide-react";

interface Props {
	tab: Tab;
	changeTab: (tab: Tab) => void;
}

const ProfileTabs = ({ tab, changeTab }: Props) => {
	return (
		<div className="border-t-[1px] border-neutral-700">
			<ul className="flex justify-center items-center gap-14">
				<li className={tab === "posts" ? "border-t-1 border-white" : ""}>
					<button
						onClick={() => changeTab("posts")}
						className="flex items-center gap-1 py-4 cursor-pointer"
					>
						<Grid size={16} />
						<span className="font-semibold text-xs">POSTS</span>
					</button>
				</li>
				<li className={tab === "reels" ? "border-t-1 border-white" : ""}>
					<button
						onClick={() => changeTab("reels")}
						className="flex items-center gap-1 py-4 cursor-pointer"
					>
						<Film size={16} />
						<span className="font-semibold text-xs">REELS</span>
					</button>
				</li>
				<li className={tab === "tagged" ? "border-t-1 border-white" : ""}>
					<button
						onClick={() => changeTab("tagged")}
						className="flex items-center gap-1 py-4 cursor-pointer"
					>
						<Contact size={16} />
						<span className="font-semibold text-xs">TAGGED</span>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default ProfileTabs;
