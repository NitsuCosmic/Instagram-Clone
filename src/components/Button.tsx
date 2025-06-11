interface Props {
	label: string;
	stretched?: boolean;
	parentMethod?: () => void;
}

const Button = ({ label, stretched = false, parentMethod }: Props) => {
	return (
		<button
			className={`${
				stretched ? "w-full" : ""
			} text-sm font-semibold py-1 px-5 rounded-lg cursor-pointer bg-neutral-700 hover:bg-neutral-800`}
			onClick={parentMethod}
		>
			{label}
		</button>
	);
};

export default Button;
