import Feed from "@/components/Feed";
import Header from "@/components/Header";

const HomePage = () => {
	return (
		<>
			<Header />
			<div className="flex justify-center overflow-hidden">
				<Feed />
			</div>
		</>
	);
};

export default HomePage;
