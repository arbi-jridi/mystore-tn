'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { isMobile } from 'react-device-detect';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useCartStore from '@/globalStore/cartStore';
import { useGetFromStore } from '@/helpers/hooks/zustandHooks';
import { privateApi ,publicApi} from '@/helpers/HTTP';
import { LoadingSpinner } from '@/app/components/loading';
import Icons from '@/app/components/icons';
import DeleteCartItem from './DeleteCartItem';
import Image from 'next/image';
import emailjs from 'emailjs-com'; // Import EmailJS
import { useRouter } from 'next/router';
import { ClickAwayListener } from '@mui/material';
import axios from 'axios';




const CartItems = ({
	isUser,
	toggleDrawer,
}: {
	isUser: boolean;
	toggleDrawer: any;
}) => {
	
	const products = useGetFromStore(useCartStore, (state) => state.products);
	const productId = products?.map(item => item.id);
    const [selectedTaille, setSelectedTaille] = useState<string | null>(localStorage.getItem(`selectedTaille_${productId}`));
    const [selectedColor, setSelectedColor] = useState<string | null>(localStorage.getItem(`selectedColor_${productId}`));
	useEffect(() => {
        const taille = localStorage.getItem(`selectedTaille_${productId}`);
        setSelectedTaille(taille);
    }, [productId]);

    useEffect(() => {
        const color = localStorage.getItem(`selectedColor_${productId}`);
        setSelectedColor(color);
    }, [productId]);

	
	const { resetCart } = useCartStore();

	const { data: session } = useSession();

	const [loading, setLoading] = useState<boolean>(false);
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
		toggleDrawer(false); 
	};

	const handlePayment = async () => {
		try {
			setLoading(true);

			if (!isUser) {
				window.location.href = '/api/auth/signin';
				return;
			}
			if (!session) throw new Error('Unauthenticated request');

			const { user } = session;

			if (!products?.length) {
				return (
					setError('No products in cart'), setLoading(false), setOpen(true)
				);
			}
			

			// Prepare email data
			const lineItems = products.map(item => ({
				id:item.id.toString(),
				image:item.attributes.img.data.attributes.url,
				Article: item.attributes.title,
				Marque: item.attributes.marque,
				quantity: item.quantity.toString(),
				taille: localStorage.getItem(`selectedTaille_${item.id}`),
				couleur: localStorage.getItem(`selectedColor_${item.id}`),
				prix: item.attributes.Remise ? (item.attributes.price - (item.attributes.price * item.attributes.Remise / 100)).toFixed(0) : item.attributes.price,
				total: item.attributes.Remise ? (parseFloat((item.attributes.price - (item.attributes.price * item.attributes.Remise / 100)).toFixed(0)) * item.quantity).toFixed(0) : (item.attributes.price * item.quantity).toFixed(0),
			}));
			
			const totalPrice = products.reduce((total, item) => {
				const prix = item.attributes.Remise
					? parseFloat((item.attributes.price - (item.attributes.price * item.attributes.Remise / 100)).toFixed(0))
					: item.attributes.price;
				return total + item.quantity * prix;
			}, 0);

			console.log(totalPrice);

			lineItems.push({ id: 'Total', image: '', Article: '-', Marque: '-', quantity: '-', taille: '-', couleur: '-', prix: '-', total: totalPrice.toString() });

			const tableRows = lineItems.map(item => `
				<tr>
                    <td><img src='${item.image}' alt='${item.Article}' style='width:50px;'/></td>
					<td>${item.Article}</td>
					<td>${item.id}</td>
					<td>${item.Marque}</td>
					<td>${item.taille}</td>
					<td>${item.couleur}</td>
					<td>${item.prix}</td>
					<td>${item.quantity}</td>
					<td>${item.total}TND</td>
				</tr>
			`).join('');

			const emailHtml = `
				<style>
					body{
					   font-family: sans-serif;
					   min-height: 100vh;
					   color: #555;
					}
				 
					table{
					   width:  1000px;
					   margin: 30px auto;
					}
				 
					table th{
					   padding: 10px 0;
					   background-color: #f4f4f4;
					   /* background-color: #fff; */
					   border:  1px solid #d4d4d4;
					}
				 
					table td{
					   padding: 10px;
					   border:  1px solid #d4d4d4;
					   width: 18%;
					   text-align: center;
					   background-color: #fff;
					}
				 
					table img{
					   width:  70%;
					}
				</style>
				<body>
					<table>
						<thead>
							<tr>
								<th>Image</th>
								<th>Article</th>
								<th>ID</th>
								<th>Marque</th>
								<th>Taille</th>
								<th>Couleur</th>
								<th>Prix</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							${tableRows}
						</tbody>
					</table>

				</body>
			`;



			const userId = user?.name; // This can be string | null | undefined
			if (!userId) {
				setError('User ID is not available'); // Handle the case where userId is not available
				setLoading(false);
				setOpen(true);
				return;
			}

		

			if (!user) throw new Error("User could not be properly authenticated");
			if (!products || products.length === 0) {
				setError('No products in cart'); // Set error message
				setLoading(false); // Stop loading
				setOpen(true); // Show error alert
				return; // Exit the function
			}
	
	  

			

			// Send email using EmailJS
/* 			await emailjs.send('service_ohvmrlj', 'template_v5ez6sj', {
				to: 'arbi.jridi@gmail.com',
				subject: 'New Order Received',
				message: `Order details: ${JSON.stringify(lineItems)}`,
				from_name: user?.name || 'Unknown User',
				email: user?.email,
				phone:JSON.parse(localStorage.getItem('data') || '{}').phone
			}, 'PnNhBv6NWmwV3CJvj'); */

			console.log(lineItems);

			const orderData = {
				user: user?.name as string, // Assuming user object has an id
				phone:JSON.parse(localStorage.getItem('data') || '{}').phone,
				addresse:JSON.parse(localStorage.getItem('data') || '{}').addresse,
				items: lineItems,
				totalPrice: totalPrice,
			};
			console.log("Order Data:", orderData); // Log the order data


			const sendEmail = async () => {
				try {
					const response = await fetch('/api/sendEmail', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							to: process.env.EMAIL_RECEIVER || 'arbi.jridi@gmail.com' ,
					        subject: 'Nouvelle Commande !',
					        message: `Detail de la Commande: ${JSON.stringify(lineItems)}`,
					        from_name: user?.name || 'Unknown User',
					        email: user?.email,
					        phone: JSON.parse(localStorage.getItem('data') || '{}').phone,
					        html: `<p>Bonjour, je suis ${user?.name || 'Unknown User'},</p>
					               <p>Vous avez une nouvelle commande:</p>
								   ${emailHtml}
					               <p>-------------</p>
					               <p>Mon email: ${user?.email},<br>Mon numéro: ${JSON.parse(localStorage.getItem('data') || '{}').phone},<br>Cordialement.</p>
								   <img src="https://res.cloudinary.com/dedoanq7h/image/upload/v1723246488/logo_db5e6e3aa5.png" alt="My Store">
								   `
						}),
					});
			
					const result = await response.json();
					if (response.ok) {
						console.log('Email sent successfully:', result);
					} else {
						console.error('Error sending email:', result.error);
					}
				} catch (error) {
					console.error('Network error:', error);
				}
			};

			sendEmail();

			
			
			const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/orders', {
					data: {
					  		orderData: {orderData},
				    	}
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log("Response from server:", response)

        setOpen(true); // Show success alert
        resetCart(); // Reset the cart after successful email
		setLoading(false);
		setTimeout(() => {
            toggleDrawer(false); // Hide the sidebar after successful payment
        }, 500);
       
    } catch (error) {
        setError('Something went wrong, please try again.');
        setLoading(false);
        setOpen(true);
    }
	};

	const total = () => {
		let total = 0;
		products?.forEach(
			(item) => {
				let price = item.attributes.price;
				if (item.attributes.Remise) {
					price = price - (price * item.attributes.Remise / 100);
				}
				total += item.quantity * price;
			}
		);
		return total.toFixed(2);
	};

	return (
		<div className='flex h-full flex-col bg-white'>
			<div className='relative flex-grow overflow-hidden'>
				<div
					className={`absolute bottom-0 left-0 right-[-20px] top-0 overflow-y-scroll pl-8 ${
						isMobile ? 'pr-14' : 'p-8'
					} py-6`}
				>
					<div className='mb-7 flex items-center justify-between'>
						<h1 className='text-2xl text-gray-500'>Shopping Cart</h1>
						<span className='cursor-pointer' onClick={toggleDrawer(false)}>
							<Icons.CloseIcon className='pointer-events-none' />
						</span>
					</div>
					<div className='w-full sm:pl-4 '>
						{products?.map((item) => {
							const img =
								process.env.NEXT_PUBLIC_UPLOAD_URL +
								item.attributes.img.data.attributes.url;
							return (
								// cart item
								<div
									key={item.id}
									className='mb-[30px] flex items-center justify-between gap-2 sm:gap-5'
								>
									<div className='flex gap-5 rounded-lg'>
										<Image
											width={600}
											height={600}
											src={img}
											alt=''
											className='my-auto h-auto w-10 object-cover sm:w-20 rounded-lg'
										/>
										{/* details */}
										<div className='w-48'>
											<h1 className='mb-1 text-lg font-medium text-gray-500 sm:mb-3'>
												{item.attributes.title} - ID : {item.id}   {item.attributes.Remise && <span style={{ backgroundColor: 'orange', color: 'white', padding: '2px 5px', borderRadius: '4px' }}>-{item.attributes.Remise}%</span>}
											</h1>
											<p className='mb-1 text-sm text-gray-500 sm:mb-2'>
												{item.attributes.marque} |  T: <b>{localStorage.getItem(`selectedTaille_${item.id}`) || '-'}</b> | Couleur : <b>{localStorage.getItem(`selectedColor_${item.id}`) || '-'}</b>
											</p>
											<div className='text-blue-500'>
												{item.quantity} x {item.attributes.Remise ? (<><span className='text-red-500 line-through'>{item.attributes.price}  </span> <span className='text-blue-500'>{(item.attributes.price - (item.attributes.price * item.attributes.Remise / 100)).toFixed(0)} TND</span></>) : `${item.attributes.price} TND`}
											</div>
											<hr className='w-[200px] border border-gray-200' />
										</div>
										
									</div>
									<DeleteCartItem productId={item.id} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			{/* shopping summary */}
			<div className='bg-gray-100 p-8'>
				<h1 className='mb-7 text-2xl text-gray-500'>Vos Commandes</h1>
				<div className='sm:pl-4'>
					{/* total */}
					<div className='mb-5 flex justify-between text-lg font-semibold'>
						<span>TOTAL</span>
						<span>{total()} TND</span>
					</div>
					<div className='flex flex-col items-center gap-2 sm:items-end'>
						<Button
							variant='contained'
							sx={{
								width: '16rem',
								padding: '0.75rem',
								borderRadius: '0',
								fontSize: '1rem',
								fontWeight: '600',
							}}
							disableElevation
							onClick={handlePayment}
						>
							{loading ? <LoadingSpinner /> : 'PASSER LA COMMANDE'}
						</Button>
						<Snackbar
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							open={open}
							autoHideDuration={6000}
							onClose={handleClose}
						>
							<Alert
								onClose={handleClose}
								severity={error ? 'error' : 'success'} 
								sx={{ width: '100%' }}
							>
                          {error || 'Votre commande a été reçue avec succès ! Nous vous contacterons Bientôt'} 
						  </Alert>
						</Snackbar>
						<span
							className='cursor-pointer text-xs text-red-700'
							onClick={resetCart}
						>
							Reset Cart
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItems;
