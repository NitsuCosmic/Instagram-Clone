import { Heart, Plus } from "lucide-react";
import { NavLink } from "react-router";
import InstaLogo from "./InstaLogo";

const Header = () => {
	return (
		<header className="flex items-center justify-between px-4 py-3 font-inter md:hidden">
			<NavLink to="/" className={"hover:cursor-pointer"}>
				<InstaLogo />
			</NavLink>
			<div className="flex items-center gap-3">
				<button>
					<Plus size={26} />
				</button>
				<button>
					<Heart size={26} />
				</button>
			</div>
		</header>
	);
};

export default Header;
