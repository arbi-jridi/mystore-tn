import type { Metadata } from 'next';
import { publicApi } from '@/app/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import Hydrate from '@/app/components/HydrateClient';
import preFetch from './preFetch';
import ListView from './views/ListView';
import SidebarView from './views/SidebarView';

export async function generateMetadata({
	searchParams,
}: {
	searchParams: { q: string };
}): Promise<Metadata> {
	const { q: query } = searchParams;

	const { data } = (await publicApi.get(
		strapiQueries.searchProducts(query)
	)) as StrapiData<ProductAll[]>;

	const displayTerm = query.replaceAll('%20', ' ');

	if (!data.length)
		return {
			title: `${displayTerm} Not Found`,
		};

	return {
		title: `Search | Results for ${query}`,
		description: `Search results for ${displayTerm}`,
	};
}

export default async function page({
	searchParams,
}: {
	searchParams: { q: string };
}) {
	const { q: query } = searchParams;

	const dehydratedState = await preFetch(query);

	return (
		<Hydrate state={dehydratedState}>
			<SidebarView />
			<ListView query={query} />
		</Hydrate>
	);
}
