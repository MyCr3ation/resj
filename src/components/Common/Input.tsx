import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
	return (
		<div className="mb-4">
			{label && <label className="block mb-1 font-semibold">{label}</label>}
			<input
				className={`w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500 ${className}`}
				{...props}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Input;
