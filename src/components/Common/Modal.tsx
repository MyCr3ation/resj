import React from "react";

interface ModalProps {
	isOpen: boolean;
	title: string;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded shadow-lg w-11/12 md:w-1/2 p-6 relative">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-bold">{title}</h3>
					<button
						onClick={onClose}
						className="text-gray-600 hover:text-gray-800"
					>
						X
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
