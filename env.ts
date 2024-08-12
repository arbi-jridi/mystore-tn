import { z } from 'zod';

const envVariables = z.object({
	// api
	NEXT_PUBLIC_API_TOKEN: z.string(),
	NEXT_PUBLIC_API_URL: z.string().url(),
	NEXT_PUBLIC_UPLOAD_URL: z.string().url(),
	PRODUCT_IMAGES_DOMAIN: z.string(),
	STRIPE_API_KEY: z.string(),
	// auth
	NEXTAUTH_URL: z.string().url(),
	NEXTAUTH_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
