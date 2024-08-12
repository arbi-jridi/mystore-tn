'use client';

import { type SetStateAction } from 'react';

const Quantity = ({
	quantity,
	setQuantity,
}: {
	quantity: number;
	setQuantity: React.Dispatch<SetStateAction<number>>;
}) => {
	return (
		<div className='flex items-center gap-[10px]'>
			<button
				className='flex h-12 w-12 cursor-pointer items-center justify-center bg-gray-200'
				onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
			>
				-
			</button>
			{quantity}
			<button
				className='flex h-12 w-12 cursor-pointer items-center justify-center bg-gray-200'
				onClick={() => setQuantity((prev) => prev + 1)}
			>
				+
			</button>
		</div>
	);
};

export default Quantity;
