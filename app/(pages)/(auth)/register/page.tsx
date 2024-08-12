import Link from 'next/link';
import RegisterForm from './form';

export const metadata = {
	title: 'Sign up',
	description: 'Registrez Vous Données',
};

export default async function RegisterPage() {
	return (
		<>
			<div className='w-min min-w-full text-center'>
				<h1 className='mb-2 text-2xl font-semibold'>Create Your Account</h1>
				<p className='font-light text-gray-400'>
					Registre your informations here
				</p>
			</div>
			<RegisterForm />
			<p className='text-center'>
				Have an account?{' '}
				<Link className='text-indigo-500 hover:underline' href={'/login'}>
					Sign in
				</Link>
			</p>
		</>
	);
}
