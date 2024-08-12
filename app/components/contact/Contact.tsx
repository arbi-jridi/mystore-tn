import ContactLinks from './ContactLinks';

export default function Contact() {
	return (
		<div className='flex justify-center bg-blue-500 p-4 text-white'>
			<div className='flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8 2xl:w-1/2'>
				<span>STAY IN TOUCH WITH US:</span>
				<div>
					<input
						type='text'
						placeholder='Enter your e-mail...'
						className='rounded-l-lg p-3'
					/>
					<button className='rounded-r-lg bg-gray-700 p-3 text-white'>
						JOIN US
					</button>
				</div>
				<div className='flex gap-2'>
					<ContactLinks />
				</div>
			</div>
		</div>
	);
}
