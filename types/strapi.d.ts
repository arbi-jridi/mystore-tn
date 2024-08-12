interface StrapiData<T> {
	data: T;
	meta: {
		pagination: {
			page: number;
			pageCount: number;
			pageSize: number;
			total: number;
		};
	};
}

interface Product {
	id: number;
	attributes: {
		createdAt: string;
		desc: string | undefined;
		isNew: boolean;
		price: number;
		publishedAt: string;
		title: string;
		type: ProductType;
		updatedAt: string;
		marque: string | undefined;
		stock:number;
		onStock: boolean;
		taille:JSON;
		color:JSON;
		description: string | undefined;
		tag:ProductTag;
		Remise:number;
	};
}

interface ProductAll extends Product {
	attributes: Product['attributes'] & {
		img: {
			data: img;
		};
		img2: {
			data: img;
		};
	};
}

interface CartProduct extends ProductAll {
	quantity: number;
}

type StrapiAuth = {
	jwt: string;
	user: {
		id: number;
		username: string;
		email: string;
		addresse:string;
		phone:string;
		provider: string;
		confirmed: boolean;
		blocked: boolean;
		createdAt: string;
		updatedAt: string;
	};
};

type ProductType = 'populaire' | 'trending' | 'normal';
type ProductTaille = 
  'XS' | 
  'S' | 
  'M' | 
  'L' | 
  'XL' | 
  'XXL' | 
  'XXXL' | 
  '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | 
  '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | 
  '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | 
  '50';

type ProductTag = 'hommes'|'femmes' |'enfants';
type ProductColor = 
  'blanc' |
  'noir' |
  'rouge' |
  'jaune' |
  'bleu' |
  'rose' |
  'gris' |
  'vert' |
  'orange' |
  'violet' |
  'marron' |
  'turquoise' |
  'beige' |
  'bordeaux' |
  'argent' |
  'gold';

   


type Category = {
	id: number;
	attributes: {
		title: string;
		desc: string;
		createdAt: string;
		publishedAt: string;
	};
};

type checkoutData = {
	products: CartProduct[];
	user: any;
};

type Format = {
	ext: string;
	hash: string;
	height: number;
	mime: string;
	name: string;
	path: null | string;
	size: number;
	url: string;
	width: number;
};

type img = {
	id: number;
	attributes: {
		alternativeText: null | string;
		caption: null | string;
		createdAt: string;
		ext: string;
		formats: {
			large: Format;
			medium: Format;
			small: Format;
			thumbnail: Format;
		};
		hash: string;
		height: number;
		mime: string;
		name: string;
		previewUrl: null | string;
		provider: string;
		provider_metadata: null | any;
		size: number;
		updatedAt: string;
		url: string;
		width: number;
	};
};
