import type { User } from "@/types/api";
import { NavLink } from "react-router";

interface Props {
	user: User;
	onClick?: (user: User) => void;
}

const UserResult = ({ user, onClick }: Props) => {
	return (
		<NavLink
			to={`/${user.username}`}
			onClick={onClick && (() => onClick(user))}
		>
			<div className="flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-colors hover:bg-neutral-800">
				<div>
					<img
						src={user.profile_image.large}
						alt={`${user.name}'s profile picture`}
						className="aspect-square min-w-[52px] max-w-[52px] rounded-full"
					/>
				</div>
				<div className="text-sm leading-4.5">
					<h3>{user.username}</h3>
					<h3 className="text-neutral-400">{user.name}</h3>
				</div>
			</div>
		</NavLink>
	);
};

export default UserResult;
