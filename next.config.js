/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: [process.env.PRODUCT_IMAGES_DOMAIN ?? '127.0.0.1',
			'res.cloudinary.com',],
			remotePatterns: [
				{
				  protocol: "https",
				  hostname: "images.pexels.com",
				},
				{
				  protocol: "https",
				  hostname: "static.wixstatic.com",
				},
				{
				  protocol: "https",
				  hostname: "people.pic1.co",
				},
				{
				  protocol: "https",
				  hostname: "app-uploads-cdn.fera.ai",
				},
			  ]
	},
};

module.exports = nextConfig;
