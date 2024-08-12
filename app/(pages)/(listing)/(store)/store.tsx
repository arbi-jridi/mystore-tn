import { create } from 'zustand';

interface CategoryState {
	selected: string[];
	maxPrice: number;
	sort: string;
	setSelected: (selected: string[]) => void;
	setMaxPrice: (price: number) => void;
	setSort: (option: string) => void;
	resetFilters: () => void;
}

const defaultMaxPrice = 300; // max price of price filter slider

const useStore = create<CategoryState>((set, get) => ({
	selected: [],
	maxPrice: defaultMaxPrice,
	sort: '',
	setSelected: (selected) => {
		set((state) => {
			return {
				...state,
				selected: selected,
			};
		});
	},
	setMaxPrice: (price) => {
		set((state) => {
			return {
				...state,
				maxPrice: price,
			};
		});
	},
	setSort: (option) => {
		set((state) => {
			return {
				...state,
				sort: option,
			};
		});
	},
	resetFilters: () => {
		set((state) => {
			return {
				...state,
				selected: [],
				maxPrice: defaultMaxPrice,
				sort: '',
			};
		});
	},
}));

export default useStore;
