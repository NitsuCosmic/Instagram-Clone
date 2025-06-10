interface Props {
	label: string;
	parentMethod?: () => void;
}

const Button = ({ label, parentMethod }: Props) => {
	return (
		<button
			className="font-semibold py-1 px-3 rounded-lg cursor-pointer bg-blue-500 hover:bg-blue-600"
			onClick={parentMethod}
		>
			{label}
		</button>
	);
};

export default Button;
