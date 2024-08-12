import { create } from 'zustand';

interface NavState {
	anchorEl: null | HTMLElement;
	anchorElNav: null | HTMLElement;
	mobileMoreAnchorEl: null | HTMLElement;
	setAnchorEl: (el: null | HTMLElement) => void;
	setAnchorElNav: (el: null | HTMLElement) => void;
	setMobileMoreAnchorEl: (el: null | HTMLElement) => void;
}

const useNavStore = create<NavState>()((set, get) => ({
	anchorEl: null,
	anchorElNav: null,
	mobileMoreAnchorEl: null,
	setAnchorEl: (el) => set((state) => ({ ...state, anchorEl: el })),
	setAnchorElNav: (el) => set((state) => ({ ...state, anchorElNav: el })),
	setMobileMoreAnchorEl: (el) =>
		set((state) => ({ ...state, mobileMoreAnchorEl: el })),
}));

export default useNavStore;
