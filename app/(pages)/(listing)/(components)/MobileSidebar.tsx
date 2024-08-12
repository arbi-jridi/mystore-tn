'use client';

import Box from '@mui/material/Box';

const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box
			sx={{ width: 300, height: '100%', padding: '1rem' }}
			role='presentation'
		>
			{children}
		</Box>
	);
};

export default MobileSidebar;
