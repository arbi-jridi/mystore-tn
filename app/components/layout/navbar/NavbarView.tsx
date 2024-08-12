'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import NavMenu from './components/menu/NavMenu';
import MobileNavMenu from './components/menu/MobileNavMenu';
import AccountMenu from './components/menu/AccountMenu';
import MobileMenu from './components/menu/MobileMenu';
import SearchInput from './components/SearchInput';
import AccountBtn from './components/AccountBtn';
import WishListBtn from './components/WishListBtn';
import CartDrawer from './components/CartBtn';
import useNavStore from './(store)/navStore';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';

const pages = ['Hommes', 'Femmes','Enfants'];

const NavbarView = () => {
	const { data: session } = useSession();
	const { setMobileMoreAnchorEl } = useNavStore();
	const router = useRouter();

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const mobileMenuId = 'primary-search-account-menu-mobile';

	return (
		<>
		<div className='sticky top-0 z-50'>
			<Box sx={{ flexGrow: 1 }} >
				<AppBar sx={{ bgcolor: 'white', color: 'black' }} className='sticky top-0 z-50'>
					<Toolbar>
						<MobileNavMenu pages={pages} />
						{/* desktop nav */}
						<NavMenu pages={pages} />
						{<img onClick={() => router.push('/')} src="/logo.png" alt="Logo" style={{ height: '50px',cursor:'pointer' }} />}
						<Typography
							onClick={() => router.push('/')}
							noWrap
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontSize: '1.875rem',
								letterSpacing: '0.05em',
								color: 'black',
								fontWeight: '600',
								flexGrow: 1,
								cursor: 'pointer',
							}}
						>
							
						</Typography>
						<SearchInput />
						<Box
							sx={{ display: { xs: 'none', md: 'flex' }, color: 'GrayText' }}
						>
							<AccountBtn isUser={!!session} isMobile={false} menuId={menuId} />
							<WishListBtn isMobile={false} />
							<CartDrawer isMobile={false} isUser={!!session} />
						</Box>
						{/* mobile toggle */}
						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='show more'
								aria-controls={mobileMenuId}
								aria-haspopup='true'
								onClick={handleMobileMenuOpen}
								color='inherit'
							>
								<MoreIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
				<MobileMenu mobileMenuId={mobileMenuId} isUser={!!session} />
				<AccountMenu menuId={menuId} session={session} />
			</Box>
			</div>
		</>
	);
};

export default NavbarView;
