'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingSpinner } from '@/app/components/loading';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SignInWithProvider from './SignInWithProvider';
import Icons from '@/app/components/icons';

type FormData = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const schema: ZodType<FormData> = z.object({
		email: z.string().email('Please enter a valid email'),
		password: z.string(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	}); // connect zod with react-hook-form

	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		// iterate react hook form errors
		for (const [key, value] of Object.entries(errors)) {
			if (value.message) {
				setError(value.message);
				break; // break after first error
			}
		}
	}, [errors]);

	const submitData = async (data: FormData) => {
		try {
			setLoading(true);
			const { email, password } = data;

			const res = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			if (!res?.error) {
				window.location.href = '/';
			} else {
				throw new Error('Invalid email or password');
			}
		} catch (err: any) {
			setError(err?.message);
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submitData)}
			className='w-full space-y-4 sm:w-[325px] 2xl:w-[350px] xxxl:w-[400px]'
		>
			<div className='grid w-full items-center gap-1.5'>
				<TextField
					required
					id='outlined-basic'
					label='Email'
					variant='outlined'
					{...register('email')}
				/>
			</div>
			<div className='grid w-full items-center gap-1.5'>
				<TextField
					required
					id='outlined-basic'
					label='Password'
					variant='outlined'
					type='password'
					{...register('password')}
				/>
			</div>
			{error && <Alert severity='error'>{error}</Alert>}
			<div className='flex w-full flex-col gap-3'>
				<Button
					variant='contained'
					sx={{
						width: '100%',
						padding: '.5rem',
						borderRadius: '0',
						fontSize: '1rem',
						textTransform: 'capitalize',
						fontWeight: '600',
					}}
					disableElevation
					type='submit'
				>
					{loading ? <LoadingSpinner /> : 'login'}
				</Button>

				<div className='flex items-center'>
					<div className='h-px flex-grow bg-gray-400'></div>
					<span className='flex-shrink px-4 text-2xl font-light text-gray-500'>
						or
					</span>
					<div className='h-px flex-grow bg-gray-400'></div>
				</div>

			{/* 	<SignInWithProvider provider='google' icon={<Icons.GoogleIcon />} />
				<SignInWithProvider provider='github' icon={<Icons.GitHubIcon />} /> */}
			</div>
		</form>
	);
};

export default LoginForm;
