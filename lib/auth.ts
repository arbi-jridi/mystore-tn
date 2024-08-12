import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { publicApi } from '@/app/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'Sign in with Email',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'hello@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null;

				// check for user
				const { user, jwt }: StrapiAuth = await publicApi.post('/auth/local', {
					identifier: credentials.email,
					password: credentials.password,
				});

				if (!user) return null;

				return {
					id: user.id + '',
					email: user.email,
					name: user.username,
					jwt,
				};
			},
		}),
	],
	callbacks: {
		session: ({ token, session }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					jwt: token.jwt,
				},
			};
		},
		jwt: async ({ token, user, account }) => {
			if (user) {
				const u = user as unknown as any;

				if (account?.provider !== 'credentials') {
					// auth data from providers
					const data = await publicApi.get(
						strapiQueries.auth(account?.provider, account?.access_token)
					);
					return {
						...token,
						id: data.user.id,
						jwt: data.jwt,
					};
				}

				return {
					...token,
					id: u.id,
					jwt: u.jwt,
				};
			}
			return token;
		},
		redirect() {
			return process.env.NEXTAUTH_URL || 'http://localhost:3000';
		},
	},
};
