'use client';

import useCartStore from '@/globalStore/cartStore';
import Icons from '@/icons';

const DeleteCartItem = ({ productId }: { productId: number }) => {
	const { removeItem } = useCartStore();
	return (
		<Icons.DeleteOutlineIcon
			onClick={() => removeItem(productId)}
			className='cursor-pointer text-3xl text-red-700'
		/>
	);
};

export default DeleteCartItem;
