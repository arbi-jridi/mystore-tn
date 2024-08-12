"use client"; 
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Icons from '@/icons';

export default function Footer() {
	return (
		<div className='bg-[#fbf9fa] p-4 xl:px-0'>
			{/* top */}
			<div className='flex flex-wrap gap-12 md:flex-row md:flex-nowrap p-4'>
				<div className='flex flex-1 flex-col gap-2 text-justify text-sm'>
					<h1 className='text-bold text-lg text-gray-600'>Categories</h1>
					<Link href={'/category/Femmes'} className='text-gray-500 hover:text-pink-500'>
						Femmes
					</Link>
					<Link href={'/category/Hommes'} className='text-gray-500 hover:text-blue-500'>
						Hommes
					</Link>
					<Link href={'/category/Enfants'} className='text-gray-500 hover:text-green-500'>
						Enfants
					</Link>
					<Link href={'/category/accessoires'} className='text-gray-500 hover:text-blue-500'>
					Accessoires
					</Link>
					
				     <Link href={'/category/new'} className='text-gray-500 hover:text-purple-500'>
							Nouvelles Collections
						</Link>
					
				</div>
				<div className='flex flex-1 flex-col gap-2 text-justify text-sm'>
					<h1 className='text-bold text-lg text-gray-600'>Liens</h1>
					<a href="tel:99999999" className='text-gray-500'>Contactez Nous</a>
					<a href="https://wa.me/99999999" className='text-gray-500'>WhatsApp</a>
					<Link href={'https://maps.app.goo.gl/6vy8mJAYsyEVvvjHA'} target='blank' className='text-gray-500 hover:text-green-500'>
						Notre Local
					</Link>
					<Link href={'https://www.facebook.com'} target='blank' className='text-gray-500 hover:text-blue-500'>
						Facebook
					</Link>
					<Link href={'https://www.instagram.com'} target='blank' className='text-gray-500 hover:text-pink-500'>
						instagram
					</Link>
				</div>
				<div className='flex flex-col gap-2 text-justify text-sm md:flex-1'>
					<h1 className='text-bold text-lg text-gray-600'>Trouvez Notre Store ici</h1>
					<iframe
					//className='flex flex-col gap-2 text-justify text-sm md:flex-1'
						//width="500"
						height="200"
						style={{border:0}}
						referrerPolicy="no-referrer-when-downgrade"
						src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2562.489266590704!2d10.183787759520408!3d36.79923884226654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1722674657529!5m2!1sen!2stn">
					</iframe>
				</div>
				<div className='flex flex-col gap-2 text-justify text-sm md:flex-1'>
					<h1 className='text-bold text-lg text-gray-600'>About</h1>
					<span className='text-gray-500'>
						My Store vous Offre une large gamme de vêtements pour Hommes, Femmes & Enfants.
					</span>
				</div>
			</div>
			{/* bottom */}
			<div className='mt-12 flex flex-col items-center justify-between sm:flex-row'>
				{/* left */}
				<div className='flex flex-col items-center sm:items-start md:flex-row md:items-center p-4'>
					<span className='text-2xl font-bold text-blue-500'>My Store</span>
					<button onClick={() => Swal.fire({
						title: "<strong>Devloped by Arbi Jridi</strong>",
						icon: "info",
						html: 
							"https://github.com/arbi-jridi" 
						,
						showCloseButton: true,
						showCancelButton: false,
						focusConfirm: false
						,
						confirmButtonAriaLabel: "Contact us",
						cancelButtonText: `
							<Icons.FacebookIcon />
						`,
						cancelButtonAriaLabel: "Thumbs down",
						footer: '<a href="https://www.linkedin.com/in/arbi-jridi/" target=blank >My Linkedin</a>'
					})} className='ml-5 text-xs text-gray-500 sm:ml-0 md:ml-5'>
						© Copyright 2024. All Rights Reserved | Developed By 
					</button>
				</div>
				{/* right */}
				<div>
					<Image
						src='/poweredby.png'
						alt='poweredby'
						width={400}
						height={50}
					/>
				</div>
			</div>
		</div>
	);
}
