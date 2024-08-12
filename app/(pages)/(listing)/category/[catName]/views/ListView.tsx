'use client';

import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import useStore from '../../../(store)/store';
import List from '../../../(components)/List';
import ToggleSidebarView from '../../../(components)/ToggleSidebarView';
import SidebarView from './SidebarView';
import ErrorFallback from '@/app/components/ErrorFallback';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ListView = ({ catName }: { catName: string }) => {
	const { selected, maxPrice, sort } = useStore();
	const pathname = usePathname();

	const catProdsQueryKey = ['catProds', catName, selected, maxPrice, sort];
	const httpQuery = strapiQueries.categoryProducts(
		catName,
		maxPrice,
		selected,
		sort
	);

	useEffect(() => {
		// sticky sidebar scroll issue - dirty fix
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div className='flex-[3]'>
			<Image
				src={["Hommes", "Femmes", "Enfants"].includes(catName) ? `/cat-cover-${catName}.jpeg` : `/cover.jpeg`}
				width={1000}
				height={1000}
				priority={true}
				alt={''}
				className='mb-12 h-[200px] w-full object-cover lg:h-[300px]'
			/>
			<ToggleSidebarView>
				<SidebarView catName={catName} isMobile={true} />
			</ToggleSidebarView>
			<ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={['catProds']}>
				<List queryKey={catProdsQueryKey} httpQuery={httpQuery} />
			</ErrorBoundary>
		</div>
	);
};

export default ListView;
