import axios from 'axios';
import authHeader from './strapi/authHeader';


// make requests with public token
export const publicApi = {
	// GET
	get: async (url: string) => {
		try {
			const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
				headers: authHeader(),
			});
			return data;
		} catch (error) {
			handleError(error);
		}
	},
	// POST
	post: async (url: string, body: any) => {
		try {
			const { data } = await axios.post(
				process.env.NEXT_PUBLIC_API_URL + url,
				body,
				{
					headers: authHeader(),
				}
			);
			return data;
		} catch (error) {
			handleError(error);
		}
	},
};



// make requests with jwt
export const privateApi = {
	// send order email
	sendOrderEmail: async (orderData: { items: any[], user: any }) => {
		
		const { items, user } = orderData;
		try {
			const headers = authHeader(true,process.env.NEXT_PUBLIC_API_TOKEN);
			console.error('Sending request with headers:', headers); // Log the headers to ensure JWT is included
			const { data } = await axios.post(
				process.env.NEXT_PUBLIC_API_URL + '/orders',
				{ items, user },
				{
					headers,
				}
			);
			return data;
		} catch (error) {
			handleError(error);
		}
	},
};

function handleError(error: any) {
	if (axios.isAxiosError(error)) {
		console.error('Axios error:', error.message);
		if (error.response) {
			console.error('Response data:', error.response.data);
			console.error('Response status:', error.response.status);
			console.error('Response headers:', error.response.headers);
		} else if (error.request) {
			console.error('No response received:', error.request);
		} else {
			console.error('Error setting up request:', error.message);
		}
	} else {
		console.error('Unexpected error:', error);
	}
	throw error; // Re-throw the error after logging it
}