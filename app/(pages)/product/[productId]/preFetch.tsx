import queryClient from '@/lib/queryClient';
import { dehydrate } from '@tanstack/query-core';
import { publicApi } from '@/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';

export default async function preFetch(productId: string) {
	const qc = queryClient();

	await qc.prefetchQuery(['product', productId], () =>
		publicApi.get(strapiQueries.singleProduct(productId))
	);

	return dehydrate(qc);
}
