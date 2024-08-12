export default function NotFound() {
	return (
		<div className='flex h-[calc(100vh-56px)] items-center justify-center bg-slate-100 muiMd:h-[calc(100vh-64px)] muiLg:h-[calc(100vh-66px)] xxxl:h-[calc(100vh-72px)]'>
			<div className='space-y-12 rounded-xl px-8 pb-8 pt-12 text-center sm:bg-white sm:shadow-xl'>
				<h1 className='text-3xl'>404 - Page Not Found</h1>
				<p>
					<a className='text-blue-500' href={'/'}>
						Return home
					</a>
				</p>
			</div>
		</div>
	);
}
