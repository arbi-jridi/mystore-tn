'use client';

import Icons from '@/icons';

const Links = () => {
	return (
		<div className='flex gap-5'>
			<div className='flex items-center gap-2 text-sm text-blue-500'>
				<Icons.FavoriteBorderIcon /> ADD TO WISH LIST
			</div>
			<div className='flex items-center gap-2 text-sm text-blue-500'>
				<Icons.BalanceIcon /> ADD TO COMPARE
			</div>
		</div>
	);
};

export default Links;
