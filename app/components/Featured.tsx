'use client';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import SliderView from './SliderView';

const Featured = ({ type }: { type: ProductType }) => {
	return (
		<div className='mx-8 my-24 sm:mx-12 muiMd:mx-16 xl:mx-48'>
			<div className='mb-12 flex flex-col items-center justify-between gap-4 muiSm:flex-row muiSm:gap-0'>
				<h1 className='flex-[2] text-3xl font-bold first-letter:uppercase'>
					{type}
				</h1>
				<p className='flex-[3] text-gray-600'>
				Trouvez La milleur collection de nos produits !
				</p>
			</div>
			<ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={['products']}>
				<SliderView type={type} />
			</ErrorBoundary>
		</div>
	);
};

export default Featured;
