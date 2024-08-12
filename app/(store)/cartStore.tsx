import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
	products: CartProduct[];
	addToCart: (product: CartProduct) => void;
	removeItem: (productId: number) => void;
	resetCart: () => void;
}

const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			products: [],
			addToCart: (product) => {
				set((state) => {
					const item = state.products.find((item) => item.id === product.id);
					// mutate quantity of existing cart product
					if (item) {
						item.quantity += product.quantity;
						return {
							...state,
						};
					}
					return {
						...state,
						products: [...state.products, product],
					};
				});
			},
			removeItem: (productId) => {
				set((state) => {
					const filteredProducts = state.products.filter(
						(item) => item.id !== productId
					);
					return {
						...state,
						products: filteredProducts,
					};
				});
			},
			resetCart: () => {
				set((state) => {
					return {
						...state,
						products: [],
					};
				});
			},
		}),
		{
			name: 'cart-items',
		}
	)
);

export default useCartStore;
