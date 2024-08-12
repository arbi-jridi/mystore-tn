'use client';

import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import useStore from '../../(store)/store';
import MobileSidebar from '../../(components)/MobileSidebar';
import Sidebar from '../../(components)/Sidebar';
import Categories from '@/app/components/sidebar/Categories';
import PriceSlider from '@/app/components/sidebar/PriceSlider';
import Sort from '@/app/components/sidebar/Sort';

const SidebarView = ({ isMobile = false }: { isMobile?: boolean }) => {
	const { data: categories } = useQuery<StrapiData<ProductAll[]>>({
		queryKey: ['cats'],
		queryFn: () => publicApi.get(strapiQueries.allCategories),
	});

	const { selected, setSelected, maxPrice, setMaxPrice, sort, setSort } =
		useStore();

	const sidebarComponents = () => (
		<>
			<Categories
				categories={categories?.data}
				store={{ selected, setSelected }}
			/>
			<PriceSlider min={0} max={300} store={{ maxPrice, setMaxPrice }} />
			<Sort store={{ sort, setSort }} />
		</>
	);

	return !isMobile ? (
		<Sidebar>{sidebarComponents()}</Sidebar>
	) : (
		<MobileSidebar>{sidebarComponents()}</MobileSidebar>
	);
};

export default SidebarView;
