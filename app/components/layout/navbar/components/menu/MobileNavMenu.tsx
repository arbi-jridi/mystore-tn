'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useNavStore from '../../(store)/navStore';

const MobileNavMenu = ({ pages }: { pages: string[] }) => {
	const { anchorElNav, setAnchorElNav } = useNavStore();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<Box sx={{ flexGrow: 1, display: { md: 'flex', lg: 'none' } }}>
			<IconButton
				size='large'
				aria-label='account of current user'
				aria-controls='menu-appbar'
				aria-haspopup='true'
				onClick={handleOpenNavMenu}
				color='inherit'
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id='menu-appbar'
				anchorEl={anchorElNav}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={Boolean(anchorElNav)}
				onClose={handleCloseNavMenu}
				sx={{
					display: { md: 'block', lg: 'none' },
				}}
			>
				{pages.map((page) => (
					<MenuItem
						key={page}
						component={Link}
						href={`/category/${page}`}
						//href={`/category/${page.toLowerCase()}`}
						onClick={handleCloseNavMenu}
					>
						<Typography textAlign='center'>{page}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
};

export default MobileNavMenu;
