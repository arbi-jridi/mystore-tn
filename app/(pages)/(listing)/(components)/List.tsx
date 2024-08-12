'use client';

import { Fragment, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { publicApi } from '@/helpers/HTTP';
import { LoadingSpinner } from '@/app/components/loading';
import Card from './Card';
import { strapiQueries } from '@/app/helpers/strapi/queries';

const List = ({
	queryKey,
	httpQuery,
}: {
	queryKey: (string | number | string[])[];
	httpQuery: string;
}) => {
	const {
		data: products,
		isLoading,
		hasNextPage,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery<StrapiData<ProductAll[]>>({
		queryKey: queryKey,
		queryFn: ({ pageParam = 1 }) => {
			const q = httpQuery + strapiQueries.pagination(pageParam);
			return publicApi.get(q);
		},
		getNextPageParam: (lastPage, pages) => {
			if (pages.length <= lastPage.meta.pagination.pageCount) {
				return pages.length + 1;
			} else {
				// no more pages
				return undefined;
			}
		},
	});

	useEffect(() => {
		let fetching = false;

		const onScroll = async (e: Event) => {
			const { scrollHeight, scrollTop, clientHeight } = (e.target as Document)
				.scrollingElement!;
			const offset = 1.5;

			// if near bottom of scrollHeight (entire page)
			if (!fetching && scrollHeight - scrollTop <= clientHeight * offset) {
				fetching = true;
				if (hasNextPage) {
					await fetchNextPage();
				}
				fetching = false;
			}
		};

		document.addEventListener('scroll', onScroll);
		// cleanup
		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	}, [fetchNextPage, hasNextPage]);

	if (isLoading)
		return (
			<div className='flex items-center justify-center'>
				<LoadingSpinner size={2} />
			</div>
		);

	if (!products?.pages[0].data.length)
		return (
			<div className='p-24 text-center text-xl font-semibold'>
				No Products Found!
			</div>
		);

	return (
		<>
			<div className='grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-4 md:gap-8 muiMd:grid-cols-3 lg:grid-cols-4'>
				{products?.pages?.map((group, i) => {
					return (
						<Fragment key={i}>
							{group.data.map((item) => (
								<Card item={item} key={item.id} />
							))}
						</Fragment>
					);
				})}
			</div>
			{isFetching && !isFetchingNextPage && (
				<div className='flex items-center justify-center p-24'>
					<LoadingSpinner size={2} />
				</div>
			)}
		</>
	);
};

export default List;
