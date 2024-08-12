export const strapiQueries = {
	featuredProducts: (type: string) =>
		`/products?populate=*&filters[type][$eq]=${type}`,

	subCategories: (catName: string) =>
		`/sub-categories?filters[categories][title][$eq]=${catName}`,

	categoryProducts: (
		catName: string,
		maxPrice: number,
		subCats?: string[],
		sort?: string
	) =>
		`/products?populate=*&filters[categories][title][$eq]=${catName}${subCats
			?.map((item) => `&filters[sub_categories][id][$eq]=${item}`)
			.join('')}&filters[price][$lte]=${maxPrice}${
			sort && `&sort=price:${sort}`
		}`,

	singleProduct: (productId: string) => `/products/${productId}?populate=*`,

	allCategories: `/categories`,

	allProducts: '/products',

	searchProducts: (query: string) =>
		`/products?populate=*&filters[title][$containsi]=${query}`,

	searchProductsFull: (
		query: string,
		maxPrice: number,
		cats?: string[],
		sort?: string
	) =>
		strapiQueries.searchProducts(query) +
		`${cats
			?.map((item) => `&filters[categories][id][$eq]=${item}`)
			.join('')}&filters[price][$lte]=${maxPrice}${
			sort && `&sort=price:${sort}`
		}`,

	pagination: (pageParam: number) =>
		`&pagination[page]=${pageParam}&pagination[pageSize]=8`,

	auth: (provider: string | undefined, token: string | undefined) =>
		`/auth/${provider}/callback?access_token=${token}`,

	register: '/auth/local/register',
};
