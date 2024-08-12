'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/app/helpers/HTTP';
import { strapiQueries } from '@/app/helpers/strapi/queries';
import AddToCart from './(components)/AddToCart';
import Images from './(components)/Images';
import Links from './(components)/Links';
import Quantity from './(components)/Quantity';
import { notFound } from 'next/navigation';

const ProductView = ({ productId }: { productId: string }) => {
	const { data: product } = useQuery<StrapiData<ProductAll>>({
		queryKey: ['product', productId],
		queryFn: () => publicApi.get(strapiQueries.singleProduct(productId)),
	});

	const [selectedTaille, setSelectedTaille] = useState<string | undefined>(localStorage.getItem(`selectedTaille_${productId}`) || undefined);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(localStorage.getItem(`selectedColor_${productId}`) || undefined);

  
    useEffect(() => {
        if (selectedTaille) {
            localStorage.setItem(`selectedTaille_${productId}`, selectedTaille);
        }
    }, [selectedTaille, productId]);

   
    useEffect(() => {
        if (selectedColor) {
            localStorage.setItem(`selectedColor_${productId}`, selectedColor);
        }
    }, [selectedColor, productId]);

	const [quantity, setQuantity] = useState<number>(1);

	if (!product?.data) notFound();

	return (
		<>
			{/* left */}
			<Images 
				imgData={{
					img1: product.data.attributes.img,
					img2: product.data.attributes.img2,
				}}
			/>
			{/* right */}
			<div className='flex flex-1 flex-col gap-5'>
				<div  className='flex justify-between'>
				<h1 className='text-3xl font-bold'>{product.data.attributes?.title}</h1>
				<div className='mt-[10px] flex flex-col gap-3 text-sm text-gray-500'>
					{product.data.attributes?.Remise && (
						<span className='w-max py-2 px-6 animate-pulse' style={{ backgroundColor: 'orange', color: 'white', padding: '2px 5px', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.2em', overflow: 'auto', whiteSpace: 'nowrap' }}>Remise  {product.data.attributes.Remise}%</span>
					)}
				</div>
				</div>
				
				{product.data.attributes?.Remise ? (
					<>
						<div className='text-3xl font-medium space-x-3'>
							<span className='text-red-500 line-through'>{product.data.attributes.price}</span>
							<span className='text-blue-500'>{(product.data.attributes.price - (product.data.attributes.price * product.data.attributes.Remise / 100)).toFixed(0)} TND</span>
						</div>
					</>
				) : (
					<span className='text-3xl font-medium text-blue-500'>
						{product.data.attributes.price} TND
					</span>
				)}
				<p className='text-justify text-lg font-light'>
					{product.data.attributes?.desc}
				</p>
				<Quantity quantity={quantity} setQuantity={setQuantity} />
				<AddToCart product={product.data} quantity={quantity} disabled={!product.data.attributes?.onStock} />
				<Links />
				<button className={`rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs ${product.data.attributes?.onStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
						{product.data.attributes?.onStock ? 'ON STOCK' : <span>HORS STOCK</span>}
					</button>
					<hr className='w-[200px] border border-gray-200' />
				<div className='mt-[10px] flex flex-col gap-3 text-sm text-gray-500'>
					<span>Marque: <b>{product.data.attributes?.marque}</b></span>
					<span>Tag: <b>{product.data.attributes?.tag}</b></span>
					<span>Taille:
					{product.data.attributes?.taille && (
						<select name="taille" id="taille" className="border border-gray-300 rounded p-2"  onChange={(e) => setSelectedTaille(e.target.value)}>
							<option value="">Select Taille</option>
							{Array.isArray(product.data.attributes.taille) && product.data.attributes.taille.map((taille) => (
									<option key={taille} value={taille} className="text-gray-700">{taille}</option>
								))}
						</select>
					)}
					</span>
					
					<div className="flex flex-wrap gap-3">
					<span>Couleurs:</span>
					{product.data.attributes?.color && Array.isArray(product.data.attributes.color) && (
						<>
							{product.data.attributes.color.map((couleur) => (
								<label key={couleur} className="inline-flex items-center" >
									<input type="radio" name="couleur" value={couleur} className="form-radio" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedColor(e.target.value)}/>
									<span className="ml-2 text-gray-700">{couleur}</span>
								</label>
							))}
						</>
					)}
					</div>
				</div>
	
			</div>
			
		</>
	);
};

export default ProductView;
