import Link from 'next/link';
import Image from 'next/image';

export default function Categories() {
	return (
		<div className='flex flex-col gap-2 sm:h-[80vh] sm:flex-row'>
			{/* col 1 */}
			<div className='flex flex-1 flex-col gap-2'>
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					<Image
						src={'/cat/cat-img-1.jpeg'}
						width={1000}
						height={1000}
						alt='Cat Image #1'
						className='h-full w-full object-cover'
					/>
					<Link
						href='/category/solde'
						className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
					>
						Solde
					</Link>
				</div>
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					<Image
						src={'/cat/cat-img-2.webp'}
						width={1000}
						height={1000}
						alt='Cat Image #2'
						className='h-full w-full object-cover'
					/>
					<Link
						href='/category/Femmes'
						className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
					>
						Femmes
					</Link>
				</div>
			</div>
			{/* col 2 */}
			<div className='flex flex-1 flex-col gap-2'>
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					<Image
						src={'/cat/cat-img-3.jpeg'}
						width={1000}
						height={1000}
						alt='Cat Image #3'
						className='h-full w-full object-cover'
					/>
					<Link
						href='/category/new'
						className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
					>
						Nouvelles Collections
					</Link>
				</div>
			</div>
			{/* col 3 */}
			<div className='flex flex-[2] flex-col gap-2'>
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					{/* sub-col 1 */}
					<div className='flex flex-1 flex-col gap-2'>
						<div className='relative flex flex-1 gap-2 overflow-hidden'>
							<Image
								src={'/cat/cat-img-4.webp'}
								width={1000}
								height={1000}
								alt='Cat Image #4'
								className='h-full w-full object-cover'
							/>
							<Link
								href='/category/Hommes'
								className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
							>
								Hommes
							</Link>
						</div>
					</div>
					{/* sub-col 2 */}
					<div className='flex flex-1 flex-col gap-2'>
						<div className='relative flex flex-1 gap-2 overflow-hidden'>
							<Image
								src={'/cat/cat-img-5.webp'}
								width={1000}
								height={1000}
								alt='Cat Image #5'
								className='h-full w-full object-cover'
							/>
							<Link
								href='/category/Enfants'
								className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
							>
								Enfants
							</Link>
						</div>
					</div>
				</div>
				{/* span full col */}
				<div className='relative flex flex-1 gap-2 overflow-hidden'>
					<Image
						src={'/cat/cat-img-6-.webp'}
						width={1000}
						height={1000}
						alt='Cat Image #6'
						className='h-full w-full object-cover'
					/>
					<Link
						href='/category/accessoires'
						className='bg-gray-white absolute inset-0 m-auto flex h-12 w-fit min-w-[100px] cursor-pointer items-center justify-center bg-white p-2 font-medium uppercase'
					>
						Accessoires
					</Link>
				</div>
			</div>
		</div>
	);
}
