'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';

const NavMenu = ({ pages }: { pages: string[] }) => {
	return (
		<Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
			{pages.map((page) => (
				<Button
					key={page}
					sx={{
						my: 2,
						color: 'GrayText',
						display: 'block',
						fontSize: '1rem',
						lineHeight: '1.75rem',
						fontWeight: 600,
						padding: 0,
					}}
				>
					<Link
						className='block px-2 py-[6px]'
						href={`/category/${page}`}
						//href={`/category/${page.toLowerCase()}`}
					>
						{page}
					</Link>
				</Button>
			))}
		</Box>
	);
};

export default NavMenu;
