'use client';

import { signIn } from 'next-auth/react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useNavStore from '../(store)/navStore';
import Icons from '@/icons';

const AccountBtn = ({
	isUser,
	isMobile,
	menuId,
}: {
	isUser: boolean;
	isMobile: boolean;
	menuId: string;
}) => {
	const { setAnchorEl } = useNavStore();

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<>
			{isUser ? (
				!isMobile ? (
					<Tooltip title='Account Options'>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<Icons.ManageAccountsIcon />
						</IconButton>
					</Tooltip>
				) : (
					<MenuItem onClick={handleProfileMenuOpen}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='primary-search-account-menu'
							aria-haspopup='true'
							color='inherit'
						>
							<Icons.ManageAccountsIcon />
						</IconButton>
						<p>Account</p>
					</MenuItem>
				)
			) : !isMobile ? (
				<Tooltip title='Sign In'>
					<IconButton size='large' onClick={() => signIn()}>
						<Icons.PersonOutlineIcon />
					</IconButton>
				</Tooltip>
			) : (
				<MenuItem onClick={() => signIn()}>
					<IconButton
						size='large'
						aria-label='sign in to manage orders'
						aria-controls='primary-search-account-menu'
						aria-haspopup='true'
						color='inherit'
					>
						<Icons.PersonOutlineIcon />
					</IconButton>
					<p>Sign In</p>
				</MenuItem>
			)}
		</>
	);
};

export default AccountBtn;
