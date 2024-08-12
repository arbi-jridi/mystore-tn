import queryClient from '@/lib/queryClient';
import { dehydrate } from '@tanstack/query-core';
import { publicApi } from '@/helpers/HTTP';
import { strapiQueries } from '@/helpers/strapi/queries';

export default async function preFetch() {
	const qc = queryClient();

	const types: ProductType[] = ['populaire', 'trending'];

	await Promise.all(
		types.map((type) =>
			qc.prefetchQuery(['products', type], () =>
				publicApi.get(strapiQueries.featuredProducts(type))
			)
		)
	);

	return dehydrate(qc);
}
