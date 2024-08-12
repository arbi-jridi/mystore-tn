'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingSpinner } from '@/app/components/loading';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.black, 0.05),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.black, 0.1),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const SearchInput = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		setLoading(false);
	}, [searchParams]);

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchQuery) return;
		setLoading(true);

		// encode search string into valid url string
		const encodedSearchQuery = encodeURI(searchQuery);

		router.push(`/search?q=${encodedSearchQuery}`);
		router.refresh(); // force update on search
	};

	return (
		<form onSubmit={onSearch}>
			<Search>
				<SearchIconWrapper>
					{loading ? <LoadingSpinner size={1.6} /> : <SearchIcon />}
				</SearchIconWrapper>
				<StyledInputBase
					placeholder='Search…'
					inputProps={{ 'aria-label': 'search' }}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</Search>
		</form>
	);
};

export default SearchInput;
