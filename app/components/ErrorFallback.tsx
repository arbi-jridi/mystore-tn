'use client';

import Button from '@mui/material/Button';

const ErrorFallback = ({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) => {
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<h1>Products could not be loaded</h1>
			<Button
				variant='contained'
				sx={{
					width: '8rem',
					padding: '0.50rem 0.25rem',
					borderRadius: '0',
					fontSize: '1rem',
				}}
				disableElevation
				onClick={resetErrorBoundary}
			>
				Try again
			</Button>
		</div>
	);
};

export default ErrorFallback;
