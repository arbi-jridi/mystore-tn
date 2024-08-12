'use client';

import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Icons from '@/app/components/icons';
import { useGetFromStore } from '@/app/helpers/hooks/zustandHooks';
import useCartStore from '@/app/(store)/cartStore';
import CartItems from './cart/CartItems';

const CartBtn = ({
	isMobile,
	isUser,
	handleMobileMenuClose,
}: {
	isMobile: boolean;
	isUser: boolean;
	handleMobileMenuClose?: () => void;
}) => {
	const [state, setState] = useState<boolean>(false);
	const products = useGetFromStore(useCartStore, (state) => state.products);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setState(open);
			isMobile && handleMobileMenuClose && handleMobileMenuClose();
		};

	const list = () => (
		<Box
			sx={{ height: '100%' }}
			role='presentation'
			className='w-[300px] xxs:w-[350px] sm:w-[500px]'
		>
			<CartItems isUser={isUser} toggleDrawer={toggleDrawer} />
		</Box>
	);

	return (
		<Fragment key={'right'}>
			{!isMobile ? (
				<IconButton
					size='large'
					aria-label='show cart'
					color='inherit'
					className='relative'
					onClick={toggleDrawer(true)}
				>
					<Badge badgeContent={products?.length} color='primary'>
						<Icons.ShoppingCartOutlinedIcon />
					</Badge>
				</IconButton>
			) : (
				<MenuItem onClick={toggleDrawer(true)}>
					<IconButton size='large' aria-label='show cart' color='inherit'>
						<Badge badgeContent={products?.length} color='primary'>
							<Icons.ShoppingCartOutlinedIcon />
						</Badge>
					</IconButton>
					<p>Cart</p>
				</MenuItem>
			)}
			<Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
				{list()}
			</Drawer>
		</Fragment>
	);
};

export default CartBtn;
