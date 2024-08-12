import type { Metadata } from 'next';
import { publicApi } from '@/app/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import Hydrate from '@/components/HydrateClient';
import preFetch from './preFetch';
import ProductView from './ProductView';

type Props = {
	params: {
		productId: string;
	};
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { productId } = params;

	return {
		title: `Product | ${productId}`,
		description: `This is a page containing product ${productId}.`,
	};
}

export default async function Product({ params }: Props) {
	const { productId } = params;

	const dehydratedState = await preFetch(productId);

	return (
		<div className='flex flex-col gap-12 px-8 py-5 muiMd:flex-row xl:px-12'>
			<Hydrate state={dehydratedState}>
				<ProductView productId={productId} />
			</Hydrate>
		</div>
	);
}

export async function generateStaticParams() {
	const { data } = (await publicApi.get(strapiQueries.allProducts)) as {
		data: Product[];
	};

	return data.map((product) => ({
		productId: product.id.toString(),
	}));
}
