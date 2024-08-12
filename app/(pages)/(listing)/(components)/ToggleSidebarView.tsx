'use client';

import { Fragment, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import Icons from '@/app/components/icons';
import useStore from '../(store)/store';

const ToggleSidebarView = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState<boolean>(false);
	const { resetFilters } = useStore();
	const pathname = usePathname();

	useEffect(() => {
		resetFilters();
	}, [pathname]);

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
		};

	return (
		<Fragment key={'left'}>
			<div className='my-8 w-full text-right muiMd:my-0 muiMd:hidden'>
				<Button
					variant='contained'
					endIcon={<Icons.FilterAltIcon />}
					onClick={toggleDrawer(true)}
					className='bg-[#1565c0]'
				>
					Filter
				</Button>
				<Divider sx={{ marginBlock: '1rem' }} />
			</div>
			<Drawer
				anchor={'left'}
				open={state}
				onClose={toggleDrawer(false)}
				disableScrollLock={true}
			>
				<div className='mb-4 pr-4 pt-4 text-right'>
					<span className='cursor-pointer' onClick={toggleDrawer(false)}>
						<Icons.CloseIcon className='pointer-events-none' />
					</span>
				</div>
				{children}
			</Drawer>
		</Fragment>
	);
};

export default ToggleSidebarView;
