'use client';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Icons from '@/icons';

const WishListBtn = ({ isMobile }: { isMobile: boolean }) => {
	return (
		<>
			{!isMobile ? (
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<Icons.FavoriteBorderIcon />
				</IconButton>
			) : (
				<MenuItem>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='primary-search-account-menu'
						aria-haspopup='true'
						color='inherit'
					>
						<Icons.FavoriteBorderIcon />
					</IconButton>
					<p>WishList</p>
				</MenuItem>
			)}
		</>
	);
};

export default WishListBtn;
