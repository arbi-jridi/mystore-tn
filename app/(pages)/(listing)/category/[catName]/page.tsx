import type { Metadata } from 'next';
import { publicApi } from '@/app/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import Hydrate from '@/components/HydrateClient';
import preFetch from '../preFetch';
import ListView from './views/ListView';
import SidebarView from './views/SidebarView';

type Props = {
	params: {
		catName: string;
	};
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { catName } = params;

	return {
		title: catName,
		description: `This is a page containing ${catName} products.`,
	};
}

export default async function Products({ params }: Props) {
	const { catName } = params;
	const dehydratedState = await preFetch(catName);

	return (
		<Hydrate state={dehydratedState}>
			<SidebarView catName={catName} />
			<ListView catName={catName} />
		</Hydrate>
	);
}

export async function generateStaticParams() {
	const { data } = (await publicApi.get(strapiQueries.allCategories)) as {
		data: Category[];
	};

	return data.map((cat) => ({
		catName: cat.attributes.title,
	}));
}
