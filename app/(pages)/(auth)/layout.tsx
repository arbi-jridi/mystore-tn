import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function authLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (session) redirect('/');

	return (
		<div className='flex h-[calc(100vh-56px)] items-center justify-center bg-slate-100 muiMd:h-[calc(100vh-64px)] muiLg:h-[calc(100vh-66px)] xxxl:h-[calc(100vh-72px)]'>
			<div className='min-w-[65%] space-y-8 rounded-xl px-8 pb-8 pt-12 sm:min-w-0 sm:bg-white sm:shadow-xl'>
				{children}
			</div>
		</div>
	);
}
