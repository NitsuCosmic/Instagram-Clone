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
			} text-sm font-semibold py-1.5 px-5 rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-900`}
			onClick={parentMethod}
		>
			{label}
		</button>
	);
};

export default Button;
