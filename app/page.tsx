import Hydrate from '@/components/HydrateClient';
import preFetch from './preFetch';
import HomeView from './HomeView';

export default async function Home() {
	const dehydratedState = await preFetch();

	return (
		<main>
			<Hydrate state={dehydratedState}>
				<HomeView />
			</Hydrate>
		</main>
	);
}
