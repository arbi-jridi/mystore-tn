export default function authHeader(sessionAuth: boolean = false, jwt?: string) {
	return {
		Authorization: `Bearer ${
			!sessionAuth ? process.env.NEXT_PUBLIC_API_TOKEN : jwt
		}`,
	};
}
