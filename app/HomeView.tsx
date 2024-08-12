'use client';

import Slider from '@/components/Slider';
import FeaturedProducts from '@/components/Featured';
import Categories from '@/components/Categories';
import Contact from '@/components/contact/Contact';
import { useEffect } from 'react';
import useCartStore from './(store)/cartStore';
import { useSearchParams } from 'next/navigation';

const HomeView = () => {
	const searchParams = useSearchParams();
	const { resetCart } = useCartStore();

	const success = searchParams?.get('success');

	// reset cart after stripe payment
	useEffect(() => {
		if (success === 'true') {
			resetCart();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [success]);

	return (
		<>
			<Slider />
			<FeaturedProducts type='populaire' />
			<Categories />
			<FeaturedProducts type='trending' />
			<Contact />
		</>
	);
};

export default HomeView;
