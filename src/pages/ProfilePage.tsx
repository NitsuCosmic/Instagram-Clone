import Button from "@/components/Button";
import useUser from "@/hooks/useUser";
import { formatLikes } from "@/utils/formatLikes";
import { Ellipsis, Loader } from "lucide-react";

const ProfilePage = () => {
	const { user, isLoading, error, handleRetry } = useUser();

	return (
		<div className="max-w-[935px] min-h-dvh mx-auto">
			{isLoading && (
				<div className="flex justify-center items-center min-h-dvh">
					<Loader className="animate-spin" />
				</div>
			)}

			{!isLoading && error && (
				<div className="flex justify-center items-center min-h-dvh">
					<div className="text-center space-y-4">
						<h3>
							Oops! Something went wrong. <br /> Please, try again.
						</h3>
						<Button label="Try again" parentMethod={handleRetry} />
					</div>
				</div>
			)}

			{!isLoading && !error && user && (
				<div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_2fr] grid-rows-[repeat(auto-fit,_5)] p-3 md:px-0 md:py-10">
					<section className="flex w-full max-md:justify-start justify-center place-self-start items-center md:row-span-3 md:mb-4">
						<div className="rounded-full">
							<img
								src={user.profile_image.large}
								alt={`${user.username}'s profile image`}
								className="w-[77px] md:w-[150px] aspect-square rounded-full"
							/>
						</div>
					</section>
					<section className="flex md:items-start max-lg:flex-col md:mb-4">
						<div className="flex h-full max-md:flex-col max-md:justify-between md:items-start md:gap-4">
							<h2 className="text-xl max-md:hidden max-md:mt-2">
								{user.username}
							</h2>
							<h2 className="md:hidden max-md:mt-2">{user.name}</h2>
							<div className="flex max-lg:justify-start items-center gap-2">
								<Button label="Follow" />
								<Button label="Message" />
								<Ellipsis />
							</div>
						</div>
					</section>
					<section className="hidden md:block md:mb-4">
						<ul className="flex items-center gap-8 text-neutral-300">
							<li className="flex items-end gap-1.5">
								<strong className="text-white">{user.total_photos}</strong>{" "}
								posts
							</li>
							<li className="flex items-end gap-1.5">
								<strong className="text-white">
									{formatLikes(user.downloads)}
								</strong>{" "}
								downloads
							</li>
							<li className="flex items-end gap-1.5">
								<strong className="text-white">{user.total_likes}</strong> likes
							</li>
						</ul>
					</section>
					<section className="max-md:mt-2 max-md:col-span-2 place-self-start text-sm md:mb-4">
						{user.badge && (
							<div className="text-neutral-400">{user.badge.title}</div>
						)}
						<div className="font-semibold max-md:hidden">{user.name}</div>
						{user.bio && <div className="text-balance">{user.bio}</div>}
					</section>
				</div>
			)}

			<div></div>
			<div></div>
		</div>
	);
};

export default ProfilePage;
