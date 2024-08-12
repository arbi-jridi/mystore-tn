'use client';

import { useState } from 'react';
import useCartStore from '@/globalStore/cartStore';
import Icons from '@/icons';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const AddToCart = ({
	product,
	quantity,
	disabled
}: {
	product: ProductAll;
	quantity: number;
	disabled: boolean;
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const { addToCart } = useCartStore();

	const handleClick = () => {
		addToCart({ ...product, quantity });
		setOpen(true);
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Button
				startIcon={<Icons.AddShoppingCartIcon />}
				variant='contained'
				sx={{
					width: '16rem',
					padding: '0.75rem',
					borderRadius: '0',
					fontSize: '1rem',
				}}
				disableElevation
				onClick={handleClick}
				disabled={disabled}
				className={`w-64 p-3 rounded text-base ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'} hover:${disabled ? 'bg-gray-400' : 'bg-primary-dark'}`} 
			>
				Ajouter Cet Article +
			</Button>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
	               Produit ajouté à Votre Panier !
				</Alert>
			</Snackbar>
		</>
	);
};

export default AddToCart;
