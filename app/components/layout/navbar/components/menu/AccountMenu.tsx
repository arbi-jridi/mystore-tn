'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { type Session } from 'next-auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useNavStore from '../../(store)/navStore';
import { privateApi } from '@/app/helpers/HTTP';
import Icons from '../../../../icons';
import { userInfo } from 'os';

const AccountMenu = ({
	menuId,
	session,
}: {
	menuId: string;
	session: Session | null;
}) => {
	const { push } = useRouter();
	const { anchorEl, setAnchorEl, setMobileMoreAnchorEl } = useNavStore();
	const isMenuOpen = Boolean(anchorEl);

	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

/* 	const manageBilling = async () => {
		try {
			if (!session) throw Error('Not authenticated');
			const { user } = session;

			const billingPortalUrl = await privateApi.getBillingSession(user);

			if (!billingPortalUrl) {
				throw new Error('Something went wrong');
			}

			void push(billingPortalUrl);
		} catch (error) {
			setError('Something went wrong, please try again.');
			setOpen(true);
		}
	}; */

	return (
		<>
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				id={menuId}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem 
//				onClick={manageBilling}
				>
					<ListItemIcon>
						<Icons.AccountCircleIcon />
					</ListItemIcon>
					{session?.user?.name}
				</MenuItem>
				<MenuItem onClick={() => signOut()}>Logout</MenuItem>
			</Menu>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
					{error}
				</Alert>
			</Snackbar>
		</>
	);
};

export default AccountMenu;
