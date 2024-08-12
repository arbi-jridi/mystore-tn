'use client';

import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import { publicApi } from '../helpers/HTTP';
import { strapiQueries } from '../helpers/strapi/queries';
import Card from './Card';

const settings = {
	dots: false,
	infinite: true,
	arrows: false,
	speed: 500,
	autoplaySpeed: 2000,
	slidesToShow: 4,
	slidesToScroll: 1,
	initialSlide: 0,
	autoplay: true,

	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
			},
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 329,
			settings: {
				slidesToShow: 1,
			},
		},
	],
};

const SliderView = ({ type }: { type: ProductType }) => {
	const { data: products } = useQuery<StrapiData<ProductAll[]>>({
		queryKey: ['products', type],
		queryFn: () => publicApi.get(strapiQueries.featuredProducts(type)),
	});

	if (!products?.data) throw new Error('No products found');
	return (
		<Slider {...settings}>
			{products.data.map((item) => (
				<Card item={item} key={item.id} />
			))}
		</Slider>
	);
};

export default SliderView;
