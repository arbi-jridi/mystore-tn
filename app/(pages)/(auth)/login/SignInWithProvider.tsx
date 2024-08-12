'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { LoadingSpinner } from '@/app/components/loading';

type Props = {
	provider: string;
	icon: ReactNode;
};

const SignInWithProvider = ({ provider, icon }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams?.get('error')) setOpen(true);
	}, [searchParams]);

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleClick = async () => {
		try {
			setIsLoading(true);
			await signIn(provider);
		} catch (error) {
			setOpen(true);
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button
				endIcon={!isLoading && icon}
				variant='outlined'
				sx={{
					width: '100%',
					padding: '0.5rem',
					borderRadius: '0',
					fontSize: '1rem',
					textTransform: 'none',
					fontWeight: '400',
				}}
				onClick={handleClick}
			>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					`Sign In with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`
				)}
			</Button>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
					{'Error signing in, please try again or use a different method.'}
				</Alert>
			</Snackbar>
		</>
	);
};

export default SignInWithProvider;
