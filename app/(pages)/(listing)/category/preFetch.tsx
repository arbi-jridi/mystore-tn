import queryClient from '@/lib/queryClient';
import { dehydrate } from '@tanstack/query-core';
import { publicApi } from '@/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';

export default async function preFetch(catName: string) {
	const qc = queryClient();

	const selected = new Array();
	const maxPrice = 300;
	const sort = '';
	const catProdsQueryKey = ['catProds', catName, selected, maxPrice, sort];

	await Promise.all([
		qc.prefetchQuery(['subcat', catName], () =>
			publicApi.get(strapiQueries.subCategories(catName))
		),
		qc.prefetchInfiniteQuery(catProdsQueryKey, () =>
			publicApi.get(
				strapiQueries.categoryProducts(catName, maxPrice, selected, sort)
			)
		),
	]);

	return dehydrate(qc);
}
