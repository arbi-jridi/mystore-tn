'use client';

import Menu from '@mui/material/Menu';
import useNavStore from '../../(store)/navStore';
import CartDrawer from '../CartBtn';
import AccountBtn from '../AccountBtn';
import WishListBtn from '../WishListBtn';

const MobileMenu = ({
	mobileMenuId,
	isUser,
}: {
	mobileMenuId: string;
	isUser: boolean;
}) => {
	const { mobileMoreAnchorEl, setMobileMoreAnchorEl } = useNavStore();
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	return (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<AccountBtn isUser={isUser} isMobile={true} menuId={mobileMenuId} />
			<WishListBtn isMobile={true} />
			<CartDrawer
				isMobile={true}
				isUser={isUser}
				handleMobileMenuClose={handleMobileMenuClose}
			/>
		</Menu>
	);
};

export default MobileMenu;
