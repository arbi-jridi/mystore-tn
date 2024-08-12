import queryClient from '@/lib/queryClient';
import { dehydrate } from '@tanstack/query-core';
import { publicApi } from '@/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';

export default async function preFetch(query: string) {
	const qc = queryClient();

	const selected = new Array();
	const maxPrice = 300;
	const sort = '';
	const searchQueryKey = ['search', selected, maxPrice, sort];

	await Promise.all([
		qc.prefetchQuery(['cats'], () =>
			publicApi.get(strapiQueries.allCategories)
		),
		qc.prefetchInfiniteQuery(searchQueryKey, () =>
			publicApi.get(
				strapiQueries.searchProductsFull(query, maxPrice, selected, sort)
			)
		),
	]);

	return dehydrate(qc);
}
