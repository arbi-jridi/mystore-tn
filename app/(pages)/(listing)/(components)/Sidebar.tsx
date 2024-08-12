'use client';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='sticky top-12 hidden h-full flex-1 muiMd:block'>
			{children}
		</div>
	);
};

export default Sidebar;
