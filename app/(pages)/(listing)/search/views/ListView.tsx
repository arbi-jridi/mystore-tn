'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import useStore from '../../(store)/store';
import List from '../../(components)/List';
import ToggleSidebarView from '../../(components)/ToggleSidebarView';
import SidebarView from './SidebarView';
import ErrorFallback from '@/app/components/ErrorFallback';

const ListView = ({ query }: { query: string }) => {
	const { selected, maxPrice, sort } = useStore();

	const searchQueryKey = ['search', selected, maxPrice, sort];
	const httpQuery = strapiQueries.searchProductsFull(
		query,
		maxPrice,
		selected,
		sort
	);

	return (
		<div className='flex-[3]'>
			<div className='mb-12'>results for: {query}</div>
			<ToggleSidebarView>
				<SidebarView isMobile={true} />
			</ToggleSidebarView>
			<ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={['search']}>
				<List queryKey={searchQueryKey} httpQuery={httpQuery} />
			</ErrorBoundary>
		</div>
	);
};

export default ListView;
