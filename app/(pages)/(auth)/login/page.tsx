import Link from 'next/link';
import LoginForm from './form';

export const metadata = {
	title: 'Login',
	description: 'This is the login page.',
};

export default async function LoginPage() {
	return (
		<>
			<div className='w-min min-w-full text-center'>
				<h1 className='mb-2 text-2xl font-semibold'>Login</h1>
				<p className='font-light text-gray-400'>
					Login Here
				</p>
			</div>
			<LoginForm />
			<p className='text-center'>
				Need to create an account?{' '}
				<Link className='text-indigo-500 hover:underline' href={'/register'}>
					Create Account
				</Link>
			</p>
		</>
	);
}
