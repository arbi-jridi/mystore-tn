import Link from 'next/link';
import Image from 'next/image';

export default function Card({ item }: { item: ProductAll }) {
	const { id, attributes } = item;
	const img1 = attributes.img.data.attributes;
	const img2 = attributes.img2.data.attributes;

	return (
		<Link href={`/product/${id}`}>
			<div className='mb-12 flex flex-col gap-2 xxs:w-[36vw] xxs:min-w-[6rem] sm:w-[20vw] sm:max-w-none md:w-[20vw] lg:w-[15vw] 2xl:max-w-[18rem] rounded-lg'>
				<div className='group relative h-[95vw] min-h-[12rem] w-full overflow-hidden xxs:h-[65vw] xxs:max-h-[400px] sm:max-h-[240px] md:max-h-[280px] lg:max-h-[300px] 2xl:max-h-[350px] xxxl:max-h-[45vh] xxxl:min-h-[450px] rounded-lg'>
				{attributes.isNew && (
						<span className='absolute left-1 top-[5px] z-30 bg-white px-[3px] py-[5px] text-xs font-bold text-teal-600'>
							New ⭐️
						</span>
					)}
						{attributes.Remise && (
					<div className="animate-ping rounded-full bg-orange-200 h-10 w-10 text-xs absolute right-2 z-30  px-[2px] py-[5px] flex items-center justify-center text-bold">-{attributes.Remise}%</div>
					)}
						{!attributes.onStock && (
						<span className='absolute left-1/2 bottom-1/2 z-30 bg-white px-[3px] py-[5px] text-xs font-bold text-red-600 transform -translate-x-1/2 -translate-y-1/2'>
							HORS STOCK
						</span>
					)}

            
					<Image
						width={600}
						height={600}
						src={process.env.NEXT_PUBLIC_UPLOAD_URL + img1?.url}
						alt={img1?.name}
						className='absolute z-10 h-full w-full object-cover rounded-lg border-2 border-gray-200'
						loading='eager'
					/>
					{/* alt image */}
					{attributes.img2 && (
						<Image
							width={600}
							height={600}
							src={process.env.NEXT_PUBLIC_UPLOAD_URL + img2?.url}
							alt={img2?.name}
							className='absolute h-full w-full object-cover group-hover:z-20 rounded-lg border-2 border-gray-200'
						/>
					)}
				</div>
				<div className='flex justify-between'>
				<h2>{attributes.title}</h2>
			
				</div>
			
				<div className='flex justify-between'>
				<button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-blue-500 hover:text-white">
            Voir Article {'->'}
          </button>
		  {attributes.Remise ? (
						<>
							<h3 className='text-lg font-medium text-red-500 line-through'>{attributes.price}</h3>
							<h3 className='text-lg font-medium text-blue-500'>{(attributes.price - (attributes.price * attributes.Remise / 100)).toFixed(0)} TND</h3>
						</>
					) : (
						<h3 className='text-lg font-medium text-blue-500'>{attributes.price} TND</h3>
					)}
				</div>
			</div>
		</Link>
	);
}
